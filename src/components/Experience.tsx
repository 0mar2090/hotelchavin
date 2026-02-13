"use client";

import { Wifi, Tv, Car, BedDouble, Coffee, ShieldCheck } from "lucide-react";
import { HOTEL } from "@/lib/constants";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const amenities = [
    {
        icon: BedDouble,
        label: `${HOTEL.stats.rooms} Habitaciones`,
        desc: "Amplias y confortables",
        color: "from-blue-500/20 to-blue-600/10",
    },
    {
        icon: Wifi,
        label: "Wi-Fi Gratis",
        desc: "Internet en todas las áreas",
        color: "from-emerald-500/20 to-emerald-600/10",
    },
    {
        icon: Tv,
        label: "TV LED",
        desc: "Entretenimiento en cada habitación",
        color: "from-purple-500/20 to-purple-600/10",
    },
    {
        icon: Car,
        label: "Estacionamiento",
        desc: "Seguro y amplio",
        color: "from-amber-500/20 to-amber-600/10",
    },
    {
        icon: Coffee,
        label: "Desayuno",
        desc: "Variedad de opciones",
        color: "from-rose-500/20 to-rose-600/10",
    },
    {
        icon: ShieldCheck,
        label: "Seguridad 24/7",
        desc: "Vigilancia permanente",
        color: "from-cyan-500/20 to-cyan-600/10",
    },
];

export default function Experience() {
    const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
    const { ref: gridRef, isVisible: gridVisible } = useScrollReveal();

    return (
        <section id="experiencia" className="section-padding bg-white relative overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, #C8A45C 1px, transparent 1px)`,
                backgroundSize: "50px 50px",
            }} />

            <div className="container-max relative z-10">
                {/* Header */}
                <div
                    ref={headerRef}
                    className={`text-center max-w-3xl mx-auto mb-16 reveal ${headerVisible ? "visible" : ""}`}
                >
                    <span className="inline-block text-brand-gold font-semibold text-sm uppercase tracking-[0.15em] mb-4">
                        Nuestra esencia
                    </span>
                    <h2 className="heading-primary mb-6">
                        Disfruta de una Experiencia{" "}
                        <span className="text-gradient-gold">Inolvidable</span>
                    </h2>
                    <div className="gold-line-center mb-6" />
                    <p className="text-body">{HOTEL.description}</p>
                </div>

                {/* Amenities grid */}
                <div
                    ref={gridRef}
                    className={`grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 stagger-children ${gridVisible ? "visible" : ""}`}
                >
                    {amenities.map((item) => (
                        <div
                            key={item.label}
                            className="group relative bg-brand-cream rounded-2xl p-6 md:p-8 text-center hover:bg-brand-navy transition-all duration-500 cursor-default overflow-hidden"
                        >
                            {/* Hover gradient */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-brand-gold/10 group-hover:bg-brand-gold/20 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
                                    <item.icon
                                        className="text-brand-gold transition-all duration-500"
                                        size={30}
                                    />
                                </div>
                                <h3 className="font-bold text-brand-navy group-hover:text-white text-base md:text-lg mb-1 transition-colors duration-500">
                                    {item.label}
                                </h3>
                                <p className="text-gray-500 group-hover:text-gray-300 text-sm transition-colors duration-500">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
