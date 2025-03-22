<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
            'avatar'          => $this->faker->imageUrl(200, 200, 'people'),
            'about'           => $this->faker->sentence,
            'bio'             => $this->faker->paragraph,
            'phone_number'    => $this->faker->phoneNumber,
            'links'           => [
                ['name' => 'GitHub', 'url' => 'https://github.com/' . $this->faker->userName, 'icon' => 'github-icon'],
                ['name' => 'LinkedIn', 'url' => 'https://linkedin.com/in/' . $this->faker->userName, 'icon' => 'linkedin-icon']
            ],

            'availability'    => 'Available for freelance projects',
            'whatsapp_number' => $this->faker->e164PhoneNumber,
            // job_meta includes job name and achievements
            'job_meta'        => [
                'job_name'     => $this->faker->jobTitle,
                'achievements' => [
                    'Increased revenue by 30%',
                    'Led a team of 10 developers',
                ],
            ],
            // awards as an array of awards details and count
            
            'awards_count'    => 2,
            'theme'           => $this->faker->randomElement(['default', 'modern', 'classic']),
            'theme_mode'      => $this->faker->randomElement(['light', 'dark']),
            'seo_keywords'    => ['Laravel', 'Developer', 'Portfolio', 'Freelance'],
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn(array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
