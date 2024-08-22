'use client';

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export const ProcedureSection: React.FC = () => {
  const t = useTranslations('home.procedure');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentHoverIndex, setCurrentHoverIndex] = useState<number>(0);

  const handleClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleHover = (index: number) => {
    setCurrentHoverIndex(index);
  }

  const procedureMenu = [
    {
      label: t('research.title'),
      body: t('research.description'),
    },
    {
      label: t('preserve.title'),
      body: t('preserve.description'),
    },
    {
      label: t('develop.title'),
      body: t('develop.description'),
    },
    {
      label: t('apply.title'),
      body: t('apply.description'),
    },
    {
      label: t('illustrate.title'),
      body: t('illustrate.description'),
    },
  ];

  return (
    <div>
      <div className='h-screen w-screen items-center relative min-h-[600px] flex flex-col justify-center overflow-hidden max-w-[1920px] m-auto'>
        <Image
          src="/images/procedure_background.jpg"
          layout="fill"
          objectFit="cover"
          objectPosition="top left"
          alt="Procedure background"
          className="-z-10"
        />
        <div className="h-10/12 relative w-11/12 sm:10/12 lg:w-7/12 flex flex-col justify-center items-center">
          <h1 className='text-white text-3xl sm:text-5xl leading-normal'>{t('title')}</h1>
          <div className="w-full mt-5 hidden md:block">
            <div className="h-[1px] w-full bg-white" />
            <Image
              src="/images/procedure_selector.svg"
              width={20}
              height={20}
              alt="Procedure selector"
              className="absolute translate-y-[-53%] translate-x-[-50%]"
              style={{
                left: `${(currentHoverIndex * 20) + 10}%`,
                transition: 'left 0.3s ease-in-out'
              }}
            />
          </div>

          <div className='flex flex-row w-full justify-between mt-5'>
            {procedureMenu.map((item, index) => {
              return (
                <React.Fragment key={item.label}>
                  <div
                    onClick={() => handleClick(index)}
                    onMouseEnter={() => handleHover(index)}
                    className="flex flex-col items-center cursor-pointer"
                  >
                    <Image
                      src={currentIndex == index ? "/images/procedure_icon_active.svg" : "/images/procedure_icon.svg"}
                      width={100}
                      height={100}
                      style={{
                        width: '90%',
                        height: 'auto'
                      }}
                      alt="Procedure icon"
                    />
                    <h3 className="text-white mt-5 text-xs text-center md:text-lg">{item.label}</h3>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
          <p className="text-white mt-5 h-1/2 text-xs md:text-lg">{procedureMenu[currentIndex].body}</p>
        </div>
      </div>
    </div>
  );
}

export default ProcedureSection;