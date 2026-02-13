"use client";

import Image from "next/image";
import { ATTRACTIONS } from "@/lib/constants";
import { MapPin, Compass } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Discover() {
    const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
    const { ref: gridRef, isVisible: gridVisible } = useScrollReveal();

    return (
        <section id="atractivos" className="section-padding bg-brand-navy relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-gold/5 rounded-full blur-3xl animate-float-delayed" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />

            {/* Pattern */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `radial-gradient(circle, rgba(200,164,92,0.5) 1px, transparent 1px)`,
                    backgroundSize: "40px 40px",
                }}
            />

            <div className="container-max relative z-10">
                {/* Header */}
                <div
                    ref={headerRef}
                    className={`text-center max-w-3xl mx-auto mb-16 reveal ${headerVisible ? "visible" : ""}`}
                >
                    <div className="inline-flex items-center gap-2 bg-brand-gold/10 text-brand-gold px-4 py-2 rounded-full text-sm font-medium mb-6 border border-brand-gold/20">
                        <Compass size={16} />
                        Turismo
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                        Descubre <span className="text-gradient-gold">Barranca</span>
                    </h2>
                    <div className="gold-line-center mb-6" />
                    <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                        Ubicados estrategicamente cerca de los principales atractivos
                        turisticos del norte chico de Lima.
                    </p>
                </div>

                {/* Attractions grid */}
                <div
                    ref={gridRef}
                    className={`grid md:grid-cols-3 gap-6 stagger-children ${gridVisible ? "visible" : ""}`}
                >
                    {ATTRACTIONS.map((attr) => (
                        <div
                            key={attr.id}
                            className="group relative rounded-2xl overflow-hidden glass hover:border-brand-gold/30 transition-all duration-500"
                        >
                            {/* Image - next/image with proper sizes for responsive loading */}
                            <div className="relative h-52 overflow-hidden">
                                <Image
                                    src={attr.image}
                                    alt={attr.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    loading="lazy"
                                    quality={75}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/30 to-transparent" />

                                {/* Location pin */}
                                <div className="absolute top-4 left-4 bg-brand-gold/20 backdrop-blur-md text-brand-gold text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-brand-gold/20">
                                    <MapPin size={12} />
                                    {attr.name}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="font-display font-bold text-xl text-white mb-3 group-hover:text-brand-gold transition-colors duration-300">
                                    {attr.name}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {attr.description}
                                </p>
                            </div>

                            {/* Bottom glow on hover */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-gold/0 via-brand-gold to-brand-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
