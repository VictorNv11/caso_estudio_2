<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\super_admin;
use Illuminate\Http\Request;


class SupAdminController extends Controller
{
   
    public function index()
    {
        $sup_admin = super_admin::all();
        return  $sup_admin;
    }

   
    public function store(Request $request)
    {
        $sup_admin = new super_admin();
        $sup_admin->name = $request-> name;
        $sup_admin->email = $request-> email;
        $sup_admin->password = $request-> password;
        $sup_admin->rol = $request-> rol;

        $sup_admin->save();
    }

   
    public function show(string $id)
    {
        $sup_admin = super_admin::find($id);
        return $sup_admin;
    }

    public function update(Request $request, string $id)
    {
        $sup_admin = super_admin::findOrFail($request->id);
        $sup_admin->name = $request-> name;
        $sup_admin->email = $request-> email;
        $sup_admin->password = $request-> password;;
        $sup_admin->rol = $request-> rol;

        $sup_admin->save();
        return $sup_admin;
    }
    public function destroy(string $id)
    {
        $sup_admin = super_admin::destroy($id);
        return $sup_admin;
    }
}
