"use client";

import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
    className?: string;
    aspectRatio?: "square" | "video" | "wide";
}

export default function ImageUpload({
    value,
    onChange,
    className,
    aspectRatio = "video",
}: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    const aspectRatioClasses = {
        square: "aspect-square",
        video: "aspect-video",
        wide: "aspect-[21/9]",
    };

    const handleUpload = useCallback(
        async (file: File) => {
            setIsUploading(true);
            try {
                const formData = new FormData();
                formData.append("file", file);

                const response = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error("Upload failed");
                }

                const data = await response.json();
                onChange(data.url);
            } catch (error) {
                console.error("Upload error:", error);
                alert("Failed to upload image");
            } finally {
                setIsUploading(false);
            }
        },
        [onChange]
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

            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                handleUpload(e.dataTransfer.files[0]);
            }
        },
        [handleUpload]
    );

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files[0]) {
                handleUpload(e.target.files[0]);
            }
        },
        [handleUpload]
    );

    const handleRemove = useCallback(() => {
        onChange("");
    }, [onChange]);

    return (
        <div className={cn("relative", className)}>
            {value ? (
                <div className={cn("relative rounded-lg overflow-hidden bg-gray-100", aspectRatioClasses[aspectRatio])}>
                    <img
                        src={value}
                        alt="Uploaded"
                        className="w-full h-full object-cover"
                    />
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            ) : (
                <label
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={cn(
                        "flex flex-col items-center justify-center rounded-lg border-2 border-dashed cursor-pointer transition-colors",
                        aspectRatioClasses[aspectRatio],
                        dragActive
                            ? "border-amber-500 bg-amber-50"
                            : "border-gray-300 bg-gray-50 hover:bg-gray-100"
                    )}
                >
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleChange}
                        className="hidden"
                        disabled={isUploading}
                    />
                    {isUploading ? (
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                            <span className="text-sm text-gray-500">Uploading...</span>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2 p-6 text-center">
                            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <div>
                                <p className="text-sm font-medium text-gray-700">
                                    Drop image here or click to upload
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    PNG, JPG up to 10MB
                                </p>
                            </div>
                        </div>
                    )}
                </label>
            )}
        </div>
    );
}
