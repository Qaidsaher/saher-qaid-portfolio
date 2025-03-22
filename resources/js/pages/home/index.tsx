// import React, { useEffect, useRef, useState } from 'react';
// import { Head, Link } from '@inertiajs/react';
import UserLayout from '@/layouts/user-layout';
import HeroSection from '@/pages/home/partials/HeroSection';

// import StatsSection from './partials/StatsSection';
// import ServicesSection from './partials/ServicesSection';
// import FeaturedProjects from './partials/FeaturedProjects';
// import ExperienceTimeline from './partials/ExperienceTimeline';
// import TestimonialsSection from './partials/TestimonialsSection';
// import ThemeShowcase from './partials/ThemeShowcase';
// import CallToAction from './partials/CallToAction';

// // If you need to manage state (e.g. activeTab for projects) in the main page,
// you can do that here; or you can move that logic into the relevant partial.

function Index() {
    return (
        <>

            <UserLayout>


                {/* <Head title="Home" /> */}
                <div className="flex flex-col min-h-screen">

                    <HeroSection />
                    {/* <StatsSection />
        <ServicesSection />
        <FeaturedProjects />
        <ExperienceTimeline />
        <TestimonialsSection />
        <ThemeShowcase />
        <CallToAction /> */}
                </div>
            </UserLayout>
        </>
    );
}

// Index.layout = (page: React.ReactNode) => <UserLayout>{page}</UserLayout>;
export default Index;
