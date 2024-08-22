import { Link, redirect } from "@/app/navigation";
import CollectionPage from "@/app/ui/pages/Collections/CollectionPage";
import CollectionService, { Collection } from "@/services/collection.service";
import PatternService from "@/services/pattern.service";
import { Breadcrumb } from "antd";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

export async function generateMetadata(
    { params }: any
): Promise<any> {
    const collection = await CollectionService.getCollection(params.collectionId);

    if (!collection) {
        return {
            title: '404',
        }
    }

    return {
        title: collection!.name,
        description: collection!.description,
        robots: 'index, follow',
        openGraph: {
            title: collection!.name,
            description: collection!.description,
            images: [collection!.thumbnailUrl],
            type: 'website',
            locale: collection!.language
        },
    }
}

export default async function Page({ params: { collectionId, locale } }: { params: { collectionId: string, locale: string } }) {
    unstable_setRequestLocale(locale);

    const collection = await CollectionService.getCollection(collectionId);
    const patterns = await PatternService.getPatternsByCollection(collectionId);

    const t = await getTranslations('breadcrumbs');

    if (!collection) {
        redirect('/');
        return;
    }

    return <>
        <Breadcrumb items={
            [
                { title: <Link href="/">{t('home')}</Link> },
                { title: <Link href="/library">{t('library')}</Link> },
                { title: <Link href="/collections">{t('collections')}</Link> },
                { title: collection.name }
            ]
        } />
        <CollectionPage collection={collection as Collection} patterns={patterns} />
    </>
}