import { redirect } from "@/app/navigation";
import PatternModal from "@/app/ui/pages/Patterns/PatternModal";
import PatternService from "@/services/pattern.service";

export default async function PatternPage({ params: { patternId } }: { params: { patternId: string } }) {
    const pattern = await PatternService.getPattern(patternId);

    if (!pattern) {
        redirect('/');
        return;
    }

    return <PatternModal pattern={pattern} />
}