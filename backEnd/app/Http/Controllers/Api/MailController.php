<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;
use App\Mail\TestMail;

class MailController extends Controller
{
    public function sendMail(){
        
        $details = [
            'title' => 'Correo de recuperacion de contraseña',
            'body' => 'Ejemplo',
        ];

        // Enviar el correo directamente con el contenido
        Mail::to("oscarstevanherrangonzalez@gmail.com")->send(new TestMail($details));

        return "Correo enviado con éxito";
    }
}
