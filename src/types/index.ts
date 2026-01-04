// Type definitions for Arsitek Studio

export interface Project {
    id: string;
    title: string;
    slug: string;
    category: Category;
    sector: Sector;
    description: string;
    coverImage: SanityImage;
    images: SanityImage[];
    client: string;
    location: string;
    year: number;
    featured: boolean;
    order: number;
}

export interface Category {
    id: string;
    title: string;
    slug: string;
    description?: string;
    icon?: SanityImage;
}

export interface Sector {
    id: string;
    title: string;
    slug: string;
}

export interface TeamMember {
    id: string;
    name: string;
    slug: string;
    role: string;
    photo: SanityImage;
    bio?: string;
    linkedin?: string;
    email?: string;
    department: 'Leadership' | 'Architecture' | 'Interior' | 'Engineering' | 'Admin';
    order: number;
}

export interface CompanyInfo {
    name: string;
    tagline: string;
    story: any[]; // Portable Text
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
    googleMapsEmbed?: string;
    instagram?: string;
    linkedin?: string;
    facebook?: string;
}

export interface SanityImage {
    _type: 'image';
    asset: {
        _ref: string;
        _type: 'reference';
    };
    hotspot?: {
        x: number;
        y: number;
        height: number;
        width: number;
    };
    alt?: string;
}

export interface ContactFormData {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
}

export interface NavItem {
    href: string;
    label: string;
}
