<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Experience;
use App\Models\Education;
use App\Models\Certification;
use App\Models\Award;
use Inertia\Inertia;

class ExperienceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $experiences    = Experience::where('user_id', 2)->orderBy('period', 'desc')->get();
        $educations     = Education::where('user_id', 2)->orderBy('period', 'desc')->get();
        $certifications = Certification::where('user_id', 2)->orderBy('date', 'desc')->get();
        $awards         = Award::where('user_id', 2)->orderBy('date', 'desc')->get();
        // return response()->json([
        //     'experiences'    => $experiences,
        //     'educations'     => $educations,
        //     'certifications' => $certifications,
        //     'awards'         => $awards,
        // ]);
        return Inertia::render('experiences/index', [
            'experiences'    => $experiences,
            'educations'     => $educations,
            'certifications' => $certifications,
            'awards'         => $awards,
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
