import NavigationMenu from "@/app/ui/common/NavigationMenu";
import { Metadata, ResolvingMetadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(
    { params, searchParams }: any,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const t = await getTranslations('breadcrumbs');
    const parentMetadata: any = await parent;

    return {
        ...parentMetadata,
        title: t('patterns'),
    }
}

export default function Layout({ children, params: { locale }, modal }: Readonly<{
    children: React.ReactNode, params: { locale: 'vi' | 'en' }, modal: React.ReactNode
}>) {
    return <>
        <NavigationMenu color="black" locale={locale} />
        {children}
        {modal}
    </>;
}