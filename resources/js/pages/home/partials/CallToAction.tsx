// resources/js/Pages/Home/partials/CallToAction.tsx
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from '@inertiajs/react';

const CallToAction: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="rounded-2xl p-8 md:p-12 max-w-4xl mx-auto text-center animate-on-scroll opacity-0 border border-primary/20 bg-background shadow-lg">
          <Badge variant="outline" className="mb-4">Available for Hire</Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">Let's Work Together</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            I'm currently available for freelance work and open to new opportunities. If you have a project that needs my expertise, let's discuss how I can help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="group">
                Get in Touch
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/projects">
              <Button variant="outline" size="lg">View My Work</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
