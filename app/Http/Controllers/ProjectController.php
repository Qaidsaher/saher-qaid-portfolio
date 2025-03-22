<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Project;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource for the second user.
     */
    public function index()
    {
        // Retrieve projects where the user_id equals 2 (the second user)
        $projects = Project::get();

        return Inertia::render('projects/index', [
            'projects' => $projects,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource for the second user.
     */
    public function show(string $id)
    {
        // Retrieve the project by ID where the project belongs to user_id 2
        $project = Project::findOrFail($id);
        // For navigation, you might send all projects for that user or related projects.
        $projects = Project::where('user_id', $project->user_id)->get();
        return Inertia::render('projects/show', [
            'project'  => $project,
            'projects' => $projects,
        ]);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
