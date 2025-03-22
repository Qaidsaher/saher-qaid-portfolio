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
        Schema::create('testimonials', function (Blueprint $table) {
            $table->id();
             $table->unsignedBigInteger('user_id')->nullable(); // Optional recipient
             $table->string('name');
             $table->string('role')->nullable();
             $table->string('company')->nullable();
             $table->string('avatar')->nullable();
             $table->text('text')->nullable();
             $table->timestamps();

             $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('testimonials');
    }
};
