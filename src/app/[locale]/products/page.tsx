import { PatternsList } from "@/app/ui/pages/Patterns/PatternsList";
import PatternService from "@/services/pattern.service";

export default async function Patterns({ params: { locale } }: Readonly<{
    params: { locale: 'vi' | 'en' }
}>) {
    const [initPatterns, initCursor, initHasMore] = await PatternService.getPatternsByLanguage(locale as any);
    return <div
        style={{ minHeight: 'max(800px, 100vh)' }}
        className='w-screen overflow-y-auto flex flex-col items-center relative max-w-[1920px] m-auto pt-[100px] pb-[5px] bg-white'>
        <div className="w-11/12 xl:w-8/12 flex flex-col items-center relative">
            <PatternsList initPatterns={initPatterns} locale={locale as any} initCursor={initCursor} initHasMore={initHasMore} />
        </div>
    </div>
}