"use client";

import { useState, useEffect } from "react";
import Modal from "@/components/admin/Modal";

interface Submission {
    id: string;
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    isRead: boolean;
    createdAt: string;
}

export default function SubmissionsPage() {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
    const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; submission: Submission | null }>({
        isOpen: false,
        submission: null,
    });
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        fetchSubmissions();
    }, [filter]);

    const fetchSubmissions = async () => {
        setIsLoading(true);
        try {
            const params = new URLSearchParams();
            if (filter === "unread") params.set("isRead", "false");
            if (filter === "read") params.set("isRead", "true");

            const response = await fetch(`/api/submissions?${params}`);
            const data = await response.json();
            setSubmissions(data.submissions || []);
        } catch (error) {
            console.error("Failed to fetch submissions:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const markAsRead = async (id: string, isRead: boolean) => {
        try {
            await fetch(`/api/submissions/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isRead }),
            });
            setSubmissions(submissions.map((s) => (s.id === id ? { ...s, isRead } : s)));
        } catch (error) {
            console.error("Failed to update submission:", error);
        }
    };

    const handleDelete = async () => {
        if (!deleteModal.submission) return;

        setIsDeleting(true);
        try {
            await fetch(`/api/submissions/${deleteModal.submission.id}`, { method: "DELETE" });
            setSubmissions(submissions.filter((s) => s.id !== deleteModal.submission?.id));
            if (selectedSubmission?.id === deleteModal.submission.id) {
                setSelectedSubmission(null);
            }
            setDeleteModal({ isOpen: false, submission: null });
        } catch (error) {
            console.error("Failed to delete submission:", error);
        } finally {
            setIsDeleting(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Form Submissions</h1>
                <p className="text-gray-500 mt-1">Contact form messages from visitors</p>
            </div>

            {/* Filters */}
            <div className="flex gap-2">
                {(["all", "unread", "read"] as const).map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === status
                                ? "bg-amber-600 text-white"
                                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                            }`}
                    >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Submissions List */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : submissions.length === 0 ? (
                        <div className="p-12 text-center text-gray-500">No submissions found</div>
                    ) : (
                        <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
                            {submissions.map((submission) => (
                                <button
                                    key={submission.id}
                                    onClick={() => {
                                        setSelectedSubmission(submission);
                                        if (!submission.isRead) {
                                            markAsRead(submission.id, true);
                                        }
                                    }}
                                    className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${selectedSubmission?.id === submission.id ? "bg-amber-50" : ""
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        {!submission.isRead && (
                                            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between">
                                                <span className={`font-medium ${submission.isRead ? "text-gray-600" : "text-gray-900"}`}>
                                                    {submission.name}
                                                </span>
                                                <span className="text-xs text-gray-400">{formatDate(submission.createdAt)}</span>
                                            </div>
                                            <p className="text-sm text-gray-600 truncate">{submission.subject}</p>
                                            <p className="text-sm text-gray-400 truncate mt-1">{submission.message}</p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Submission Detail */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    {selectedSubmission ? (
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900">{selectedSubmission.subject}</h2>
                                    <p className="text-gray-500 text-sm mt-1">From {selectedSubmission.name}</p>
                                </div>
                                <button
                                    onClick={() => setDeleteModal({ isOpen: true, submission: selectedSubmission })}
                                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>

                            <div className="space-y-4 text-sm">
                                <div className="flex gap-2">
                                    <span className="text-gray-500 w-16">Email:</span>
                                    <a href={`mailto:${selectedSubmission.email}`} className="text-amber-600 hover:underline">
                                        {selectedSubmission.email}
                                    </a>
                                </div>
                                {selectedSubmission.phone && (
                                    <div className="flex gap-2">
                                        <span className="text-gray-500 w-16">Phone:</span>
                                        <span className="text-gray-900">{selectedSubmission.phone}</span>
                                    </div>
                                )}
                                <div className="flex gap-2">
                                    <span className="text-gray-500 w-16">Date:</span>
                                    <span className="text-gray-900">{formatDate(selectedSubmission.createdAt)}</span>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <h3 className="font-medium text-gray-900 mb-3">Message</h3>
                                <p className="text-gray-700 whitespace-pre-wrap">{selectedSubmission.message}</p>
                            </div>

                            <div className="mt-6 flex gap-3">
                                <a
                                    href={`mailto:${selectedSubmission.email}?subject=Re: ${selectedSubmission.subject}`}
                                    className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                                >
                                    Reply via Email
                                </a>
                                <button
                                    onClick={() => markAsRead(selectedSubmission.id, !selectedSubmission.isRead)}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Mark as {selectedSubmission.isRead ? "Unread" : "Read"}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-[400px] text-gray-400">
                            Select a submission to view details
                        </div>
                    )}
                </div>
            </div>

            <Modal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, submission: null })}
                onConfirm={handleDelete}
                title="Delete Submission"
                description="Are you sure you want to delete this submission?"
                confirmText="Delete"
                variant="danger"
                isLoading={isDeleting}
            />
        </div>
    );
}
