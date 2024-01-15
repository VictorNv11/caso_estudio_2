<?php

use App\Http\Controllers\Api\SupAdminController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;




Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(SupAdminController::class)->group(function () {
    Route::get('/supAdmins','index');                 //SIRVE
    Route::post('/supAdmin', 'store');               //SIRVE
    Route::get('/supAdmin/{id}','show');            //SIRVE
    Route::put('/supAdmin/{id}','update');         //SIRVE
    Route::delete('/supAdmin/{id}','destroy');    //SIRVE
});
