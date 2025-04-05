<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Project;

class ProjectController extends Controller
{
    /**
     * Display a listing of the projects.
     */
    public function index()
    {
        // Retrieve all projects.
        $projects = Project::get();

        return Inertia::render('admin/projects/index', [
            'projects' => $projects,
        ]);
    }

    /**
     * Show the form for creating a new project.
     */
    public function create()
    {
        return Inertia::render('admin/projects/create');
    }

    /**
     * Store a newly created project in storage.
     */
    public function store(Request $request)
    {
        // Validate the incoming data.
        $validated = $request->validate([
            'title'             => 'required|string|max:255',
            'short_description' => 'required|string|max:255',
            'description'       => 'required|string',
            'date'              => 'required|date',
            'period'            => 'nullable|string|max:255',
            'duration'          => 'nullable|string|max:255',
            'team_size'         => 'nullable|string|max:255',
            'type'              => 'nullable|string|max:255',
            'technologies'      => 'nullable|array',
            'technologies.*'    => 'string',
            'category'          => 'nullable|array',
            'category.*'        => 'string',
            'challenge'         => 'nullable|string',
            'solution'          => 'nullable|string',
            'results'           => 'nullable|string',
            'client'            => 'nullable|string|max:255',
            'demo_url'          => 'nullable|url',
            'github_url'        => 'nullable|url',
            'image'             => 'nullable|image|max:2048',
            'gallery'           => 'nullable|array',
            'gallery.*.file'    => 'nullable|image|max:2048',
            'gallery.*.caption' => 'nullable|string|max:255',
            'features'          => 'nullable|array',
            'features.*.name'   => 'nullable|string|max:255',
            'features.*.description' => 'nullable|string',
            'process'           => 'nullable|array',
            'process.*.title'   => 'nullable|string|max:255',
            'process.*.description' => 'nullable|string',
        ]);

        // Process main image.
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('projects', 'public');
            $validated['image'] = $imagePath;
        }

        // Process gallery images.
        if (isset($validated['gallery']) && is_array($validated['gallery'])) {
            foreach ($validated['gallery'] as $key => $galleryItem) {
                if ($request->hasFile("gallery.$key.file")) {
                    $filePath = $request->file("gallery.$key.file")->store('projects/gallery', 'public');
                    $validated['gallery'][$key]['file'] = $filePath;
                }
            }
        }

        // If your Project model casts these as arrays, you can assign directly.
        // Otherwise, encode them as JSON:
        $validated['technologies'] = json_encode($validated['technologies'] ?? []);
        $validated['category'] = json_encode($validated['category'] ?? []);
        $validated['gallery'] = json_encode($validated['gallery'] ?? []);
        $validated['features'] = json_encode($validated['features'] ?? []);
        $validated['process'] = json_encode($validated['process'] ?? []);

        // Create the project record.
        $project = Project::create($validated);

        return redirect()->route('admin.projects.show', $project->id)
                         ->with('success', 'Project created successfully.');
    }

    /**
     * Display the specified project.
     */
    public function show(string $id)
    {
        // Retrieve the current project.
        $project = Project::findOrFail($id);

        // Retrieve all projects ordered by ID.
        $projects = Project::orderBy('id', 'asc')->get();

        // Determine the current index.
        $currentIndex = $projects->search(function ($p) use ($project) {
            return $p->id === $project->id;
        });

        // Compute previous and next projects.
        $prevProject = $currentIndex > 0 ? $projects[$currentIndex - 1] : null;
        $nextProject = $currentIndex < $projects->count() - 1 ? $projects[$currentIndex + 1] : null;

        return Inertia::render('admin/projects/show', [
            'project'     => $project,
            'projects'    => $projects,
            'prevProject' => $prevProject,
            'nextProject' => $nextProject,
        ]);
    }

    /**
     * Show the form for editing the specified project.
     */
    public function edit(string $id)
    {
        $project = Project::findOrFail($id);

        return Inertia::render('admin/projects/edit', [
            'project' => $project,
        ]);
    }

    /**
     * Update the specified project in storage.
     */
    public function update(Request $request, string $id)
    {
        $project = Project::findOrFail($id);

        $validated = $request->validate([
            'title'             => 'required|string|max:255',
            'short_description' => 'required|string|max:255',
            'description'       => 'required|string',
            'date'              => 'required|date',
            'period'            => 'nullable|string|max:255',
            'duration'          => 'nullable|string|max:255',
            'team_size'         => 'nullable|string|max:255',
            'type'              => 'nullable|string|max:255',
            'technologies'      => 'nullable|array',
            'technologies.*'    => 'string',
            'category'          => 'nullable|array',
            'category.*'        => 'string',
            'challenge'         => 'nullable|string',
            'solution'          => 'nullable|string',
            'results'           => 'nullable|string',
            'client'            => 'nullable|string|max:255',
            'demo_url'          => 'nullable|url',
            'github_url'        => 'nullable|url',
            'image'             => 'nullable|image|max:2048',
            'gallery'           => 'nullable|array',
            'gallery.*.file'    => 'nullable|image|max:2048',
            'gallery.*.caption' => 'nullable|string|max:255',
            'features'          => 'nullable|array',
            'features.*.name'   => 'nullable|string|max:255',
            'features.*.description' => 'nullable|string',
            'process'           => 'nullable|array',
            'process.*.title'   => 'nullable|string|max:255',
            'process.*.description' => 'nullable|string',
        ]);

        // Process main image.
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('projects', 'public');
            $validated['image'] = $imagePath;
        }

        // Process gallery images.
        if (isset($validated['gallery']) && is_array($validated['gallery'])) {
            foreach ($validated['gallery'] as $key => $galleryItem) {
                if ($request->hasFile("gallery.$key.file")) {
                    $filePath = $request->file("gallery.$key.file")->store('projects/gallery', 'public');
                    $validated['gallery'][$key]['file'] = $filePath;
                }
            }
        }

        // JSON encode array fields.
        $validated['technologies'] = json_encode($validated['technologies'] ?? []);
        $validated['category'] = json_encode($validated['category'] ?? []);
        $validated['gallery'] = json_encode($validated['gallery'] ?? []);
        $validated['features'] = json_encode($validated['features'] ?? []);
        $validated['process'] = json_encode($validated['process'] ?? []);

        $project->update($validated);

        return redirect()->route('admin.projects.show', $project->id)
                         ->with('success', 'Project updated successfully.');
    }

    /**
     * Remove the specified project from storage.
     */
    public function destroy(string $id)
    {
        $project = Project::findOrFail($id);
        $project->delete();

        return redirect()->route('admin.projects.index')
                         ->with('success', 'Project deleted successfully.');
    }
}
