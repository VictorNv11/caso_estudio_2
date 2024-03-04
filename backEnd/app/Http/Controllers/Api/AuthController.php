<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Password;

// Eventos
use App\Events\NewUserRegistered;
use App\Notifications\NewUserRegisteredNotification;

// Importar la clase Notification
use Illuminate\Support\Facades\Notification;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Validación de los datos
        $validator = $request->validate([
            'name' => 'required',
            'documento' => 'required',
            'telefono' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'roles' => 'required',
        ]);
    
        try {
            // Crear el usuario
            $user = new User();
            $user->name = $request->name;
            $user->documento = $request->documento;
            $user->telefono = $request->telefono;
            $user->email = $request->email;
            $user->password = Hash::make($request->password);
            $user->roles = $request->roles;
            $user->save();
    
            // Enviar la notificación al superadministrador
            $superAdmin = User::where('roles', 1)->first();
            if ($superAdmin) {
                Notification::send($superAdmin, new NewUserRegisteredNotification($user));
            } else {
                Log::warning('No se pudo encontrar al superadministrador para enviar la notificación.');
            }
    
            // Respuesta
            return response()->json(['user' => $user], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            Log::error('Error al registrar el usuario: ' . $e->getMessage());
            return response()->json(['error' => 'Error al registrar el usuario'], Response::HTTP_BAD_REQUEST);
        }
    }
    

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required']
        ]);

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('token')->plainTextToken;
            $cookie = cookie('cookie_token', $token, 60 * 24);
            return response(["token" => $token], Response::HTTP_OK)->withoutCookie($cookie);
        } else {
            return response(["message" => "Credenciales invalidas"], Response::HTTP_UNAUTHORIZED);
        }
    }

    public function userProfile(Request $request)
    {
        return response()->json([
            "message" => "perfil del usuario ok",
            "userData" => auth()->user()
        ], Response::HTTP_OK);
    }

    public function logout(Request $request)
    {
        $cookie = Cookie::forget('cookie_token');
        return response(["message" => "Cierre de session Ok "], Response::HTTP_OK)->withCookie($cookie);
    }

    public function allUsers()
    {
        $users = User::all();
        return response()->json(["users" => $users]);
    }

    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $status = Password::sendResetLink($request->only('email'));

        return $status === Password::RESET_LINK_SENT
                    ? response()->json(['message' => __($status)], 200)
                    : response()->json(['error' => __($status)], 400);
    }

    public function resetPassword(Request $request)
{
    $request->validate([
        'email' => 'required|email',
        'token' => 'required',
        'password' => 'required|confirmed|min:8',
    ]);

    $status = Password::reset(
        $request->only('email', 'password', 'password_confirmation', 'token'),
        function ($user, $password) {
            $user->password = Hash::make($password);
            $user->save();
        }
    );

    return $status === Password::PASSWORD_RESET
        ? response()->json(['message' => 'Contraseña restablecida con éxito'], 200)
        : response()->json(['error' => 'Error al restablecer la contraseña'], 400);
}
    

}
