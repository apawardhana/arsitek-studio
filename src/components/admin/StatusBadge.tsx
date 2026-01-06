import { cn } from "@/lib/utils";

interface StatusBadgeProps {
    status: "DRAFT" | "PUBLISHED" | "read" | "unread";
    className?: string;
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
    const styles = {
        DRAFT: "bg-yellow-100 text-yellow-800 border-yellow-200",
        PUBLISHED: "bg-green-100 text-green-800 border-green-200",
        read: "bg-gray-100 text-gray-600 border-gray-200",
        unread: "bg-blue-100 text-blue-800 border-blue-200",
    };

    const labels = {
        DRAFT: "Draft",
        PUBLISHED: "Published",
        read: "Read",
        unread: "Unread",
    };

    return (
        <span
            className={cn(
                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
                styles[status],
                className
            )}
        >
            {labels[status]}
        </span>
    );
}
