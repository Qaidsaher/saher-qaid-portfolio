<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class TestimonialFactory extends Factory
{
    protected $model = \App\Models\Testimonial::class;

    public function definition()
    {
        return [
            'user_id' => \App\Models\User::factory(),
            'name'    => $this->faker->name,
            'role'    => $this->faker->jobTitle,
            'company' => $this->faker->company,
            'avatar'  => $this->faker->imageUrl(100, 100, 'people'),
            'text'    => $this->faker->paragraph,
        ];
    }
}
