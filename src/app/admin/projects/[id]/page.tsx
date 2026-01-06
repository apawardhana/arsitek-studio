"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import FormField, { Input, Textarea, Select } from "@/components/admin/FormField";
import ImageUpload from "@/components/admin/ImageUpload";
import GalleryUpload from "@/components/admin/GalleryUpload";

const categories = ["Architecture", "Interior Design", "Landscape", "Engineering"];
const sectors = ["Residential", "Commercial", "Hospitality", "Industrial", "Public"];

interface GalleryImage {
    id?: string;
    imageUrl: string;
    alt?: string;
}

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function EditProjectPage({ params }: PageProps) {
    const { id } = use(params);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        category: "",
        sector: "",
        description: "",
        coverImage: "",
        client: "",
        location: "",
        year: "",
        featured: false,
        status: "DRAFT",
        metaTitle: "",
        metaDescription: "",
    });

    const [images, setImages] = useState<GalleryImage[]>([]);

    useEffect(() => {
        fetchProject();
    }, [id]);

    const fetchProject = async () => {
        try {
            const response = await fetch(`/api/projects/${id}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Project not found");
            }

            const project = data.project;
            setFormData({
                title: project.title || "",
                slug: project.slug || "",
                category: project.category || "",
                sector: project.sector || "",
                description: project.description || "",
                coverImage: project.coverImage || "",
                client: project.client || "",
                location: project.location || "",
                year: project.year?.toString() || "",
                featured: project.featured || false,
                status: project.status || "DRAFT",
                metaTitle: project.metaTitle || "",
                metaDescription: project.metaDescription || "",
            });
            setImages(project.images || []);
        } catch (error) {
            console.error("Failed to fetch project:", error);
            setErrors({ fetch: "Failed to load project" });
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        const newErrors: Record<string, string> = {};
        if (!formData.title) newErrors.title = "Title is required";
        if (!formData.slug) newErrors.slug = "Slug is required";
        if (!formData.category) newErrors.category = "Category is required";
        if (!formData.sector) newErrors.sector = "Sector is required";
        if (!formData.description) newErrors.description = "Description is required";
        if (!formData.coverImage) newErrors.coverImage = "Cover image is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch(`/api/projects/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    images,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to update project");
            }

            router.push("/admin/projects");
        } catch (error) {
            setErrors({ submit: error instanceof Error ? error.message : "An error occurred" });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (errors.fetch) {
        return (
            <div className="text-center py-12">
                <p className="text-red-600 mb-4">{errors.fetch}</p>
                <button
                    onClick={() => router.back()}
                    className="text-amber-600 hover:text-amber-700"
                >
                    Go back
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl">
            {/* Header */}
            <div className="mb-8">
                <button
                    onClick={() => router.back()}
                    className="text-gray-600 hover:text-gray-900 flex items-center gap-2 mb-4"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                </button>
                <h1 className="text-2xl font-bold text-gray-900">Edit Project</h1>
                <p className="text-gray-500 mt-1">Update project details</p>
            </div>

            {errors.submit && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                    {errors.submit}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Info */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
                    <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField label="Title" required error={errors.title}>
                            <Input
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g. Modern Villa Bali"
                            />
                        </FormField>

                        <FormField label="Slug" required error={errors.slug}>
                            <Input
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                placeholder="e.g. modern-villa-bali"
                            />
                        </FormField>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField label="Category" required error={errors.category}>
                            <Select name="category" value={formData.category} onChange={handleChange}>
                                <option value="">Select category</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </Select>
                        </FormField>

                        <FormField label="Sector" required error={errors.sector}>
                            <Select name="sector" value={formData.sector} onChange={handleChange}>
                                <option value="">Select sector</option>
                                {sectors.map((sec) => (
                                    <option key={sec} value={sec}>
                                        {sec}
                                    </option>
                                ))}
                            </Select>
                        </FormField>
                    </div>

                    <FormField label="Description" required error={errors.description}>
                        <Textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe the project..."
                            rows={4}
                        />
                    </FormField>
                </div>

                {/* Media */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
                    <h2 className="text-lg font-semibold text-gray-900">Project Media</h2>
                    <FormField label="Cover Image" required error={errors.coverImage} description="Main image shown in listing">
                        <ImageUpload
                            value={formData.coverImage}
                            onChange={(url) => setFormData((prev) => ({ ...prev, coverImage: url }))}
                        />
                    </FormField>

                    <div className="pt-4 border-t border-gray-100">
                        <FormField label="Project Gallery" description="Additional images for the project">
                            <GalleryUpload
                                images={images}
                                onChange={setImages}
                            />
                        </FormField>
                    </div>
                </div>

                {/* Project Details */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
                    <h2 className="text-lg font-semibold text-gray-900">Project Details</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormField label="Client">
                            <Input
                                name="client"
                                value={formData.client}
                                onChange={handleChange}
                                placeholder="Client name"
                            />
                        </FormField>

                        <FormField label="Location">
                            <Input
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="e.g. Bali, Indonesia"
                            />
                        </FormField>

                        <FormField label="Year">
                            <Input
                                name="year"
                                type="number"
                                value={formData.year}
                                onChange={handleChange}
                                placeholder="2024"
                            />
                        </FormField>
                    </div>
                </div>

                {/* SEO */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
                    <h2 className="text-lg font-semibold text-gray-900">SEO Settings</h2>

                    <FormField label="Meta Title">
                        <Input
                            name="metaTitle"
                            value={formData.metaTitle}
                            onChange={handleChange}
                            placeholder="SEO title"
                        />
                    </FormField>

                    <FormField label="Meta Description">
                        <Textarea
                            name="metaDescription"
                            value={formData.metaDescription}
                            onChange={handleChange}
                            placeholder="SEO description"
                            rows={2}
                        />
                    </FormField>
                </div>

                {/* Publishing */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
                    <h2 className="text-lg font-semibold text-gray-900">Publishing</h2>

                    <div className="flex items-center gap-6">
                        <FormField label="Status">
                            <Select name="status" value={formData.status} onChange={handleChange}>
                                <option value="DRAFT">Draft</option>
                                <option value="PUBLISHED">Published</option>
                            </Select>
                        </FormField>

                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                name="featured"
                                checked={formData.featured}
                                onChange={handleChange}
                                className="w-5 h-5 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                            />
                            <span className="text-gray-700">Featured Project</span>
                        </label>
                    </div>
                </div>

                {/* Submit */}
                <div className="flex items-center justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-6 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2.5 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Saving...
                            </>
                        ) : (
                            "Save Changes"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
