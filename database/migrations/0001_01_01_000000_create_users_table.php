<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('avatar')->nullable();
            $table->text('about')->nullable();
            $table->text('bio')->nullable();
            $table->string('phone_number')->nullable();
            // JSON column for links
            $table->json('links')->nullable();
            $table->string('availability')->nullable();

            // New extra fields
            $table->string('whatsapp_number')->nullable();
            $table->json('job_meta')->nullable();
            $table->integer('awards_count')->nullable();
            $table->string('theme')->nullable();
            $table->string('theme_mode')->nullable();
            $table->json('seo_keywords')->nullable();

            // NEW: Role column added and set default value to "user"
            $table->string('role')->default('user');

            $table->rememberToken();
            $table->timestamps();
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });

        // Insert a default admin user
        DB::table('users')->insert([
            'name' => 'saher qaid',
            'email' => 'saherqaid2020@gmail.com',
            'password' => Hash::make('admin.saherqaid2020'), // Replace 'secret' with a secure default.
            'role' => 'admin',
            'phone_number' => '+967712238264',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sessions');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('users');
    }
};
