<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Process extends Model
{
    /** @use HasFactory<\Database\Factories\ProcessFactory> */
    use HasFactory;

    protected $fillable = ['project_id', 'title', 'description', 'steps'];

    protected $casts = [
        'steps' => 'array',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
