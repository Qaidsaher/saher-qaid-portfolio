<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ExperienceFactory extends Factory
{
    protected $model = \App\Models\Experience::class;

    public function definition()
    {
        return [
          
            'title'        => $this->faker->jobTitle,
            'company'      => $this->faker->company,
            'period'       => $this->faker->year.' - '.$this->faker->year,
            'location'     => $this->faker->city,
            'description'  => $this->faker->paragraph,
            'technologies' => ['Laravel', 'Vue.js'],
        ];
    }
}
