<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Gallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Gate; // Optional: For authorization

class GalleryController extends Controller
{
    /**
     * Display a listing of the gallery images for a project (now redirects).
     * Assumes a route like 'projects.galleries.list' exists to show gallery images.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\RedirectResponse
     */
    public function index(Request $request, Project $project)
    {
        // Optional: Gate::authorize('viewAny', [Gallery::class, $project]);
        // Or: Gate::authorize('viewGallery', $project);

        // Redirects to a route that should display the gallery images for the project.
        // The original logic for fetching $galleries and returning JSON/Inertia data
        // would need to be in the controller handling 'projects.galleries.list'.
        return Redirect::route('projects.galleries.list', ['project' => $project->id]);
    }

    /**
     * Store newly uploaded gallery images for a project.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request, Project $project)
    {
        // Optional: Gate::authorize('create', [Gallery::class, $project]);


        $validated = $request->validate([
            'images' => 'required|array|min:1',
            'images.*.file' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Example mimes
            'images.*.caption' => 'nullable|string|max:255',
        ], [
            'images.*.file.required' => 'Each images item must have an image file.',
            'images.*.file.image' => 'Each images file must be an image.',
            'images.*.file.mimes' => 'Each images image must be a file of type: :values.',
            'images.*.file.max' => 'Each images image may not be greater than :max kilobytes.',
            'images.*.caption.max' => 'Each caption may not be greater than :max characters.',
        ]);

        try {
            foreach ($validated['images'] as $item) {
                $path = $item['file']->store('gallery', 'public');

                $project->galleries()->create([ // Assuming 'galleries' is the correct relationship name
                    'image_url' => $path,
                    'caption' => $item['caption'] ?? null,
                ]);
            }

            return Redirect::back()->with('success', 'Gallery images uploaded successfully.');

        } catch (\Exception $e) {
            Log::error("Error storing gallery images for project ID {$project->id}: " . $e->getMessage());
            return Redirect::back()
                ->withErrors(['store_gallery' => 'Failed to upload gallery images. Please try again.'])
                ->withInput(); // Keep input for the form if it can handle re-populating file inputs and captions
        }
    }

    /**
     * Update the specified gallery image's caption.
     * Note: This method now assumes shallow nesting for the route (e.g., /gallery/{gallery}).
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Gallery  $gallery  // Changed parameter name from $image to $gallery
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, Gallery $gallery)
    {
        // Optional: Gate::authorize('update', $gallery);

        $validated = $request->validate([
            'caption' => 'nullable|string|max:255',
        ]);

        try {
            $gallery->update(['caption' => $validated['caption'] ?? null]);

            return Redirect::back()->with('success', 'Image caption updated successfully.');

        } catch (\Exception $e) {
            Log::error("Error updating gallery image ID {$gallery->id}: " . $e->getMessage());
            return Redirect::back()
                ->withErrors(['update_gallery' => 'Failed to update image caption. Please try again.'])
                ->withInput();
        }
    }

    /**
     * Remove the specified gallery image from storage.
     * Note: This method now assumes shallow nesting for the route (e.g., /gallery/{gallery}).
     *
     * @param  \App\Models\Gallery  $gallery  // Changed parameter name from $image to $gallery
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Gallery $gallery)
    {
        // Optional: Gate::authorize('delete', $gallery);

        try {
            if ($gallery->image_path) {
                Storage::disk('public')->delete($gallery->image_path);
            }
            $gallery->delete();

            return Redirect::back()->with('success', 'Image deleted successfully.');

        } catch (\Exception $e) {
            Log::error("Error deleting gallery image ID {$gallery->id}: " . $e->getMessage());
            return Redirect::back()
                ->withErrors(['delete_gallery' => 'Failed to delete the image. Please try again.']);
        }
    }
}
