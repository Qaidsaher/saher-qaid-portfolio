<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Education;
use App\Models\User;
use App\Models\Project;
use App\Models\Article;
use App\Models\Award;
use App\Models\Certification;
use App\Models\Experience;
use App\Models\Testimonial;
use App\Models\Service;
use App\Models\Skill;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class ExperienceController extends Controller
{

    public function index()
    {
        $experiences = Experience::all();
        return Inertia::render('admin/experiences/index', compact('experiences'));
    }

    public function create()
    {
        return Inertia::render('admin/experiences/create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title'             => 'required|string|max:255',
            'company'           => 'required|string|max:255',
            'period'            => 'required|string|max:255',
            'location'          => 'nullable|string|max:255',
            'description'       => 'nullable|string',
            'responsibilities'  => 'nullable|array',
            'achievements'      => 'nullable|array',
            'technologies'      => 'nullable|array',
        ]);


        Experience::create($data);

        return redirect()->route('admin.experiences.index')
            ->with('success', 'Experience created successfully.');
    }

    public function show(Experience $experience)
    {
        return Inertia::render('admin/experiences/show', compact('experience'));
    }

    public function edit(Experience $experience)
    {
        return Inertia::render('admin/experiences/edit', compact('experience'));
    }

    public function update(Request $request, Experience $experience)
    {
        $data = $request->validate([
            'title'             => 'required|string|max:255',
            'company'           => 'required|string|max:255',
            'period'            => 'required|string|max:255',
            'location'          => 'nullable|string|max:255',
            'description'       => 'nullable|string',
            'responsibilities'  => 'nullable|array',
            'achievements'      => 'nullable|array',
            'technologies'      => 'nullable|array',
        ]);

        $experience->update($data);

        return redirect()->route('admin.experiences.index')
            ->with('success', 'Experience updated successfully.');
    }

    public function destroy(Experience $experience)
    {
        $experience->delete();

        return redirect()->route('admin.experiences.index')
            ->with('success', 'Experience deleted successfully.');
    }
}
