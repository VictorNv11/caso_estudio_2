<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class usuarios extends Model
{
    use HasFactory;
    protected $fillable = [
        'nombre',
        'email',
        'password',
        'rol'
    ];

    public function roles(){
        return $this->belongsToMany('App\Models\Role')->withTimesTamps();
    }
}
