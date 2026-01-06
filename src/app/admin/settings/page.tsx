"use client";

import { useState, useEffect } from "react";
import FormField, { Input, Textarea } from "@/components/admin/FormField";

interface CompanyInfo {
    name: string;
    tagline: string;
    story: string;
    philosophy: string;
    vision: string;
    mission: string;
    yearsExperience: number;
    projectsCompleted: number;
    teamSize: number;
    awards: number;
    email: string;
    phone: string;
    address: string;
    instagram: string;
    linkedin: string;
    facebook: string;
}

export default function SettingsPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const [formData, setFormData] = useState<CompanyInfo>({
        name: "",
        tagline: "",
        story: "",
        philosophy: "",
        vision: "",
        mission: "",
        yearsExperience: 0,
        projectsCompleted: 0,
        teamSize: 0,
        awards: 0,
        email: "",
        phone: "",
        address: "",
        instagram: "",
        linkedin: "",
        facebook: "",
    });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const response = await fetch("/api/settings");
            const data = await response.json();
            if (data.info) {
                setFormData({
                    name: data.info.name || "",
                    tagline: data.info.tagline || "",
                    story: data.info.story || "",
                    philosophy: data.info.philosophy || "",
                    vision: data.info.vision || "",
                    mission: data.info.mission || "",
                    yearsExperience: data.info.yearsExperience || 0,
                    projectsCompleted: data.info.projectsCompleted || 0,
                    teamSize: data.info.teamSize || 0,
                    awards: data.info.awards || 0,
                    email: data.info.email || "",
                    phone: data.info.phone || "",
                    address: data.info.address || "",
                    instagram: data.info.instagram || "",
                    linkedin: data.info.linkedin || "",
                    facebook: data.info.facebook || "",
                });
            }
        } catch (error) {
            console.error("Failed to fetch settings:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "number" ? parseInt(value) || 0 : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage(null);

        try {
            const response = await fetch("/api/settings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to save settings");
            }

            setMessage({ type: "success", text: "Settings saved successfully!" });
        } catch (error) {
            setMessage({ type: "error", text: error instanceof Error ? error.message : "An error occurred" });
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-500 mt-1">Manage your company information</p>
            </div>

            {message && (
                <div
                    className={`mb-6 p-4 rounded-lg ${message.type === "success"
                        ? "bg-green-50 border border-green-200 text-green-600"
                        : "bg-red-50 border border-red-200 text-red-600"
                        }`}
                >
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Company Info */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
                    <h2 className="text-lg font-semibold text-gray-900">Company Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField label="Company Name">
                            <Input name="name" value={formData.name} onChange={handleChange} />
                        </FormField>
                        <FormField label="Tagline">
                            <Input name="tagline" value={formData.tagline} onChange={handleChange} />
                        </FormField>
                    </div>

                    <FormField label="Story">
                        <Textarea name="story" value={formData.story} onChange={handleChange} rows={4} />
                    </FormField>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField label="Philosophy">
                            <Textarea name="philosophy" value={formData.philosophy} onChange={handleChange} rows={3} />
                        </FormField>
                        <FormField label="Vision">
                            <Textarea name="vision" value={formData.vision} onChange={handleChange} rows={3} />
                        </FormField>
                    </div>

                    <FormField label="Mission">
                        <Textarea name="mission" value={formData.mission} onChange={handleChange} rows={3} />
                    </FormField>
                </div>

                {/* Stats */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
                    <h2 className="text-lg font-semibold text-gray-900">Statistics</h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <FormField label="Years Experience">
                            <Input type="number" name="yearsExperience" value={formData.yearsExperience} onChange={handleChange} />
                        </FormField>
                        <FormField label="Projects Completed">
                            <Input type="number" name="projectsCompleted" value={formData.projectsCompleted} onChange={handleChange} />
                        </FormField>
                        <FormField label="Team Size">
                            <Input type="number" name="teamSize" value={formData.teamSize} onChange={handleChange} />
                        </FormField>
                        <FormField label="Awards">
                            <Input type="number" name="awards" value={formData.awards} onChange={handleChange} />
                        </FormField>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
                    <h2 className="text-lg font-semibold text-gray-900">Contact Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField label="Email">
                            <Input type="email" name="email" value={formData.email} onChange={handleChange} />
                        </FormField>
                        <FormField label="Phone">
                            <Input name="phone" value={formData.phone} onChange={handleChange} />
                        </FormField>
                    </div>

                    <FormField label="Address">
                        <Textarea name="address" value={formData.address} onChange={handleChange} rows={2} />
                    </FormField>
                </div>

                {/* Social Media */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
                    <h2 className="text-lg font-semibold text-gray-900">Social Media</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormField label="Instagram">
                            <Input name="instagram" value={formData.instagram} onChange={handleChange} placeholder="@username" />
                        </FormField>
                        <FormField label="LinkedIn">
                            <Input name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="https://linkedin.com/company/..." />
                        </FormField>
                        <FormField label="Facebook">
                            <Input name="facebook" value={formData.facebook} onChange={handleChange} placeholder="https://facebook.com/..." />
                        </FormField>
                    </div>
                </div>

                {/* Submit */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="px-6 py-2.5 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 disabled:opacity-50 flex items-center gap-2"
                    >
                        {isSaving && <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                        {isSaving ? "Saving..." : "Save Settings"}
                    </button>
                </div>
            </form>
        </div>
    );
}
