<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class PasswordResetToken extends Model
{
    protected $fillable = [
        'email',
        'token',
        'expires_at',
    ];

    protected $casts = [
        'expires_at' => 'datetime',
    ];

    public static function generateToken($email)
    {
        $token = Str::random(6); // Puedes ajustar la longitud del token según tus necesidades
        $expiresAt = now()->addHours(1); // Define la duración del token (1 hora en este ejemplo)

        return self::create([
            'email' => $email,
            'token' => $token,
            'expires_at' => $expiresAt,
        ]);
    }
}
