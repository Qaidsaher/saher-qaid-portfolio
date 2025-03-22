<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'short_description',
        'description',
        'date',
        'duration',
        'team_size',
        'type',
        'technologies',
        'category',
        'image',
        'features',
        'process',
        'gallery',
        'role',
        'challenge',
        'solution',
        'results',
        'client',
        'demo_url',
        'github_url',
    ];

    protected $casts = [
        'technologies' => 'array',
        'category'     => 'array',   // Change to 'string' if you want a single value
        'features'     => 'array',
        'process'      => 'array',
        'gallery'      => 'array',
    ];

    // Optional relationship if a project belongs to a user
  
}
