"use client";

import Image from "next/image";
import { ROOMS, getWhatsAppLink } from "@/lib/constants";
import { MessageCircle, Users, Bed } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const roomIcons: Record<string, typeof Users> = {
    simple: Users,
    doble: Users,
    triple: Users,
    matrimonial: Bed,
};

const roomCapacity: Record<string, string> = {
    simple: "1 persona",
    doble: "2 personas",
    triple: "3 personas",
    matrimonial: "2 personas",
};

export default function Rooms() {
    const { ref: headerRef, isVisible: headerVisible } = useScrollReveal();
    const { ref: gridRef, isVisible: gridVisible } = useScrollReveal();

    return (
        <section id="habitaciones" className="section-padding bg-brand-cream relative">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-gold/20 to-transparent" />

            <div className="container-max">
                {/* Header */}
                <div
                    ref={headerRef}
                    className={`text-center max-w-3xl mx-auto mb-16 reveal ${headerVisible ? "visible" : ""}`}
                >
                    <span className="inline-block text-brand-gold font-semibold text-sm uppercase tracking-[0.15em] mb-4">
                        Nuestras opciones
                    </span>
                    <h2 className="heading-primary mb-4">Habitaciones</h2>
                    <div className="gold-line-center mb-6" />
                    <p className="text-body">
                        Descubre el espacio ideal para tu estadia. Cada habitacion esta
                        disenada pensando en tu comodidad.
                    </p>
                </div>

                {/* Room cards */}
                <div
                    ref={gridRef}
                    className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children ${gridVisible ? "visible" : ""}`}
                >
                    {ROOMS.map((room) => {
                        const Icon = roomIcons[room.id] || Users;
                        return (
                            <div key={room.id} className="card group">
                                {/* Image - next/image with explicit dimensions for CLS prevention */}
                                <div className="relative h-56 overflow-hidden">
                                    <Image
                                        src={room.image}
                                        alt={room.name}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        loading="lazy"
                                        quality={75}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                                    {/* Capacity badge */}
                                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/20">
                                        <Icon size={12} />
                                        {roomCapacity[room.id]}
                                    </div>

                                    {/* Room name overlay */}
                                    <div className="absolute bottom-4 left-4">
                                        <h3 className="font-display font-bold text-xl text-white drop-shadow-lg">
                                            {room.name}
                                        </h3>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                                        {room.description}
                                    </p>
                                    <a
                                        href={getWhatsAppLink(room.whatsappMsg)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-primary w-full text-sm py-2.5 group/btn"
                                    >
                                        <MessageCircle
                                            size={16}
                                            className="transition-transform duration-300 group-hover/btn:scale-110"
                                        />
                                        Reservar
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
