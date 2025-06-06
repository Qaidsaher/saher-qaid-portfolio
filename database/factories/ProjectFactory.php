<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ProjectFactory extends Factory
{
    protected $model = \App\Models\Project::class;

    public function definition()
    {
        return [
            // 'user_id'           => \App\Models\User::factory(),
            'title'             => $this->faker->sentence,
            'short_description' => $this->faker->sentence,
            'description'       => $this->faker->paragraph,
            'date'              => $this->faker->date,
            'duration'          => $this->faker->randomElement(['1 month', '3 months', '6 months']),
            'team_size'         => $this->faker->numberBetween(1, 10),
            'type'              => $this->faker->randomElement(['web', 'mobile']),
            'technologies'      => ['Laravel', 'React', 'Tailwind CSS'],
            'category'          => ['Portfolio', 'SaaS'],
            'image'             => $this->faker->imageUrl(640, 480, 'technics'),
            
            'role'              => $this->faker->jobTitle,
            'challenge'         => $this->faker->sentence,
            'solution'          => $this->faker->sentence,
            'results'           => $this->faker->sentence,
            'client'            => $this->faker->company,
            'demo_url'          => $this->faker->url,
            'github_url'        => $this->faker->url,
        ];
    }
}
