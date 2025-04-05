<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('websites', function (Blueprint $table) {
            $table->id();
            $table->string('websiteName')->default('SaherQ Dev');
            $table->string('badge')->default('Full-Stack Developer');
            $table->string('heroTitle')->default('Crafting Smart, Scalable Web and AI Solutions');
            $table->text('heroDescription')->default('I build innovative web applications and AI-driven solutions that combine elegant design with powerful functionality, showcasing expertise in multiple technologies.');
            $table->string('ctaPrimaryText')->default('View My Work');
            $table->string('ctaPrimaryLink')->default('/projects');
            $table->string('ctaSecondaryText')->default('Get in Touch');
            $table->string('ctaSecondaryLink')->default('/contact');
            $table->string('heroImageSrc')->default('/placeholder.svg?height=600&width=600');
            $table->string('availableForProjectsText')->default('Available for Projects');
            $table->string('experienceText')->default('3+ Years Experience');
            $table->json('socialLinks')->nullable();
            $table->string('status')->default('Open to Offers');
            $table->string('responseTime')->default('Within 24 hours');
            $table->string('preferredProjects')->default('Web & Mobile Apps');
            $table->string('email')->default('saherqaid2020@gmail.com');
            $table->string('phone')->default('+1 (555) 123-4567');
            $table->string('location')->default('San Francisco, CA');
            $table->integer('number_of_experiences')->default(3);
            $table->timestamps();
        });

        // Insert a default row into the websites table.
        DB::table('websites')->insert([
            'websiteName'              => 'SaherQ Dev',
            'badge'                    => 'Full-Stack Developer',
            'heroTitle'                => 'Crafting Smart, Scalable Web and AI Solutions',
            'heroDescription'          => 'I build innovative web applications and AI-driven solutions that combine elegant design with powerful functionality, showcasing expertise in multiple technologies.',
            'ctaPrimaryText'           => 'View My Work',
            'ctaPrimaryLink'           => '/projects',
            'ctaSecondaryText'         => 'Get in Touch',
            'ctaSecondaryLink'         => '/contact',
            'heroImageSrc'             => '/placeholder.svg?height=600&width=600',
            'availableForProjectsText' => 'Available for Projects',
            'experienceText'           => '3+ Years Experience',
            'socialLinks'              => json_encode([
                'github'   => 'https://github.com/qaidsaher',
                'linkedin' => 'https://www.linkedin.com/in/saher-qaid-470735261/',
                'twitter'  => 'https://twitter.com',
                'email'    => 'mailto:saherqaid@gmail.com',
                'whatsapp' => 'https://wa.me/message/AYZMMKVEQJOSN1',
            ]),
            'status'                   => 'Open to Offers',
            'responseTime'             => 'Within 24 hours',
            'preferredProjects'        => 'Web & Mobile Apps with ai ',
            'email'                    => 'saherqaid2020@gmail.com',
            'phone'                    => '+967 712238264',
            'location'                 => 'Yemen,IBB',
            'number_of_experiences'    => 3,
            'created_at'               => now(),
            'updated_at'               => now(),
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('websites');
    }
};
