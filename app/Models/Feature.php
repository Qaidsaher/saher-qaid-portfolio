<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Feature extends Model
{
    use HasFactory;

    protected $fillable = ['project_id', 'title', 'description', 'icon'];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
