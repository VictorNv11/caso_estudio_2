<?php

namespace App\Listeners;

use App\Events\UserRegistered;
use App\Notifications\NewUserRegisteredNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendUserRegistrationNotification
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(UserRegistered $event): void
    {
        $user = $event->user;

    }
}
