<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Service;
use Inertia\Inertia;
class ServicesController extends Controller
{
       /**
     * Display a listing of the services.
     */
    public function index(Request $request)
    {
        $services = Service::all();

        return Inertia::render('admin/services/index', [
            'services' => $services,
            // Optionally, pass flash messages (if needed)
            'flash' => [
                'success' => $request->session()->get('success'),
                'error'   => $request->session()->get('error'),
            ],
        ]);
    }

    /**
     * Show the form for creating a new service.
     */
    public function create()
    {
        return Inertia::render('admin/services/create');
    }

    /**
     * Store a newly created service in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'title'                => 'required|string|max:255',
            'short_description'    => 'required|string|max:500',
            'detailed_description' => 'required|string',
            'additional_info'      => 'nullable|string',
            'icon'                 => 'required|string|max:100',
            'features'             => 'nullable|array',
            'features.*'           => 'string|max:255',
            'technologies'         => 'nullable|array',
            'technologies.*'       => 'string|max:255',
            'gallery'              => 'nullable|array',
            'gallery.*'            => 'url',
        ]);

        Service::create($data);

        return redirect()->route('admin.services.index')
            ->with('success', 'Service created successfully.');
    }

    /**
     * Display the specified service.
     */
    public function show(Service $service)
    {
        return Inertia::render('admin/services/show', [
            'service' => $service,
        ]);
    }

    /**
     * Show the form for editing the specified service.
     */
    public function edit(Service $service)
    {
        return Inertia::render('admin/services/edit', [
            'service' => $service,
        ]);
    }

    /**
     * Update the specified service in storage.
     */
    public function update(Request $request, Service $service)
    {
        $data = $request->validate([
            'title'                => 'required|string|max:255',
            'short_description'    => 'required|string|max:500',
            'detailed_description' => 'required|string',
            'additional_info'      => 'nullable|string',
            'icon'                 => 'required|string|max:100',
            'features'             => 'nullable|array',
            'features.*'           => 'string|max:255',
            'technologies'         => 'nullable|array',
            'technologies.*'       => 'string|max:255',
            'gallery'              => 'nullable|array',
            'gallery.*'            => 'url',
        ]);

        $service->update($data);

        return redirect()->route('admin.services.index')
            ->with('success', 'Service updated successfully.');
    }

    /**
     * Remove the specified service from storage.
     */
    public function destroy(Service $service)
    {
        $service->delete();

        return redirect()->route('admin.services.index')
            ->with('success', 'Service deleted successfully.');
    }
}
