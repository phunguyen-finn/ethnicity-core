'use client';

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

export default function WorkSection() {
    const t = useTranslations('home.work');
    const [open, setOpen] = useState(false);

    return <div>
        <div className='relative h-screen w-screen flex flex-col justify-center items-center min-h-[600px] bg-white max-w-[1920px] m-auto'>
            <Image
                src="/images/work_background.svg"
                alt="Landing background"
                objectFit="cover"
                layout="fill"
                objectPosition="top left"
                className="absolute h-screen"
            />
            <Image
                src="/images/work_background.svg"
                alt="Landing background"
                objectFit="cover"
                layout="fill"
                objectPosition="bottom left"
                className="absolute h-screen"
            />
            <div className="h-10/12 relative w-11/12 sm:10/12 lg:w-7/12 flex flex-col justify-center items-center">
                <h1 className='text-black text-3xl sm:text-5xl leading-normal'>{t('title')}</h1>
                <Image
                    src="/images/work_decoration.png"
                    alt="Decoration"
                    width={1684}
                    height={318}
                    className="h-1/2 w-auto md:w-full md:h-auto my-[20px] rounded-3xl"
                />
                <div className="w-full m-auto relative">
                    <div className="absolute w-full h-full t-0 flex flex-row justify-center z-10">
                        <div className="w-9/12 h-full flex flex-row justify-between">
                            <div className="group w-1/3 relative h-full flex flex-row items-center justify-center mr-2 cursor-pointer">
                                <Image
                                    src="/images/work_button.svg"
                                    objectFit="cover"
                                    layout="fill"
                                    alt="Projects"
                                    className="h-full w-auto grayscale group-hover:grayscale-0 group-hover:hue-rotate-[160deg] group-hover:saturate-[4]"
                                />
                                <p className="text-xs sm:text-sm lg:text-xl font-medium text-teal-400 z-10">{t('projects')}</p>
                            </div>
                            <div className="group w-1/3 relative h-full flex flex-row items-center justify-center mx-2 cursor-pointer">
                                <Image
                                    src="/images/work_button.svg"
                                    objectFit="cover"
                                    layout="fill"
                                    alt="Services"
                                    className="h-full w-auto grayscale group-hover:grayscale-0 group-hover:hue-rotate-[2deg] group-hover:saturate-[20]"
                                />
                                <p className="text-xs sm:text-sm lg:text-xl font-medium text-red-400 z-10">{t('services')}</p>
                            </div>
                            <div className="group w-1/3 relative h-full flex flex-row items-center justify-center text-center ml-2 cursor-pointer">
                                <Image
                                    src="/images/work_button.svg"
                                    objectFit="cover"
                                    layout="fill"
                                    alt="On Media"
                                    className="h-full w-auto grayscale group-hover:grayscale-0 group-hover:hue-rotate-[50deg] group-hover:saturate-[4.5] "
                                />
                                <p className="text-xs sm:text-sm lg:text-xl font-medium text-yellow-400 z-10">{t('media')}</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-full">
                        <Image
                            src="/images/work_button_decoration.svg"
                            width={1683}
                            height={229}
                            alt="Decoration"
                            className="w-full h-auto"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
}