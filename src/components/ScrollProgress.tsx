"use client";

import { useEffect, useRef, useCallback } from "react";

export default function ScrollProgress() {
    const barRef = useRef<HTMLDivElement>(null);
    const rafId = useRef<number>(0);

    const handleScroll = useCallback(() => {
        // Cancel any pending frame to avoid stacking
        if (rafId.current) cancelAnimationFrame(rafId.current);

        rafId.current = requestAnimationFrame(() => {
            if (!barRef.current) return;
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
            // Direct DOM mutation - zero re-renders for scroll progress
            barRef.current.style.width = `${progress}%`;
        });
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (rafId.current) cancelAnimationFrame(rafId.current);
        };
    }, [handleScroll]);

    return (
        <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent">
            <div
                ref={barRef}
                className="h-full bg-gradient-to-r from-brand-gold via-brand-gold-light to-brand-gold transition-none"
                style={{ width: "0%" }}
            />
        </div>
    );
}
