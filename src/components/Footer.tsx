import { Phone, Mail, MapPin } from "lucide-react";
import { HOTEL } from "@/lib/constants";

export default function Footer() {
    return (
        <footer id="contacto" className="bg-brand-navy-dark text-gray-300">
            <div className="container-max section-padding pb-8">
                <div className="grid md:grid-cols-3 gap-10 lg:gap-16">
                    {/* Column 1 – About */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-gold to-brand-gold-dark flex items-center justify-center">
                                <span className="text-white font-display font-bold text-lg">H</span>
                            </div>
                            <div>
                                <div className="font-display font-bold text-white text-lg">
                                    Hotel Chavín
                                </div>
                                <div className="text-brand-gold text-[10px] uppercase tracking-[0.2em]">
                                    Barranca – Perú
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            {HOTEL.mission}
                        </p>
                    </div>

                    {/* Column 2 – Contact */}
                    <div>
                        <h3 className="font-display font-bold text-white text-lg mb-6">
                            Contáctanos
                        </h3>
                        <div className="space-y-4">
                            <a
                                href={`https://maps.google.com/?q=${encodeURIComponent(HOTEL.address)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start gap-3 hover:text-brand-gold transition-colors group"
                            >
                                <MapPin
                                    size={18}
                                    className="mt-0.5 text-brand-gold shrink-0"
                                />
                                <span className="text-sm">{HOTEL.address}</span>
                            </a>
                            <a
                                href={`tel:${HOTEL.phone}`}
                                className="flex items-center gap-3 hover:text-brand-gold transition-colors"
                            >
                                <Phone size={18} className="text-brand-gold shrink-0" />
                                <span className="text-sm">{HOTEL.phone}</span>
                            </a>
                            <a
                                href={`mailto:${HOTEL.email}`}
                                className="flex items-center gap-3 hover:text-brand-gold transition-colors"
                            >
                                <Mail size={18} className="text-brand-gold shrink-0" />
                                <span className="text-sm">{HOTEL.email}</span>
                            </a>
                        </div>
                    </div>

                    {/* Column 3 – Map */}
                    <div>
                        <h3 className="font-display font-bold text-white text-lg mb-6">
                            Ubícanos
                        </h3>
                        <div className="rounded-xl overflow-hidden border border-white/10 aspect-[4/3]">
                            <iframe
                                src={HOTEL.mapEmbedUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Ubicación de Hotel Chavín en Google Maps"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/10">
                <div className="container-max px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
                    <p>
                        © {new Date().getFullYear()} {HOTEL.name}. Todos los derechos
                        reservados.
                    </p>
                    <p>
                        Desarrollado por{" "}
                        <span className="text-brand-gold font-medium">Francis Dev</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
