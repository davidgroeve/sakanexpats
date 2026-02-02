'use client';

import React from 'react';

interface BrandLogoProps {
    className?: string;
    withText?: boolean;
    color?: string;
}

export default function BrandLogo({ className = "h-10", withText = true, color = "currentColor" }: BrandLogoProps) {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            {/* Pomegranate + House Hybrid Icon */}
            <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-full w-auto drop-shadow-sm"
            >
                {/* Outer Pomegranate Shape */}
                <path
                    d="M50 90C72.0914 90 90 72.0914 90 50C90 27.9086 72.0914 10 50 10C27.9086 10 10 27.9086 10 50C10 72.0914 27.9086 90 50 90Z"
                    fill="var(--primary)"
                    className="fill-primary"
                />

                {/* Pomegranate Crown (Top) */}
                <path
                    d="M40 12L44 2L50 8L56 2L60 12"
                    stroke="var(--primary)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="stroke-primary"
                />

                {/* Subtle Highlight */}
                <path
                    d="M30 30C35 25 45 25 50 30"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeOpacity="0.2"
                />

                {/* Inner House Silhouette (Negative Space) */}
                <path
                    d="M35 65V45L50 35L65 45V65H35Z"
                    fill="white"
                    fillOpacity="0.95"
                />
                <path
                    d="M47 65V58H53V65"
                    stroke="var(--primary)"
                    strokeWidth="2"
                    className="stroke-primary"
                />

                {/* Seeds / Decorative Dots */}
                <circle cx="75" cy="40" r="3" fill="white" fillOpacity="0.3" />
                <circle cx="70" cy="30" r="2" fill="white" fillOpacity="0.2" />
            </svg>

            {withText && (
                <span className="font-extrabold text-2xl tracking-tight" style={{ color }}>
                    Sakan<span className="text-primary">Expats</span>
                </span>
            )}
        </div>
    );
}
