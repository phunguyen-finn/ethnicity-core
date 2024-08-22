import { Link } from "@/app/navigation";
import { CollectionsList } from "@/app/ui/pages/Collections/CollectionsList";
import { locales } from "@/config";
import CollectionService from "@/services/collection.service";
import { Breadcrumb } from "antd";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

export async function generateMetadata(
    { params, searchParams }: any,
    parent: any
): Promise<any> {
    const t = await getTranslations('breadcrumbs');
    const parentMetadata: any = await parent;

    return {
        ...parentMetadata,
        title: t('collections'),
    }
}

export function generateStaticParams() {
    return [];
}

export const revalidate = 300;

export default async function Collections({ params: { locale } }: Readonly<{
    params: { locale: 'vi' | 'en' }
}>) {
    unstable_setRequestLocale(locale);
    const t = await getTranslations('breadcrumbs');
    const [initCollections, initCursor, initHasMore] = await CollectionService.getCollectionsByLanguage(locale as any);
    return <div
        style={{ minHeight: 'max(800px, 100vh)' }}
        className='w-screen overflow-y-auto flex flex-col items-center relative max-w-[1920px] m-auto pt-[100px] pb-[5px] bg-white'>
        <div className="w-11/12 xl:w-8/12 flex flex-col relative">
            <Breadcrumb items={
                [
                    { title: <Link href="/">{t('home')}</Link> },
                    { title: <Link href="/library">{t('library')}</Link> },
                    { title: t('collections') }
                ]
            } />
            <CollectionsList initCollections={initCollections} locale={locale as any} initCursor={initCursor} initHasMore={initHasMore} />
        </div>
    </div>
}