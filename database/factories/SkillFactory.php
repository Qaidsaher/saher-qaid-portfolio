<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class SkillFactory extends Factory
{
    protected $model = \App\Models\Skill::class;

    public function definition()
    {
        return [
            'user_id'    => \App\Models\User::factory(),
            'name'       => $this->faker->word,
            'level'      => $this->faker->numberBetween(1, 10),
            'type'       => $this->faker->randomElement(['technical', 'tools', 'soft']),
            'description'=> $this->faker->sentence,
            'category'   => $this->faker->randomElement(['frontend', 'backend', 'AI', 'language']),
        ];
    }
}
