import NavigationMenu from "@/app/ui/common/NavigationMenu";
import { getTranslations } from "next-intl/server";

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


export default function Layout({ children, params: { locale } }: Readonly<{
    children: React.ReactNode, params: { locale: 'vi' | 'en' };
}>) {
    return <>
        <NavigationMenu color="white" locale={locale} />
        {children}
    </>;
}