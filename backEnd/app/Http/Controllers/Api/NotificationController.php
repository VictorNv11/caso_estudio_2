<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Pusher\Pusher;
use App\Models\Notifications;

class NotificationController extends Controller
{
    public function notify()
    {

            $notifications= Notifications::all();
            return  $notifications;
 
    }
}
