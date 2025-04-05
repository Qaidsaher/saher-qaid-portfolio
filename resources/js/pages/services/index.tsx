import React from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import UserLayout from "@/layouts/user-layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Code,
  Smartphone,
  Palette,
  Search,
  ShoppingCart,
  Cloud,
  Shield,
  BarChart2,
  FileText,
  TrendingUp,
  Users,
  Award,
  Video,
  Headset,
  Briefcase,
} from "lucide-react";

// Map icon identifiers to corresponding Lucide icons.
const serviceIcons: { [key: string]: React.ReactNode } = {
  code: <Code className="h-10 w-10 text-primary" />,
  smartphone: <Smartphone className="h-10 w-10 text-primary" />,
  palette: <Palette className="h-10 w-10 text-primary" />,
  search: <Search className="h-10 w-10 text-primary" />,
  "shopping-cart": <ShoppingCart className="h-10 w-10 text-primary" />,
  cloud: <Cloud className="h-10 w-10 text-primary" />,
  shield: <Shield className="h-10 w-10 text-primary" />,
  "bar-chart": <BarChart2 className="h-10 w-10 text-primary" />,
  "file-text": <FileText className="h-10 w-10 text-primary" />,
  "trending-up": <TrendingUp className="h-10 w-10 text-primary" />,
  users: <Users className="h-10 w-10 text-primary" />,
  award: <Award className="h-10 w-10 text-primary" />,
  video: <Video className="h-10 w-10 text-primary" />,
  headset: <Headset className="h-10 w-10 text-primary" />,
  briefcase: <Briefcase className="h-10 w-10 text-primary" />,
};

const Services = () => {
  // Receive services from the Laravel backend via Inertia.
  const { services } = usePage<{
    services: Array<{
      id: number;
      title: string;
      short_description: string;
      icon: string;
      link: string;
    }>;
  }>().props;

  return (
    <>
      <Head title="Services" />
      <div className="max-w-7xl mx-auto px-4 py-12 md:px-6 md:py-16">
        {/* Page Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Our Services
          </h1>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Explore our extensive range of services, each crafted to drive your business forward.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card
              key={service.id}
              className="hover:shadow-xl transition-shadow bg-white dark:bg-gray-800"
            >
              <CardHeader className="flex flex-col items-center gap-4 p-4">
                <div>
                  {serviceIcons[service.icon] || (
                    <Code className="h-10 w-10 text-primary" />
                  )}
                </div>
                <CardTitle className="text-center text-xl font-semibold">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <p className="text-center text-muted-foreground">
                  {service.short_description}
                </p>
              </CardContent>
              <CardFooter className="flex justify-center p-4">
                <Link href={route('services.show', service.id)}>
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

Services.layout = (page: React.ReactNode) => <UserLayout>{page}</UserLayout>;

export default Services;
