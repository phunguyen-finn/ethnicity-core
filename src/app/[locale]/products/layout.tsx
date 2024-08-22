import NavigationMenu from "@/app/ui/common/NavigationMenu";

export default function Layout({ children, params: { locale }, modal }: Readonly<{
    children: React.ReactNode, params: { locale: 'vi' | 'en' }, modal: React.ReactNode
}>) {
    return <>
        <NavigationMenu color="black" locale={locale} />
        {children}
        {modal}
    </>;
}