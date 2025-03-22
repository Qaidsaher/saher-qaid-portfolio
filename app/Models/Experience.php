<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Experience extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'company', 'logo', 'period', 'location',
        'description', 'responsibilities', 'achievements', 'technologies','user_id'
    ];

    protected $casts = [
        'responsibilities' => 'array',
        'achievements' => 'array',
        'technologies' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
