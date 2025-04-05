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
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // e.g., "Web Development"
            $table->string('short_description'); // A brief description
            $table->text('detailed_description'); // Detailed description text
            $table->text('additional_info')->nullable(); // Additional information (optional)
            $table->string('icon'); // Icon identifier (e.g., "code")
            // Store features as a JSON array
            $table->json('features')->nullable();
            // Store technologies as a JSON array
            $table->json('technologies')->nullable();
            // Store gallery images (URLs) as a JSON array
            $table->json('gallery')->nullable();
            $table->timestamps(); // This adds both created_at and updated_at

            // $table->unsignedBigInteger('user_id');
            // $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
