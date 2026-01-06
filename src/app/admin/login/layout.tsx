export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // This layout overrides the admin layout for the login page
    // It doesn't include the sidebar or header
    return <>{children}</>;
}
