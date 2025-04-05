import React from "react";
import { Head, Link, usePage } from "@inertiajs/react"; // usePage might not be needed if using direct props
import UserLayout from "@/layouts/user-layout";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Code, Smartphone, Palette, Search, ShoppingCart, Cloud, Shield,
    BarChart2, FileText, TrendingUp, Users, Award, Video, Headset, Briefcase, Icon as LucideIcon // Import base Icon type if needed
} from "lucide-react";

// Mapping from icon identifier to Lucide icon component.
const serviceIcons: { [key: string]: React.ReactElement<React.ComponentProps<LucideIcon>> } = { // More specific type
    code: <Code className="h-12 w-12 text-primary" />,
    smartphone: <Smartphone className="h-12 w-12 text-primary" />,
    palette: <Palette className="h-12 w-12 text-primary" />,
    search: <Search className="h-12 w-12 text-primary" />,
    "shopping-cart": <ShoppingCart className="h-12 w-12 text-primary" />,
    cloud: <Cloud className="h-12 w-12 text-primary" />,
    shield: <Shield className="h-12 w-12 text-primary" />,
    "bar-chart": <BarChart2 className="h-12 w-12 text-primary" />,
    "file-text": <FileText className="h-12 w-12 text-primary" />,
    "trending-up": <TrendingUp className="h-12 w-12 text-primary" />,
    users: <Users className="h-12 w-12 text-primary" />,
    award: <Award className="h-12 w-12 text-primary" />,
    video: <Video className="h-12 w-12 text-primary" />,
    headset: <Headset className="h-12 w-12 text-primary" />,
    briefcase: <Briefcase className="h-12 w-12 text-primary" />,
    // Add more icons as needed
};

// Define the structure of the service data coming from Laravel
interface ServiceData {
    id: number;
    title: string;
    short_description: string; // Match DB column names (or adjust in controller)
    detailed_description: string;
    additional_info?: string | null; // Make optional/nullable if it can be empty in DB
    icon: string; // This should match a key in serviceIcons
    features?: string[] | null; // Expecting an array of strings from JSON cast
    technologies?: string[] | null;
    gallery?: string[] | null;
    // Add other fields if passed from backend (e.g., slug, created_at)
}

// Define the structure for related works data
interface RelatedWorkData {
    id: number;
    title: string;
    image: string;
    link: string;
}

// Define the props for the component
interface ServiceShowProps {
    service: ServiceData;
    relatedWorks: RelatedWorkData[]; // Expect an array of related works
}

// --- Component Starts Here ---
const ServiceShow: React.FC<ServiceShowProps> = ({ service, relatedWorks }) => {
    // Now 'service' and 'relatedWorks' are destructured from props passed by Inertia

    // Fallback Icon if service.icon doesn't match
    const displayIcon = serviceIcons[service.icon] || <Briefcase className="h-12 w-12 text-primary" />; // Default to Briefcase or similar

    return (
        <>
            <UserLayout>
                {/* Use dynamic title */}
                <Head title={service.title} />
                <div className="max-w-5xl mx-auto px-4 py-12 md:px-6 md:py-16 space-y-12">
                    {/* Header Section */}
                    <div className="text-center">
                        <div className="flex justify-center mb-4">
                            {displayIcon} {/* Use the determined icon */}
                        </div>
                        <h1 className="text-4xl font-bold mb-4">{service.title}</h1>
                        <p className="text-lg text-muted-foreground">
                            {/* Adjust prop name if needed */}
                            {service.short_description}
                        </p>
                    </div>

                    {/* Detailed Description */}
                    <div className="prose prose-lg dark:prose-dark max-w-none">
                        <h2>About This Service</h2>
                        {/* Adjust prop name if needed */}
                        <p>{service.detailed_description}</p>
                    </div>

                    {/* Additional Information */}
                    {/* Check for existence before rendering */}
                    {service.additional_info && (
                        <div className="prose dark:prose-dark max-w-none">
                            <h3>Additional Information</h3>
                            {/* Adjust prop name if needed */}
                            <p>{service.additional_info}</p>
                        </div>
                    )}

                    {/* Features Section */}
                    {/* Check for existence and length */}
                    {service.features && service.features.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Key Features</h2>
                            <ul className="list-disc list-inside space-y-2">
                                {service.features.map((feature, index) => (
                                    <li key={index} className="text-lg text-muted-foreground">
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Technologies Section */}
                    {/* Check for existence and length */}
                    {service.technologies && service.technologies.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Technologies We Use</h2>
                            <div className="flex flex-wrap gap-2">
                                {service.technologies.map((tech, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Gallery Section */}
                    {/* Check for existence and length */}
                    {service.gallery && service.gallery.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Gallery</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {service.gallery.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image} // Assuming URLs are stored directly
                                        alt={`Gallery image ${index + 1}`}
                                        className="w-full h-48 object-cover rounded-md shadow-md"
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Related Works Section - uses relatedWorks prop */}
                    {relatedWorks && relatedWorks.length > 0 && ( // Check if relatedWorks exist and have items
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Related Works</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {relatedWorks.map((work) => (
                                    <div
                                        key={work.id}
                                        className="bg-card border rounded-md shadow-md overflow-hidden" // Use theme colors
                                    >
                                        <img
                                            src={work.image}
                                            alt={work.title}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="p-4">
                                            <h3 className="text-xl font-semibold mb-2 text-card-foreground">
                                                {work.title}
                                            </h3>
                                            <Link href={work.link}>
                                                <Button variant="outline" className="w-full">
                                                    View Project
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Call-to-Action Section */}
                    <div className="text-center space-y-4">
                        {/* Use route helper for dynamic linking if available, otherwise hardcode */}
                        <Link href={route('services.index')}> {/* Assumes you have ziggy or similar */}
                            {/* <Link href="/services"> {/* Hardcoded alternative */}
                            <Button variant="outline">Back to Services</Button>
                        </Link>
                        {/* Use route helper for dynamic linking */}
                        <Link href={route('contact')}> {/* Example: route('contact.show') */}
                            {/* <Link href="/contact"> {/* Hardcoded alternative */}
                            <Button>Get a Quote</Button> {/* Default variant often looks like primary */}
                        </Link>
                    </div>
                </div>
            </UserLayout>
        </>
    );
};


export default ServiceShow;
