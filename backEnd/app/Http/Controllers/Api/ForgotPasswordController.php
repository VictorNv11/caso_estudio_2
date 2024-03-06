<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;


class ForgotPasswordController extends Controller
{

    public function index(){
        $user=User::all();
        return $user;
    }
    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $status = Password::sendResetLink($request->only('email'));

        return $status === Password::RESET_LINK_SENT
                    ? response()->json(['message' => __("Se ha enviado el enlace de restablecimiento de contraseña")], 200)
                    : response()->json(['error' => __($status)], 400);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|confirmed|min:8',
        ]);
    
        $response = Password::reset(
            $request->only('email', 'token','password', 'password_confirmation'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password),
                    'remember_token' => Str::random(60), // add this line if you have 'remember_token' in your users table
                ])->save();
            }
        );
    
        return $response == Password::PASSWORD_RESET
            ? response()->json(['message' => 'Contraseña restablecida con éxito'], 200)
            : response()->json(['error' => 'Error al restablecer la contraseña'], 400);
    }
    
}
