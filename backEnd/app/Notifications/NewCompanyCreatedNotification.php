<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewCompanyCreatedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $company;

    /**
     * Create a new notification instance.
     */
    public function __construct($company)
    {
        $this->company = $company;
    }
    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $url = url('api/companies/'.$this->company->id);

        return (new MailMessage)
            ->error()
            ->subject('¡Nueva compañía registrada!')
            ->line('Se ha registrado una nueva compañía en la plataforma.')
            ->line('Nombre: ' . $this->company->name)
            ->action('Ver compañía', $url)
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
            'company_id' => $this->company->id,
            'company_name' => $this->company->name,
        ];
    }
}
