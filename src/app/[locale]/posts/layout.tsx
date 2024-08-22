import NavigationMenu from "@/app/ui/common/NavigationMenu";

export default async function Layout({ children, params: { locale } }: Readonly<{
    children: React.ReactNode, params: { locale: 'vi' | 'en' };
}>) {
    return <>
        <NavigationMenu color="black" locale={locale} />
        {children}
    </>;
}