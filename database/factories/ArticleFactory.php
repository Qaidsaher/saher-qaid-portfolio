<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ArticleFactory extends Factory
{
    protected $model = \App\Models\Article::class;

    public function definition()
    {
        return [
           
            'title'       => $this->faker->sentence,
            'excerpt'     => $this->faker->paragraph,
            'image'       => $this->faker->imageUrl(640, 480, 'cats'),
            'publish_date'=> $this->faker->date,
            'readTime'    => $this->faker->numberBetween(1, 20),
            'categories'  => ['News', 'Tutorial'],
        ];
    }
}
