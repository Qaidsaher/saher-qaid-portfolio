<?php

use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\ExperienceController;
use App\Models\Experience;
use App\Models\Project;
use App\Models\Service;
use App\Models\Skill;
use App\Models\Testimonial;

Route::resource('/articles', ArticleController::class);
Route::resource( '/projects',ProjectController::class);

Route::get('/', function () {
     // Stats array
     $stats = [
        ['value' => '3+', 'label' => 'Years Experience'],
        ['value' => '50+', 'label' => 'Projects Completed'],
        ['value' => '30+', 'label' => 'Happy Clients'],
        ['value' => '10+', 'label' => 'Awards Received'],
    ];
    $services = [
        [
            'title' => 'Web Development',
            'description' => 'I build responsive, high-performance websites and web applications using modern technologies and best practices.',
            'icon' => 'code', // identifier for front-end icon rendering
            'link' => '/services/web-development',
        ],
        [
            'title' => 'Mobile App Development',
            'description' => 'I create cross-platform mobile applications that provide seamless user experiences across all devices.',
            'icon' => 'smartphone',
            'link' => '/services/mobile-development',
        ],
        [
            'title' => 'UI/UX Design',
            'description' => 'I design intuitive user interfaces and experiences that are both aesthetically pleasing and highly functional.',
            'icon' => 'palette',
            'link' => '/services/ui-ux-design',
        ],
    ];

    return Inertia::render('index',[
        'stats' => $stats, // e.g. from your Stats model or defined array
        'services' => $services,
        'featuredProjects' => Project::orderBy('created_at', 'desc')->get()->take(6),
        'frontendSkills' => Skill::where('type', 'technical')->where('category', 'frontend')->get()->take(4),
        'backendSkills' => Skill::where('type', 'technical')->where('category', 'backend')->get()->take(4),
        'otherSkills' => Skill::where('type', '=', 'tools')->get()->take(4),// or however you want to group them
        'workExperience' => Experience::orderBy('period', 'desc')->get()->take(4),
        'testimonials' => Testimonial::where('user_id','=',2)->get()->take(3),
    ]);
})->name('home');
// Route::get('/index', function () {
//     return Inertia::render('home');
// })->name(name: 'index');
// Route::get('/projects', function () {
//     return Inertia::render(component: 'projects');
// })->name(name: 'projects');
Route::get('/skills', function () {
    $skills = Skill::all();
    return Inertia::render('skills/index',[
        'skills'=>$skills
    ]);
})->name(name: '/skills');

 Route::get('/contact', function () {
    return Inertia::render(component: 'contact/index');
})->name(name: 'contact');

Route::get('/experience', [ExperienceController::class,'index'])->name(name: 'experience');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});







Route::get('/saherqaidseeders', [ExperienceController::class,'saher'])->name(name: 'experience');






require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
