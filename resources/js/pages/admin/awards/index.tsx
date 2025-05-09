import React from "react"; // No longer need useState here
import { Head, Link, usePage, router } from "@inertiajs/react"; // Import router for reloading
import AppLayout from "@/layouts/app-layout";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award as AwardIcon, Calendar, Eye, Edit, Trash, PlusCircle } from "lucide-react";
// Remove the old ConfirmModal import
// import ConfirmModal from "@/components/confirm-model";
import DeleteModal from "@/components/delete-model"; // Import the new DeleteModal

interface Award {
  id: number;
  name: string;
  issuer: string;
  date?: string;
  description?: string;
}

interface PageProps extends Record<string, any> {
  awards: Award[];
}

// Make sure route function is declared or globally available
declare function route(name: string, params?: any): string;

export default function AwardIndex() {
  const { awards = [] } = usePage<PageProps>().props;

  // Remove state and form related to the old modal
  // const deletionForm = useForm({});
  // const [deleteId, setDeleteId] = useState<number | null>(null);
  // const [confirmDelete, setConfirmDelete] = useState(false);

  // Remove handler functions for the old modal
  // const handleDeleteClick = (id: number) => { ... };
  // const confirmDeletion = () => { ... };
  // const cancelDeletion = () => { ... };

  // Define the success callback for the DeleteModal
  const handleSuccessfulDelete = () => {
    console.log('Award deleted successfully!');
    // Optional: Show a toast notification here
    // Example: toast.success('Award deleted!');

    // Reload the awards data after successful deletion
    router.reload({ only: ['awards']});
  };

  const breadcrumbs = [
    { title: "Dashboard", href: route("admin.dashboard") },
    { title: "Awards", href: route("admin.awards.index") },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Awards" />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Awards</h1>
          <Button asChild className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white">
            <Link href={route("admin.awards.create")}>
              <PlusCircle className="w-6 h-6" />
              <span>Add Award</span>
            </Link>
          </Button>
        </div>

        {/* Remove the old ConfirmModal instance */}
        {/* <ConfirmModal ... /> */}

        {awards.length === 0 ? (
          <p className="text-center text-gray-500">No awards found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {awards.map((award) => (
              <Card
                key={award.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all"
              >
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <AwardIcon className="w-6 h-6 text-rose-500" />
                    <CardTitle className="text-lg font-semibold line-clamp-2">
                      {award.name}
                    </CardTitle>
                  </div>
                </CardHeader>

                <CardContent className="space-y-2">
                  <p className="text-gray-700">
                    Issuer: <strong>{award.issuer}</strong>
                  </p>
                  {award.date && (
                    <div className="flex items-center text-gray-500 text-sm space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span className="whitespace-nowrap">{award.date}</span>
                    </div>
                  )}
                  {award.description && (
                    <p className="text-gray-600 line-clamp-3">
                      {award.description}
                    </p>
                  )}
                </CardContent>

                <CardFooter className="flex justify-end space-x-2">
                  <Button asChild variant="ghost" size="icon" className="text-green-600 hover:bg-green-100" title="View Award">
                    <Link href={route("admin.awards.show", award.id)}>
                      <Eye className="w-5 h-5" />
                    </Link>
                  </Button>

                  <Button asChild variant="ghost" size="icon" className="text-yellow-600 hover:bg-yellow-100" title="Edit Award">
                    <Link href={route("admin.awards.edit", award.id)}>
                      <Edit className="w-5 h-5" />
                    </Link>
                  </Button>

                  {/* --- Use DeleteModal Here --- */}
                  <DeleteModal
                      // --- Trigger Element ---
                      trigger={
                          <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-600 hover:bg-red-100"
                              title="Delete Award"
                              // No onClick needed here, DialogTrigger handles it
                          >
                              <Trash className="w-5 h-5" />
                          </Button>
                      }
                      // --- Modal Content ---
                      title={`Delete Award?`}
                      description={
                          <>
                              Are you sure you want to permanently delete the award
                              <strong className="mx-1">{award.name}</strong>?
                              <br />
                              This action cannot be undone.
                          </>
                      }
                      // --- Deletion Logic ---
                      deleteRouteName="admin.awards.destroy"
                      // Pass the specific award ID for this instance
                      // Ensure your route expects 'award' as the parameter name
                      deleteRouteParams={{ award: award.id }}
                      // --- Optional Callbacks ---
                       onSuccessCallback={handleSuccessfulDelete}
                      // --- Optional Text ---
                      // deleteButtonText="Confirm Delete"
                  />
                  {/* --- End of DeleteModal Usage --- */}

                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
