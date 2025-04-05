<?php

use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ServicesController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\ExperienceController;

use App\Http\Controllers\AdminController;
use App\Http\Controllers\EducationController;
use App\Http\Controllers\TestimonialsController;
use App\Http\Controllers\WebsiteController;
// use App\Http\Controllers\EducationController;
use App\Http\Controllers\CertificationController;
use App\Http\Controllers\AwardController;

Route::middleware(['auth','admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        // Dashboard Route
        Route::get('dashboard', [AdminController::class, 'index'])->name('dashboard');

        Route::resource('educations', EducationController::class);
        Route::resource('articles', ArticleController::class);
        Route::resource('projects', ProjectController::class);
        Route::resource('certifications', CertificationController::class);
        Route::resource('awards', AwardController::class);
        Route::resource('experiences', ExperienceController::class);

        Route::get('website', [WebsiteController::class, 'index'])->name('website.index');
        Route::get('website/edit', [WebsiteController::class, 'edit'])->name('website.edit');
        Route::put('website', [WebsiteController::class, 'update'])->name('website.update');
        Route::post('website/update-image', [WebsiteController::class, 'updateImage'])->name('website.updateImage');

        Route::resource('services', ServicesController::class);
        // Route::post('services', [ServicesController::class, 'store']);
        // Route::patch('services/{service}', [ServicesController::class, 'update']);
        // Route::delete('services/{service}', [ServicesController::class, 'destroy']);

        // Testimonials Routes
        Route::get('testimonials', [TestimonialsController::class, 'index']);
        Route::post('testimonials', [TestimonialsController::class, 'store']);
        Route::patch('testimonials/{testimonial}', [TestimonialsController::class, 'update']);
        Route::delete('testimonials/{testimonial}', [TestimonialsController::class, 'destroy']);

        // Skills Routes
        Route::get('skills', [AdminController::class, 'skills'])->name('skills.index');
        Route::post('skills', [AdminController::class, 'storeSkill'])->name('skills.store');
        Route::put('skills/{id}', [AdminController::class, 'updateSkill'])->name('skills.update');
        Route::delete('skills/{id}', [AdminController::class, 'destroySkill'])->name('skills.destroy');
    });
