<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NotificationCompany extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'message',
        'read'
    ];

    protected $casts = [
        'read' => 'boolean',
    ];

    public function company() {
        return $this->belongsTo(Company::class);
    }
}
