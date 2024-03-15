<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Auth\Passwords\CanResetPassword;

class User extends Authenticatable 
{
    use HasApiTokens, HasFactory, Notifiable, CanResetPassword;

    protected $fillable = [
        'name',
        'documento',
        'telefono',
        'email',
        'password',
        'roles'
    ];

 
    protected $hidden = [
        'password',
      'remember_token',
    ];




    public function roles(){
        return $this->belongsToMany('App\Models\Role')->withTimesTamps();
    }

   
}
