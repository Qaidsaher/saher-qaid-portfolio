import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, Smartphone, Code, Palette } from "lucide-react";
import { Link, usePage } from "@inertiajs/react";
import type { SharedData } from "@/types";

interface Service {
  title: string;
  description: string;
  icon: string;
  link: string;
}

export default function ServicesSection() {
  // Retrieve shared services data using Inertia's usePage hook.
  const { services } = usePage<SharedData>().props;

  // Hardcoded iconMap; do not accept any props.
  const iconMap: { [key: string]: React.ReactNode } = {
    smartphone: <Smartphone className="h-6 w-6 text-primary" />,
    code: <Code className="h-6 w-6 text-primary" />,
    palette: <Palette className="h-6 w-6 text-primary" />,
    // Add other icon mappings as needed
  };

  return (
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
          {services.map((service: Service, index: number) => (
            <Card
              key={index}
              className="border border-border/40 bg-background hover:shadow-lg transition-all duration-300 animate-on-scroll opacity-0"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <CardHeader className="flex  items-center">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  {iconMap[service.icon]}
                </div>
                <CardTitle className="mb-4">{service.title}</CardTitle>
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
  );
}
