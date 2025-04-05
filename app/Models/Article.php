<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'excerpt',
        'image',
        'publish_date',
        'readTime',
        'categories',
    ];

    protected $casts = [
        'categories' => 'array',
    ];


}
