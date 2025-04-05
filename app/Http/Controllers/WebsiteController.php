<?php

namespace App\Http\Controllers;

use App\Models\Website;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WebsiteController extends Controller
{

    /**
     * Display the website configuration.
     */
    public function index()
    {
        // Assuming there's only one record; otherwise, adjust as needed.
        $website = Website::first();
        return Inertia::render('admin/website/index', [
            'website' => $website,
        ]);
    }

    /**
     * Show the form for editing website settings.
     */
    public function edit()
    {
        // Assuming there's only one website record; adjust logic as needed.
        $website = Website::first();
        return Inertia::render('admin/website/edit', [
            'website' => $website,
        ]);
    }


    public function updateImage(Request $request)
    {
        $request->validate([
            'heroImageSrc' => 'required|image|max:2048',
        ]);

        $website = Website::first();

        if ($request->hasFile('heroImageSrc')) {
            $path = $request->file('heroImageSrc')->store('websites/hero', 'public');
            $website->heroImageSrc = $path;
            $website->save();
        }

        return redirect()->back()->with('success', 'Hero image updated successfully.');
    }


    public function update(Request $request)
    {
        $validated = $request->validate([
            'websiteName'              => 'required|string|max:255',
            'badge'                    => 'required|string|max:255',
            'heroTitle'                => 'required|string|max:255',
            'heroDescription'          => 'required|string',
            'ctaPrimaryText'           => 'required|string|max:255',
            'ctaPrimaryLink'           => 'required|string|max:255',
            'ctaSecondaryText'         => 'required|string|max:255',
            'ctaSecondaryLink'         => 'required|string|max:255',
            'availableForProjectsText' => 'required|string|max:255',
            'experienceText'           => 'required|string|max:255',
            'socialLinks'              => 'required|string',
            'status'                   => 'required|string|max:255',
            'responseTime'             => 'required|string|max:255',
            'preferredProjects'        => 'required|string|max:255',
            'email'                    => 'required|email|max:255',
            'phone'                    => 'required|string|max:255',
            'location'                 => 'required|string|max:255',
            'number_of_experiences'    => 'required|integer',
        ]);

        // Decode the socialLinks JSON string to a PHP array.
        $socialLinks = json_decode($validated['socialLinks'], true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            return redirect()->back()->withErrors(['socialLinks' => 'Invalid social links data.']);
        }
        $validated['socialLinks'] = $socialLinks;

        $website = \App\Models\Website::first();
        $website->update($validated);

        return redirect()->route('admin.website.index')
            ->with('success', 'Website settings updated successfully.');
    }

}
