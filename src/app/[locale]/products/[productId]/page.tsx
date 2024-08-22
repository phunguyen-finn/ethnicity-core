import PatternPage from "@/app/ui/pages/Patterns/PatternPage";
import PatternService from "@/services/pattern.service";

export default async function Page({ params: { patternId } }: { params: { patternId: string } }) {
    const pattern = await PatternService.getPattern(patternId);
    return <PatternPage pattern={pattern} />
}