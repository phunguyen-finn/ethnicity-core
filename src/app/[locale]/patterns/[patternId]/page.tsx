import { Link, redirect } from "@/app/navigation";
import PatternPage from "@/app/ui/pages/Patterns/PatternPage";
import PatternService from "@/services/pattern.service";
import { Breadcrumb } from "antd";
import { getTranslations } from "next-intl/server";

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
                { title: <Link href="/patterns">{t('patterns')}</Link> },
                { title: pattern.name }
            ]
        } />
        <PatternPage pattern={pattern} />
    </>
}