<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function index()
    {
        $pers_admin = admin::all();
        return  $pers_admin;
    }

   
    public function store(Request $request)
    {
        $pers_admin = new admin();
        $pers_admin->name = $request-> name;
        $pers_admin->email = $request-> email;
        $pers_admin->password = $request-> password;
        $pers_admin->phone = $request-> phone;
        $pers_admin->rol = $request-> rol;

        $pers_admin->save();
    }

   
    public function show(string $id)
    {
        $pers_admin = admin::find($id);
        return $pers_admin;
    }

    public function update(Request $request, string $id)
    {
        $pers_admin = admin::findOrFail($request->id);
        $pers_admin->name = $request-> name;
        $pers_admin->email = $request-> email;
        $pers_admin->password = $request-> password;
        $pers_admin->phone = $request-> phone;
        $pers_admin->rol = $request-> rol;

        $pers_admin->save();
        return $pers_admin;
    }
    public function destroy(string $id)
    {
        $pers_admin = admin::destroy($id);
        return $pers_admin;
    }
}
