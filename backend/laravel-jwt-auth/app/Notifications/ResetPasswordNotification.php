<?php
namespace App\Notifications;

use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class ResetPasswordNotification extends Notification
{
    public $token;
    public $frontendUrl;

    public function __construct($token)
    {
        $this->token = $token;
        // set frontend URL - change to your React app reset route
        $this->frontendUrl = config('app.frontend_url', env('FRONTEND_URL', 'http://localhost:5173'));
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        $url = $this->frontendUrl . '/reset-password?token=' . $this->token . '&email=' . urlencode($notifiable->email);

        return (new MailMessage)
            ->subject('Reset your password')
            ->line('You asked to reset your password. Click the button below to proceed.')
            ->action('Reset password', $url)
            ->line('If you did not request a password reset, no further action is required.');
    }
}