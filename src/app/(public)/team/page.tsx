import prisma from "@/lib/db";
import TeamContent from "./TeamContent";

export const metadata = {
    title: "Our Team | Arsitek Studio",
    description: "Meet the minds behind Arsitek Studio's innovative designs.",
};

async function getTeam() {
    const team = await prisma.teamMember.findMany({
        orderBy: { displayOrder: "asc" },
    });
    return team;
}

export default async function TeamPage() {
    const team = await getTeam();

    return <TeamContent initialTeam={team} />;
}
