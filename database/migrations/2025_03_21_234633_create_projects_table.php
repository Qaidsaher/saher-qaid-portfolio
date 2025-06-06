<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
             $table->string('title');
             $table->string('short_description')->nullable();
             $table->text('description')->nullable();
             $table->string('date')->nullable();
             $table->string('duration')->nullable();
             $table->integer('team_size')->nullable();
             $table->string('type')->nullable();
             // JSON columns for array data
             $table->json('technologies')->nullable();
             // Depending on your needs, you can store one category as a string or multiple as JSON:
             $table->json('category')->nullable();
             $table->string('image')->nullable();
             $table->string('role')->nullable();
             $table->text('challenge')->nullable();
             $table->text('solution')->nullable();
             $table->text('results')->nullable();
             $table->string('client')->nullable();
             $table->string('demo_url')->nullable();
             $table->string('github_url')->nullable();
             $table->timestamps();

            //  $table->unsignedBigInteger('user_id');
            //  $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
