'use client';
import { useState, useEffect } from 'react';

const useWindowSize = (): boolean => {
    const [windowSize, setWindowSize] = useState<{
        width: number;
        height: number;
    }>({
        width: 0,
        height: 0,
    });
    const isMobile: boolean = windowSize.width <= 1024;
    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isMobile;
};

export default useWindowSize;
