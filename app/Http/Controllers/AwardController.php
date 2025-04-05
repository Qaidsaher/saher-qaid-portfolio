<?php

namespace App\Http\Controllers;

use App\Models\Award;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AwardController extends Controller
{
    public function index()
    {
        $awards = Award::all();
        return Inertia::render('admin/awards/index', compact('awards'));
    }

    public function create()
    {
        return Inertia::render('admin/awards/create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'        => 'required|string|max:255',
            'issuer'      => 'required|string|max:255',
            'date'        => 'nullable|date',
            'description' => 'nullable|string',
        ]);

        Award::create($data);

        return redirect()->route('admin.awards.index')
            ->with('success', 'Award created successfully.');
    }

    public function show(Award $award)
    {
        return Inertia::render('admin/awards/show', compact('award'));
    }

    public function edit(Award $award)
    {
        return Inertia::render('admin/awards/edit', compact('award'));
    }

    public function update(Request $request, Award $award)
    {
        $data = $request->validate([
            'name'        => 'required|string|max:255',
            'issuer'      => 'required|string|max:255',
            'date'        => 'nullable|date',
            'description' => 'nullable|string',
        ]);

        $award->update($data);

        return redirect()->route('admin.awards.index')
            ->with('success', 'Award updated successfully.');
    }

    public function destroy(Award $award)
    {
        $award->delete();

        return redirect()->route('admin.awards.index')
            ->with('success', 'Award deleted successfully.');
    }
}
