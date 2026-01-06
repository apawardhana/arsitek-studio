"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Modal from "@/components/admin/Modal";

interface Service {
    id: string;
    number: string;
    title: string;
    slug: string;
    description: string;
}

export default function ServicesPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; service: Service | null }>({
        isOpen: false,
        service: null,
    });
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await fetch("/api/services");
            const data = await response.json();
            setServices(data.services || []);
        } catch (error) {
            console.error("Failed to fetch services:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteModal.service) return;

        setIsDeleting(true);
        try {
            await fetch(`/api/services/${deleteModal.service.id}`, { method: "DELETE" });
            setServices(services.filter((s) => s.id !== deleteModal.service?.id));
            setDeleteModal({ isOpen: false, service: null });
        } catch (error) {
            console.error("Failed to delete service:", error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Services</h1>
                    <p className="text-gray-500 mt-1">Manage your services</p>
                </div>
                <Link
                    href="/admin/services/new"
                    className="px-4 py-2 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Service
                </Link>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center py-12">
                    <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : services.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                    <p className="text-gray-500 mb-4">No services yet</p>
                    <Link href="/admin/services/new" className="text-amber-600 hover:text-amber-700">
                        Add your first service →
                    </Link>
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="divide-y divide-gray-200">
                        {services.map((service) => (
                            <div key={service.id} className="p-6 flex items-start justify-between hover:bg-gray-50 transition-colors">
                                <div className="flex gap-4">
                                    <span className="text-2xl font-light text-amber-600">{service.number}</span>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{service.title}</h3>
                                        <p className="text-gray-500 text-sm mt-1 max-w-xl">{service.description}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Link
                                        href={`/admin/services/${service.id}`}
                                        className="p-2 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </Link>
                                    <button
                                        onClick={() => setDeleteModal({ isOpen: true, service })}
                                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <Modal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, service: null })}
                onConfirm={handleDelete}
                title="Delete Service"
                description={`Are you sure you want to delete "${deleteModal.service?.title}"?`}
                confirmText="Delete"
                variant="danger"
                isLoading={isDeleting}
            />
        </div>
    );
}
