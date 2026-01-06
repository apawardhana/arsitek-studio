"use client";

import { useState, useEffect } from "react";
import StatsCard from "@/components/admin/StatsCard";

interface AnalyticsData {
    pageViews: number;
    projectViews: number;
    topPages: { slug: string; views: number }[];
    topProjects: { slug: string; views: number }[];
    dailyViews: { date: string; views: number }[];
    submissions: { total: number; unread: number };
}

export default function AnalyticsPage() {
    const [data, setData] = useState<AnalyticsData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [days, setDays] = useState(30);

    useEffect(() => {
        fetchAnalytics();
    }, [days]);

    const fetchAnalytics = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/analytics/stats?days=${days}`);
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error("Failed to fetch analytics:", error);
        } finally {
            setIsLoading(false);
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
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
                    <p className="text-gray-500 mt-1">Website traffic and engagement</p>
                </div>
                <select
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                    className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-700"
                >
                    <option value={7}>Last 7 days</option>
                    <option value={30}>Last 30 days</option>
                    <option value={90}>Last 90 days</option>
                </select>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Page Views"
                    value={data?.pageViews?.toLocaleString() || "0"}
                    description={`Last ${days} days`}
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    }
                />
                <StatsCard
                    title="Project Views"
                    value={data?.projectViews?.toLocaleString() || "0"}
                    description={`Last ${days} days`}
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                    }
                />
                <StatsCard
                    title="Total Submissions"
                    value={data?.submissions?.total?.toString() || "0"}
                    description={`${data?.submissions?.unread || 0} unread`}
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                    }
                />
                <StatsCard
                    title="Avg Daily Views"
                    value={data?.dailyViews ? Math.round(data.dailyViews.reduce((a, b) => a + b.views, 0) / 7).toString() : "0"}
                    description="Last 7 days"
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    }
                />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Daily Views Chart */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="font-semibold text-gray-900 mb-6">Daily Views (Last 7 Days)</h2>
                    <div className="h-48 flex items-end gap-2">
                        {data?.dailyViews?.map((day) => {
                            const maxViews = Math.max(...(data.dailyViews?.map((d) => d.views) || [1]));
                            const height = maxViews > 0 ? (day.views / maxViews) * 100 : 0;
                            return (
                                <div key={day.date} className="flex-1 flex flex-col items-center gap-2">
                                    <div
                                        className="w-full bg-amber-500 rounded-t-lg transition-all duration-300 hover:bg-amber-600"
                                        style={{ height: `${Math.max(height, 4)}%` }}
                                    />
                                    <span className="text-xs text-gray-500">{new Date(day.date).toLocaleDateString("en-US", { weekday: "short" })}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Top Pages */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h2 className="font-semibold text-gray-900 mb-4">Top Pages</h2>
                    {data?.topPages?.length ? (
                        <div className="space-y-3">
                            {data.topPages.slice(0, 5).map((page, index) => (
                                <div key={page.slug} className="flex items-center gap-3">
                                    <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium text-gray-600">
                                        {index + 1}
                                    </span>
                                    <span className="flex-1 text-gray-700 truncate">{page.slug || "/"}</span>
                                    <span className="text-gray-500 text-sm">{page.views} views</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-400 text-center py-8">No data yet</p>
                    )}
                </div>

                {/* Top Projects */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 lg:col-span-2">
                    <h2 className="font-semibold text-gray-900 mb-4">Top Projects</h2>
                    {data?.topProjects?.length ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {data.topProjects.slice(0, 6).map((project, index) => (
                                <div key={project.slug} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <span className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-sm font-medium text-amber-600">
                                        {index + 1}
                                    </span>
                                    <span className="flex-1 text-gray-700 truncate">{project.slug}</span>
                                    <span className="text-amber-600 font-medium">{project.views}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-400 text-center py-8">No project views yet</p>
                    )}
                </div>
            </div>
        </div>
    );
}
