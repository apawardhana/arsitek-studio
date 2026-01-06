"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FormField, { Input, Textarea, Select } from "@/components/admin/FormField";
import ImageUpload from "@/components/admin/ImageUpload";

const departments = ["Leadership", "Architecture", "Interior", "Engineering", "Admin"];

export default function NewTeamMemberPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        role: "",
        photo: "",
        bio: "",
        email: "",
        linkedin: "",
        department: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (name === "name") {
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
        if (!formData.name) newErrors.name = "Name is required";
        if (!formData.slug) newErrors.slug = "Slug is required";
        if (!formData.role) newErrors.role = "Role is required";
        if (!formData.photo) newErrors.photo = "Photo is required";
        if (!formData.department) newErrors.department = "Department is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch("/api/team", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Failed to create member");
            }

            router.push("/admin/team");
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
                <h1 className="text-2xl font-bold text-gray-900">Add Team Member</h1>
            </div>

            {errors.submit && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">{errors.submit}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
                    <FormField label="Photo" required error={errors.photo}>
                        <ImageUpload
                            value={formData.photo}
                            onChange={(url) => setFormData((prev) => ({ ...prev, photo: url }))}
                            aspectRatio="square"
                        />
                    </FormField>

                    <div className="grid grid-cols-2 gap-6">
                        <FormField label="Name" required error={errors.name}>
                            <Input name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" />
                        </FormField>
                        <FormField label="Slug" required error={errors.slug}>
                            <Input name="slug" value={formData.slug} onChange={handleChange} placeholder="john-doe" />
                        </FormField>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <FormField label="Role" required error={errors.role}>
                            <Input name="role" value={formData.role} onChange={handleChange} placeholder="Lead Architect" />
                        </FormField>
                        <FormField label="Department" required error={errors.department}>
                            <Select name="department" value={formData.department} onChange={handleChange}>
                                <option value="">Select department</option>
                                {departments.map((dept) => (
                                    <option key={dept} value={dept}>{dept}</option>
                                ))}
                            </Select>
                        </FormField>
                    </div>

                    <FormField label="Bio">
                        <Textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Brief biography..." rows={3} />
                    </FormField>

                    <div className="grid grid-cols-2 gap-6">
                        <FormField label="Email">
                            <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" />
                        </FormField>
                        <FormField label="LinkedIn">
                            <Input name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/..." />
                        </FormField>
                    </div>
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
                        {isSubmitting ? "Adding..." : "Add Member"}
                    </button>
                </div>
            </form>
        </div>
    );
}
