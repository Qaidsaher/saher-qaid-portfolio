<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ServiceFactory extends Factory
{
    protected $model = \App\Models\Service::class;

    public function definition()
    {
        return [
            'user_id'    => \App\Models\User::factory(),
            'title'      => $this->faker->sentence,
            'description'=> $this->faker->paragraph,
            'icon'       => $this->faker->word,
            'link'       => $this->faker->url,
        ];
    }
}
