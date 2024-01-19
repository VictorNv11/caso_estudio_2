<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Usuarios;
use Illuminate\Http\Request;


class UsuariosController extends Controller
{
 
    public function index()
    {
      $usuarios = Usuarios::all();
      return $usuarios;
    }

 
    public function store(Request $request)
    {
        $usuarios = new Usuarios();
        $usuarios->nombre = $request-> nombre;
        $usuarios->email = $request-> email;
        $usuarios->password = $request-> password;
        $usuarios->phone = $request-> phone;
        $usuarios->rol = $request-> rol;

        
        $usuarios->save();
    }


    public function show(string $id)
    {
        $usuarios = usuarios::find($id);
        return $usuarios;   
    }

  
    public function update(Request $request, string $id)
    {
        $usuarios = usuarios::findOrFail($request->id);
        $usuarios->nombre = $request-> nombre;
        $usuarios->email = $request-> email;
        $usuarios->password = $request-> password;
        $usuarios->phone = $request-> phone;
        $usuarios->rol = $request-> rol;

        $usuarios->save();
        return $usuarios;
    }

    
    public function destroy(string $id)
    {
        $usuarios = Usuarios::destroy($id);
        return $usuarios; 
    }
}
