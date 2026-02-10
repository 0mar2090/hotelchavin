import { ROOMS, getWhatsAppLink } from "@/lib/constants";
import { MessageCircle } from "lucide-react";

export default function Rooms() {
    return (
        <section id="habitaciones" className="section-padding bg-brand-cream">
            <div className="container-max">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="inline-block text-brand-gold font-semibold text-sm uppercase tracking-[0.15em] mb-4">
                        Nuestras opciones
                    </span>
                    <h2 className="heading-primary mb-6">Habitaciones</h2>
                    <p className="text-body">
                        Descubre el espacio ideal para tu estadía. Cada habitación está
                        diseñada pensando en tu comodidad.
                    </p>
                </div>

                {/* Room cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {ROOMS.map((room) => (
                        <div key={room.id} className="card group">
                            {/* Image */}
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={room.image}
                                    alt={room.name}
                                    loading="lazy"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <h3 className="font-display font-bold text-lg text-brand-navy mb-2">
                                    {room.name}
                                </h3>
                                <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                                    {room.description}
                                </p>
                                <a
                                    href={getWhatsAppLink(room.whatsappMsg)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary w-full text-sm py-2.5"
                                >
                                    <MessageCircle size={16} />
                                    Reservar
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
