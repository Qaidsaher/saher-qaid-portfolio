<?php

namespace App\Http\Controllers;

use App\Models\Testimonial;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TestimonialsController extends Controller
{
   /**
     * Display a listing of the testimonials.
     */
    public function index()
    {
        $testimonials = Testimonial::all();
        return Inertia::render('admin/testimonials', [
            'testimonials' => $testimonials,
        ]);
    }

    /**
     * Store a newly created testimonial in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:255',
            'role'    => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'avatar'  => 'nullable|url',
            'text'    => 'required|string',
        ]);

        Testimonial::create($validated);

        return redirect()->back()->with('success', 'Testimonial created successfully.');
    }

    /**
     * Update the specified testimonial in storage.
     */
    public function update(Request $request, Testimonial $testimonial)
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:255',
            'role'    => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'avatar'  => 'nullable|url',
            'text'    => 'required|string',
        ]);

        $testimonial->update($validated);

        return redirect()->back()->with('success', 'Testimonial updated successfully.');
    }

    /**
     * Remove the specified testimonial from storage.
     */
    public function destroy(Testimonial $testimonial)
    {
        $testimonial->delete();
        return redirect()->back()->with('success', 'Testimonial deleted successfully.');
    }
}
