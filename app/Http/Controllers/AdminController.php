<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Project;
use App\Models\Article;
use App\Models\Testimonial;
use App\Models\Experience;
use App\Models\Service;
use App\Models\Skill;
use App\Models\Education;
use App\Models\Certification;
use App\Models\Award;
use App\Models\Visitor;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // // Basic counts
        // $userCount         = User::count();
        // $projectCount      = Project::count();
        // $articleCount      = Article::count();
        // $testimonialCount  = Testimonial::count();
        // $experienceCount   = Experience::count();
        // $serviceCount      = Service::count();
        // $skillCount        = Skill::count();
        // $educationCount    = Education::count();
        // $certificationCount= Certification::count();
        // $awardCount        = Award::count();
        // $visitorCount      = Visitor::count();

        // // Aggregate visitor statistics by month.
        // // Using MySQL DATE_FORMAT for month names; adjust format as needed.
        // $visitorStats = Visitor::selectRaw("strftime('%m', created_at) as month, COUNT(*) as count")
        //     ->groupBy('month')
        //     ->orderByRaw("MIN(created_at) asc")
        //     ->get();

        // // Group projects by type (assumes 'type' column exists).
        // $projectsByType = Project::selectRaw("type, COUNT(*) as count")
        //     ->groupBy('type')
        //     ->get();
        // return Inertia::render('admin/dashboard', [
        //     'userCount'          => $userCount,
        //     'projectCount'       => $projectCount,
        //     'articleCount'       => $articleCount,
        //     'testimonialCount'   => $testimonialCount,
        //     'experienceCount'    => $experienceCount,
        //     'serviceCount'       => $serviceCount,
        //     'skillCount'         => $skillCount,
        //     'educationCount'     => $educationCount,
        //     'certificationCount' => $certificationCount,
        //     'awardCount'         => $awardCount,
        //     'visitorCount'       => $visitorCount,
        //     'visitorChartData'   => $visitorStats,
        //     'projectsByTypeData' => $projectsByType,
        // ]);
        // --- Fetch Current Data ---
        $userCountCurrent = User::count();
        $projectCountCurrent = Project::count();
        // ... fetch other counts

        // --- Fetch Previous Data (for trends) ---
        // Example: Get count from the start of the previous month to the start of this month
        $startOfPreviousMonth = now()->subMonth()->startOfMonth();
        $startOfThisMonth = now()->startOfMonth();

        $userCountPrevious = User::where('created_at', '<', $startOfThisMonth)
            // ->where('created_at', '>=', $startOfPreviousMonth) // Or based on your logic
            ->count(); // Adjust logic as needed (e.g., active users)

        // ... fetch other previous counts

        // --- Calculate Trends ---
        $userTrend = $this->calculateTrend($userCountCurrent, $userCountPrevious);
        $projectTrend = $this->calculateTrend($projectCountCurrent, /* $projectCountPrevious */ 50); // Example previous value
        // ... calculate other trends

        // --- Prepare Chart Data ---
        // Visitor Chart Data (Example - adapt to your actual data source)
        $visitorChartData = [
            ['month' => 'January', 'desktop' => 1000, 'mobile' => 600],
            ['month' => 'February', 'desktop' => 1200, 'mobile' => 750],
            // ... more months
        ];

        // Projects by Type (Example - adapt to your actual data source)
        $projectsByTypeRaw = Project::selectRaw('type, count(*) as count')
            ->groupBy('type')
            ->get();

        // Define colors (consistent with shadcn theme if possible)
        $pieColors = [
            'Web App' => 'hsl(var(--chart-1))',
            'Mobile App' => 'hsl(var(--chart-2))',
            'Design' => 'hsl(var(--chart-3))',
            'Consulting' => 'hsl(var(--chart-4))',
            // Add more types and colors as needed
        ];

        $projectsByTypeData = $projectsByTypeRaw->map(function ($item) use ($pieColors) {
            return [
                'type' => $item->type,
                'count' => $item->count,
                'fill' => $pieColors[$item->type] ?? 'hsl(var(--chart-5))', // Assign color, fallback
            ];
        })->toArray();


        return Inertia::render('admin/dashboard', [
            'userCount' => $userTrend,
            'projectCount' => $projectTrend,
            'visitorCount' => $this->calculateTrend(12345, 11000), // Example static visitor trend data
            'articleCount' => $this->calculateTrend(50, 52),
            'testimonialCount' => $this->calculateTrend(25, 20),
            'experienceCount' => $this->calculateTrend(15, 13),
            'serviceCount' => $this->calculateTrend(10, 10),
            'skillCount' => $this->calculateTrend(150, 120),
            'educationCount' => $this->calculateTrend(8, 7),
            'certificationCount' => $this->calculateTrend(12, 10),
            'awardCount' => $this->calculateTrend(5, 4),

            'visitorChartData' => $visitorChartData,
            'projectsByTypeData' => $projectsByTypeData,
        ]);
    }


    /**
     * Helper to calculate trend percentage and direction.
     */
    private function calculateTrend(int $current, int $previous): array
    {
        if ($previous == 0) {
            $trendValue = $current > 0 ? 100 : 0; // Avoid division by zero
        } else {
            $trendValue = round((($current - $previous) / $previous) * 100);
        }

        if ($trendValue > 0) {
            $direction = 'up';
        } elseif ($trendValue < 0) {
            $direction = 'down';
            $trendValue = abs($trendValue); // Store absolute value for display
        } else {
            $direction = 'neutral';
        }

        return [
            'current' => $current,
            'trendValue' => $trendValue,
            'trendDirection' => $direction,
        ];
    }
    /**
     * Store a new testimonial.
     */
    public function storeTestimonial(Request $request)
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:255',
            'role'    => 'nullable|string|max:255',
            'company' => 'nullable|string|max:255',
            'avatar'  => 'nullable|image|max:2048',
            'text'    => 'nullable|string',
        ]);

        if ($request->hasFile('avatar')) {
            $path = $request->file('avatar')->store('testimonials', 'public');
            $validated['avatar'] = $path;
        }

        Testimonial::create($validated);

        return redirect()->back()->with('success', 'Testimonial created successfully.');
    }

    /**
     * Store a new service.
     */
    public function storeService(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'icon'        => 'nullable|string|max:255',
            'link'        => 'nullable|url',
        ]);

        Service::create($validated);

        return redirect()->back()->with('success', 'Service created successfully.');
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

    /**
     * Delete a testimonial.
     */
    public function destroyTestimonial($id)
    {
        $testimonial = Testimonial::findOrFail($id);
        $testimonial->delete();

        return redirect()->back()->with('success', 'Testimonial deleted successfully.');
    }

    /**
     * Delete a service.
     */
    public function destroyService($id)
    {
        $service = Service::findOrFail($id);
        $service->delete();

        return redirect()->back()->with('success', 'Service deleted successfully.');
    }

    // Load the ManageEducations page with all records.
    public function educated()
    {
        $educations = Education::latest()->get();
        $certifications = Certification::latest()->get();
        $awards = Award::latest()->get();

        return inertia('admin/educations', [
            'educations' => $educations,
            'certifications' => $certifications,
            'awards' => $awards,
        ]);
    }

    // ===== Education Methods =====

    public function storeEducation(Request $request)
    {
        $validated = $request->validate([
            'degree'      => 'required|string|max:255',
            'institution' => 'required|string|max:255',
            'logo'        => 'nullable|image|max:2048',
            'period'      => 'nullable|string|max:255',
            'location'    => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'courses'     => 'nullable|array',
            'courses.*'   => 'string',
        ]);

        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('educations', 'public');
            $validated['logo'] = $path;
        }

        Education::create($validated);

        return redirect()->back()->with('success', 'Education record created successfully.');
    }

    public function updateEducation(Request $request, $id)
    {
        $education = Education::findOrFail($id);

        $validated = $request->validate([
            'degree'      => 'required|string|max:255',
            'institution' => 'required|string|max:255',
            'logo'        => 'nullable|image|max:2048',
            'period'      => 'nullable|string|max:255',
            'location'    => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'courses'     => 'nullable|array',
            'courses.*'   => 'string',
        ]);

        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('educations', 'public');
            $validated['logo'] = $path;
        }

        $education->update($validated);

        return redirect()->back()->with('success', 'Education record updated successfully.');
    }

    public function destroyEducation($id)
    {
        $education = Education::findOrFail($id);
        $education->delete();

        return redirect()->back()->with('success', 'Education record deleted successfully.');
    }

    // ===== Certification Methods =====

    public function storeCertification(Request $request)
    {
        $validated = $request->validate([
            'name'   => 'required|string|max:255',
            'issuer' => 'required|string|max:255',
            'date'   => 'nullable|date',
            'url'    => 'nullable|url',
        ]);

        Certification::create($validated);

        return redirect()->back()->with('success', 'Certification created successfully.');
    }

    public function updateCertification(Request $request, $id)
    {
        $certification = Certification::findOrFail($id);

        $validated = $request->validate([
            'name'   => 'required|string|max:255',
            'issuer' => 'required|string|max:255',
            'date'   => 'nullable|date',
            'url'    => 'nullable|url',
        ]);

        $certification->update($validated);

        return redirect()->back()->with('success', 'Certification updated successfully.');
    }

    public function destroyCertification($id)
    {
        $certification = Certification::findOrFail($id);
        $certification->delete();

        return redirect()->back()->with('success', 'Certification deleted successfully.');
    }

    // ===== Award Methods =====

    public function storeAward(Request $request)
    {
        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'issuer'      => 'required|string|max:255',
            'date'        => 'nullable|date',
            'description' => 'nullable|string',
        ]);

        Award::create($validated);

        return redirect()->back()->with('success', 'Award created successfully.');
    }

    public function updateAward(Request $request, $id)
    {
        $award = Award::findOrFail($id);

        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'issuer'      => 'required|string|max:255',
            'date'        => 'nullable|date',
            'description' => 'nullable|string',
        ]);

        $award->update($validated);

        return redirect()->back()->with('success', 'Award updated successfully.');
    }

    public function destroyAward($id)
    {
        $award = Award::findOrFail($id);
        $award->delete();

        return redirect()->back()->with('success', 'Award deleted successfully.');
    }


    public function exper()
    {
        $experiences    = Experience::orderBy('period', 'desc')->get();

        return Inertia::render('admin/experiences', props: [
            'experiences'    => $experiences,
        ]);
    }


    // Store a new experience.
    public function storeExperience(Request $request)
    {
        $validated = $request->validate([
            'title'             => 'required|string|max:255',
            'company'           => 'required|string|max:255',
            'period'            => 'required|string|max:50',
            'location'          => 'required|string|max:255',
            'description'       => 'required|string',
            'responsibilities'  => 'nullable|array',
            'responsibilities.*' => 'string',
            'achievements'      => 'nullable|array',
            'achievements.*'    => 'string',
            'technologies'      => 'nullable|array',
            'technologies.*'    => 'string',
        ]);

        Experience::create($validated);

        return redirect()->back()->with('success', 'Experience created successfully.');
    }

    // Update an existing experience.
    public function updateExperience(Request $request, $id)
    {
        $experience = Experience::findOrFail($id);
        $validated = $request->validate([
            'title'             => 'required|string|max:255',
            'company'           => 'required|string|max:255',
            'period'            => 'required|string|max:50',
            'location'          => 'required|string|max:255',
            'description'       => 'required|string',
            'responsibilities'  => 'nullable|array',
            'responsibilities.*' => 'string',
            'achievements'      => 'nullable|array',
            'achievements.*'    => 'string',
            'technologies'      => 'nullable|array',
            'technologies.*'    => 'string',
        ]);

        $experience->update($validated);

        return redirect()->back()->with('success', 'Experience updated successfully.');
    }

    // Delete an experience.
    public function destroyExperience($id)
    {
        $experience = Experience::findOrFail($id);
        $experience->delete();

        return redirect()->back()->with('success', 'Experience deleted successfully.');
    }

    // ============================
    // Skill Management Methods
    // ============================

    public function skills()
    {
        $skills    = Skill::get();
        return Inertia::render('admin/skills', props: [
            'skills'    => $skills,
        ]);
    }

    // Store a new skill.
    public function storeSkill(Request $request)
    {
        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'level'       => 'required|integer|min:1|max:10',
            'type'        => 'required|string|in:technical,tools,soft',
            'description' => 'required|string',
            'category'    => 'required|string|in:frontend,backend,AI,language',
        ]);

        Skill::create($validated);

        return redirect()->back()->with('success', 'Skill created successfully.');
    }

    // Update an existing skill.
    public function updateSkill(Request $request, $id)
    {
        $skill = Skill::findOrFail($id);

        $validated = $request->validate([
            'name'        => 'required|string|max:255',
            'level'       => 'required|integer|min:1|max:10',
            'type'        => 'required|string|in:technical,tools,soft',
            'description' => 'required|string',
            'category'    => 'required|string|in:frontend,backend,AI,language',
        ]);

        $skill->update($validated);

        return redirect()->back()->with('success', 'Skill updated successfully.');
    }

    // Delete a skill.
    public function destroySkill($id)
    {
        $skill = Skill::findOrFail($id);
        $skill->delete();

        return redirect()->back()->with('success', 'Skill deleted successfully.');
    }
}
