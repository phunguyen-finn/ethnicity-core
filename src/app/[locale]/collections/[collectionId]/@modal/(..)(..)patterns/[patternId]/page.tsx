import { redirect } from "@/app/navigation";
import PatternModal from "@/app/ui/pages/Patterns/PatternModal";
import PatternService from "@/services/pattern.service";
import { unstable_setRequestLocale } from "next-intl/server";

export default async function PatternPage({ params: { patternId, locale } }: any) {
    unstable_setRequestLocale(locale);
    const pattern = await PatternService.getPattern(patternId);

    if (!pattern) {
        redirect('/');
        return;
    }

    return <PatternModal pattern={pattern} />
}