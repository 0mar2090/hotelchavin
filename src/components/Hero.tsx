"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { MapPin, Star, ChevronDown, Shield, Clock, Wifi } from "lucide-react";
import { HOTEL } from "@/lib/constants";
import { useEffect, useRef, useCallback } from "react";

// Code-split the form: react-hook-form + zod + @hookform/resolvers (~90KB)
// are now loaded asynchronously, not blocking LCP
const HeroForm = dynamic(() => import("@/components/HeroForm"), {
    loading: () => (
        <div className="space-y-4 animate-pulse">
            <div className="h-12 bg-white/5 rounded-xl" />
            <div className="grid grid-cols-2 gap-4">
                <div className="h-12 bg-white/5 rounded-xl" />
                <div className="h-12 bg-white/5 rounded-xl" />
            </div>
            <div className="h-20 bg-white/5 rounded-xl" />
            <div className="h-14 bg-white/10 rounded-xl" />
        </div>
    ),
    ssr: false,
});

// Static badge data moved outside component to avoid recreation on each render
const featureBadges = [
    { icon: Shield, label: "Seguro" },
    { icon: Clock, label: "24/7" },
    { icon: Wifi, label: "Wi-Fi" },
] as const;

export default function Hero() {
    // Use refs + CSS custom properties for parallax instead of state
    // This avoids re-rendering the entire component tree on every mousemove
    const parallaxRef = useRef<HTMLDivElement>(null);

    const handleMouse = useCallback((e: MouseEvent) => {
        if (!parallaxRef.current) return;
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        parallaxRef.current.style.setProperty("--parallax-x", `${x * 0.3}px`);
        parallaxRef.current.style.setProperty("--parallax-y", `${y * 0.3}px`);
        parallaxRef.current.style.setProperty("--float1-x", `${x * 0.5}px`);
        parallaxRef.current.style.setProperty("--float1-y", `${y * 0.5}px`);
        parallaxRef.current.style.setProperty("--float2-x", `${x * -0.3}px`);
        parallaxRef.current.style.setProperty("--float2-y", `${y * -0.3}px`);
    }, []);

    useEffect(() => {
        window.addEventListener("mousemove", handleMouse, { passive: true });
        return () => window.removeEventListener("mousemove", handleMouse);
    }, [handleMouse]);

    return (
        <section
            id="inicio"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Background with parallax - uses CSS custom properties, zero re-renders */}
            <div ref={parallaxRef} className="absolute inset-0 bg-brand-navy">
                {/* LCP image: next/image with priority for above-the-fold hero */}
                <div
                    className="absolute inset-0 opacity-30 overflow-hidden"
                    style={{
                        transform: `translate(var(--parallax-x, 0px), var(--parallax-y, 0px)) scale(1.1)`,
                        transition: "transform 2s ease-out",
                    }}
                >
                    <Image
                        src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80"
                        alt="Hotel Chavin - Vista principal"
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover"
                        quality={75}
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/80 via-brand-navy/60 to-brand-navy/95" />

                {/* Decorative floating elements - use CSS custom properties for parallax */}
                <div
                    className="absolute top-20 left-10 w-72 h-72 bg-brand-gold/10 rounded-full blur-3xl animate-float"
                    style={{ transform: `translate(var(--float1-x, 0px), var(--float1-y, 0px))` }}
                />
                <div
                    className="absolute bottom-20 right-10 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl animate-float-delayed"
                    style={{ transform: `translate(var(--float2-x, 0px), var(--float2-y, 0px))` }}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/[0.03] rounded-full blur-3xl" />

                {/* Grid pattern overlay */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(200,164,92,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(200,164,92,0.3) 1px, transparent 1px)`,
                        backgroundSize: "60px 60px",
                    }}
                />
            </div>

            <div className="relative z-10 container-max px-4 sm:px-6 lg:px-8 pt-32 pb-16 md:pt-40 md:pb-24">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left - Text */}
                    <div className="text-center lg:text-left animate-fade-in">
                        <div className="inline-flex items-center gap-2 bg-brand-gold/20 text-brand-gold-light px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-brand-gold/20">
                            <MapPin size={16} />
                            Barranca, Peru
                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                        </div>
                        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-6">
                            {HOTEL.tagline.split("Barranca")[0]}
                            <span className="text-gradient-gold">Barranca</span>
                        </h1>
                        <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
                            {HOTEL.stats.rooms} habitaciones equipadas con WiFi y TV LED, a
                            minutos de Caral y Paramonga. Tu mejor opcion para disfrutar el
                            norte chico.
                        </p>

                        {/* Trust badges */}
                        <div className="flex flex-wrap items-center gap-6 justify-center lg:justify-start mb-8">
                            <div className="flex items-center gap-1 text-brand-gold">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={18} fill="currentColor" />
                                ))}
                            </div>
                            <span className="text-gray-400 text-sm">
                                Desde 1995 atendiendo viajeros
                            </span>
                        </div>

                        {/* Mini feature badges */}
                        <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                            {featureBadges.map((badge) => (
                                <div
                                    key={badge.label}
                                    className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 px-4 py-2 rounded-full text-sm"
                                >
                                    <badge.icon size={14} className="text-brand-gold" />
                                    {badge.label}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right - Form (code-split) */}
                    <div className="animate-slide-up">
                        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl relative overflow-hidden">
                            {/* Shimmer effect */}
                            <div className="absolute inset-0 bg-gold-shimmer bg-[length:200%_100%] animate-shimmer pointer-events-none" />

                            <div className="relative z-10">
                                <h2 className="font-display text-2xl font-bold text-white mb-2">
                                    Reservaciones
                                </h2>
                                <p className="text-gray-400 text-sm mb-6">
                                    Completa tus datos y te contactaremos al instante via WhatsApp
                                </p>

                                <HeroForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce-subtle">
                <button
                    onClick={() =>
                        document
                            .querySelector("#experiencia")
                            ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="flex flex-col items-center gap-2 text-gray-400 hover:text-brand-gold transition-colors"
                    aria-label="Desplazar hacia abajo"
                >
                    <span className="text-xs uppercase tracking-widest">Descubre</span>
                    <ChevronDown size={20} />
                </button>
            </div>
        </section>
    );
}
