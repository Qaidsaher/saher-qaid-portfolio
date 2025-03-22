// resources/js/Pages/Home/partials/ServicesSection.tsx
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { Link } from '@inertiajs/react';

const services = [
  {
    title: "Web Development",
    description: "I build responsive, high-performance websites and web applications.",
    icon: <svg className="h-6 w-6 text-primary" />, // Replace with your icon component
    link: "/services/web-development",
  },
  {
    title: "Mobile App Development",
    description: "I create cross-platform mobile applications for seamless experiences.",
    icon: <svg className="h-6 w-6 text-primary" />,
    link: "/services/mobile-development",
  },
  {
    title: "UI/UX Design",
    description: "I design intuitive user interfaces that are both attractive and functional.",
    icon: <svg className="h-6 w-6 text-primary" />,
    link: "/services/ui-ux-design",
  },
];

const ServicesSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12 animate-on-scroll opacity-0">
          <Badge variant="outline" className="mb-2">Services</Badge>
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
                  {service.icon}
                </div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
              <CardFooter>
                <Link href={service.link} className="text-primary hover:underline inline-flex items-center group">
                  Learn more
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
