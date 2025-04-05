<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'short_description',
        'detailed_description',
        'additional_info',
        'icon',
        'features',
        'technologies',
        'gallery',
    ];

    // Automatically cast JSON fields to arrays
    protected $casts = [
        'features' => 'array',
        'technologies' => 'array',
        'gallery' => 'array',
    ];
}
