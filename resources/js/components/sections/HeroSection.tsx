import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

} from "lucide-react";import Image from "@/components/image";
import { Link } from "@inertiajs/react";

interface HeroSectionProps {
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
}

export default function HeroSection({ hereInformation }: HeroSectionProps) {
    const WhatsappIcon = (props: React.SVGProps<SVGSVGElement>) => (
        <svg
            className={`w-8 h-8  ${props.className}`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            {...props}
        >
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M12 4a8 8 0 0 0-6.895 12.06l.569.718-.697 2.359 2.32-.648.379.243A8 8 0 1 0 12 4ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.96 9.96 0 0 1-5.016-1.347l-4.948 1.382 1.426-4.829-.006-.007-.033-.055A9.958 9.958 0 0 1 2 12Z"
                clipRule="evenodd"
            />
            <path
                fill="currentColor"
                d="M16.735 13.492c-.038-.018-1.497-.736-1.756-.83a1.008 1.008 0 0 0-.34-.075c-.196 0-.362.098-.49.291-.146.217-.587.732-.723.886-.018.02-.042.045-.057.045-.013 0-.239-.093-.307-.123-1.564-.68-2.751-2.313-2.914-2.589-.023-.04-.024-.057-.024-.057.005-.021.058-.074.085-.101.08-.079.166-.182.249-.283l.117-.14c.121-.14.175-.25.237-.375l.033-.066a.68.68 0 0 0-.02-.64c-.034-.069-.65-1.555-.715-1.711-.158-.377-.366-.552-.655-.552-.027 0 0 0-.112.005-.137.005-.883.104-1.213.311-.35.22-.94.924-.94 2.16 0 1.112.705 2.162 1.008 2.561l.041.06c1.161 1.695 2.608 2.951 4.074 3.537 1.412.564 2.081.63 2.461.63.16 0 .288-.013.4-.024l.072-.007c.488-.043 1.56-.599 1.804-1.276.192-.534.243-1.117.115-1.329-.088-.144-.239-.216-.43-.308Z"
            />
        </svg>
    )
    // Move observer-related effects to parent if needed (or create a custom hook)
    return (
        <section className="relative py-12 md:py-12">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background -z-10"></div>
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-5 -z-10"></div>
            <div className="container px-4 md:px-6">
                <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
                    <div className="flex flex-col justify-center space-y-6 order-2 lg:order-1">
                        <div className="space-y-4 animate-on-scroll opacity-0">
                            <Badge
                                variant="outline"
                                className="mb-2 text-sm py-1 px-3 border-primary/30 text-primary"
                            >
                                {hereInformation.badge}
                            </Badge>
                            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl">
                                {hereInformation.heroTitle}{" "}

                            </h1>
                            <p className="max-w-[600px] text-muted-foreground text-lg md:text-xl leading-relaxed">
                                {hereInformation.heroDescription}
                            </p>
                        </div>

                        <div
                            className="flex flex-col sm:flex-row gap-3 animate-on-scroll opacity-0"
                            style={{ animationDelay: "0.1s" }}
                        >
                            <Link href={hereInformation.ctaPrimaryLink!}>
                                <Button size="lg" className="group w-full sm:w-auto">
                                    {hereInformation.ctaPrimaryText}
                                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                            <Link href={hereInformation.ctaSecondaryLink!}>
                                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                    {hereInformation.ctaSecondaryText}
                                </Button>
                            </Link>
                        </div>
                        <div
                            className="flex gap-4 pt-4 animate-on-scroll opacity-0"
                            style={{ animationDelay: "0.3s" }}
                        >
                            <a
                                href={hereInformation.socialLinks?.github!}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="GitHub"
                            >
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-full h-10 w-10 bg-background/80 hover:bg-background shadow-sm"
                                >
                                    <Github className="h-5 w-5" />
                                    <span className="sr-only">GitHub</span>
                                </Button>
                            </a>
                            <a
                                href={hereInformation.socialLinks?.linkedin!}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="LinkedIn"
                            >
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-full h-10 w-10 bg-background/80 hover:bg-background shadow-sm"
                                >
                                    <Linkedin className="h-5 w-5" />
                                    <span className="sr-only">LinkedIn</span>
                                </Button>
                            </a>
                            <a
                                href={hereInformation.socialLinks?.twitter!}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Twitter"
                            >
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-full h-10 w-10 bg-background/80 hover:bg-background shadow-sm"
                                >
                                    <Twitter className="h-5 w-5" />
                                    <span className="sr-only">Twitter</span>
                                </Button>
                            </a>
                            <a
                                href={hereInformation.socialLinks?.email!}
                                title="Email"
                            >
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-full h-10 w-10 bg-background/80 hover:bg-background shadow-sm"
                                >
                                    <Mail className="h-5 w-5" />
                                    <span className="sr-only">Email</span>
                                </Button>
                            </a>
                            {hereInformation.socialLinks?.whatsapp && (
                                <a
                                    href={hereInformation.socialLinks.whatsapp}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="WhatsApp"
                                >
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="rounded-full h-10 w-10 bg-background/80 hover:bg-background shadow-sm"
                                    >
                                        <WhatsappIcon className="h-5 w-5" />
                                        <span className="sr-only">WhatsApp</span>
                                    </Button>
                                </a>
                            )}
                        </div>

                    </div>


                    <div
                        className="relative flex items-center justify-center order-1 lg:order-2 animate-on-scroll opacity-0 px-4 md:px-2"
                        style={{ animationDelay: "0.4s" }}
                    >
                        <div className="relative w-full max-w-md aspect-square">
                            <div className="absolute inset-0 rounded-2xl overflow-hidden border-2 border-primary/10 shadow-2xl bg-gradient-to-br from-background via-background/95 to-background/90 ">
                                <Image
                                    src={hereInformation.heroImageSrc ? `/storage/${hereInformation.heroImageSrc}` : "/placeholder.svg"}
                                    alt="Profile"
                                    width={600}
                                    className="object-contain w-full h-full "
                                />
                            </div>

                            <div className="absolute -bottom-6 -right-6 p-4 rounded-xl border border-primary/20 shadow-lg bg-background/80 backdrop-blur-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="text-sm font-medium">
                                        {hereInformation.availableForProjectsText}
                                    </span>
                                </div>
                            </div>
                            <div className="absolute -top-6 -left-6 p-4 rounded-xl border border-primary/20 shadow-lg bg-background/80 backdrop-blur-sm">
                                <div className="flex items-center gap-2">
                                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                                    <span className="text-sm font-medium">
                                        {hereInformation.experienceText}
                                    </span>
                                </div>
                            </div>
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
    );
}
