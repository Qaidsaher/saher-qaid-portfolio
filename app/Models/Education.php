<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    /** @use HasFactory<\Database\Factories\EducationFactory> */
    use HasFactory;
    use HasFactory;

    protected $fillable = [

        'degree',
        'institution',
        'logo',
        'period',
        'location',
        'description',
        'courses',

    ];

    protected $casts = [
        'courses' => 'array',
    ];

}
