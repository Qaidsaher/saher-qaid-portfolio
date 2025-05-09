import React from "react";
import { Head, Link, usePage, useForm } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Calendar, MapPin, Edit, Eye, Trash, Plus } from "lucide-react";
import ConfirmModal from "@/components/confirm-model";
import DeleteModal from "@/components/delete-model";

interface Education {
    id: number;
    degree: string;
    institution: string;
    period?: string;
    location?: string;
}

interface PageProps {
    educations: Education[];
}

declare function route(name: string, params?: any): string;

export default function EducationIndex({ educations = [] }: PageProps) {
    //   const { educations = [] } = usePage<PageProps>().props;


    const breadcrumbs = [
        { title: "Dashboard", href: route("admin.dashboard") },
        { title: "Educations", href: route("admin.educations.index") },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Educations" />

            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Educations</h1>
                    <Button asChild className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                        <Link href={route("admin.educations.create")}>
                            <Plus className="w-5 h-5" />
                            <span>Add Education</span>
                        </Link>
                    </Button>
                </div>



                {educations.length === 0 ? (
                    <p className="text-center text-gray-500">No education records found.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {educations.map((edu) => (
                            <Card
                                key={edu.id}
                                className="bg-white rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all"
                            >
                                <CardHeader className="flex items-center space-x-2">
                                    <GraduationCap className="w-6 h-6 text-indigo-500" />
                                    <CardTitle className="text-lg font-semibold line-clamp-2">
                                        {edu.degree}
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="space-y-2">
                                    <p className="text-gray-700">
                                        <strong>Institution:</strong> {edu.institution}
                                    </p>
                                    {edu.period && (
                                        <div className="flex items-center text-gray-500 text-sm space-x-1">
                                            <Calendar className="w-4 h-4" />
                                            <span>{edu.period}</span>
                                        </div>
                                    )}
                                    {edu.location && (
                                        <div className="flex items-center text-gray-500 text-sm space-x-1">
                                            <MapPin className="w-4 h-4" />
                                            <span>{edu.location}</span>
                                        </div>
                                    )}
                                </CardContent>

                                <CardFooter className="flex justify-end space-x-2">
                                    <Button asChild variant="ghost" size="icon" className="text-green-600 hover:bg-green-100" title="View">
                                        <Link href={route("admin.educations.show", edu.id)}>
                                            <Eye className="w-5 h-5" />
                                        </Link>
                                    </Button>

                                    <Button asChild variant="ghost" size="icon" className="text-yellow-600 hover:bg-yellow-100" title="Edit">
                                        <Link href={route("admin.educations.edit", edu.id)}>
                                            <Edit className="w-5 h-5" />
                                        </Link>
                                    </Button>

                                    <DeleteModal
                                        trigger={
                                            // <Tooltip>
                                            // <TooltipTrigger asChild>
                                            <Button variant="ghost" size="icon" className="text-red-600 hover:bg-red-100" title="Delete Education">
                                                <Trash className="w-5 h-5" />
                                            </Button>
                                            // </TooltipTrigger>
                                            // <TooltipContent><p>Delete Education</p></TooltipContent>
                                            // </Tooltip>
                                        }
                                        title={`Delete Education?`}
                                        description={
                                            <>
                                                Are you sure you want to permanently delete the Education
                                                <strong className="mx-1">{edu.degree}</strong>?
                                                <br />
                                                This action cannot be undone.
                                            </>
                                        }
                                        deleteRouteName="admin.educations.destroy"
                                        // Adjust param name if needed ('service' vs 'id')
                                        deleteRouteParams={{ education: edu.id }}
                                    // onSuccessCallback={handleSuccessfulDelete}
                                    />

                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
