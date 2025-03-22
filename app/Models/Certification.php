<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Certification extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'issuer',
        'date',
        'url',
        'user_id'
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
