'use client';

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/app/navigation";
import styled from "styled-components";

export default function RecognitionSection() {
    const t = useTranslations('home.recognition');

    return (
        <div>
            <div className='h-screen w-screen items-center relative min-h-[600px] flex flex-col justify-center overflow-hidden max-w-[1920px] m-auto bg-white'>
                <Image
                    src="/images/recognition_decoration.svg"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="top left"
                    alt="Procedure decoration"
                    className="z-0"
                />
                <div className="h-10/12 relative w-11/12 sm:10/12 lg:w-8/12 xl:w-7/12 flex flex-col justify-center items-center">
                    <h1 className='text-black text-3xl sm:text-5xl leading-normal'>{t('title')}</h1>
                    <div className='flex flex-col md:flex-row w-full justify-between mt-5'>
                        <div className="relative p-5 border-[1px] border-rose-500 md:w-8/12">
                            <Image
                                src="/images/corner_decoration.svg"
                                width={100}
                                height={100}
                                alt="Decoration"
                                className="absolute top-0 left-0 -translate-x-[25%] -translate-y-[25%]"
                            />
                            <Image
                                src="/images/corner_decoration.svg"
                                width={100}
                                height={100}
                                alt="Decoration"
                                className="absolute bottom-0 right-0 rotate-180 translate-x-[25%] translate-y-[25%]"
                            />
                            <p className="font-bold text-xs sm:text-base text-justify">{t('head')}</p>
                            <p className="mt-5 text-xs sm:text-base text-justify">{t('body')}</p>
                        </div>

                        <div>
                            <div className="w-full flex flex-col items-center mt-5">
                                <h3>{t('presentedAt')}</h3>
                                <Image
                                    src="/images/presented_at.png"
                                    alt="Featured on"
                                    width={200}
                                    height={50}
                                />
                            </div>
                            <div className="w-full flex flex-col items-center mt-5">
                                <h3>{t('featuredOn')}</h3>
                                <Image
                                    src="/images/featured_on.png"
                                    alt="Featured on"
                                    width={200}
                                    height={50}
                                />
                            </div>
                            <div className="w-full flex flex-col items-center mt-5">
                                <h3>{t('partnerWith')}</h3>
                                <Image
                                    src="/images/partner_with.png"
                                    alt="Featured on"
                                    width={100}
                                    height={50}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Link href="/contact" className="bg-red-600 h-[32px] md:h-[40px] w-full absolute bottom-0 flex flex-col items-center justify-center py-2">
                    <span className="text-white text-xs md:text-lg">{t('contact')}</span>
                </Link>
            </div>
        </div>
    )
}


export const TriangleLeft = styled.div`
  width: 0;
  height: 0;
  border-top: 125px solid white;
  border-right: 125px solid transparent;
  position: absolute;
  top: -5px;
  left: -5px;
`;

export const TriangleRight = styled.div`
  width: 0;
  height: 0;
  border-bottom: 125px solid white;
  border-left: 125px solid transparent;
  position: absolute;
  bottom: -5px;
  right: -5px;
`;

export const CornerDecorationLeft = styled.img`
  position: absolute;
  top: -50px;
  left: -50px;
`;

export const CornerDecorationRight = styled.img`
  position: absolute;
  bottom: -50px;
  right: -50px;
  transform: rotate(180deg);
`;