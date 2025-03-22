<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Education;
use App\Models\User;
use App\Models\Project;
use App\Models\Article;
use App\Models\Award;
use App\Models\Certification;
use App\Models\Experience;
use App\Models\Testimonial;
use App\Models\Service;
use App\Models\Skill;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class ExperienceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $experiences    = Experience::orderBy('period', 'desc')->get();
        $educations     = Education::orderBy('period', 'desc')->get();
        $certifications = Certification::orderBy('date', 'desc')->get();
        $awards         = Award::orderBy('date', 'desc')->get();
      
        return Inertia::render('experiences/index', [
            'experiences'    => $experiences,
            'educations'     => $educations,
            'certifications' => $certifications,
            'awards'         => $awards,
        ]);
    }
    public function saher()
    {




        // User::factory(10)->create();


        $user = User::factory()->create([
            'name' => 'SAHER QAID',
            'email' => 'saher@qaid.com',
            'password' => Hash::make('saher@qaid.com'),
            'avatar'       => 'https://example.com/avatar.png',
            'about'        => 'Passionate full-stack developer with a focus on building scalable web applications.',
            'bio'          => 'I have over 5 years of experience in modern web development using Laravel, React, and Vue.',
            'phone_number' => '123-456-7890',
            'links'        => [
                ['name' => 'GitHub', 'url' => 'https://github.com/example', 'icon' => 'github-icon'],
                ['name' => 'LinkedIn', 'url' => 'https://linkedin.com/in/example', 'icon' => 'linkedin-icon']
            ],

            'availability' => 'Available for freelance projects',
        ]);
        $id = $user->id;

        // Create related records for this user
        Project::factory(8)->create(['user_id' => $user->id]);
        Article::factory(5)->create(['user_id' => $user->id]);
        // Experience::factory(5)->create(['user_id' => $user->id]);

        Testimonial::factory(5)->create(['user_id' => $user->id]);
        Service::factory(2)->create(['user_id' => $user->id]);
        Skill::factory(30)->create(['user_id' => $user->id]);

        Education::create([
            'user_id'     => $id,
            'degree'      => 'B.Sc. Computer Science',
            'institution' => 'MIT',
            'logo'        => '/placeholder.svg',
            'period'      => '2012 - 2016',
            'location'    => 'Cambridge, MA',
            'description' => 'Studied core computer science principles and machine learning.',
            'courses'     => ['Algorithms', 'Data Structures', 'Operating Systems']
        ]);

        Education::create([
            'user_id'     => $id,
            'degree'      => 'M.Sc. Computer Science',
            'institution' => 'Stanford University',
            'logo'        => '/placeholder.svg',
            'period'      => '2016 - 2018',
            'location'    => 'Stanford, CA',
            'description' => 'Specialized in Artificial Intelligence and Machine Learning.',
            'courses'     => ['Machine Learning', 'Deep Learning', 'Data Mining']
        ]);

        Education::create([
            'user_id'     => $id,
            'degree'      => 'MBA',
            'institution' => 'Harvard Business School',
            'logo'        => '/placeholder.svg',
            'period'      => '2019 - 2021',
            'location'    => 'Boston, MA',
            'description' => 'Focused on technology management and business strategy.',
            'courses'     => ['Leadership', 'Entrepreneurship', 'Finance']
        ]);

        Education::create([
            'user_id'     => $id,
            'degree'      => 'Ph.D. in Computer Science',
            'institution' => 'Carnegie Mellon University',
            'logo'        => '/placeholder.svg',
            'period'      => '2021 - Present',
            'location'    => 'Pittsburgh, PA',
            'description' => 'Research in distributed systems and cloud computing.',
            'courses'     => ['Distributed Systems', 'Cloud Computing']
        ]);

        Education::create([
            'user_id'     => $id,
            'degree'      => 'Diploma in UX Design',
            'institution' => 'General Assembly',
            'logo'        => '/placeholder.svg',
            'period'      => '2020',
            'location'    => 'Online',
            'description' => 'Practical training in user experience design and prototyping.',
            'courses'     => ['UX Design', 'Prototyping', 'User Research']
        ]);

        Award::create([
            'user_id'     => $id,
            'name'        => 'Best Developer Award',
            'issuer'      => 'CompanyX',
            'date'        => '2021',
            'description' => 'Recognized for outstanding system architecture leadership.'
        ]);

        Award::create([
            'user_id'     => $id,
            'name'        => 'Innovation in Technology',
            'issuer'      => 'TechCon',
            'date'        => '2020',
            'description' => 'Awarded for creative and innovative technology solutions.'
        ]);

        Award::create([
            'user_id'     => $id,
            'name'        => 'Top Mentor Award',
            'issuer'      => 'Developer Conference',
            'date'        => '2019',
            'description' => 'Honored for exceptional mentorship and guidance.'
        ]);

        Award::create([
            'user_id'     => $id,
            'name'        => 'Excellence in Research',
            'issuer'      => 'Academic Society',
            'date'        => '2018',
            'description' => 'Recognized for significant contributions to research.'
        ]);

        Award::create([
            'user_id'     => $id,
            'name'        => 'Customer Choice Award',
            'issuer'      => 'Tech Summit',
            'date'        => '2022',
            'description' => 'Voted as the best in customer experience and service.'
        ]);

        Experience::create([
            'user_id'         => $id,
            'title'           => 'Senior Full-Stack Developer',
            'company'         => 'Tech Innovations Inc.',
            'logo'            => '/placeholder.svg',
            'period'          => '2021 - Present',
            'location'        => 'San Francisco, CA (Remote)',
            'description'     => 'Leading the development of scalable enterprise applications.',
            'responsibilities' => [
                'Lead team of 5 developers',
                'CI/CD pipeline setup',
                'Backend architecture'
            ],
            'achievements'    => [
                'Increased performance by 40%',
                'Reduced technical debt'
            ],
            'technologies'    => ['React', 'Node.js', 'AWS']
        ]);

        Experience::create([
            'user_id'         => $id,
            'title'           => 'Full-Stack Developer',
            'company'         => 'Web Solutions Ltd.',
            'logo'            => '/placeholder.svg',
            'period'          => '2019 - 2021',
            'location'        => 'New York, NY',
            'description'     => 'Developed and maintained multiple web applications.',
            'responsibilities' => [
                'Developed RESTful APIs',
                'Collaborated with cross-functional teams'
            ],
            'achievements'    => [
                'Improved application performance by 30%'
            ],
            'technologies'    => ['Laravel', 'Vue.js', 'MySQL']
        ]);

        Experience::create([
            'user_id'         => $id,
            'title'           => 'Junior Developer',
            'company'         => 'Startup Inc.',
            'logo'            => '/placeholder.svg',
            'period'          => '2017 - 2019',
            'location'        => 'Austin, TX',
            'description'     => 'Assisted in developing web applications and internal tools.',
            'responsibilities' => [
                'Front-end development',
                'Bug fixing and testing'
            ],
            'achievements'    => [
                'Streamlined development workflow'
            ],
            'technologies'    => ['JavaScript', 'HTML', 'CSS']
        ]);

        Experience::create([
            'user_id'         => $id,
            'title'           => 'Intern Developer',
            'company'         => 'Tech Startup',
            'logo'            => '/placeholder.svg',
            'period'          => '2016 - 2017',
            'location'        => 'Remote',
            'description'     => 'Supported development teams in building MVPs.',
            'responsibilities' => [
                'Code reviews',
                'Unit testing'
            ],
            'achievements'    => [
                'Received high performance reviews'
            ],
            'technologies'    => ['PHP', 'JavaScript']
        ]);

        Experience::create([
            'user_id'         => $id,
            'title'           => 'Freelance Developer',
            'company'         => 'Self-Employed',
            'logo'            => '/placeholder.svg',
            'period'          => '2015 - 2016',
            'location'        => 'Remote',
            'description'     => 'Built small-scale websites and applications for clients.',
            'responsibilities' => [
                'Client communication',
                'Full project lifecycle management'
            ],
            'achievements'    => [
                'Exceeded client expectations'
            ],
            'technologies'    => ['WordPress', 'HTML', 'CSS', 'JavaScript']
        ]);

        Certification::create([
            'user_id' => $id,
            'name'    => 'AWS Certified Developer',
            'issuer'  => 'Amazon',
            'date'    => '2022',
            'url'     => '#'
        ]);

        Certification::create([
            'user_id' => $id,
            'name'    => 'Google Cloud Professional Developer',
            'issuer'  => 'Google',
            'date'    => '2021',
            'url'     => '#'
        ]);

        Certification::create([
            'user_id' => $id,
            'name'    => 'Microsoft Certified: Azure Developer Associate',
            'issuer'  => 'Microsoft',
            'date'    => '2020',
            'url'     => '#'
        ]);

        Certification::create([
            'user_id' => $id,
            'name'    => 'Certified Kubernetes Application Developer',
            'issuer'  => 'Cloud Native Computing Foundation',
            'date'    => '2019',
            'url'     => '#'
        ]);

        Certification::create([
            'user_id' => $id,
            'name'    => 'Scrum Master Certification',
            'issuer'  => 'Scrum Alliance',
            'date'    => '2018',
            'url'     => '#'
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
