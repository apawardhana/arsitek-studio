"use client";

import { ReactNode } from "react";
import SmoothScroll from "@/components/animation/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface ClientLayoutProps {
    children: ReactNode;
    settings?: any;
}

export default function ClientLayout({ children, settings }: ClientLayoutProps) {
    return (
        <SmoothScroll>
            <Header />
            <main>{children}</main>
            <Footer initialSettings={settings} />
        </SmoothScroll>
    );
}
