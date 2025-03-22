"use client";

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

// ---------------------
// Extend with Inertia props interface.
// ---------------------
interface CustomPageProps extends Record<string, any> {
    stats: { value: string; label: string }[];
    services: {
        title: string;
        description: string;
        icon: React.ReactNode;
        link: string;
    }[];
    featuredProjects: {
        id: number;
        title: string;
        description: string;
        type: string;
        image: string;
        technologies: string[];
        category: string;
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

// ---------------------
// Skill Card Component
// ---------------------
interface SkillCardProps {
    title: string;
    icon: React.ReactNode;
    skills: { name: string; level: number }[];
    delay?: number;
}

function SkillCard({ title, icon, skills, delay = 0 }: SkillCardProps) {
    return (
        <Card
            className="border border-border/40 bg-background hover:shadow-lg transition-all duration-300 animate-on-scroll opacity-0"
            style={{ animationDelay: `${delay}s` }}
        >
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    {icon}
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {skills.map((skill, index) => (
                        <li key={index} className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="font-medium">{skill.name}</span>
                                <span className="text-sm text-muted-foreground">
                                    {skill.level}%
                                </span>
                            </div>
                            <div className="w-full h-2 bg-secondary/50 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                                    style={{
                                        width: `${skill.level}%`,
                                        transitionDelay: `${0.1 * index}s`,
                                    }}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}

// ---------------------
// Home Page Component
// ---------------------
export default function Home() {
    // Retrieve data from Inertia props.
    const {
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
    const [activeTab, setActiveTab] = useState("all");
    const filteredProjects =
        activeTab === "all"
            ? featuredProjects
            : featuredProjects.filter((project) => project.category === activeTab);

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
    const iconMap: { [key: string]: React.ReactNode } = {
        "smartphone": <Smartphone className="h-6 w-6 text-primary" />,
        "code": <Code className="h-6 w-6 text-primary" />,
        "palette": <Palette className="h-6 w-6 text-primary" />,
        // Add other Icon mappings
    };
    return (
        <UserLayout>
            <Head title="Home" />
            <div className="max-w-7xl mx-auto  px-4">
                {/* HERO Section */}
                <section className="relative py-12 md:py-12 ">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background -z-10"></div>
                    <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-5 -z-10"></div>
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
                            {/* Hero Text */}
                            <div className="flex flex-col justify-center space-y-6 order-2 lg:order-1">
                                <div className="space-y-4 animate-on-scroll opacity-0">
                                    <Badge
                                        variant="outline"
                                        className="mb-2 text-sm py-1 px-3 border-primary/30 text-primary"
                                    >
                                        Full-Stack Developer
                                    </Badge>
                                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl">
                                        Crafting Smart, Scalable <span className="text-primary">Web and AI Solutions</span>
                                    </h1>
                                    <p className="max-w-[600px] text-muted-foreground text-lg md:text-xl leading-relaxed">
                                        I build innovative web applications and AI-driven solutions that combine elegant design with powerful functionality, showcasing expertise in multiple technologies.
                                    </p>

                                </div>

                                <div
                                    className="flex flex-col sm:flex-row gap-3 animate-on-scroll opacity-0"
                                    style={{ animationDelay: "0.1s" }}
                                >
                                    <Link href="/projects">
                                        <Button size="lg" className="group w-full sm:w-auto">
                                            View My Work
                                            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </Button>
                                    </Link>
                                    <Link href="/contact">
                                        <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                            Get in Touch
                                        </Button>
                                    </Link>
                                </div>

                                <div
                                    className="flex gap-4 pt-4 animate-on-scroll opacity-0"
                                    style={{ animationDelay: "0.3s" }}
                                >
                                    <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="rounded-full h-10 w-10 bg-background/80 hover:bg-background shadow-sm"
                                        >
                                            <Github className="h-5 w-5" />
                                            <span className="sr-only">GitHub</span>
                                        </Button>
                                    </Link>
                                    <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="rounded-full h-10 w-10 bg-background/80 hover:bg-background shadow-sm"
                                        >
                                            <Linkedin className="h-5 w-5" />
                                            <span className="sr-only">LinkedIn</span>
                                        </Button>
                                    </Link>
                                    <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="rounded-full h-10 w-10 bg-background/80 hover:bg-background shadow-sm"
                                        >
                                            <Twitter className="h-5 w-5" />
                                            <span className="sr-only">Twitter</span>
                                        </Button>
                                    </Link>
                                    <Link href="mailto:hello@example.com">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="rounded-full h-10 w-10 bg-background/80 hover:bg-background shadow-sm"
                                        >
                                            <Mail className="h-5 w-5" />
                                            <span className="sr-only">Email</span>
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            {/* Hero Image */}
                            <div
                                className="relative flex items-center justify-center order-1 lg:order-2 animate-on-scroll opacity-0 px-4 md:px-2"
                                style={{ animationDelay: "0.4s" }}
                            >
                                <div className="relative w-full max-w-md aspect-square">
                                    <div className="absolute inset-0 rounded-2xl overflow-hidden border-2 border-primary/10 shadow-2xl bg-gradient-to-br from-background via-background/95 to-background/90">
                                        <Image
                                            src="/placeholder.svg?height=600&width=600"
                                            alt="Profile"
                                            width={600}
                                            height={600}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>

                                    {/* Decorative Elements */}
                                    <div className="absolute -bottom-6 -right-6 p-4 rounded-xl border border-primary/20 shadow-lg bg-background/80 backdrop-blur-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                            <span className="text-sm font-medium">Available for Projects</span>
                                        </div>
                                    </div>
                                    <div className="absolute -top-6 -left-6 p-4 rounded-xl border border-primary/20 shadow-lg bg-background/80 backdrop-blur-sm">
                                        <div className="flex items-center gap-2">
                                            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                                            <span className="text-sm font-medium">3+ Years Experience</span>
                                        </div>
                                    </div>
                                    {/* Floating Badges */}
                                    <div className="absolute top-1/4 -left-12 p-3 rounded-lg border border-primary/20 shadow-lg bg-background/80 backdrop-blur-sm animate-float">
                                        <Code className="h-5 w-5 text-primary" />
                                    </div>
                                    <div
                                        className="absolute bottom-1/4 -right-12 p-3 rounded-lg border border-primary/20 shadow-lg bg-background/80 backdrop-blur-sm animate-float"
                                        style={{ animationDelay: "1s" }}
                                    >
                                        <FileText className="h-5 w-5 text-primary" />
                                    </div>
                                    <div
                                        className="absolute top-1/2 -right-8 p-3 rounded-lg border border-primary/20 shadow-lg bg-background/80 backdrop-blur-sm animate-float"
                                        style={{ animationDelay: "1.5s" }}
                                    >
                                        <Lightbulb className="h-5 w-5 text-primary" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-10 border-y border-border/40 ">
                    <div className="container px-4 md:px-4 ">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 ">
                            {stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center text-center animate-on-scroll opacity-0"
                                    style={{ animationDelay: `${0.1 * index}s` }}
                                >
                                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <section className="py-10 md:py-20">
                    <div className="container px-4 md:px-6">
                        <div className="text-center mb-12 animate-on-scroll opacity-0">
                            <Badge variant="outline" className="mb-2">
                                Services
                            </Badge>
                            <h2 className="section-heading">What I Do</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                I offer a range of services to help businesses and individuals create impactful digital solutions.
                            </p>
                        </div>
                        <div className="grid gap-8 md:grid-cols-3">
                            {services.map((service, index) => (
                                <Card
                                    key={index}
                                    className="border border-border/40 bg-background hover:shadow-lg transition-all duration-300 animate-on-scroll opacity-0"
                                    style={{ animationDelay: `${0.1 * index}s` }}
                                >
                                    <CardHeader>
                                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                            {iconMap[service.icon]}
                                        </div>
                                        <CardTitle>{service.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">{service.description}</p>
                                    </CardContent>
                                    <CardFooter>
                                        <Link
                                            href={service.link}
                                            className="text-primary hover:underline inline-flex items-center group"
                                        >
                                            Learn more
                                            <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Featured Projects Section */}
                <section className="py-16 md:py-20 bg-muted/20">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 animate-on-scroll opacity-0">
                            <div>
                                <Badge variant="outline" className="mb-2">
                                    Portfolio
                                </Badge>
                                <h2 className="section-heading">Featured Projects</h2>
                                <p className="text-muted-foreground">A selection of my recent work</p>
                            </div>
                            <Link href="/projects">
                                <Button variant="outline" className="group">
                                    View All Projects
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                        </div>

                        {/* Declare activeTab state and compute filteredProjects */}

                        <div>
                            {/* Active tab state */}

                            {/** Add state variables: */}
                            {(() => {
                                const [activeTab, setActiveTab] = useState("all");
                                const filteredProjects =
                                    activeTab === "all"
                                        ? featuredProjects
                                        : featuredProjects.filter(
                                            (project: { type: string }) => project.type === activeTab
                                        );
                                return (
                                    <>
                                        <Tabs
                                            defaultValue="all"
                                            value={activeTab}
                                            onValueChange={(value) => setActiveTab(value)}
                                            className="mb-8 animate-on-scroll opacity-0"
                                            style={{ animationDelay: "0.1s" }}
                                        >
                                            <TabsList className="w-full max-w-md mx-auto grid grid-cols-3">
                                                <TabsTrigger value="all">All</TabsTrigger>
                                                <TabsTrigger value="web">Web</TabsTrigger>
                                                <TabsTrigger value="mobile">Mobile</TabsTrigger>
                                            </TabsList>
                                        </Tabs>

                                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                            {filteredProjects.map((project, index) => (
                                                <Card
                                                    key={project.id}
                                                    className="overflow-hidden flex flex-col group animate-on-scroll opacity-0 border border-border/40 bg-background hover:shadow-xl transition-all duration-300 pt-0"
                                                    style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                                                >
                                                    <div className="aspect-video relative overflow-hidden ">
                                                        <Image
                                                            src={!project.image || "/placeholder.svg"}
                                                            alt={project.title}
                                                            width={600}
                                                            height={400}
                                                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                                        />
                                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                            <div className="flex gap-3">
                                                                {project.demoUrl && (
                                                                    <Link
                                                                        href={project.demoUrl}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                    >
                                                                        <Button size="sm" variant="secondary" className="rounded-full">
                                                                            <ExternalLink className="h-4 w-4 mr-2" />
                                                                            Demo
                                                                        </Button>
                                                                    </Link>
                                                                )}
                                                                {project.githubUrl && (
                                                                    <Link
                                                                        href={project.githubUrl}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                    >
                                                                        <Button size="sm" variant="secondary" className="rounded-full">
                                                                            <Github className="h-4 w-4 mr-2" />
                                                                            Code
                                                                        </Button>
                                                                    </Link>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <CardHeader>
                                                        <div className="flex justify-between items-start">
                                                            <CardTitle>{project.title}</CardTitle>
                                                            <Badge variant="outline" className="capitalize">
                                                                {project.type}
                                                            </Badge>
                                                        </div>
                                                        <CardDescription>{project.description}</CardDescription>
                                                    </CardHeader>
                                                    <CardContent className="flex-1">
                                                        <div className="flex flex-wrap gap-2">
                                                            {project.technologies.map((tech) => (
                                                                <Badge key={tech} variant="secondary" className="bg-secondary/50">
                                                                    {tech}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </CardContent>
                                                    <CardFooter>
                                                        <Link href={`/projects/${project.id}`} className="w-full">
                                                            <Button variant="default" className="w-full group">
                                                                View Details
                                                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                                            </Button>
                                                        </Link>
                                                    </CardFooter>
                                                </Card>
                                            ))}
                                        </div>
                                    </>
                                );
                            })()}
                        </div>
                    </div>
                </section>

                {/* Skills Section */}
                <section className="py-16 md:py-20">
                    <div className="container px-4 md:px-6">
                        <div className="text-center mb-12 animate-on-scroll opacity-0">
                            <Badge variant="outline" className="mb-2">
                                Expertise
                            </Badge>
                            <h2 className="section-heading">Skills & Technologies</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                A comprehensive overview of my technical skills and areas of expertise.
                            </p>
                        </div>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            <SkillCard
                                title="Frontend Development"
                                icon={<Code className="h-6 w-6 text-primary" />}
                                skills={frontendSkills}
                                delay={0}
                            />
                            <SkillCard
                                title="Backend Development"
                                icon={<FileText className="h-6 w-6 text-primary" />}
                                skills={backendSkills}
                                delay={0.2}
                            />
                            <SkillCard
                                title="Other Skills"
                                icon={<Star className="h-6 w-6 text-primary" />}
                                skills={otherSkills}
                                delay={0.4}
                            />
                        </div>
                        <div
                            className="mt-12 text-center animate-on-scroll opacity-0"
                            style={{ animationDelay: "0.6s" }}
                        >
                            <Link href="/skills">
                                <Button className="group">
                                    View All Skills
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
                {/* Experience Timeline */}
                <section className="py-16 md:py-24 bg-muted/20">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-12 animate-on-scroll opacity-0">
                            <Badge variant="outline" className="mb-2">
                                Experience
                            </Badge>
                            <h2 className="section-heading text-3xl md:text-4xl font-bold">
                                Professional Journey
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto mt-4 text-base md:text-lg">
                                My career path and professional experience
                            </p>
                        </div>
                        <div className="relative mx-auto max-w-7xl">
                            {/* Timeline line */}
                            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border transform -translate-x-1/2"></div>
                            {workExperience.map((job, index) => {
                                // Determine if the job should appear on the left or right on larger screens.
                                const isLeft = index % 2 === 0;
                                return (
                                    <div
                                        key={job.id}
                                        className={`relative mb-12 animate-on-scroll opacity-0 ${isLeft
                                            ? "md:pr-6 md:text-right md:ml-auto md:mr-[55%]"
                                            : "md:pl-6 md:ml-[55%]"
                                            }`}
                                        style={{ animationDelay: `${0.2 * index}s` }}
                                    >
                                        {/* Timeline dot */}
                                        <div className={`absolute hidden sm:block ${!isLeft?" -left-0 ":" -right-0  "} top-0 w-5 h-5 rounded-full bg-primary transform ${isLeft?" translate-x-1/4 ":" -translate-x-1/1  "}  -translate-y-1/2`}></div>
                                        <div className={`absolute  sm:hidden block left-0 top-0 w-5 h-5 rounded-full bg-primary transform -translate-x-1/2 -translate-y-1/2`}></div>
                                        <Card className="border border-border/40 bg-background hover:shadow-lg transition-all duration-300">
                                            <CardHeader>
                                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-left">
                                                    <div>
                                                        <CardTitle className="text-xl md:text-2xl font-bold">{job.title}</CardTitle>
                                                        <CardDescription className="text-sm md:text-base text-muted-foreground">
                                                            {job.company} • {job.period}
                                                        </CardDescription>
                                                    </div>
                                                    <Badge variant="outline" className="whitespace-nowrap">
                                                        {job.location}
                                                    </Badge>
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="mb-4 text-sm md:text-base text-left">{job.description}</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {job.technologies.map((tech) => (
                                                        <Badge
                                                            key={tech}
                                                            variant="secondary"
                                                            className="bg-secondary/50 text-xs md:text-sm"
                                                        >
                                                            {tech}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                );
                            })}
                        </div>
                        <div
                            className="mt-8 text-center animate-on-scroll opacity-0"
                            style={{ animationDelay: "0.6s" }}
                        >
                            <Link href="/experience">
                                <Button variant="outline" className="group">
                                    View Full Experience
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="py-16 md:py-24">
                    <div className="container px-4 md:px-6">
                        <div className="text-center mb-12 animate-on-scroll opacity-0">
                            <Badge variant="outline" className="mb-2">
                                Testimonials
                            </Badge>
                            <h2 className="section-heading">Client Feedback</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                What others say about working with me
                            </p>
                        </div>
                        <div className="grid gap-8 md:grid-cols-3">
                            {testimonials.map((testimonial, index) => (
                                <Card
                                    key={testimonial.id}
                                    className="animate-on-scroll opacity-0 border border-border/40 bg-background hover:shadow-lg transition-all duration-300"
                                    style={{ animationDelay: `${0.2 * index}s` }}
                                >
                                    <CardHeader>
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                                                <Image
                                                    src={testimonial.avatar || "/placeholder.svg?height=48&width=48"}
                                                    alt={testimonial.name}
                                                    width={48}
                                                    height={48}
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                            <div>
                                                <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                                                <CardDescription>
                                                    {testimonial.role}, {testimonial.company}
                                                </CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="relative">
                                            <div className="absolute -top-4 -left-2 text-4xl text-primary/20">"</div>
                                            <p className="relative z-10 italic text-muted-foreground">
                                                {testimonial.text}
                                            </p>
                                            <div className="absolute -bottom-4 -right-2 text-4xl text-primary/20">"</div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Theme Showcase */}
                <section className="py-16 md:py-24">
                    <div className="container px-4 md:px-6">
                        <div className="text-center mb-12 animate-on-scroll opacity-0">
                            <Badge variant="outline" className="mb-2">
                                Customization
                            </Badge>
                            <h2 className="section-heading">Choose Your Theme</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Click the theme toggle in the header to select from 6 different color themes and switch between light and dark mode
                            </p>
                        </div>
                        <div
                            className="max-w-3xl mx-auto animate-on-scroll opacity-0"
                            style={{ animationDelay: "0.1s" }}
                        >
                            {/* Uncomment and update the component if needed */}
                            {/* <ColorThemeShowcase /> */}
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="py-16 md:py-24 bg-muted/20">
                    <div className="container px-4 md:px-6">
                        <div className="rounded-2xl p-8 md:p-12 max-w-4xl mx-auto text-center animate-on-scroll opacity-0 border border-primary/20 bg-background shadow-lg">
                            <Badge variant="outline" className="mb-4">
                                Available for Hire
                            </Badge>
                            <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
                                Let's Work Together
                            </h2>
                            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                                I'm currently available for freelance work and open to new opportunities.
                                If you have a project that needs my expertise, let's discuss how I can help.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/contact">
                                    <Button size="lg" className="group">
                                        Get in Touch
                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </Link>
                                <Link href="/projects">
                                    <Button variant="outline" size="lg">
                                        View My Work
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </UserLayout>
    );
}

// export default Home;
