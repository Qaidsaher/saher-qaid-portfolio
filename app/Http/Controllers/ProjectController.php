<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Project;
use Illuminate\Support\Facades\Log;

class ProjectController extends Controller
{
    /**
     * Display a listing of the projects.
     */
    public function index()
    {
        // Retrieve all projects.
        $projects = Project::with(['features', 'galleries', 'processes'])->get();

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
        // 1. Validate the incoming data.
        //    Add validation rule for feature images.
        $validated = $request->validate([
            'title'             => 'required|string|max:255',
            'short_description' => 'required|string|max:255',
            'description'       => 'required|string',
            'date'              => 'required|string', // Ensure specific format from frontend
            'period'            => 'nullable|string|max:255',
            'duration'          => 'nullable|string|max:255',
            'team_size'         => 'nullable|string|max:255', // Consider changing to 'integer' if appropriate
            'type'              => 'nullable|string|max:255',
            'technologies'      => 'nullable|array',
            'technologies.*'    => 'string|max:100', // Added max length
            'category'          => 'nullable|array',
            'category.*'        => 'string|max:100', // Added max length
            'challenge'         => 'nullable|string',
            'solution'          => 'nullable|string',
            'results'           => 'nullable|string',
            'client'            => 'nullable|string|max:255',
            'demo_url'          => 'nullable|url:http,https', // Specify schemes
            'github_url'        => 'nullable|url:http,https', // Specify schemes
            'image'             => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048', // Added mimes

        ]);


        // 3. Create the project record to get an ID.
        $project = Project::create($validated);

        // --- Handle File Uploads and Complex Arrays AFTER getting Project ID ---

        $updateData = []; // Array to hold data that needs updating after file processing

        // 4. Process Main Image
        if ($request->hasFile('image')) {
            // Store with project ID in path for organization
            $imagePath = $request->file('image')->store("projects/{$project->id}/main", 'public');
            $updateData['image'] = $imagePath; // Store the path
        }


        // 8. Update the project with processed file paths and array data
        if (!empty($updateData)) {
            $project->update($updateData);
        }

        // 9. Redirect after successful creation and update.
        // Redirect to show or index page
        return redirect()->route('admin.projects.index') // Or admin.projects.show, $project->id
            ->with('success', 'Project created successfully.');
    }

    public function show(string $id)
    {
        // Retrieve the current project.
        $project = Project::with(['features', 'galleries', 'processes'])->findOrFail($id);

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
            'features' => $project->features,
            'galleries' => $project->galleries,
            'processes' => $project->processes,
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
        $project = Project::with(['features', 'galleries', 'processes'])->findOrFail($id);

        return Inertia::render('admin/projects/edit', [
            'project' => $project,
            'features' => $project->features,
            'galleries' => $project->galleries,
            'processes' => $project->processes,
        ]);
    }

    public function update(Request $request, Project $project) // Using Route Model Binding
    {

        $validated = $request->validate([
            'title'             => 'required|string|max:255',
            'short_description' => 'nullable|string|max:1000', // Max length can be adjusted
            'description'       => 'nullable|string',
            'date'              => 'nullable|date_format:Y-m-d', // Expects 'yyyy-MM-dd' or null
            'period'            => 'nullable|string|max:255',    // E.g., "Jan 2023 - Mar 2023" or "Jan 2023"
            'duration'          => 'nullable|string|max:255',
            'team_size'         => 'nullable|integer|min:0',     // Frontend sends number | null
            'type'              => 'nullable|string|max:255',
            'technologies'      => 'nullable|array',
            'technologies.*'    => 'sometimes|string|max:100', // 'sometimes' ensures it only validates if technologies array is present and not empty
            'category'          => 'nullable|array',
            'category.*'        => 'sometimes|string|max:100',
            'challenge'         => 'nullable|string',
            'solution'          => 'nullable|string',
            'results'           => 'nullable|string',
            'client'            => 'nullable|string|max:255',
            'demo_url'          => 'nullable|url:http,https|max:2048',
            'github_url'        => 'nullable|url:http,https|max:2048',
        ]);
        $updateData = $validated;
        try {
            $project->update($updateData);
        } catch (\Exception $e) {
            Log::error("Error updating project ID {$project->id}: " . $e->getMessage());
            return redirect()->route('admin.projects.edit', $project->id) // Redirect back to edit page
                ->with('error', 'There was an issue updating the project. Please try again.');
        }


        return redirect()->route('admin.projects.edit', $project->id)
            ->with('success', 'Project updated successfully.');
    }


    /**
     * Update only the main image of the specified project.
     */
    public function updateMainImage(Request $request, Project $project)
    {

        $validated = $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048', // Max 2MB, adjust as needed
        ]);

        try {
            $newImageFile = $validated['image']; // Already an UploadedFile instance due to validation

            // Define a consistent folder structure
            // Using a subfolder for the main image helps distinguish it if you have other project-related images
            $projectImageFolder = "projects/{$project->id}/main_image";

            // Delete the old main image if it exists
            if ($project->image && Storage::disk('public')->exists($project->image)) {
                Storage::disk('public')->delete($project->image);
            }

            // Store the new image and get its path
            // store() generates a unique name, which is good to avoid conflicts
            $newImagePath = $newImageFile->store($projectImageFolder, 'public');

            if (!$newImagePath) {
                // This case should ideally not happen if storage is configured correctly
                // and store() usually throws an exception on critical failure.
                Log::error("Image storage failed for project {$project->id} despite passing validation.");
                return redirect()->back()
                    ->withErrors(['image' => 'Could not save the new image. Storage failed.'])
                    ->withInput();
            }

            // Update the project's image path
            $project->image = $newImagePath;
            $project->save();

            return redirect()->back()->with('success', 'Project main image updated successfully.');
        } catch (\Exception $e) {
            Log::error("Error updating main image for project {$project->id}: " . $e->getMessage());
            return redirect()->back()
                ->withErrors(['image' => 'An unexpected error occurred while updating the image. Please try again.'])
                ->withInput();
        }
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
