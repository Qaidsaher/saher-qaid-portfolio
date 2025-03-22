<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'avatar',
        'about',
        'bio',
        'phone_number',
        'links',
        'education',
        'availability',
        'whatsapp_number',
        'job_meta',
        'awards',
        'awards_count',
        'theme',
        'theme_mode',
        'seo_keywords',
    ];

    protected $casts = [
        'links'       => 'array',
        'education'   => 'array',
        'job_meta'    => 'array',
        'awards'      => 'array',
        'seo_keywords' => 'array',
    ];
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    // Example relationships (if needed):
    public function projects()
    {
        return $this->hasMany(Project::class);
    }

    public function articles()
    {
        return $this->hasMany(Article::class);
    }

    public function experiences()
    {
        return $this->hasMany(Experience::class);
    }

    public function testimonials()
    {
        return $this->hasMany(Testimonial::class);
    }

    public function services()
    {
        return $this->hasMany(Service::class);
    }

    public function skills()
    {
        return $this->hasMany(Skill::class);
    }
}
