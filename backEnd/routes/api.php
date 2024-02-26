<?php

use App\Http\Controllers\Api\SupAdminController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UsuariosController;
use App\Http\Controllers\Excel\ImportController;
use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\Api\NotificationController;
use Illuminate\Support\Facades\Auth;

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::controller(SupAdminController::class)->group(function () {
    Route::get('/supAdmins','index');                 //SIRVE
    Route::post('/supAdmin', 'store');               //SIRVE
    Route::get('/User/{id}','show');            //SIRVE
    Route::put('/User/{id}','update');         //SIRVE
    Route::delete('/User/{id}','destroy');    //SIRVE
});

Route::controller(AdminController::class)->group(function () {
    Route::get('/Admins','index');                 //SIRVE
    Route::post('/Admin', 'store');               //SIRVE
    Route::get('/Admin/{id}','show');            //SIRVE
    Route::put('/Admin/{id}','update');         //SIRVE
    Route::delete('/Admin/{id}','destroy');    //SIRVE
});

Route::controller(UsuariosController::class)->group(function () {
    Route::get('/usuarios','index');                 //SIRVE
    Route::post('/usuarios', 'store');               //SIRVE
    Route::get('/usuarios/{id}','show');            //SIRVE
    Route::put('/usuarios/{id}','update');         //SIRVE
    Route::delete('/Usuarios/{id}','destroy');    //SIRVE
});

// Notificaciones
Route::prefix('notifications')->group(function (){
    Route::get('/', [NotificationController::class, 'getNotifications']);
});

// Rutas de Servicios
Route::prefix('servicios')->group(function (){
    Route::get('/', [TaskController::class, 'index']); 
    Route::post('/crear',[TaskController::class, 'store']);               //SIRVE
    Route::get('/{id}',[TaskController::class, 'show']);            //SIRVE
    Route::put('/{id}',[TaskController::class, 'update']);         //SIRVE
    Route::delete('/delete/{id}',[TaskController::class, 'destroy']);    //SIRVE
});

// Rutas del módulo de clientes
Route::prefix('clientes')->group(function () {
    Route::get('/', [ImportController::class, 'index']); // SIRVE
    Route::post('/import', [ImportController::class, 'importar']); // SIRVE
    Route::get('/export', [ImportController::class, 'exportar']); // SIRVE
    

    Route::get('/export/excel', [ImportController::class, 'exportarExcel']); // SIRVE
    Route::post('/create',[ImportController::class, 'store']);  // SIRVE
    Route::get('/{id}', [ImportController::class,'show']); // SIRVE
    Route::put('/{id}',[ImportController::class,'update']);         //SIRVE
    Route::delete('/delete/{id}',[ImportController::class,'destroy']); 
    
});

//__________________PRUEBA LOGIN Y REGISTRO__________________________

Route::post('register',[AuthController::class, 'register']);
Route::post('login',[AuthController::class, 'login']);
//Route::put('edit',[AuthController::class, 'edit']);

Route::group(['middleware'=>['auth:sanctum']], function(){
    Route::get('user-profile', [AuthController::class, 'userProfile']);
    Route::post('logout', [AuthController::class, 'logout']);
});
Route::get('users',[AuthController::class,'allUsers']);



