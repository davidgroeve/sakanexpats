'use client';

import { useState, useEffect } from 'react';

export default function HouseConstruction() {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;

            const maxScroll = documentHeight - windowHeight;
            const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;

            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Helper function to get opacity for a specific range
    const getProgressOpacity = (start: number, end: number) => {
        if (scrollProgress < start) return 0;
        if (scrollProgress > end) return 1;
        return (scrollProgress - start) / (end - start);
    };

    // Helper function to get TranslateY for "rising" effect
    const getRiseTranslation = (start: number, end: number) => {
        if (scrollProgress < start) return 20;
        if (scrollProgress > end) return 0;
        return 20 * (1 - (scrollProgress - start) / (end - start));
    };

    return (
        <div className="fixed bottom-10 right-10 w-64 h-64 -z-20 pointer-events-none opacity-20 select-none hidden lg:block">
            <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* 1. Foundation (0% - 15%) */}
                <rect
                    x="30" y="150" width="140" height="10"
                    fill="currentColor"
                    className="text-foreground"
                    style={{
                        opacity: getProgressOpacity(0, 0.15),
                        transform: `translateY(${getRiseTranslation(0, 0.15)}px)`
                    }}
                />

                {/* 2. Main Walls (15% - 45%) */}
                <rect
                    x="40" y="90" width="120" height="60"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="text-foreground"
                    style={{
                        opacity: getProgressOpacity(0.15, 0.45),
                        transform: `translateY(${getRiseTranslation(0.15, 0.45)}px)`
                    }}
                />

                {/* 3. Door (45% - 60%) */}
                <rect
                    x="85" y="115" width="30" height="35"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-primary"
                    style={{
                        opacity: getProgressOpacity(0.45, 0.60),
                        transform: `translateY(${getRiseTranslation(0.45, 0.60)}px)`
                    }}
                />

                {/* 4. Windows (60% - 75%) */}
                <rect
                    x="55" y="105" width="20" height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-foreground"
                    style={{ opacity: getProgressOpacity(0.60, 0.70) }}
                />
                <rect
                    x="125" y="105" width="20" height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-foreground"
                    style={{ opacity: getProgressOpacity(0.65, 0.75) }}
                />

                {/* 5. Roof (75% - 95%) */}
                <path
                    d="M30 90L100 30L170 90H30Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="text-primary"
                    style={{
                        opacity: getProgressOpacity(0.75, 0.95),
                        transform: `translateY(${getRiseTranslation(0.75, 0.95)}px)`
                    }}
                />

                {/* 6. Chimney & Details (95% - 100%) */}
                <rect
                    x="130" y="45" width="15" height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-foreground"
                    style={{ opacity: getProgressOpacity(0.95, 1) }}
                />
            </svg>

            {/* Progress Marker */}
            <div className="absolute -bottom-4 left-0 w-full text-[10px] font-bold text-center text-primary/40 uppercase tracking-widest">
                Construction Progress: {Math.round(scrollProgress * 100)}%
            </div>
        </div>
    );
}
