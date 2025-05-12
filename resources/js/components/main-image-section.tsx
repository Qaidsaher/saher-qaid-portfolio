// Create this file at: resources/js/Components/ProjectMainImageEditor.tsx
import React, { useState, useEffect, ChangeEvent, useRef, FormEventHandler } from 'react';
import { useForm, Head } from '@inertiajs/react'; // Added Head for potential title changes if it were a page
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { LoaderCircle, UploadCloud, XCircle, Image as ImageIcon } from 'lucide-react';

interface ProjectMainImageEditorProps {
    projectId: number;
    currentImageUrl: string | null; // Relative path like "projects/1/main_image/xyz.jpg"
    updateRouteName: string;
    onUpdateComplete?: () => void; // Optional callback
}

// Declare route function if not globally available (standard in Inertia/Laravel)
declare function route(name: string, params?: any, absolute?: boolean): string;

const ProjectMainImageEditor: React.FC<ProjectMainImageEditorProps> = ({
    projectId,
    currentImageUrl,
    updateRouteName,
    onUpdateComplete,
}) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(
        currentImageUrl ? `/storage/${currentImageUrl}` : null // Prefix with /storage/ for display
    );
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { setData, post, processing, errors, reset, clearErrors } = useForm<{
        image: File | null;
        _method: 'PATCH'; // To inform Laravel we intend a PATCH operation
    }>({
        image: null,
        _method: 'PATCH',
    });

    useEffect(() => {
        if (!selectedFile) { // Only update preview from prop if no new file is locally staged
            setPreviewUrl(currentImageUrl ? `/storage/${currentImageUrl}` : null);
        }
    }, [currentImageUrl, selectedFile]);

    useEffect(() => {
        let objectUrlToRevoke: string | null = null;
        if (previewUrl && previewUrl.startsWith('blob:')) {
            objectUrlToRevoke = previewUrl;
        }
        return () => {
            if (objectUrlToRevoke) {
                URL.revokeObjectURL(objectUrlToRevoke);
            }
        };
    }, [previewUrl]);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        clearErrors('image');
        const file = e.target.files?.[0] || null;
        setSelectedFile(file);
        setData('image', file);

        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
        } else {
            setPreviewUrl(currentImageUrl ? `/storage/${currentImageUrl}` : null);
        }
    };

    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
            fileInputRef.current.click();
        }
    };

    const handleCancelSelection = () => {
        setSelectedFile(null);
        setData('image', null);
        setPreviewUrl(currentImageUrl ? `/storage/${currentImageUrl}` : null);
        clearErrors('image');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        if (!selectedFile) {
            alert('No new image selected. Please choose an image to update.');
            return;
        }
        // `data` already contains `image: File | null` and `_method: 'PATCH'`
        post(route(updateRouteName, { project: projectId }), {
            forceFormData: true, // Essential for file uploads
            preserveScroll: true,
            onSuccess: () => {
                reset('image');
                setSelectedFile(null);
                if (onUpdateComplete) onUpdateComplete();
            },
            onError: () => {
                // Errors are automatically populated in the `errors` object from `useForm`.
                console.error('Main image update failed. Errors:', errors);
                if (onUpdateComplete) onUpdateComplete();
            },
        });
    };

    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <CardHeader>
                    <CardTitle>Project Main Image</CardTitle>
                    <CardDescription>
                        {currentImageUrl ? 'Update the' : 'Upload a'} main display image for this project.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className=" aspect-[16/9] max-h-[300px] border border-dashed rounded-md flex items-center justify-center bg-muted overflow-hidden">
                        {previewUrl ? (
                            <img src={previewUrl} alt="Project main image preview" className="object-cover h-full w-full" />
                        ) : (
                            <div className="text-center text-muted-foreground p-4">
                                <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                                <p className="mt-2 text-sm">No main image set.</p>
                            </div>
                        )}
                    </div>
                    <div>
                        <input
                            id={`project-main-image-input-${projectId}`} // Make ID unique if multiple editors on one page
                            ref={fileInputRef}
                            type="file"
                            onChange={handleFileChange}
                            className="hidden"
                            accept="image/jpeg,image/png,image/gif,image/webp"
                            disabled={processing}
                        />
                        <div className="flex items-center gap-2 flex-wrap">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={triggerFileInput}
                                disabled={processing}
                            >
                                <UploadCloud className="mr-2 h-4 w-4" />
                                {selectedFile ? `Change Image` : (currentImageUrl ? 'Choose New Image' : 'Upload Image')}
                            </Button>
                            {selectedFile && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleCancelSelection}
                                    disabled={processing}
                                    className="text-xs text-muted-foreground hover:text-destructive"
                                >
                                    <XCircle className="mr-1 h-3 w-3" />
                                    Cancel Selection
                                </Button>
                            )}
                        </div>
                        {selectedFile && (
                             <p className="mt-2 text-sm text-muted-foreground">
                                Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                            </p>
                        )}
                        <InputError message={errors.image} className="mt-2" />
                        {Object.entries(errors).map(([key, message]) =>
                           key !== 'image' && <InputError key={key} message={message} className="mt-2" />
                        )}
                    </div>
                </CardContent>
                {selectedFile && ( // Only show Save button if a new file is staged
                    <CardFooter className="border-t px-6 py-4">
                        <Button type="submit" disabled={processing || !selectedFile}>
                            {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                            Save New Main Image
                        </Button>
                    </CardFooter>
                )}
            </form>
        </Card>
    );
};

export default ProjectMainImageEditor;
