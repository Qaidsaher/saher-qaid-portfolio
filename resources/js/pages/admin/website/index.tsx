 
import React from "react";
import { Head, usePage, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Edit2,
  Globe,
  Mail,
  Phone,
  Info,
  MapPin,
  Award,
  Clock,
  Folder,
  Briefcase,
  Activity,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";

interface Website {
  id: number;
  websiteName: string;
  badge: string;
  heroTitle: string;
  heroDescription: string;
  ctaPrimaryText: string;
  ctaPrimaryLink: string;
  ctaSecondaryText: string;
  ctaSecondaryLink: string;
  heroImageSrc: string;
  availableForProjectsText: string;
  experienceText: string;
  socialLinks: Record<string, string>;
  status: string;
  responseTime: string;
  preferredProjects: string;
  email: string;
  phone: string;
  location: string;
  number_of_experiences: number;
}

interface WebsiteIndexProps {
  website: Website;
}

const SocialLinkIcon = ({ name }: { name: string }) => {
  switch (name.toLowerCase()) {
    case "github":
      return <Github size={16} />;
    case "linkedin":
      return <Linkedin size={16} />;
    case "twitter":
      return <Twitter size={16} />;
    case "email":
      return <Mail size={16} />;
    default:
      return <Globe size={16} />;
  }
};

export default function WebsiteIndex() {
  const { website } = usePage<WebsiteIndexProps>().props;
  const breadcrumbs = [
    { title: "Dashboard", href: "/admin/dashboard" },
    { title: "Website", href: "/admin/website" },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Website Settings" />
      <div className="w-full p-6 space-y-6">
        <h1 className="text-3xl font-bold mb-4 text-center">Website Settings</h1>

        {/* Card 1: Hero Image */}
        <Card className="w-full shadow-sm">
          <CardHeader className="px-4 py-3 border-b ">
            <h2 className="text-xl font-semibold">Hero Image</h2>
          </CardHeader>
          <CardContent className="px-6 py-3">
              <img
                src={website.heroImageSrc ? `/storage/${website.heroImageSrc}` : "/placeholder.svg"}
                alt="Hero"
                className="w-full h-64 object-cover rounded"
              />
          </CardContent>
          <CardFooter className="px-4 py-3 flex justify-end border-t ">
            <Link href={route("admin.website.edit")}>
              <Button variant="outline">
                <Edit2 className="mr-2" /> Edit Hero Image
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Card 2: Hero Information */}
        <Card className="w-full shadow-sm">
          <CardHeader className="px-4 py-3 flex items-center justify-between border-b ">
            <div className="flex items-center gap-2">
              <Globe size={20} />
              <h2 className="text-xl font-semibold">{website.websiteName}</h2>
            </div>
            <Badge  className="px-2">
              {website.badge}
            </Badge>
          </CardHeader>
          <CardContent className="px-6 py-3 space-y-3">
            <div className="flex items-center gap-2">
              <Globe size={16} />
              <span className="font-medium">Hero Title:</span>
              <span>{website.heroTitle}</span>
            </div>
            <div className="flex items-center gap-2">
              <Info size={16} />
              <span className="font-medium">Hero Description:</span>
              <span>{website.heroDescription}</span>
            </div>
          </CardContent>
          <CardFooter className="px-4 py-3 flex justify-end border-t ">
            <Link href={route("admin.website.edit")}>
              <Button variant="outline">
                <Edit2 className="mr-2" /> Edit Hero Info
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Card 3: Contact & Social Info */}
        <Card className="w-full  shadow-sm">
          <CardHeader className="px-4 py-3 border-b ">
            <h2 className="text-xl font-semibold">Contact & Social Info</h2>
          </CardHeader>
          <CardContent className="px-6 py-3 space-y-3">
            <div className="flex items-center gap-2">
              <Mail size={16} />
              <span className="font-medium">Email:</span>
              <span>{website.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} />
              <span className="font-medium">Phone:</span>
              <span>{website.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span className="font-medium">Location:</span>
              <span>{website.location}</span>
            </div>
            <div className="mt-3">
              <span className="font-medium">Social Links:</span>
              <ul className="mt-2 space-y-2">
                {Object.entries(website.socialLinks).map(([key, url]) => (
                  <li key={key} className="flex items-center gap-2">
                    <SocialLinkIcon name={key} />
                    <Link
                      href={url}
                      className="text-blue-600 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {key}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
          <CardFooter className="px-4 py-3 flex justify-end border-t ">
            <Link href={route("admin.website.edit")}>
              <Button variant="outline">
                <Edit2 className="mr-2" /> Edit Contact
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Card 4: Projects & Experience */}
        <Card className="w-full bg-white border  shadow-sm">
          <CardHeader className="px-4 py-3 border-b ">
            <h2 className="text-xl font-semibold">Projects & Experience</h2>
          </CardHeader>
          <CardContent className="px-6 py-3 space-y-3">
            <div className="flex items-center gap-2">
              <Folder size={16} />
              <span className="font-medium">Available for Projects:</span>
              <span>{website.availableForProjectsText}</span>
            </div>
            <div className="flex items-center gap-2">
              <Award size={16} />
              <span className="font-medium">Experience:</span>
              <span>
                {website.experienceText} ({website.number_of_experiences} experiences)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Activity size={16} />
              <span className="font-medium">Status:</span>
              <span>{website.status}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span className="font-medium">Response Time:</span>
              <span>{website.responseTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase size={16} />
              <span className="font-medium">Preferred Projects:</span>
              <span>{website.preferredProjects}</span>
            </div>
          </CardContent>
          <CardFooter className="px-4 py-3 flex justify-end border-t ">
            <Link href={route("admin.website.edit")}>
              <Button variant="outline">
                <Edit2 className="mr-2" /> Edit Projects
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </AppLayout>
  );
}
