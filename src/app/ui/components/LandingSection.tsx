'use client';

import { Link } from "@/app/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Slider from "react-slick";

export default function LandingSection() {
    const t = useTranslations('home');

    return <div>
        <div className='h-screen w-screen items-center relative min-h-[600px] flex flex-row overflow-hidden max-w-[1920px] m-auto'>
            <div>
                <Slider
                    vertical
                    autoplaySpeed={2000}
                    arrows={false}
                    autoplay={true}
                    pauseOnHover={false}
                    adaptiveHeight={true}
                    className='lg:w-10/12 2xl:w-8/12 px-4 sm:px-8 xl:px-10 overflow-hidden text-clip'
                >
                    <h1 className="text-white py-2 sm:py-4 xl:py-8 text-3xl sm:text-5xl xl:text-7xl leading-normal">{t('tagline1')}</h1>
                    <h1 className="text-white py-2 sm:py-4 xl:py-8 text-3xl sm:text-5xl xl:text-7xl leading-normal">{t('tagline2')}</h1>
                </Slider>
                <Link href='/library' className='relative'>
                    <button className='text-black text-lg sm:text-xl py-2 px-10 bg-white rounded-full cursor-pointer ml-4 sm:ml-8 xl:ml-10'>
                        <h4>{t('patternLibrary')}</h4>
                    </button>
                </Link>
            </div>
            <Image
                src="/images/landing_background.svg"
                alt="Landing background"
                objectFit="cover"
                layout="fill"
                objectPosition="bottom left"
                className="absolute -z-10"
                priority
            />
            <Image
                src="/images/landing_pattern.png"
                alt="Pattern"
                width={915}
                height={764}
                className='w-8/12 -right-[15px] sm:w-5/12 absolute lg:w-5/12 sm:right-[50px] h-auto'
                priority
            />
        </div>
    </div>
}