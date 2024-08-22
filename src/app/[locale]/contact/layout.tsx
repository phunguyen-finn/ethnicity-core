import { getTranslations } from "next-intl/server";

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

export default function Layout({ children }: any) {
    return <>
        {children}
    </>;
}
