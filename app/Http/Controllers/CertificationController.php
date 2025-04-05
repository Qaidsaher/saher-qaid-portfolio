<?php

namespace App\Http\Controllers;

use App\Models\Certification;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CertificationController extends Controller
{
    public function index()
    {
        $certifications = Certification::all();
        return Inertia::render('admin/certificates/index', compact('certifications'));
    }

    public function create()
    {
        return Inertia::render('admin/certificates/create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'   => 'required|string|max:255',
            'issuer' => 'required|string|max:255',
            'date'   => 'nullable|date',
            'url'    => 'nullable|url|max:255',
        ]);

        Certification::create($data);

        return redirect()->route('admin.certifications.index')
            ->with('success', 'Certification created successfully.');
    }

    public function show(Certification $certification)
    {
        return Inertia::render('admin/certificates/show', compact('certification'));
    }

    public function edit(Certification $certification)
    {
        return Inertia::render('admin/certificates/edit', compact('certification'));
    }

    public function update(Request $request, Certification $certification)
    {
        $data = $request->validate([
            'name'   => 'required|string|max:255',
            'issuer' => 'required|string|max:255',
            'date'   => 'nullable|date',
            'url'    => 'nullable|url|max:255',
        ]);

        $certification->update($data);

        return redirect()->route('admin.certifications.index')
            ->with('success', 'Certification updated successfully.');
    }

    public function destroy(Certification $certification)
    {
        $certification->delete();

        return redirect()->route('admin.certifications.index')
            ->with('success', 'Certification deleted successfully.');
    }
}
