'use client'

import { useCallback, useEffect, useState } from "react";

export default function useMediaQuery(height: number) {
    const [targetReached, setTargetReached] = useState(false);

    const updateTarget = useCallback((e: any) => {
        if (e.matches) {
            setTargetReached(true);
        } else {
            setTargetReached(false);
        }
    }, []);

    useEffect(() => {
        const media = window.matchMedia(`(max-height: ${height}px)`);
        media.addEventListener('change', updateTarget);

        if (media.matches) {
            setTargetReached(true);
        }

        return () => media.removeEventListener('change', updateTarget);
    }, []);

    return targetReached;
};