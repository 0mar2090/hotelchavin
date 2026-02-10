"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { HOTEL, FACILITIES_IMAGES } from "@/lib/constants";

export default function Facilities() {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);

    const openLightbox = (index: number) => {
        setCurrentImage(index);
        setLightboxOpen(true);
        document.body.style.overflow = "hidden";
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        document.body.style.overflow = "";
    };

    const navigate = (dir: number) => {
        setCurrentImage(
            (prev) =>
                (prev + dir + FACILITIES_IMAGES.length) % FACILITIES_IMAGES.length
        );
    };

    return (
        <>
            <section className="section-padding bg-white">
                <div className="container-max">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Text */}
                        <div>
                            <span className="inline-block text-brand-gold font-semibold text-sm uppercase tracking-[0.15em] mb-4">
                                Nuestros espacios
                            </span>
                            <h2 className="heading-primary mb-6">
                                Las mejores{" "}
                                <span className="text-brand-gold">instalaciones</span>
                            </h2>
                            <p className="text-body mb-6">
                                Contamos con{" "}
                                <strong>{HOTEL.stats.rooms} habitaciones</strong> adecuadas a
                                los requerimientos de nuestros huéspedes para que su estadía y
                                experiencia de viaje sean lo más gratificante.
                            </p>
                            <p className="text-body mb-8">
                                Todas nuestras habitaciones cuentan con un ambiente acogedor y
                                servicios de <strong>Wi-Fi</strong> y{" "}
                                <strong>TV LED</strong>.
                            </p>

                            {/* Stats */}
                            <div className="flex gap-8">
                                <div>
                                    <div className="text-3xl md:text-4xl font-display font-bold text-brand-gold">
                                        {HOTEL.stats.rooms}
                                    </div>
                                    <div className="text-gray-500 text-sm mt-1">Habitaciones</div>
                                </div>
                                <div className="w-px bg-gray-200" />
                                <div>
                                    <div className="text-3xl md:text-4xl font-display font-bold text-brand-gold">
                                        24/7
                                    </div>
                                    <div className="text-gray-500 text-sm mt-1">Recepción</div>
                                </div>
                                <div className="w-px bg-gray-200" />
                                <div>
                                    <div className="text-3xl md:text-4xl font-display font-bold text-brand-gold">
                                        +30
                                    </div>
                                    <div className="text-gray-500 text-sm mt-1">Años</div>
                                </div>
                            </div>
                        </div>

                        {/* Gallery grid */}
                        <div className="grid grid-cols-2 gap-4">
                            {FACILITIES_IMAGES.map((img, i) => (
                                <button
                                    key={img.src}
                                    onClick={() => openLightbox(i)}
                                    className="relative aspect-[4/3] rounded-2xl overflow-hidden group cursor-pointer"
                                >
                                    <img
                                        src={img.src}
                                        alt={img.alt}
                                        loading="lazy"
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                                        <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm bg-black/50 px-3 py-1.5 rounded-lg">
                                            Ver más
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Lightbox modal */}
            {lightboxOpen && (
                <div
                    className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center animate-fade-in"
                    onClick={closeLightbox}
                    onKeyDown={(e) => {
                        if (e.key === "Escape") closeLightbox();
                        if (e.key === "ArrowLeft") navigate(-1);
                        if (e.key === "ArrowRight") navigate(1);
                    }}
                    tabIndex={0}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Visor de imagen"
                >
                    <button
                        onClick={closeLightbox}
                        className="absolute top-6 right-6 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
                        aria-label="Cerrar"
                    >
                        <X size={28} />
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(-1);
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors"
                        aria-label="Imagen anterior"
                    >
                        <ChevronLeft size={32} />
                    </button>

                    <div
                        className="relative w-[90vw] max-w-4xl h-[70vh] flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={FACILITIES_IMAGES[currentImage].src}
                            alt={FACILITIES_IMAGES[currentImage].alt}
                            className="max-w-full max-h-full object-contain"
                        />
                    </div>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(1);
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors"
                        aria-label="Imagen siguiente"
                    >
                        <ChevronRight size={32} />
                    </button>

                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm">
                        {FACILITIES_IMAGES[currentImage].alt}
                    </div>
                </div>
            )}
        </>
    );
}
