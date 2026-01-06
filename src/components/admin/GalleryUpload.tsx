"use client";

import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";

interface GalleryImage {
    id?: string;
    imageUrl: string;
    alt?: string;
}

interface GalleryUploadProps {
    images: GalleryImage[];
    onChange: (images: GalleryImage[]) => void;
    className?: string;
}

export default function GalleryUpload({
    images,
    onChange,
    className,
}: GalleryUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    const handleUpload = useCallback(
        async (files: FileList) => {
            setIsUploading(true);
            const newImages: GalleryImage[] = [...images];

            try {
                for (let i = 0; i < files.length; i++) {
                    const formData = new FormData();
                    formData.append("file", files[i]);

                    const response = await fetch("/api/upload", {
                        method: "POST",
                        body: formData,
                    });

                    if (!response.ok) throw new Error("Upload failed");

                    const data = await response.json();
                    newImages.push({ imageUrl: data.url });
                }
                onChange(newImages);
            } catch (error) {
                console.error("Upload error:", error);
                alert("Failed to upload some images");
            } finally {
                setIsUploading(false);
            }
        },
        [images, onChange]
    );

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);

            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                handleUpload(e.dataTransfer.files);
            }
        },
        [handleUpload]
    );

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files.length > 0) {
                handleUpload(e.target.files);
            }
        },
        [handleUpload]
    );

    const handleRemove = (index: number) => {
        const newImages = images.filter((_, i) => i !== index);
        onChange(newImages);
    };

    return (
        <div className={cn("space-y-4", className)}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((image, index) => (
                    <div key={index} className="relative group flex flex-col gap-2">
                        <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 shadow-sm border border-gray-200">
                            <img
                                src={image.imageUrl}
                                alt={image.alt || `Gallery ${index}`}
                                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => handleRemove(index)}
                                    className="p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-lg"
                                    title="Remove image"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <input
                            type="text"
                            placeholder="Alt text (SEO)"
                            value={image.alt || ""}
                            onChange={(e) => {
                                const newImages = [...images];
                                newImages[index] = { ...newImages[index], alt: e.target.value };
                                onChange(newImages);
                            }}
                            className="text-xs px-2 py-1 border border-gray-200 rounded focus:ring-1 focus:ring-amber-500 outline-none"
                        />
                    </div>
                ))}

                <label
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={cn(
                        "flex flex-col items-center justify-center aspect-video rounded-lg border-2 border-dashed cursor-pointer transition-colors",
                        dragActive
                            ? "border-amber-500 bg-amber-50"
                            : "border-gray-300 bg-gray-50 hover:bg-gray-100"
                    )}
                >
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleChange}
                        className="hidden"
                        disabled={isUploading}
                    />
                    {isUploading ? (
                        <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <div className="flex flex-col items-center gap-1 text-center p-2">
                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                            </svg>
                            <span className="text-xs font-medium text-gray-600">Add Images</span>
                        </div>
                    )}
                </label>
            </div>
            <p className="text-xs text-gray-500">
                You can upload multiple images. Drag and drop also supported.
            </p>
        </div>
    );
}
