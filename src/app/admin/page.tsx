import StatsCard from "@/components/admin/StatsCard";
import StatusBadge from "@/components/admin/StatusBadge";
import Link from "next/link";
import prisma from "@/lib/db";

async function getDashboardData() {
    const [
        totalProjects,
        publishedProjects,
        draftProjects,
        teamCount,
        totalSubmissions,
        unreadSubmissions,
        recentProjects,
        recentSubmissions,
        totalViews
    ] = await Promise.all([
        prisma.project.count(),
        prisma.project.count({ where: { status: "PUBLISHED" } }),
        prisma.project.count({ where: { status: "DRAFT" } }),
        prisma.teamMember.count(),
        prisma.formSubmission.count(),
        prisma.formSubmission.count({ where: { isRead: false } }),
        prisma.project.findMany({
            take: 5,
            orderBy: { updatedAt: "desc" },
            select: {
                id: true,
                title: true,
                status: true,
                updatedAt: true,
            }
        }),
        prisma.formSubmission.findMany({
            take: 5,
            orderBy: { createdAt: "desc" },
        }),
        prisma.analyticsEvent.count({
            where: {
                type: { in: ["PAGE_VIEW", "PROJECT_VIEW"] },
                createdAt: {
                    gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                }
            }
        })
    ]);

    return {
        stats: {
            projects: totalProjects,
            published: publishedProjects,
            draft: draftProjects,
            views: totalViews,
            teamMembers: teamCount,
            submissions: totalSubmissions,
            unreadSubmissions,
        },
        recentProjects,
        recentSubmissions
    };
}

const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString();
};

export default async function AdminDashboard() {
    const data = await getDashboardData();

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-500 mt-1">Welcome back! Here&apos;s what&apos;s happening.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Projects"
                    value={data.stats.projects}
                    description={`${data.stats.published} published, ${data.stats.draft} draft`}
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                    }
                />
                <StatsCard
                    title="Page Views"
                    value={data.stats.views.toLocaleString()}
                    description="Last 30 days"
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    }
                />
                <StatsCard
                    title="Team Members"
                    value={data.stats.teamMembers}
                    description="Across all departments"
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    }
                />
                <StatsCard
                    title="Form Submissions"
                    value={data.stats.submissions}
                    description={`${data.stats.unreadSubmissions} unread messages`}
                    icon={
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                    }
                />
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Projects */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                        <h2 className="font-semibold text-gray-900">Recent Projects</h2>
                        <Link href="/admin/projects" className="text-sm text-amber-600 hover:text-amber-700">
                            View all →
                        </Link>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {data.recentProjects.length > 0 ? (
                            data.recentProjects.map((project) => (
                                <Link
                                    key={project.id}
                                    href={`/admin/projects/${project.id}`}
                                    className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                                >
                                    <div>
                                        <h3 className="font-medium text-gray-900">{project.title}</h3>
                                        <p className="text-sm text-gray-500">Updated {formatDate(project.updatedAt)}</p>
                                    </div>
                                    <StatusBadge status={project.status as any} />
                                </Link>
                            ))
                        ) : (
                            <div className="px-6 py-8 text-center text-gray-500 text-sm">No projects yet</div>
                        )}
                    </div>
                </div>

                {/* Recent Submissions */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                        <h2 className="font-semibold text-gray-900">Recent Submissions</h2>
                        <Link href="/admin/submissions" className="text-sm text-amber-600 hover:text-amber-700">
                            View all →
                        </Link>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {data.recentSubmissions.length > 0 ? (
                            data.recentSubmissions.map((submission) => (
                                <Link
                                    key={submission.id}
                                    href="/admin/submissions"
                                    className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        {!submission.isRead && (
                                            <span className="w-2 h-2 bg-blue-500 rounded-full" />
                                        )}
                                        <div>
                                            <h3 className="font-medium text-gray-900">{submission.name}</h3>
                                            <p className="text-sm text-gray-500 truncate max-w-[200px]">{submission.subject}</p>
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-400">{formatDate(submission.createdAt)}</span>
                                </Link>
                            ))
                        ) : (
                            <div className="px-6 py-8 text-center text-gray-500 text-sm">No submissions yet</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-semibold">Quick Actions</h2>
                        <p className="text-amber-100 mt-1">Get started with common tasks</p>
                    </div>
                    <div className="flex gap-3">
                        <Link
                            href="/admin/projects/new"
                            className="px-4 py-2 bg-white text-amber-600 rounded-lg font-medium hover:bg-amber-50 transition-colors"
                        >
                            New Project
                        </Link>
                        <Link
                            href="/admin/team/new"
                            className="px-4 py-2 bg-white/20 text-white rounded-lg font-medium hover:bg-white/30 transition-colors"
                        >
                            Add Team Member
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
