import React, { useState, useEffect, useRef, ChangeEventHandler, FormEventHandler } from 'react';
import { useForm } from '@inertiajs/react'; // Assuming 'route' is globally available (e.g., via Ziggy)
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import InputError from '@/components/input-error';
import DeleteModal from '@/components/delete-model';
import { UploadCloud, Trash, Edit, X, Check, Save, LoaderCircle } from 'lucide-react';

// --- Helper Functions ---
const getFileExtension = (filename: string): string => {
    if (!filename) return '';
    const lastDot = filename.lastIndexOf('.');
    // Ensure dot is present, not the first char, and not the last char
    if (lastDot === -1 || lastDot === 0 || lastDot === filename.length - 1) {
        return ''; // No valid extension found
    }
    return filename.substring(lastDot); // Returns ".jpg", ".png", etc.
};

const getFileNameWithoutExtension = (filename: string): string => {
    if (!filename) return '';
    const lastDot = filename.lastIndexOf('.');
    if (lastDot === -1 || lastDot === 0) { // No dot, or file like ".bashrc"
        return filename;
    }
    return filename.substring(0, lastDot);
};

// --- Type Definitions ---
export type Gallery = {
    id: number;
    project_id: number;
    image_url: string;
    caption: string | null;
};

interface ClientStagedFile {
    id: string; // Unique client-side ID
    file: File;
    previewUrl: string;
    captionBase: string; // User-editable part of the caption
    originalExtension: string; // e.g., ".jpg"
}

interface BackendFilePayload {
    file: File;
    caption: string; // Final caption: captionBase + originalExtension
}

type GalleryUploadForm = {
    images: BackendFilePayload[];
};

type CaptionUpdateForm = {
    caption: string;
};

interface GallerySectionProps {
    projectId: number;
    initialGalleries: Gallery[];
}

// Declare route function if not globally available (standard in Inertia/Laravel)
declare function route(name: string, params?: any, absolute?: boolean): string;

export default function GallerySection({ projectId, initialGalleries }: GallerySectionProps) {
    const [galleries, setGalleries] = useState<Gallery[]>(initialGalleries);
    const [stagedFiles, setStagedFiles] = useState<ClientStagedFile[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [editingCaptionId, setEditingCaptionId] = useState<number | null>(null);
    const [currentEditedCaption, setCurrentEditedCaption] = useState<string>(''); // For existing gallery item caption edit

    // Form for new image uploads
    const {
        setData: setUploadFormData,
        post: postUpload,
        processing: uploading,
        errors: uploadErrors,
        reset: resetUploadForm,
        progress: uploadProgress,
        clearErrors: clearUploadErrors,
    } = useForm<GalleryUploadForm>({
        images: [],
    });

    // Form for updating captions of existing images
    const {
        setData: setCaptionUpdateData,
        put: updateExistingCaption,
        processing: updatingExistingCaption,
        errors: captionUpdateErrors,
        reset: resetCaptionUpdateForm,
        clearErrors: clearCaptionUpdateErrors,
    } = useForm<CaptionUpdateForm>({
        caption: '',
    });

    useEffect(() => {
        setGalleries(initialGalleries);
    }, [initialGalleries]);

    // Effect for cleaning up Object URLs
    useEffect(() => {
        const currentStagedFiles = stagedFiles;
        // This cleanup function will be called when the component unmounts
        // or when the `stagedFiles` dependency changes (before the effect runs again).
        // It will revoke URLs from the version of `stagedFiles` captured when this effect last ran.
        return () => {
            currentStagedFiles.forEach(sf => {
                if (sf.previewUrl && sf.previewUrl.startsWith('blob:')) {
                    URL.revokeObjectURL(sf.previewUrl);
                }
            });
        };
    }, [stagedFiles]);


    // --- Staged Files Handling (New Uploads) ---
    const triggerFileInput = () => {
        clearUploadErrors();
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Clear previous selection to allow re-selecting same file
            fileInputRef.current.click();
        }
    };

    const handleFileSelectChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        if (e.target.files) {
            const newFilesArray = Array.from(e.target.files);
            const newClientStagedFiles: ClientStagedFile[] = newFilesArray.map((file, index) => ({
                id: `${Date.now()}-${file.name}-${index}`,
                file,
                previewUrl: URL.createObjectURL(file),
                captionBase: getFileNameWithoutExtension(file.name), // Default caption to filename
                originalExtension: getFileExtension(file.name),
            }));
            setStagedFiles(prev => [...prev, ...newClientStagedFiles]);
        }
    };

    const handleStagedCaptionBaseChange = (stagedFileId: string, newCaptionBase: string) => {
        setStagedFiles(prev =>
            prev.map(sf =>
                sf.id === stagedFileId ? { ...sf, captionBase: newCaptionBase } : sf
            )
        );
    };

    const removeStagedFile = (stagedFileId: string) => {
        // Note: The useEffect for cleanup will handle revoking the URL when `stagedFiles` updates.
        // If immediate revocation is desired (e.g., before state update), you could do it here,
        // but ensure it doesn't conflict with the useEffect cleanup.
        // For simplicity, relying on the useEffect is often cleaner.
        setStagedFiles(prev => prev.filter(sf => sf.id !== stagedFileId));
    };

    const handleUploadStagedFiles: FormEventHandler = (e) => {
        e.preventDefault();
        if (stagedFiles.length === 0) {
            alert('Please select some files to upload.');
            return;
        }

        const filesToUpload: BackendFilePayload[] = stagedFiles.map(sf => ({
            file: sf.file,
            caption: (sf.captionBase || '') + sf.originalExtension,
        }));

        setUploadFormData('images', filesToUpload);

        postUpload(route('admin.projects.galleries.store', { project: projectId }), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setStagedFiles([]); // This will trigger the useEffect to clean up old URLs
                resetUploadForm();
            },
            onError: (errors) => {
                console.error('Upload failed:', errors);
                // Consider showing a more user-friendly error message
            },
        });
    };

    // --- Existing Gallery Item Caption Editing ---
    const startExistingCaptionEdit = (galleryItem: Gallery) => {
        setEditingCaptionId(galleryItem.id);
        const caption = galleryItem.caption || '';
        setCurrentEditedCaption(caption); // Use dedicated state for the input field
        setCaptionUpdateData('caption', caption); // Set form data
        clearCaptionUpdateErrors();
    };

    const cancelExistingCaptionEdit = () => {
        setEditingCaptionId(null);
        setCurrentEditedCaption('');
        resetCaptionUpdateForm();
    };

    const handleExistingCaptionInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setCurrentEditedCaption(e.target.value);
        setCaptionUpdateData('caption', e.target.value);
    };

    const saveExistingCaption = (galleryId: number) => {
        // captionUpdateData is already set by handleExistingCaptionInputChange
        updateExistingCaption(route('admin.projects.galleries.update', { gallery: galleryId }), {
            preserveScroll: true,
            onSuccess: () => {
                setEditingCaptionId(null);
                resetCaptionUpdateForm();
                // The list of galleries will be updated by Inertia reloading props from backend
            },
            onError: (errors) => {
                console.error('Caption update failed:', errors);
                // Errors for this specific edit will be in captionUpdateErrors
            }
        });
    };

    return (
        <Card className="mt-6 shadow-md">
            <CardHeader>
                <CardTitle>Project Gallery</CardTitle>
                <CardDescription>Manage images for this project's gallery.</CardDescription>
            </CardHeader>
            <CardContent>
                {/* --- Section: Upload New Images --- */}
                <form onSubmit={handleUploadStagedFiles} className="mb-10 border-b pb-8">
                    <h3 className="text-lg font-semibold mb-3">Add New Images</h3>
                    <div className="mb-4">
                        <input
                            id="gallery-image-upload"
                            ref={fileInputRef}
                            type="file"
                            multiple
                            onChange={handleFileSelectChange}
                            className="hidden"
                            accept="image/jpeg,image/png,image/gif,image/webp" // No spaces in accept attribute
                            disabled={uploading}
                        />
                        <Button type="button" variant="outline" onClick={triggerFileInput} disabled={uploading}>
                            <UploadCloud className="w-4 h-4 mr-2" /> Select Images...
                        </Button>
                        {/* Display top-level errors for 'images' array (e.g., "images field is required") */}
                        {uploadErrors.images && typeof uploadErrors.images === 'string' && (
                            <InputError message={uploadErrors.images} className="mt-2" />
                        )}
                        {/* Display other general errors not specific to 'images' field but from upload form */}
                        {Object.entries(uploadErrors)
                            .filter(([key]) => key !== 'images') // Exclude 'images' if handled above
                            .map(([key, message]) => (
                                <InputError key={key} message={message as string} className="mt-2" />
                        ))}
                    </div>

                    {/* Staging Area */}
                    {stagedFiles.length > 0 && (
                        <div className="space-y-6 mb-6">
                            <h4 className="text-md font-medium">Staging ({stagedFiles.length} image{stagedFiles.length === 1 ? '' : 's'})</h4>
                            {stagedFiles.map((sf) => (
                                <div key={sf.id} className="flex flex-col sm:flex-row items-start gap-4 p-3 border rounded-md bg-muted/20">
                                    <img src={sf.previewUrl} alt={`Preview of ${sf.file.name}`} className="w-24 h-24 object-cover rounded-md border flex-shrink-0 bg-white" />
                                    <div className="flex-grow space-y-2 min-w-0"> {/* Added min-w-0 for flex child text overflow */}
                                        <Label htmlFor={`caption-${sf.id}`} className="text-xs font-medium text-muted-foreground truncate block" title={sf.file.name}>
                                            {sf.file.name} <span className="text-gray-400">({(sf.file.size / 1024).toFixed(1)} KB)</span>
                                        </Label>
                                        <div className="flex items-stretch"> {/* Use items-stretch for equal height */}
                                            <Input
                                                id={`caption-${sf.id}`}
                                                type="text"
                                                value={sf.captionBase}
                                                onChange={(e) => handleStagedCaptionBaseChange(sf.id, e.target.value)}
                                                placeholder="Caption base name"
                                                className="h-9 text-sm rounded-r-none focus:z-10" // Added focus:z-10
                                                disabled={uploading}
                                            />
                                            <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-input bg-muted text-sm text-muted-foreground h-9">
                                                {sf.originalExtension || '(no ext)'}
                                            </span>
                                        </div>
                                    </div>
                                    <Button type="button" variant="ghost" size="icon" onClick={() => removeStagedFile(sf.id)} className="h-8 w-8 text-red-500 hover:bg-red-100 flex-shrink-0 mt-1 sm:mt-0" title="Remove from staging" disabled={uploading}>
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Upload Button & Progress */}
                    {stagedFiles.length > 0 && (
                         <div className="flex flex-col sm:flex-row items-center gap-4">
                             <Button type="submit" disabled={uploading || stagedFiles.length === 0} className="w-full sm:w-auto">
                                {uploading && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                                Upload {stagedFiles.length} Image{stagedFiles.length === 1 ? '' : 's'}
                            </Button>
                            {uploading && uploadProgress && (
                                <div className="w-full sm:flex-1 flex items-center gap-2 mt-2 sm:mt-0"> {/* Changed sm:w-1/2 to sm:flex-1 */}
                                    <Progress value={uploadProgress.percentage} className="h-2 flex-grow" />
                                    <span className="text-xs text-muted-foreground">{uploadProgress.percentage?.toFixed(0)}%</span>
                                </div>
                            )}
                        </div>
                    )}
                </form>

                {/* --- Section: Existing Gallery Images --- */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">Current Gallery Images</h3>
                    {galleries.length === 0 ? (
                        <p className="text-muted-foreground">No images uploaded yet.</p>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {galleries.map((item) => (
                                <Card key={item.id} className="overflow-hidden group relative pt-0">
                                    <img src={`/storage/${item.image_url}`} alt={item.caption || `Gallery image ${item.id}`} className="aspect-square w-full object-cover transition-transform group-hover:scale-105 bg-gray-200" />
                                    <CardContent className="p-2.5 space-y-1.5">
                                        {editingCaptionId === item.id ? (
                                            <div className="space-y-1.5">
                                                <Input type="text" value={currentEditedCaption} onChange={handleExistingCaptionInputChange} placeholder="Enter caption" disabled={updatingExistingCaption} className={`h-8 text-sm ${captionUpdateErrors.caption ? 'border-red-500' : ''}`} />
                                                <InputError message={captionUpdateErrors.caption} className="text-xs" />
                                                <div className="flex gap-1 justify-end">
                                                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={cancelExistingCaptionEdit} disabled={updatingExistingCaption} title="Cancel"><X className="h-4 w-4" /></Button>
                                                    <Button variant="ghost" size="icon" className="h-7 w-7 text-green-600 hover:bg-green-100" onClick={() => saveExistingCaption(item.id)} disabled={updatingExistingCaption} title="Save Caption">
                                                        {updatingExistingCaption ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex justify-between items-start gap-1">
                                                <p className="text-xs flex-1 break-words leading-snug min-h-[28px]">{item.caption || <span className="text-muted-foreground italic text-xs">No caption</span>}</p>
                                                <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-foreground flex-shrink-0" onClick={() => startExistingCaptionEdit(item)} title="Edit Caption"><Edit className="h-3 w-3" /></Button>
                                            </div>
                                        )}
                                    </CardContent>
                                    <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <DeleteModal
                                            trigger={<Button variant="destructive" size="icon" className="h-7 w-7" title="Delete Image"><Trash className="w-3.5 h-3.5" /></Button>}
                                            title={`Delete Gallery Image?`}
                                            description={<>Are you sure you want to delete this image? {item.caption && <>Caption: <strong className="mx-1">{item.caption}</strong></>} This action cannot be undone.</>}
                                            deleteRouteName="admin.projects.galleries.destroy"
                                            deleteRouteParams={{ gallery: item.id }}
                                        />
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
