<?php

use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ServicesController;
use App\Models\Article;
use App\Models\Certification;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\ExperienceController;
use App\Http\Controllers\SkillController;
use App\Models\Experience;
use App\Models\Project;

use App\Models\Skill;
use App\Models\Testimonial;

use App\Models\Award;
use App\Models\Education;
use App\Models\Service;
use App\Models\Website;

Route::get('/projects', function () {
    $projects = Project::all();
    return Inertia::render('projects/index', compact('projects'));
})->name('projects.index');

Route::get('/projects/{project}', function (Project $project) {
    return Inertia::render('projects/show', compact('project'));
})->name('projects.show');

Route::get('/experiences', function (Experience $experience) {
    $experiences    = Experience::orderBy('period', 'desc')->get();
    $educations     = Education::orderBy('period', 'desc')->get();
    $certifications = Certification::orderBy('date', 'desc')->get();
    $awards         = Award::orderBy('date', 'desc')->get();
    return Inertia::render('experiences/index', [
        'experiences'    => $experiences,
        'educations'     => $educations,
        'certifications' => $certifications,
        'awards'         => $awards,
    ]);
})->name('experiences.index');
// Skills: List all skills (index)
Route::get('/skills', function () {
    $skills = Skill::all();
    return Inertia::render('skills/index', compact('skills'));
})->name('skills.index');

// Articles: List all articles and view a single article
Route::get('/articles', function () {
    $articles = Article::all();
    return Inertia::render('articles/index', compact('articles'));
})->name('articles.index');

Route::get('/articles/{article}', function (Article $article) {
    return Inertia::render('articles/show', compact('article'));
})->name('articles.show');
Route::get('/services', function () {
    // Define an array with 15 services. Each service has an id, title, description, icon identifier, and link.
    $services = Service::all();

    return Inertia::render('services/index', [
        'services' => $services,
    ]);
})->name('services.index');

Route::get('/services/{id}', function ($id) {
    // In a real app, you'd query your database.
    // For demo purposes, we use the same array and filter by id.
    $relatedWorks = [
        // Example static data - replace with dynamic DB query later
        ['id' => 101, 'title' => 'Corporate Website', 'image' => 'https://via.placeholder.com/400x300?text=Corporate+Site', 'link' => '#'],
        ['id' => 102, 'title' => 'E-commerce Platform', 'image' => 'https://via.placeholder.com/400x300?text=E-commerce', 'link' => '#'],
        ['id' => 103, 'title' => 'Portfolio Website', 'image' => 'https://via.placeholder.com/400x300?text=Portfolio', 'link' => '#'],
    ];
    $service = Service::find($id);
    if (!$service) {
        abort(404);
    }

    return Inertia::render('services/show', [
        'service' => $service,
        'relatedWorks' => $relatedWorks
    ]);
})->name('services.show');

Route::get('/', function () {
    // Stats array
    $stats = [
        ['value' => (Website::first())->number_of_experiences . '+', 'label' => 'Years Experience'],
        ['value' => Project::count() . '+', 'label' => 'Projects Completed'],
        ['value' => Testimonial::count() . '+', 'label' => 'Happy Clients'],
        ['value' => Award::Count() . '+', 'label' => 'Awards Received'],
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

    $hereInformation = Website::first();
    return Inertia::render('index', [
        'hereInformation'  => $hereInformation,
        'stats'            => $stats,
        'services'         => $services,
        'featuredProjects' => Project::orderBy('created_at', 'desc')->get()->take(6),
        'frontendSkills'   => Skill::where('type', 'technical')->where('category', 'frontend')->get()->take(4),
        'backendSkills'    => Skill::where('type', 'technical')->where('category', 'backend')->get()->take(4),
        'otherSkills'      => Skill::where('type', '=', 'tools')->get()->take(4),
        'workExperience'   => Experience::orderBy('period', 'desc')->get()->take(4),
        'testimonials'     => Testimonial::get()->take(3),

    ]);
});


Route::get('/contact', function () {
    return Inertia::render(component: 'contact/index');
})->name(name: 'contact');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return redirect()->route('admin.dashboard');
    })->name('dashboard');
});




// Apply authentication as needed

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/admin.php';
