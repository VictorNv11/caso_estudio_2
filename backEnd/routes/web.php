<?php

use Illuminate\Support\Facades\Route;
use App\Models\Role;
use App\Models\super_admin;
use App\Models\User;
use App\Models\usuarios;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/test', function () {

    /*return   Role::create([
        'name' => 'User',
        'slug' => 'user',
        'description' => 'Usuario',
        'full-access' => 'no'
    ]);
    */
    /*
     return   Role::create([
        'name' => 'Admin',
        'slug' => 'admin',
        'description' => 'Administrador',
        'full-access' => 'yes'
    ]);
    */
    /*
    return   Role::create([
        'name' => 'Usuario',
        'slug' => 'usuario',
        'description' => 'Usuario corriente',
        'full-access' => 'no'
    ]);
    */

    $user = User::find(1);
    //$user->roles()->attach([1,3]);
    $user->roles()->sync([1]);
        return $user->roles;

    
});
