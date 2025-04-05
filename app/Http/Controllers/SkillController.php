<?php

namespace App\Http\Controllers;

use App\Models\Skill;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SkillController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $skills = Skill::all();
        return Inertia::render('skills/index',[
            'skills'=>$skills
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('skills/create');

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
       // return response()->json($request->all());
        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'level'       => 'required|integer|min:1|max:10',
            'type'        => 'required|string|in:technical,tools,soft',
            'description' => 'required|string',
            'category'    => 'required|string',
        ]);

        $skill = Skill::create($validated);


        return redirect()->route('skills.index', parameters: $skill->id)
                         ->with('success', 'Skill created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
