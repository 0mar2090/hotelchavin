import { ATTRACTIONS } from "@/lib/constants";
import { MapPin } from "lucide-react";

export default function Discover() {
    return (
        <section id="atractivos" className="section-padding bg-brand-navy relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-gold/5 rounded-full blur-3xl" />

            <div className="container-max relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="inline-block text-brand-gold font-semibold text-sm uppercase tracking-[0.15em] mb-4">
                        Turismo
                    </span>
                    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                        Descubre <span className="text-brand-gold">Barranca</span>
                    </h2>
                    <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                        Ubicados estratégicamente cerca de los principales atractivos
                        turísticos del norte chico de Lima.
                    </p>
                </div>

                {/* Attractions grid */}
                <div className="grid md:grid-cols-3 gap-6">
                    {ATTRACTIONS.map((attr) => (
                        <div
                            key={attr.id}
                            className="group relative rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 hover:border-brand-gold/30 transition-all duration-500"
                        >
                            {/* Image */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={attr.image}
                                    alt={attr.name}
                                    loading="lazy"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/20 to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <MapPin size={16} className="text-brand-gold" />
                                    <h3 className="font-display font-bold text-xl text-white">
                                        {attr.name}
                                    </h3>
                                </div>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {attr.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
