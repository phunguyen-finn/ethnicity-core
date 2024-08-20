'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Slider from "react-slick";

export default function HomePage() {


  const t = useTranslations('home');
  return <div className='h-screen w-screen flex flex-row items-center'>
    <Image
      className='-z-10'
      src="/images/landing_background.png"
      alt="Landing background"
      layout="fill"
      objectFit="cover"
      objectPosition='bottom left'
    />
    <Slider
      vertical
      autoplaySpeed={2000}
      arrows={false}
      autoplay={true}
      draggable={false}
      pauseOnHover={false}
      className='w-screen px-4 sm:px-8 xl:px-10'
    >
      <h1 className="text-white py-2 sm:py-4 xl:py-8 text-3xl sm:text-5xl xl:text-7xl leading-normal">{t('tagline1')}</h1>
      <h1 className="text-white py-2 sm:py-4 xl:py-8 text-3xl sm:text-5xl xl:text-7xl leading-normal">{t('tagline2')}</h1>
    </Slider>
    <Image
      src="/images/landing_pattern.png"
      alt="Pattern"
      width={915}
      height={764}
      className='w-[400px] h-auto'

    />
  </div>;
}