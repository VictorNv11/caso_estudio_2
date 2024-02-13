<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use App\Models\super_admin;
use App\Models\User;
use Illuminate\Http\Request;


class SupAdminController extends Controller
{
    // Función principal
    public function index()
    {
        $sup_admin = super_admin::all();
        return  $sup_admin;
    }   

    // Creación de SuperAdministradores (Create)
    // public function store(Request $request)
    // {
    //     $sup_admin = new super_admin();
    //     $sup_admin->name = $request-> name;
    //     $sup_admin->email = $request-> email;
    //     $sup_admin->phone = $request-> phone;
    //     $sup_admin->password = $request-> password;
    //     $sup_admin->rol = $request-> rol;

    //     $sup_admin->save();
    // }

    // Leer (Read)
    public function show(string $id)
    {
        $user = User::find($id);
        return $user;
    }

    // Actualizar (Update)
    // public function update(Request $request, string $id)
    // {
    //     $sup_admin = super_admin::findOrFail($request->id);
    //     $sup_admin->name = $request-> name;
    //     $sup_admin->email = $request-> email;
    //     $sup_admin->password = $request-> password;
    //     $sup_admin->phone = $request-> phone;
    //     $sup_admin->rol = $request-> rol;

    //     $sup_admin->save();
    //     return $sup_admin;
    // }

    public function update(Request $request, string $id)
{
    $user = User::findOrFail($request->id); // Utiliza el parámetro $id en lugar de $request->id
    $user->name = $request->name;
    $user->documento = $request->documento;
    $user->telefono = $request->telefono;
    $user->email = $request->email;
    $user->password = Hash::make($request->password);
    $user->roles = $request->roles;

    $user->save();
    return $user;
}
    // Eliminar (DELETE)
    public function destroy(string $id)
    {
        $user = User::destroy($id);
        return $user;
    }
}
