

import { useEffect, useRef, useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";

// UI Components
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Icons
import {
    ArrowRight,
    Code,
    FileText,
    Star,
    ExternalLink,
    Github,
    Linkedin,
    Twitter,
    Mail,
    ChevronRight,
    Lightbulb,
    Smartphone,
    Palette,

} from "lucide-react";

// Layout and Types
import AppLayout from "@/layouts/app-layout";
import UserLayout from "@/layouts/user-layout";
import Image from "@/components/image";
import CallToActionSection from "@/components/sections/CallToActionSection";
import ProjectCard from "@/components/shared/project-card";
import ServicesSection from "@/components/sections/ServicesSection";
import StatsSection from "@/components/sections/StatsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import FeaturedProjectsSection from "@/components/sections/FeaturedProjectsSection";
import HeroSection from "@/components/sections/HeroSection";

// ---------------------
// Extend with Inertia props interface.
// ---------------------

interface CustomPageProps extends Record<string, any> {
    hereInformation: {
        badge?: string;
        heroTitle?: string;
        heroDescription?: string;
        ctaPrimaryText?: string;
        ctaPrimaryLink?: string;
        ctaSecondaryText?: string;
        ctaSecondaryLink?: string;
        heroImageSrc?: string;
        availableForProjectsText?: string;
        experienceText?: string;
        socialLinks?: {
            github?: string;
            linkedin?: string;
            twitter?: string;
            email?: string;
            whatsapp?: string;
        };
    };
    stats: { value: string; label: string }[];
    services: {
        title: string;
        description: string;
        icon: string; // using a string identifier from the database
        link: string;
    }[];
    featuredProjects: {
        id: number;
        title: string;
        description: string;
        type: string;
        image: string;
        technologies?: string | string[] | null;
        category?: string | string[] | null;
        demoUrl: string | null;
        githubUrl: string | null;
    }[];
    frontendSkills: { name: string; level: number }[];
    backendSkills: { name: string; level: number }[];
    otherSkills: { name: string; level: number }[];
    workExperience: {
        id: number;
        title: string;
        company: string;
        period: string;
        location: string;
        description: string;
        technologies: string[];
    }[];
    testimonials: {
        id: number;
        name: string;
        role: string;
        company: string;
        avatar: string;
        text: string;
    }[];
}

function parseField(field: string | string[] | null | undefined): string[] {
    if (!field) return [];
    if (Array.isArray(field)) return field;
    try {
        return JSON.parse(field) as string[];
    } catch {
        return field ? [field] : [];
    }
}
// ---------------------
// Skill Card Component
// ---------------------
interface SkillCardProps {
    title: string;
    icon: React.ReactNode;
    skills: { name: string; level: number }[];
    delay?: number;
}




// ---------------------
// Home Page Component
// ---------------------
export default function Home() {
    // Retrieve data from Inertia props.
    const {
        hereInformation,
        stats,
        services,
        featuredProjects,
        frontendSkills,
        backendSkills,
        otherSkills,
        workExperience,
        testimonials,

    } = usePage<CustomPageProps>().props;

    // Declare state for the active projects tab and filter featured projects.
   

    // Setup IntersectionObserver for scroll-triggered animations.
    const observerRef = useRef<IntersectionObserver | null>(null);
    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("fade-in");
                        observerRef.current?.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );
        const elements = document.querySelectorAll(".animate-on-scroll");
        elements.forEach((el) => observerRef.current?.observe(el));
        return () => {
            if (observerRef.current) {
                elements.forEach((el) => observerRef.current?.unobserve(el));
            }
        };
    }, []);

    return (
        <UserLayout>
            <Head title="Saher Qaid | ساهر الهمداني - Full-Stack Developer & AI Innovator">
                <meta head-key="description" name="description" content="Saher Qaid | ساهر الهمداني - Full-stack & AI Developer. Explore innovative projects and experience in Laravel, React, TypeScript, and more." />
                <meta head-key="keywords" name="keywords" content="Saher Qaid, ساهر الهمداني, ساهر محمد, Full-Stack Developer, AI Developer, Laravel, React, TypeScript, Flutter, Web Development, Mobile Apps, Machine Learning, Software Engineer, Portfolio" />
            </Head>
            <div className="max-w-7xl mx-auto  px-4">
                {/* HERO Section */}

                <HeroSection hereInformation={hereInformation} />

                {/* Stats Section */}
                <StatsSection stats={stats} />

                <ServicesSection />

                {/* Featured Projects Section */}
                <FeaturedProjectsSection featuredProjects={featuredProjects} />


                {/* Skills Section */}
                <SkillsSection backendSkills={backendSkills} frontendSkills={frontendSkills} otherSkills={otherSkills} />

                {/* Experience Timeline */}
                <ExperienceSection workExperience={workExperience} />



                {/* Testimonials */}
                <TestimonialsSection testimonials={testimonials} />

                <CallToActionSection />
            </div>

        </UserLayout>
    );
}

