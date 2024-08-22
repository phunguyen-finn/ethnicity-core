import { Link, redirect } from "@/app/navigation";
import CollectionPage from "@/app/ui/pages/Collections/CollectionPage";
import CollectionService, { Collection } from "@/services/collection.service";
import PatternService from "@/services/pattern.service";
import { Breadcrumb } from "antd";
import { getTranslations } from "next-intl/server";

export default async function Page({ params: { collectionId } }: { params: { collectionId: string } }) {
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
                { title: <Link href="/collections">{t('collections')}</Link> },
                { title: collection.name }
            ]
        } />
        <CollectionPage collection={collection as Collection} patterns={patterns} />
    </>
}