import { Link } from "@/app/navigation";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

export default async function Layout({ children, modal, params: { locale } }: Readonly<{ children: React.ReactNode, modal: React.ReactNode, params: any }>) {
    unstable_setRequestLocale(locale);

    const t = await getTranslations('collections');
    return <div
        style={{ minHeight: 'max(800px, 100vh)' }}
        className='w-screen overflow-y-auto flex flex-col items-center relative max-w-[1920px] m-auto pt-[100px] pb-[5px] bg-white'>
        <div className="w-11/12 max-w-11/12 h-full xl:max-w-8/12 xl:w-8/12 flex flex-col relative">
            {children}
        </div>
        <Link href="/contact" className="bg-red-600 h-[32px] md:h-[40px] w-full flex flex-col items-center justify-center py-2 absolute bottom-0">
            <span className="text-white text-xs md:text-lg">{t('contact')}</span>
        </Link>
        {modal}
    </div>;
}