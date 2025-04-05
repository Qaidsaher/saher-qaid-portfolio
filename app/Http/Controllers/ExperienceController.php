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
    /**
     * Display a listing of the resource.
     */
    // public function index()
    // {
    //     $experiences    = Experience::orderBy('period', 'desc')->get();
    //     $educations     = Education::orderBy('period', 'desc')->get();
    //     $certifications = Certification::orderBy('date', 'desc')->get();
    //     $awards         = Award::orderBy('date', 'desc')->get();

    //     return Inertia::render('experiences/index', [
    //         'experiences'    => $experiences,
    //         'educations'     => $educations,
    //         'certifications' => $certifications,
    //         'awards'         => $awards,
    //     ]);
    // }


    /**
     * Show the form for creating a new resource.
     */
    // public function create()
    // {
    //     return Inertia::render('experiences/create');
    // }


    /**
     * Store a newly created resource in storage.
     */
    // public function store(Request $request)
    // {
    //     // return response()->json($request->all());
    //     $validated = $request->validate([
    //         'title'             => 'required|string|max:255',
    //         'company'           => 'required|string|max:255',
    //         'period'            => 'required|string|max:50',
    //         'location'          => 'required|string|max:255',
    //         'description'       => 'required|string',
    //         'responsibilities'  => 'nullable|array',
    //         'achievements'      => 'nullable|array',
    //         'technologies'      => 'nullable|array',
    //     ]);

    //     // Create the experience record.
    //     $experience = Experience::create([
    //         'title'             => $validated['title'],
    //         'company'           => $validated['company'],
    //         'period'            => $validated['period'],
    //         'location'          => $validated['location'],
    //         'description'       => $validated['description'],
    //         'responsibilities'  => $validated['responsibilities'] ?? null,
    //         'achievements'      => $validated['achievements'] ?? null,
    //         'technologies'      => $validated['technologies'] ?? null,
    //     ]);

    //     return response()->json($experience);
    // }

    /**
     * Display the specified resource.
     */
    // public function show(string $id)
    // {
    //     //
    // }

    /**
     * Show the form for editing the specified resource.
     */
    // public function edit(string $id)
    // {
    //     //
    // }

    /**
     * Update the specified resource in storage.
     */
    // public function update(Request $request, string $id)
    // {
    //     //
    // }

    /**
     * Remove the specified resource from storage.
     */
    // public function destroy(string $id)
    // {
    //     //
    // }
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
