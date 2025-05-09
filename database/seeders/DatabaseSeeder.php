<?php

namespace Database\Seeders;

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

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public static function seederCreate()
    {
        Education::create([

            'degree'      => 'B.Sc. Computer Science',
            'institution' => 'MIT',
            'logo'        => '/placeholder.svg',
            'period'      => '2012 - 2016',
            'location'    => 'Cambridge, MA',
            'description' => 'Studied core computer science principles and machine learning.',
            'courses'     => ['Algorithms', 'Data Structures', 'Operating Systems']
        ]);

        Education::create([

            'degree'      => 'M.Sc. Computer Science',
            'institution' => 'Stanford University',
            'logo'        => '/placeholder.svg',
            'period'      => '2016 - 2018',
            'location'    => 'Stanford, CA',
            'description' => 'Specialized in Artificial Intelligence and Machine Learning.',
            'courses'     => ['Machine Learning', 'Deep Learning', 'Data Mining']
        ]);

        Education::create([

            'degree'      => 'MBA',
            'institution' => 'Harvard Business School',
            'logo'        => '/placeholder.svg',
            'period'      => '2019 - 2021',
            'location'    => 'Boston, MA',
            'description' => 'Focused on technology management and business strategy.',
            'courses'     => ['Leadership', 'Entrepreneurship', 'Finance']
        ]);

        Education::create([

            'degree'      => 'Ph.D. in Computer Science',
            'institution' => 'Carnegie Mellon University',
            'logo'        => '/placeholder.svg',
            'period'      => '2021 - Present',
            'location'    => 'Pittsburgh, PA',
            'description' => 'Research in distributed systems and cloud computing.',
            'courses'     => ['Distributed Systems', 'Cloud Computing']
        ]);

        Education::create([

            'degree'      => 'Diploma in UX Design',
            'institution' => 'General Assembly',
            'logo'        => '/placeholder.svg',
            'period'      => '2020',
            'location'    => 'Online',
            'description' => 'Practical training in user experience design and prototyping.',
            'courses'     => ['UX Design', 'Prototyping', 'User Research']
        ]);

        Award::create([

            'name'        => 'Best Developer Award',
            'issuer'      => 'CompanyX',
            'date'        => '2021',
            'description' => 'Recognized for outstanding system architecture leadership.'
        ]);

        Award::create([

            'name'        => 'Innovation in Technology',
            'issuer'      => 'TechCon',
            'date'        => '2020',
            'description' => 'Awarded for creative and innovative technology solutions.'
        ]);

        Award::create([

            'name'        => 'Top Mentor Award',
            'issuer'      => 'Developer Conference',
            'date'        => '2019',
            'description' => 'Honored for exceptional mentorship and guidance.'
        ]);

        Award::create([

            'name'        => 'Excellence in Research',
            'issuer'      => 'Academic Society',
            'date'        => '2018',
            'description' => 'Recognized for significant contributions to research.'
        ]);

        Award::create([

            'name'        => 'Customer Choice Award',
            'issuer'      => 'Tech Summit',
            'date'        => '2022',
            'description' => 'Voted as the best in customer experience and service.'
        ]);

        Experience::create([

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

            'name'    => 'AWS Certified Developer',
            'issuer'  => 'Amazon',
            'date'    => '2022',
            'url'     => '#'
        ]);

        Certification::create([

            'name'    => 'Google Cloud Professional Developer',
            'issuer'  => 'Google',
            'date'    => '2021',
            'url'     => '#'
        ]);

        Certification::create([

            'name'    => 'Microsoft Certified: Azure Developer Associate',
            'issuer'  => 'Microsoft',
            'date'    => '2020',
            'url'     => '#'
        ]);

        Certification::create([

            'name'    => 'Certified Kubernetes Application Developer',
            'issuer'  => 'Cloud Native Computing Foundation',
            'date'    => '2019',
            'url'     => '#'
        ]);

        Certification::create([

            'name'    => 'Scrum Master Certification',
            'issuer'  => 'Scrum Alliance',
            'date'    => '2018',
            'url'     => '#'
        ]);
    }

    public function run(): void
    {
        // User::factory(10)->create();


        // $user = User::factory()->create([
        //     'name' => 'SAHER QAID',
        //     'email' => 'saherqaid2020@gmail.com',
        //     'password' => Hash::make('saherqaid2020@gmail.com'),
        //     'avatar'       => 'https://example.com/avatar.png',
        //     'about'        => 'Passionate full-stack developer with a focus on building scalable web applications.',
        //     'bio'          => 'I have over 5 years of experience in modern web development using Laravel, React, and Vue.',
        //     'phone_number' => '123-456-7890',
        //     'links'        => [
        //         ['name' => 'GitHub', 'url' => 'https://github.com/example', 'icon' => 'github-icon'],
        //         ['name' => 'LinkedIn', 'url' => 'https://linkedin.com/in/example', 'icon' => 'linkedin-icon']
        //     ],

        //     'availability' => 'Available for freelance projects',
        // ]);

        // Create related records for this user
        Project::factory(8)
        ->hasFeatures(3)
        ->hasGalleries(3)
        ->hasProcesses(2)
        ->create();
        Article::factory(5)->create();
        Testimonial::factory(6)->create();
        Experience::factory(5)->create();
        DatabaseSeeder::seederCreate();
        // Service::factory(2)->create();
        Skill::factory(30)->create();
    }
}
