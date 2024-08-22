'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Slider from "react-slick";
import LandingSection from '@/app/ui/components/LandingSection';
import WorkSection from '@/app/ui/components/WorkSection';
import NavigationMenu from '@/app/ui/common/NavigationMenu';
import useMediaQuery from '@/app/hooks/useMediaQuery';
import ProcedureSection from '@/app/ui/components/ProcedureSection';
import RecognitionSection from '@/app/ui/components/RecognitionSection';

const navTheme: ('white' | 'black')[] = ["white", "black", "white", "black", "black"];

export default function HomePage({ locale }: any) {
    const [section, setSection] = useState(0);
    const isBreakPoint = useMediaQuery(600)
    const sliderRef = useRef<any>(null);

    const handleWheel = useCallback((e: WheelEvent) => {
        if (e.deltaY > 0 && sliderRef.current) {
            sliderRef.current.slickNext();
        } else if (sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    }, []);

    const handleBeforeChange = (_: any, newIndex: any) => {
        setSection(newIndex);
    };

    useEffect(() => {
        window.addEventListener("wheel", handleWheel, true);
        return () => window.removeEventListener("wheel", handleWheel);
    }, []);

    return <>
        {
            isBreakPoint && <>
                <NavigationMenu color="white" background locale={locale as any} />
                <LandingSection />
                <WorkSection />
                <ProcedureSection />
                <RecognitionSection />
            </>
        }
        {
            !isBreakPoint && <>
                <NavigationMenu color={navTheme[section]} locale={locale as any} />
                <Slider
                    ref={sliderRef}
                    verticalSwiping={true}
                    draggable={true}
                    speed={800}
                    vertical
                    arrows={false}
                    infinite={false}
                    touchMove={true}
                    slidesToShow={1}
                    beforeChange={handleBeforeChange}
                    className='h-screen w-screen relative overflow-hidden'
                >
                    <LandingSection />
                    <WorkSection handleWheel={handleWheel} />
                    <ProcedureSection />
                    <RecognitionSection />
                </Slider>
            </>
        }
    </>
}