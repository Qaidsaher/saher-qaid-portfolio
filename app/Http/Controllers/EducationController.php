<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Education;

class EducationController extends Controller
{
    /**
     * Display a listing of the educations.
     */
    public function index()
    {
        $educations = Education::orderBy('id', 'desc')->get();
        return Inertia::render('admin/educations/index', [
            'educations' => $educations,
        ]);
    }

    /**
     * Show the form for creating a new education record.
     */
    public function create()
    {
        return Inertia::render('admin/educations/create');
    }

    /**
     * Store a newly created education in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'degree'       => 'required|string|max:255',
            'institution'  => 'required|string|max:255',
            'logo'         => 'nullable|image|max:2048',
            'period'       => 'nullable|string|max:255',
            'location'     => 'nullable|string|max:255',
            'description'  => 'nullable|string',
            'courses'      => 'nullable|array',
            'courses.*'    => 'string|max:255',
        ]);

        // Handle logo upload if exists
        if ($request->hasFile('logo')) {
            $validated['logo'] = $request->file('logo')->store('educations/logos', 'public');
        }

        // JSON encode courses if not null.
        $validated['courses'] = json_encode($validated['courses'] ?? []);

        Education::create($validated);

        return redirect()->route('admin.educations.index')
            ->with('success', 'Education record created successfully.');
    }

    /**
     * Display the specified education.
     */
    public function show($id)
    {
        $education = Education::findOrFail($id);
        return Inertia::render('admin/educations/show', [
            'education' => $education,
        ]);
    }

    /**
     * Show the form for editing the specified education.
     */
    public function edit($id)
    {
        $education = Education::findOrFail($id);
        return Inertia::render('admin/educations/edit', [
            'education' => $education,
        ]);
    }

    /**
     * Update the specified education in storage.
     */
    public function update(Request $request, $id)
    {
        $education = Education::findOrFail($id);

        $validated = $request->validate([
            'degree'       => 'required|string|max:255',
            'institution'  => 'required|string|max:255',
            'logo'         => 'nullable|image|max:2048',
            'period'       => 'nullable|string|max:255',
            'location'     => 'nullable|string|max:255',
            'description'  => 'nullable|string',
            'courses'      => 'nullable|array',
            'courses.*'    => 'string|max:255',
        ]);

        if ($request->hasFile('logo')) {
            $validated['logo'] = $request->file('logo')->store('educations/logos', 'public');
        }

        $validated['courses'] = json_encode($validated['courses'] ?? []);

        $education->update($validated);

        return redirect()->route('admin.educations.show', $education->id)
            ->with('success', 'Education record updated successfully.');
    }

    /**
     * Remove the specified education from storage.
     */
    public function destroy($id)
    {
        $education = Education::findOrFail($id);
        $education->delete();

        return redirect()->route('admin.educations.index')
            ->with('success', 'Education record deleted successfully.');
    }
}
