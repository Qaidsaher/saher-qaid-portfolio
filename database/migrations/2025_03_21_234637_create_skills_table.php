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
        Schema::create('skills', function (Blueprint $table) {
            $table->id();
             $table->unsignedBigInteger('user_id')->nullable(); // Optional owner
             $table->string('name');
             $table->integer('level')->nullable();
            $table->enum('type', ['technical', 'tools', 'soft']);
             $table->text('description')->nullable();
             $table->string('category')->nullable();
             $table->timestamps();

             $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('skills');
    }
};
