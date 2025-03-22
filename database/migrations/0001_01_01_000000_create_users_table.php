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
            // JSON columns for links and education data
            $table->json('links')->nullable();       // e.g., social accounts, GitHub, LinkedIn
            $table->string('availability')->nullable(); // e.g., "Available for freelance projects"

            // New extra fields
            $table->string('whatsapp_number')->nullable();
            // job_meta will hold job name, achievements, and any meta keys as JSON
            $table->json('job_meta')->nullable();
            // awards as JSON (an array of award details) and a numeric count
            $table->integer('awards_count')->nullable();
            // Theme preferences for UI and SEO keywords as JSON
            $table->string('theme')->nullable();
            $table->string('theme_mode')->nullable();
            $table->json('seo_keywords')->nullable();

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
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
