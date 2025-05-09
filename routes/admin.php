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
use App\Http\Controllers\FeatureController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\ProcessController;

Route::middleware(['auth', 'admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        // Dashboard Route
        Route::get('dashboard', [AdminController::class, 'index'])->name('dashboard');

        Route::resource('educations', EducationController::class);
        Route::resource('articles', ArticleController::class);
        Route::resource('projects', ProjectController::class);
        Route::patch('projects/{project}/update-image', [ProjectController::class, 'updateMainImage'])
        ->name('projects.image.updateMain');
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
        Route::get('testimonials', [TestimonialsController::class, 'index'])->name('testimonials.index');
        Route::post('testimonials', [TestimonialsController::class, 'store']);
        Route::patch('testimonials/{testimonial}', [TestimonialsController::class, 'update']);
        Route::delete('testimonials/{testimonial}', [TestimonialsController::class, 'destroy']);

        // Skills Routes
        Route::get('skills', [AdminController::class, 'skills'])->name('skills.index');
        Route::post('skills', [AdminController::class, 'storeSkill'])->name('skills.store');
        Route::put('skills/{id}', [AdminController::class, 'updateSkill'])->name('skills.update');
        Route::delete('skills/{id}', [AdminController::class, 'destroySkill'])->name('skills.destroy');



        Route::get('projects/{project}/features', [FeatureController::class, 'index'])
            ->name('projects.features.index');
        /**
         * Store a new Feature for a specific Project.
         * Method: POST
         * URI: /admin/projects/{project}/features
         * Name: admin.projects.features.store
         */
        Route::post('projects/{project}/features', [FeatureController::class, 'store'])
            ->name('projects.features.store');

        /**
         * Update a specific Feature. (Shallow Route)
         * Method: PUT (or PATCH)
         * URI: /admin/features/{feature}
         * Name: admin.features.update
         */
        Route::put('projects/features/{feature}', [FeatureController::class, 'update']) // Using PUT, PATCH is also valid Route::patch(...)
            ->name('projects.features.update');

        /**
         * Delete a specific Feature. (Shallow Route)
         * Method: DELETE
         * URI: /admin/features/{feature}
         * Name: admin.features.destroy
         */
        Route::delete('projects/features/{feature}', [FeatureController::class, 'destroy'])
            ->name('projects.features.destroy');


        // --- Project Galleries Routes (Explicitly Defined) ---
        Route::get('projects/{project}/galleries', [GalleryController::class, 'index'])
        ->name('projects.galleries.index');
        /**
         * Store new Gallery item(s) for a specific Project.
         * Method: POST
         * URI: /admin/projects/{project}/galleries
         * Name: admin.projects.galleries.store
         */
        Route::post('projects/{project}/galleries', [GalleryController::class, 'store'])
            ->name('projects.galleries.store');

        /**
         * Update a specific Gallery item (e.g., caption). (Shallow Route)
         * Method: PUT (or PATCH)
         * URI: /admin/galleries/{gallery}
         * Name: admin.galleries.update
         */
        Route::put('projects/galleries/{gallery}', [GalleryController::class, 'update'])
            ->name('projects.galleries.update');

        /**
         * Delete a specific Gallery item. (Shallow Route)
         * Method: DELETE
         * URI: /admin/galleries/{gallery}
         * Name: admin.galleries.destroy
         */
        Route::delete('projects/galleries/{gallery}', [GalleryController::class, 'destroy'])
            ->name('projects.galleries.destroy');


        // --- Project Processes Routes (Explicitly Defined) ---

        /**
         * Store a new Process for a specific Project.
         * Method: POST
         * URI: /admin/projects/{project}/processes
         * Name: admin.projects.processes.store
         */
        Route::post('projects/{project}/processes', [ProcessController::class, 'store'])
            ->name('projects.processes.store');

        /**
         * Update a specific Process. (Shallow Route)
         * Method: PUT (or PATCH)
         * URI: /admin/processes/{process}
         * Name: admin.processes.update
         */
        Route::put('projects/processes/{process}', [ProcessController::class, 'update'])
            ->name('projects.processes.update');

        /**
         * Delete a specific Process. (Shallow Route)
         * Method: DELETE
         * URI: /admin/processes/{process}
         * Name: admin.processes.destroy
         */
        Route::delete('projects/processes/{process}', [ProcessController::class, 'destroy'])
            ->name('projects.processes.destroy');

        // --- End Nested Routes ---

    });
