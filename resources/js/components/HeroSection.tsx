// resources/js/Pages/Home/partials/HeroSection.tsx
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { Link } from '@inertiajs/react';
import Image from '@/components/image';
function  HeroSection (){
  return (
    <section className="relative py-12 md:py-12 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background -z-10"></div>
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-5 -z-10"></div>
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Hero Text */}
          <div className="flex flex-col justify-center space-y-6 order-2 lg:order-1">
            <div className="space-y-4 animate-on-scroll opacity-0">
              <Badge variant="outline" className="mb-2 text-sm py-1 px-3 border-primary/30 text-primary">
                Full-Stack Developer
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl">
                Crafting Digital <span className="text-primary">Experiences</span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground text-lg md:text-xl leading-relaxed">
                I build innovative web applications and digital solutions that combine elegant design with powerful functionality.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 animate-on-scroll opacity-0" style={{ animationDelay: '0.2s' }}>
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
            <div className="flex gap-4 pt-4 animate-on-scroll opacity-0" style={{ animationDelay: '0.3s' }}>
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 bg-background/80 hover:bg-background shadow-sm">
                  <svg className="h-5 w-5" /* insert Github icon SVG or component here */ />
                  <span className="sr-only">GitHub</span>
                </Button>
              </Link>
              {/* Repeat for LinkedIn, Twitter, Email */}
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative flex items-center justify-center order-1 lg:order-2 animate-on-scroll opacity-0" style={{ animationDelay: '0.4s' }}>
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
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 p-4 rounded-xl border border-primary/20 shadow-lg bg-background/80 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Available for Projects</span>
                </div>
              </div>
              <div className="absolute -top-6 -left-6 p-4 rounded-xl border border-primary/20 shadow-lg bg-background/80 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-yellow-500" /* insert Star icon SVG or component */ />
                  <span className="text-sm font-medium">5+ Years Experience</span>
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute top-1/4 -left-12 p-3 rounded-lg border border-primary/20 shadow-lg bg-background/80 backdrop-blur-sm animate-float">
                <svg className="h-5 w-5 text-primary" /* insert Code icon SVG or component */ />
              </div>
              <div className="absolute bottom-1/4 -right-12 p-3 rounded-lg border border-primary/20 shadow-lg bg-background/80 backdrop-blur-sm animate-float" style={{ animationDelay: '1s' }}>
                <svg className="h-5 w-5 text-primary" /* insert FileText icon SVG or component */ />
              </div>
              <div className="absolute top-1/2 -right-8 p-3 rounded-lg border border-primary/20 shadow-lg bg-background/80 backdrop-blur-sm animate-float" style={{ animationDelay: '1.5s' }}>
                <svg className="h-5 w-5 text-primary" /* insert Lightbulb icon SVG or component */ />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
