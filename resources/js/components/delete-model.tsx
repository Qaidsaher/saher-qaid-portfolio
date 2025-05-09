import { useForm } from '@inertiajs/react';
import React, { useState, FormEventHandler, ReactNode } from 'react';

import { Button } from '@/components/ui/button'; // Assuming your Button path
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader, // Import DialogHeader
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'; // Assuming your Dialog path
// You might not need InputError if there's no standard input
// import InputError from '@/components/input-error';

interface DeleteModalProps {
    /** The element that triggers the modal opening */
    trigger: ReactNode;
    /** The title displayed in the modal header */
    title: string;
    /** The descriptive text displayed below the title */
    description: ReactNode; // Allow JSX for more complex descriptions
    /** The name of the Laravel route to call for deletion */
    deleteRouteName: string;
    /** Optional parameters for the Laravel route function */
    deleteRouteParams?: object | Array<any>;
    /** Text for the confirmation delete button (default: "Delete") */
    deleteButtonText?: string;
    /** Text for the cancel button (default: "Cancel") */
    cancelButtonText?: string;
    /** Optional callback function to run on successful deletion */
    onSuccessCallback?: () => void;
    /** Optional callback function to run on deletion error */
    onErrorCallback?: (errors: Record<string, string>) => void;
    /** Optional callback function to run when the modal closes (success or cancel) */
    onCloseCallback?: () => void;
}

export default function DeleteModal({
    trigger,
    title,
    description,
    deleteRouteName,
    deleteRouteParams = {},
    deleteButtonText = 'Delete',
    cancelButtonText = 'Cancel',
    onSuccessCallback,
    onErrorCallback,
    onCloseCallback,
}: DeleteModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    // Initialize useForm - data is often empty for DELETE, but useForm handles state
    const { delete: destroy, processing, errors, reset } = useForm({});

    const handleDeleteSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        // Ensure route function is available globally (common in Inertia setups)
        if (typeof route !== 'function') {
            console.error(
                'Ziggy route function is not available globally. Make sure it is properly configured.'
            );
            return;
        }

        destroy(route(deleteRouteName, deleteRouteParams), {
            preserveScroll: true,
            onSuccess: () => {
                closeModal(); // Close modal first
                if (onSuccessCallback) {
                    onSuccessCallback(); // Then run callback
                }
            },
            onError: (errorData) => {
                // Errors are automatically available via the `errors` object from useForm
                console.error('Deletion Error:', errorData);
                if (onErrorCallback) {
                    onErrorCallback(errorData);
                }
                // You might want to keep the modal open on error, depending on UX preference
                // closeModal(); // Or maybe keep it open so user sees error?
            },
            onFinish: () => {
                // This runs after onSuccess or onError
                // Reset form state if needed (though likely not needed for empty form)
                 reset();
            },
        });
    };

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        reset(); // Reset form state (processing, errors) when closing
        if (onCloseCallback) {
            onCloseCallback();
        }
    };

    // Use onOpenChange for better state management with Dialog
    const handleOpenChange = (open: boolean) => {
        if (!open) {
            closeModal(); // Call our cleanup logic when Dialog closes itself
        } else {
            openModal();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            {/* Use asChild to avoid rendering an extra button if trigger is already one */}
            <DialogTrigger asChild onClick={openModal}>
                {trigger}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader> {/* Use DialogHeader for better structure */}
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>

                {/* Display generic errors if needed */}
                {Object.keys(errors).length > 0 && (
                     <div className="my-4 text-sm text-red-600 dark:text-red-400">
                         <p>Could not complete the deletion. Please try again.</p>
                         {/* Optionally list specific errors - often not user-friendly for delete */}
                         {/* <ul>
                             {Object.entries(errors).map(([key, value]) => (
                                 <li key={key}>{`${key}: ${value}`}</li>
                             ))}
                         </ul> */}
                     </div>
                 )}

                {/* Form is needed to trigger onSubmit */}
                <form onSubmit={handleDeleteSubmit}>
                    {/* No input fields needed for a generic delete confirmation */}
                    {/* You could add slots here later if needed */}

                    <DialogFooter className="gap-2 justify-between mt-4"> {/* Added mt-4 and justify-between */}
                         <DialogClose asChild>
                            <Button type="button" variant="secondary" onClick={closeModal}>
                                {cancelButtonText}
                            </Button>
                         </DialogClose>
                        {/* Use a standard button instead of wrapping a button tag */}
                        <Button
                            type="submit"
                            variant="destructive"
                            disabled={processing}
                        >
                            {processing ? 'Deleting...' : deleteButtonText}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
