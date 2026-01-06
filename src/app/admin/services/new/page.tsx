"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FormField, { Input, Textarea } from "@/components/admin/FormField";

export default function NewServicePage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [formData, setFormData] = useState({
        number: "",
        title: "",
        slug: "",
        description: "",
        icon: "",
        displayOrder: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (name === "title") {
            const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
            setFormData((prev) => ({ ...prev, slug }));
        }

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        const newErrors: Record<string, string> = {};
        if (!formData.number) newErrors.number = "Number is required";
        if (!formData.title) newErrors.title = "Title is required";
        if (!formData.slug) newErrors.slug = "Slug is required";
        if (!formData.description) newErrors.description = "Description is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch("/api/services", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Failed to create service");
            }

            router.push("/admin/services");
        } catch (error) {
            setErrors({ submit: error instanceof Error ? error.message : "An error occurred" });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl">
            <div className="mb-8">
                <button onClick={() => router.back()} className="text-gray-600 hover:text-gray-900 flex items-center gap-2 mb-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                </button>
                <h1 className="text-2xl font-bold text-gray-900">Add Service</h1>
            </div>

            {errors.submit && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">{errors.submit}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
                    <div className="grid grid-cols-3 gap-6">
                        <FormField label="Number" required error={errors.number}>
                            <Input name="number" value={formData.number} onChange={handleChange} placeholder="01" />
                        </FormField>
                        <div className="col-span-2">
                            <FormField label="Title" required error={errors.title}>
                                <Input name="title" value={formData.title} onChange={handleChange} placeholder="Architecture" />
                            </FormField>
                        </div>
                    </div>

                    <FormField label="Display Order" description="Lower numbers appear first">
                        <Input type="number" name="displayOrder" value={formData.displayOrder} onChange={handleChange} placeholder="0" />
                    </FormField>

                    <FormField label="Slug" required error={errors.slug}>
                        <Input name="slug" value={formData.slug} onChange={handleChange} placeholder="architecture" />
                    </FormField>

                    <FormField label="Description" required error={errors.description}>
                        <Textarea name="description" value={formData.description} onChange={handleChange} rows={4} placeholder="Describe the service..." />
                    </FormField>
                </div>

                <div className="flex justify-end gap-4">
                    <button type="button" onClick={() => router.back()} className="px-6 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2.5 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 disabled:opacity-50 flex items-center gap-2"
                    >
                        {isSubmitting && <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                        {isSubmitting ? "Adding..." : "Add Service"}
                    </button>
                </div>
            </form>
        </div>
    );
}
