import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "@/components/image";
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
  // Move observer-related effects to parent if needed (or create a custom hook)
  return (
    <section className="relative py-12 md:py-12">
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
                {hereInformation.badge}
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl">
                {hereInformation.heroTitle}
              </h1>
              <p className="max-w-[600px] text-muted-foreground text-lg md:text-xl leading-relaxed">
                {hereInformation.heroDescription}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 animate-on-scroll opacity-0" style={{ animationDelay: "0.1s" }}>
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
            {/* Social Links (you might also extract this to its own component) */}
            <div className="flex gap-4 pt-4 animate-on-scroll opacity-0" style={{ animationDelay: "0.3s" }}>
              <Link href={hereInformation.socialLinks?.github!} title="GitHub">
                <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 bg-background/80 hover:bg-background shadow-sm">
                  {/* Insert GitHub icon */}
                </Button>
              </Link>
              {/* Add other social links accordingly */}
            </div>
          </div>
          {/* Hero Image */}
          <div className="relative flex items-center justify-center order-1 lg:order-2 animate-on-scroll opacity-0 px-4 md:px-2" style={{ animationDelay: "0.4s" }}>
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute inset-0 rounded-2xl overflow-hidden border-2 border-primary/10 shadow-2xl bg-gradient-to-br from-background via-background/95 to-background/90">
                <Image
                  src={
                    hereInformation.heroImageSrc
                      ? `/storage/${hereInformation.heroImageSrc}`
                      : "/placeholder.svg"
                  }
                  alt="Profile"
                  width={600}
                  height={600}
                  className="object-contain w-full h-full"
                />
              </div>
              {/* Decorative elements, floating badges, etc. */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
