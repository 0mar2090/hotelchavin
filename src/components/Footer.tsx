"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, ExternalLink } from "lucide-react";
import { HOTEL, getWhatsAppLink } from "@/lib/constants";
import { useScrollReveal } from "@/hooks/useScrollReveal";

// Hardcode the current year at module level to avoid hydration mismatch
// and allow the page to be statically rendered without dynamic Date() calls
const CURRENT_YEAR = 2026;

export default function Footer() {
    const { ref, isVisible } = useScrollReveal();
    const [mapLoaded, setMapLoaded] = useState(false);
    const { ref: mapRef, isVisible: mapVisible } = useScrollReveal({ threshold: 0.1 });

    return (
        <footer id="contacto" className="bg-brand-navy-dark text-gray-300 relative overflow-hidden">
            {/* Top decorative line */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />

            {/* Background pattern */}
            <div
                className="absolute inset-0 opacity-[0.015]"
                style={{
                    backgroundImage: `radial-gradient(circle, rgba(200,164,92,0.5) 1px, transparent 1px)`,
                    backgroundSize: "30px 30px",
                }}
            />

            <div
                ref={ref}
                className={`container-max section-padding pb-8 relative z-10 reveal ${isVisible ? "visible" : ""}`}
            >
                <div className="grid md:grid-cols-3 gap-10 lg:gap-16">
                    {/* Column 1 - About */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-gold to-brand-gold-dark flex items-center justify-center shadow-lg shadow-brand-gold/20">
                                <span className="text-white font-display font-bold text-xl">H</span>
                            </div>
                            <div>
                                <div className="font-display font-bold text-white text-lg">
                                    Hotel Chavin
                                </div>
                                <div className="text-brand-gold text-[10px] uppercase tracking-[0.2em]">
                                    Barranca &ndash; Peru
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            {HOTEL.mission}
                        </p>

                        {/* WhatsApp CTA */}
                        <a
                            href={getWhatsAppLink("Hola Hotel Chavin, deseo informacion.")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-green-600/20 hover:bg-green-600/30 text-green-400 font-medium text-sm px-4 py-2.5 rounded-xl transition-all duration-300 border border-green-500/20"
                        >
                            <MessageCircle size={16} />
                            Chatea con nosotros
                        </a>
                    </div>

                    {/* Column 2 - Contact */}
                    <div>
                        <h3 className="font-display font-bold text-white text-lg mb-6">
                            Contactanos
                        </h3>
                        <div className="space-y-4">
                            <a
                                href={`https://maps.google.com/?q=${encodeURIComponent(HOTEL.address)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start gap-3 hover:text-brand-gold transition-colors group"
                            >
                                <div className="w-9 h-9 rounded-lg bg-brand-gold/10 flex items-center justify-center shrink-0 group-hover:bg-brand-gold/20 transition-colors">
                                    <MapPin size={16} className="text-brand-gold" />
                                </div>
                                <div>
                                    <span className="text-sm block">{HOTEL.address}</span>
                                    <span className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                        Ver en Maps <ExternalLink size={10} />
                                    </span>
                                </div>
                            </a>
                            <a
                                href={`tel:${HOTEL.phone}`}
                                className="flex items-center gap-3 hover:text-brand-gold transition-colors group"
                            >
                                <div className="w-9 h-9 rounded-lg bg-brand-gold/10 flex items-center justify-center shrink-0 group-hover:bg-brand-gold/20 transition-colors">
                                    <Phone size={16} className="text-brand-gold" />
                                </div>
                                <span className="text-sm">{HOTEL.phone}</span>
                            </a>
                            <a
                                href={`mailto:${HOTEL.email}`}
                                className="flex items-center gap-3 hover:text-brand-gold transition-colors group"
                            >
                                <div className="w-9 h-9 rounded-lg bg-brand-gold/10 flex items-center justify-center shrink-0 group-hover:bg-brand-gold/20 transition-colors">
                                    <Mail size={16} className="text-brand-gold" />
                                </div>
                                <span className="text-sm">{HOTEL.email}</span>
                            </a>
                        </div>
                    </div>

                    {/* Column 3 - Map (lazy loaded via IntersectionObserver) */}
                    <div ref={mapRef}>
                        <h3 className="font-display font-bold text-white text-lg mb-6">
                            Ubicanos
                        </h3>
                        <div className="rounded-2xl overflow-hidden border border-white/10 aspect-[4/3] shadow-xl bg-brand-navy-dark">
                            {(mapVisible || mapLoaded) && (
                                <iframe
                                    src={HOTEL.mapEmbedUrl}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Ubicacion de Hotel Chavin en Google Maps"
                                    onLoad={() => setMapLoaded(true)}
                                />
                            )}
                            {!mapVisible && !mapLoaded && (
                                <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                                    <MapPin size={24} className="text-brand-gold/30" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/5">
                <div className="container-max px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
                    <p>
                        &copy; {CURRENT_YEAR} {HOTEL.name}. Todos los derechos
                        reservados.
                    </p>
                    <p>
                        Desarrollado por{" "}
                        <span className="text-gradient-gold font-semibold">Francis Dev</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
