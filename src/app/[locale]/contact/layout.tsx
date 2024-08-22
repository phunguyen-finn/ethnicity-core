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
        title: t('contact'),
    }
}


export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export default function Layout({ children, params }: any) {
    unstable_setRequestLocale(params.locale);
    return <>
        {children}
    </>;
}
