<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasFactory;
    protected $fillable = [
        'cc_nit',
        'nombre_completo',
        'direccion',
        'ciudad',
        'telefono',
        'correo_electronico'
    ];
}

