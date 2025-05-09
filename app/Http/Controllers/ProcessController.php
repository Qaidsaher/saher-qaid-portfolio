<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project; // Needed for store method's type hint
use App\Models\Process; // The model this controller manages
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Log; // For logging errors
use Illuminate\Support\Facades\Gate; // Optional: For authorization

class ProcessController extends Controller
{
 /**
     * Store a newly created process in storage, associated with a project.
     * Handles POST requests to /admin/projects/{project}/processes
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Project  $project Route model binding
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request, Project $project)
    {
        // Optional: Authorization check
        // Gate::authorize('createProcess', $project); // Example policy check

        // Validate the incoming request data
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:2000',
            // 'present' ensures the key exists, even if the array is empty
            // 'array' ensures it's an array
            'steps' => 'present|array',
            // Validate each item within the 'steps' array
            // 'nullable' allows empty strings if needed, use 'required' to enforce non-empty steps
            'steps.*' => 'nullable|string|max:1000', // Max length for each step
        ],
        [
            'steps.*.string' => 'Each step must be text.', // Custom message example
            'steps.*.max' => 'Each step may not be greater than :max characters.',
        ]);

        // Filter out null or purely whitespace steps before saving
        // This keeps the stored JSON data cleaner.
        $filteredSteps = array_filter($validated['steps'] ?? [], function($step) {
            // Check if step is not null and, after trimming whitespace, is not an empty string
            return $step !== null && trim((string)$step) !== '';
        });

        try {
            // Create the new Process associated with the Project
            $project->processes()->create([
                'title' => $validated['title'],
                'description' => $validated['description'],
                'steps' => $filteredSteps, // Save the filtered steps array (will be cast to JSON)
            ]);

            // Redirect back to the previous page (likely the project edit page) with a success message
            return Redirect::back()->with('success', 'Process added successfully.');

        } catch (\Exception $e) {
            // Log the error for debugging purposes
            Log::error("Error creating process for project ID {$project->id}: " . $e->getMessage());

            // Redirect back with a generic error message and the validation errors (if any)
            // Pass the original input back to repopulate the form
            return Redirect::back()
                    ->withErrors(['store' => 'Failed to save the process. Please try again.'])
                    ->withInput();
        }
    }

    /**
     * Update the specified process in storage.
     * Handles PUT/PATCH requests to /admin/processes/{process}
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Process  $process Route model binding via shallow resource
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, Process $process)
    {
        // Optional: Authorization check - ensure user can update this specific process
        // Gate::authorize('update', $process);

        // Validate the incoming request data (similar to store)
         $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:2000',
            'steps' => 'present|array',
            'steps.*' => 'nullable|string|max:1000',
        ],
        [
            'steps.*.string' => 'Each step must be text.',
            'steps.*.max' => 'Each step may not be greater than :max characters.',
        ]);

        // Filter out null or purely whitespace steps before saving
        $filteredSteps = array_filter($validated['steps'] ?? [], function($step) {
             return $step !== null && trim((string)$step) !== '';
        });

        try {
            // Update the existing Process model
             $process->update([
                'title' => $validated['title'],
                'description' => $validated['description'],
                'steps' => $filteredSteps, // Save the filtered steps array
            ]);

             // Redirect back with a success message
             return Redirect::back()->with('success', 'Process updated successfully.');

        } catch (\Exception $e) {
            Log::error("Error updating process ID {$process->id}: " . $e->getMessage());

            // Redirect back with error message and input
            return Redirect::back()
                    ->withErrors(['update' => 'Failed to update the process. Please try again.'])
                    ->withInput(); // Pass input back to form
        }
    }

    /**
     * Remove the specified process from storage.
     * Handles DELETE requests to /admin/processes/{process}
     *
     * @param  \App\Models\Process  $process Route model binding via shallow resource
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Process $process)
    {
        // Optional: Authorization check - ensure user can delete this specific process
        // Gate::authorize('delete', $process);

        try {
            // Delete the process record from the database
            $process->delete();

            // Redirect back with success message
            return Redirect::back()->with('success', 'Process deleted successfully.');

        } catch (\Exception $e) {
             Log::error("Error deleting process ID {$process->id}: " . $e->getMessage());

             // Redirect back with error message
            return Redirect::back()->withErrors(['delete' => 'Failed to delete the process. Please try again.']);
        }
    }
}
