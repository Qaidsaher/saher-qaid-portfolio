<?php

namespace App\Http\Controllers;

use App\Models\Feature;
use App\Models\Project; // For store method type hint
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate; // Optional: For authorization
use Illuminate\Support\Facades\Log;    // For logging errors
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage; // For image handling

class FeatureController extends Controller
{
    /**
     * Display a listing of the resource (now redirects).
     * Assumes a route like 'projects.features.list' exists to show features for a project.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Project $project
     * @return \Illuminate\Http\RedirectResponse
     */
    public function index(Request $request, Project $project)
    {
        // Optional: Gate::authorize('viewAny', [Feature::class, $project]);
        // Or: Gate::authorize('viewFeatures', $project);

        // Redirects to a route that should display the features for the project.
        return Redirect::route('projects.features.list', ['project' => $project->id]);
    }

    /**
     * Store a newly created feature in storage, associated with a project.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request, Project $project)
    {
        // Optional: Gate::authorize('create', [Feature::class, $project]);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:2000', // Adjusted max length
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Example image validation
        ]);

        try {
            $data = $validated;
            if ($request->hasFile('image')) {
                $data['image'] = $request->file('image')->store('features', 'public');
            }

            $project->features()->create($data);

            return Redirect::back()->with('success', 'Feature added successfully.');

        } catch (\Exception $e) {
            Log::error("Error creating feature for project ID {$project->id}: " . $e->getMessage());
            return Redirect::back()
                ->withErrors(['store_feature' => 'Failed to save the feature. Please try again.'])
                ->withInput();
        }
    }

    /**
     * Update the specified feature in storage.
     * Note: This method now assumes shallow nesting for the route (e.g., /features/{feature}).
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Feature  $feature
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, Feature $feature)
    {
        // Optional: Gate::authorize('update', $feature);
        // If you still need to check project association, you can do it here,
        // e.g., by comparing $feature->project_id with a project ID from the request
        // or ensuring the authenticated user has rights through the feature's project.

        $validated = $request->validate([
            'title' => 'required|string|max:255', // Changed from 'sometimes|required' for simplicity
            'description' => 'nullable|string|max:2000',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        try {
            $data = $validated;
            if ($request->hasFile('image')) {
                // Delete the old image if it exists and a new one is uploaded
                if ($feature->image) {
                    Storage::disk('public')->delete($feature->image);
                }
                $data['image'] = $request->file('image')->store('features', 'public');
            } elseif ($request->input('remove_image')) { // Optional: Add a way to remove image without uploading new one
                if ($feature->image) {
                    Storage::disk('public')->delete($feature->image);
                    $data['image'] = null;
                }
            }


            $feature->update($data);

            return Redirect::back()->with('success', 'Feature updated successfully.');

        } catch (\Exception $e) {
            Log::error("Error updating feature ID {$feature->id}: " . $e->getMessage());
            return Redirect::back()
                ->withErrors(['update_feature' => 'Failed to update the feature. Please try again.'])
                ->withInput();
        }
    }

    /**
     * Remove the specified feature from storage.
     * Note: This method now assumes shallow nesting for the route (e.g., /features/{feature}).
     *
     * @param  \App\Models\Feature  $feature
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Feature $feature)
    {
        // Optional: Gate::authorize('delete', $feature);

        try {
            // Delete the image if it exists
            if ($feature->image) {
                Storage::disk('public')->delete($feature->image);
            }
            $feature->delete();

            return Redirect::back()->with('success', 'Feature deleted successfully.');

        } catch (\Exception $e) {
            Log::error("Error deleting feature ID {$feature->id}: " . $e->getMessage());
            return Redirect::back()
                ->withErrors(['delete_feature' => 'Failed to delete the feature. Please try again.']);
        }
    }
}
