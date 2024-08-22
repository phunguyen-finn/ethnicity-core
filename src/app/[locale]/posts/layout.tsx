import NavigationMenu from "@/app/ui/common/NavigationMenu";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

export async function generateMetadata(
    { params, searchParams }: any,
    parent: any
): Promise<any> {
    const t = await getTranslations('breadcrumbs');
    const parentMetadata: any = await parent;

    return {
        ...parentMetadata,
        title: t('posts'),
    }
}

export function generateStaticParams() {
    return [];
}

export const revalidate = 300;

export default async function Layout({ children, params: { locale } }: Readonly<{
    children: React.ReactNode, params: { locale: 'vi' | 'en' };
}>) {
    unstable_setRequestLocale(locale);
    return <>
        <NavigationMenu color="black" locale={locale} />
        {children}
    </>;
}