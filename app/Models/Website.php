<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Website extends Model
{
    use HasFactory;

    protected $fillable = [
        'websiteName',
        'badge',
        'heroTitle',
        'heroDescription',
        'ctaPrimaryText',
        'ctaPrimaryLink',
        'ctaSecondaryText',
        'ctaSecondaryLink',
        'heroImageSrc',
        'availableForProjectsText',
        'experienceText',
        'socialLinks',
        'status',
        'responseTime',
        'preferredProjects',
        'email',
        'phone',
        'location',
        'number_of_experiences',
    ];

    protected $casts = [
        'socialLinks' => 'array',
    ];
}
