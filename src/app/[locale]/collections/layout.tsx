import NavigationMenu from "@/app/ui/common/NavigationMenu";
import { unstable_setRequestLocale } from "next-intl/server";

export const revalidate = 300;

export function generateStaticParams() {
    return [];
}

export default function Layout({ children, params: { locale } }: Readonly<{
    children: React.ReactNode, params: { locale: 'vi' | 'en' }
}>) {
    unstable_setRequestLocale(locale);
    return <>
        <NavigationMenu color="black" locale={locale} />
        {children}
    </>;
}