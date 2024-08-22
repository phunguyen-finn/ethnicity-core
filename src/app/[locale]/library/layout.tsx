import NavigationMenu from "@/app/ui/common/NavigationMenu";
import { locales } from "@/config";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

export async function generateMetadata(
    { params, searchParams }: any,
    parent: any
): Promise<any> {
    const t = await getTranslations('breadcrumbs');
    const parentMetadata: any = await parent;

    return {
        ...parentMetadata,
        title: t('library'),
    }
}

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export default function Layout({ children, params: { locale } }: Readonly<{
    children: React.ReactNode, params: { locale: 'vi' | 'en' };
}>) {
    unstable_setRequestLocale(locale);
    return <>
        <NavigationMenu color="white" locale={locale} />
        {children}
    </>;
}