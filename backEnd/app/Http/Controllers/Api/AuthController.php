<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;


class AuthController extends Controller
{
    public function register (Request $request){
        //validacion de los datos
        $request->validate([
            'name' => 'required',
            'documento' => 'required',
            'telefono'=>'required',
            'email' => 'required|email|unique:users',
            'password' =>'required',
            'roles' => 'required'
        


        ]);
        //usuario
            $user = new User();
            $user->name = $request->name;
            $user->documento = $request->documento;
            $user->telefono = $request->telefono;
            $user->email = $request->email;
            $user->password = Hash::make($request->password);
            $user->roles = $request->roles;
            $user->save();

        //respuesta 
        return response($user, Response::HTTP_CREATED);
    }
    
    

    public function login (Request $request){
       $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' =>['required']

        ]);

        if(Auth::attempt($credentials)){
            $user = Auth::user();
            $token = $user->createToken('token')->plainTextToken;
            $cookie  = cookie('cookie_token', $token, 60 * 24);
            return response(["token"=>$token], Response::HTTP_OK)->withoutCookie($cookie);
        }else{
            return response(["message"=>"Credenciales invalidas"],Response::HTTP_UNAUTHORIZED);
        }
    }

    public function userProfile (Request $request){
        return response()->json([
            "message"=>"perfil del usuario ok",
            "userData" => auth()->user()

        ],Response::HTTP_OK);
    }

    public function logout (Request $request){
        $cookie = Cookie::forget('cookie_token');
        return response(["message"=>"Cierre de session Ok "],Response::HTTP_OK)->withCookie($cookie);
    }
    public function allUsers (){
        $users = User::all();
        return response()->json([
            "users"=>$users
        ]);
    }
}
