'use client';

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/app/navigation";

export default function Page() {
    const t = useTranslations('library');

    const boxItems = [
        {
            label: t('preserve.title'),
            description: t('preserve.description'),
        },
        {
            label: t('develop.title'),
            description: t('develop.description'),
        },
        {
            label: t('apply.title'),
            description: t('apply.description'),
        },
        {
            label: t('illustrate.title'),
            description: t('illustrate.description')
        },
    ];


    return (
        <div
            style={{ minHeight: 'max(800px, 100vh)' }}
            className='w-screen overflow-y-auto justify-center items-center relative flex flex-row max-w-[1920px] m-auto pt-[80px] pb-[5px]'>
            <div className="w-11/12 xl:w-8/12 flex flex-col md:flex-row items-center">
                <div className="w-full md:w-8/12">
                    <h1 className="text-white text-xl text-extrabold md:text-4xl">{t("title")}</h1>
                    <div className="grid grid-cols-2 gap-[10px] mt-5">
                        {boxItems.map(({ label, description }) => (
                            <div key={label} className="col-span-1 rounded-xl border-white border-[1px] p-3">
                                <h3 className="text-white font-bold text-sm md:text-md">{label}</h3>
                                <p className="text-white text-sm md:text-md">{description}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full md:w-4/12 md:ml-5">
                    <Link href="/patterns" className="flex justify-center items-center py-1 w-full bg-white/[0.3] rounded-full mt-5 md:mt-0 md:h-[150px] md:rounded-lg hover:border-white hover:border-[1px]">
                        <Image
                            src="/images/patterns_button.png"
                            alt="patterns icon"
                            width={50}
                            height={50}
                            style={{
                                height: "full",
                                width: "auto",
                            }}
                        />
                        <h3 className="text-white ml-5">{t('seePatterns')}</h3>
                    </Link>
                    <Link href="/collections" className="flex justify-center items-center py-1 w-full bg-white/[0.3] rounded-full mt-5 md:h-[150px] md:rounded-lg hover:border-white hover:border-[1px] mb-5">
                        <Image
                            src="/images/collections_button.png"
                            alt="collections icon"
                            width={50}
                            height={50}
                            style={{
                                height: "full",
                                width: "auto",
                            }}
                        />
                        <h3 className="text-white ml-5">{t('seeCollections')}</h3>
                    </Link>
                </div>
            </div>
            <Image
                src="/images/library_background.png"
                objectFit="cover"
                objectPosition="center"
                layout="fill"
                alt="Background"
                className="absolute -z-10"
            />
        </div>
    );
};