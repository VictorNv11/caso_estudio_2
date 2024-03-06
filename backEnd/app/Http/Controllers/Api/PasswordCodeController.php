<?php


namespace App\Http\Controllers\Api;


use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\PasswordResetToken;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\Hash;


class PasswordCodeController extends Controller
{
    //verificar token 
    public function verificarToken(Request $request)
    {
    $response = ["success" => false];

    $validator = Validator::make($request->all(), [
        'token' => 'required|string|min:6|max:6',
    ]);

    if ($validator->fails()) {
        $response['error'] = $validator->errors()->first();
        return response()->json($response, 400);
    }

    $resetToken = PasswordResetToken::where('token', $request->token)->first();

    if (!$resetToken) {
        $response['error'] = "Token no válido";
        return response()->json($response, 404);
    }

    if ($resetToken->expires_at < now()) {
        
        // $resetToken->delete();
        $response['error'] = "El token ha expirado solicita otro";
        return response()->json($response, 400);
    }

    $resetToken->delete();
    $response['message'] = "Token válido";
    $response['success'] = true;

    return response()->json($response, 200);

    }

    
//restablecer contraseña
    public function resetPassword(Request $request)
    {
        $response = ["success" => false];

       
    $request->validate([
        'email' => 'required|email',
        'password' => 'required|min:6',
    ]);

   
    $user = User::where('email', $request->email)->first();

    if (!$user) {
      
        $response['error'] = "Usuario no encontrado";
        return response()->json($response, 404);
    }

    if (Hash::check($request->password, $user->password)) {
     
        $response['error'] = "La nueva contraseña debe ser diferente a la actual";
        return response()->json($response, 400);
    }
    
    $user->password = bcrypt($request->password);

    if (!$user->save()) {
        $response['error'] = "No se pudo actualizar la contraseña";
        return response()->json($response, 500);
    }

    $response['message'] = "Contraseña actualizada exitosamente";
    $response['success'] = true;

        return response()->json($response, 200);
    }
}