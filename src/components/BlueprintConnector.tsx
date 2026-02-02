'use client';

import { useEffect, useState } from 'react';

export default function BlueprintConnector() {
    const [activeSection, setActiveSection] = useState('HERO');

    useEffect(() => {
        const sections = [
            { id: 'home', label: 'HERO.01' },
            { id: 'properties', label: 'MARKET.02' },
            { id: 'finance', label: 'FINANCE.03' },
            { id: 'insurance', label: 'INSURE.04' },
            { id: 'dashboard', label: 'PORTAL.05' },
        ];

        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 3;

            for (const section of [...sections].reverse()) {
                const element = document.getElementById(section.id);
                if (element && scrollPosition >= element.offsetTop) {
                    setActiveSection(section.label);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none -z-15 overflow-hidden select-none">
            {/* Vertical Drafting Line */}
            <div className="absolute left-8 lg:left-12 top-0 bottom-0 w-[1px] border-l border-dashed border-primary/10" />

            {/* Technical Grid Markers */}
            <div className="absolute left-0 right-0 top-0 h-full opacity-[0.03]">
                <div className="h-full w-full" style={{
                    backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }} />
            </div>

            {/* Floating Section Index */}
            <div className="absolute left-10 lg:left-14 top-1/2 -translate-y-1/2 transition-all duration-500">
                <div className="flex flex-col gap-1 items-start">
                    <span className="text-[10px] font-black tracking-[0.2em] text-primary/40 uppercase">
                        Coordination Point
                    </span>
                    <span className="text-2xl font-black text-primary/20 font-mono">
                        {activeSection}
                    </span>
                    <div className="w-12 h-[1px] bg-primary/20" />
                </div>
            </div>

            {/* Horizontal Spacing Indicators (in the gaps) */}
            <div className="absolute right-8 top-1/4 h-24 w-[1px] border-l border-primary/20">
                <div className="absolute top-0 -left-1 w-2 h-[1px] bg-primary/20" />
                <div className="absolute bottom-0 -left-1 w-2 h-[1px] bg-primary/20" />
            </div>

            <div className="absolute right-8 top-3/4 h-24 w-[1px] border-l border-primary/20">
                <div className="absolute top-0 -left-1 w-2 h-[1px] bg-primary/20" />
                <div className="absolute bottom-0 -left-1 w-2 h-[1px] bg-primary/20" />
            </div>
        </div>
    );
}
