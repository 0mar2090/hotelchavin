import { Wifi, Tv, Car, BedDouble } from "lucide-react";
import { HOTEL } from "@/lib/constants";

const amenities = [
    {
        icon: BedDouble,
        label: `${HOTEL.stats.rooms} Habitaciones`,
        desc: "Amplias y confortables",
    },
    {
        icon: Wifi,
        label: "Wi-Fi Gratis",
        desc: "Internet en todas las áreas",
    },
    {
        icon: Tv,
        label: "TV LED",
        desc: "Entretenimiento en cada habitación",
    },
    {
        icon: Car,
        label: "Estacionamiento",
        desc: "Seguro y amplio",
    },
];

export default function Experience() {
    return (
        <section className="section-padding bg-white">
            <div className="container-max">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="inline-block text-brand-gold font-semibold text-sm uppercase tracking-[0.15em] mb-4">
                        Nuestra esencia
                    </span>
                    <h2 className="heading-primary mb-6">
                        Disfruta de una Experiencia{" "}
                        <span className="text-brand-gold">Inolvidable</span>
                    </h2>
                    <p className="text-body">{HOTEL.description}</p>
                </div>

                {/* Amenities grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {amenities.map((item) => (
                        <div
                            key={item.label}
                            className="group relative bg-brand-cream rounded-2xl p-6 md:p-8 text-center hover:bg-brand-navy transition-all duration-500 cursor-default"
                        >
                            <div className="w-14 h-14 bg-brand-gold/10 group-hover:bg-brand-gold/20 rounded-xl flex items-center justify-center mx-auto mb-4 transition-all duration-500">
                                <item.icon
                                    className="text-brand-gold transition-transform duration-500 group-hover:scale-110"
                                    size={28}
                                />
                            </div>
                            <h3 className="font-bold text-brand-navy group-hover:text-white text-base md:text-lg mb-1 transition-colors duration-500">
                                {item.label}
                            </h3>
                            <p className="text-gray-500 group-hover:text-gray-300 text-sm transition-colors duration-500">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
