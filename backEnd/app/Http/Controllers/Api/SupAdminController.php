<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\super_admin;
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
    public function store(Request $request)
    {
        $sup_admin = new super_admin();
        $sup_admin->name = $request-> name;
        $sup_admin->email = $request-> email;
        $sup_admin->phone = $request-> phone;
        $sup_admin->password = $request-> password;
        $sup_admin->rol = $request-> rol;

        $sup_admin->save();
    }

    // Leer (Read)
    public function show(string $id)
    {
        $sup_admin = super_admin::find($id);
        return $sup_admin;
    }

    // Actualizar (Update)
    public function update(Request $request, string $id)
    {
        $sup_admin = super_admin::findOrFail($request->id);
        $sup_admin->name = $request-> name;
        $sup_admin->email = $request-> email;
        $sup_admin->password = $request-> password;
        $sup_admin->phone = $request-> phone;
        $sup_admin->rol = $request-> rol;

        $sup_admin->save();
        return $sup_admin;
    }

    // Eliminar (DELETE)
    public function destroy(string $id)
    {
        $sup_admin = super_admin::destroy($id);
        return $sup_admin;
    }
}
