"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => setVisible(window.scrollY > 500);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-brand-navy/90 hover:bg-brand-navy text-white flex items-center justify-center shadow-lg backdrop-blur-sm border border-white/10 transition-all duration-500 ${
                visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4 pointer-events-none"
            }`}
            aria-label="Volver arriba"
        >
            <ArrowUp size={20} />
        </button>
    );
}
