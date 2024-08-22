import { Link, redirect } from "@/app/navigation";
import PatternPage from "@/app/ui/pages/Patterns/PatternPage";
import PatternService from "@/services/pattern.service";
import { Breadcrumb } from "antd";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(
    { params }: any
): Promise<any> {
    const pattern = await PatternService.getPattern(params.patternId);

    if (!pattern) {
        return {
            title: '404',
        }
    }

    return {
        title: pattern!.name,
        description: pattern!.description,
        robots: 'index, follow',
        openGraph: {
            title: pattern!.name,
            description: pattern!.description,
            images: [pattern!.thumbnailUrl],
            type: 'website',
            locale: pattern!.language
        },
    }
}

export default async function Page({ params: { patternId } }: { params: { patternId: string } }) {
    const pattern = await PatternService.getPattern(patternId);
    const t = await getTranslations('breadcrumbs');

    if (!pattern) {
        redirect('/');
        return;
    }

    return <>
        <Breadcrumb items={
            [
                { title: <Link href="/">{t('home')}</Link> },
                { title: <Link href="/library">{t('library')}</Link> },
                { title: <Link href="/patterns">{t('patterns')}</Link> },
                { title: pattern.name }
            ]
        } />
        <PatternPage pattern={pattern} />
    </>
}