<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewUserRegisteredNotification extends Notification implements ShouldQueue
{
    use Queueable;



    protected $user;

    /**
     * Create a new notification instance.
     */
    public function __construct($user)
    {
        $this->user = $user;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return $notifiable->prefers_sms ? ['vonage'] : ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {

        $url = url('/users/'.$this->user->id);

        return (new MailMessage)
        ->error()
        ->subject('Invoice Payment Failed')
        ->line('...')
        ->subject('¡Nuevo usuario registrado!')
        ->line('Se ha registrado un nuevo usuario en la plataforma.')
        ->line('Nombre: ' . $this->user->name)
        ->line('Correo electrónico: ' . $this->user->email)
        ->action('Ver usuario', $url)
        ->line('¡Gracias!');
        
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
