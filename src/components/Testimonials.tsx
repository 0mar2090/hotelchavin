"use client";

import { useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Testimonials() {
    const [current, setCurrent] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const { ref, isVisible } = useScrollReveal();

    const next = useCallback(() => {
        setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    }, []);

    const prev = () => {
        setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    };

    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(next, 5000);
        return () => clearInterval(interval);
    }, [isAutoPlaying, next]);

    const testimonial = TESTIMONIALS[current];

    return (
        <section className="section-padding bg-brand-cream relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-10 left-10 opacity-[0.03]">
                <Quote size={300} />
            </div>

            <div
                ref={ref}
                className={`container-max relative z-10 reveal ${isVisible ? "visible" : ""}`}
            >
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="inline-block text-brand-gold font-semibold text-sm uppercase tracking-[0.15em] mb-4">
                        Testimonios
                    </span>
                    <h2 className="heading-primary mb-4">
                        Lo que dicen nuestros{" "}
                        <span className="text-gradient-gold">huéspedes</span>
                    </h2>
                    <div className="gold-line-center mt-4" />
                </div>

                {/* Testimonial Card */}
                <div className="max-w-3xl mx-auto">
                    <div
                        className="bg-white rounded-3xl p-8 md:p-12 shadow-xl relative"
                        onMouseEnter={() => setIsAutoPlaying(false)}
                        onMouseLeave={() => setIsAutoPlaying(true)}
                    >
                        {/* Quote icon */}
                        <div className="absolute -top-5 left-8 w-10 h-10 bg-brand-gold rounded-full flex items-center justify-center shadow-lg">
                            <Quote size={18} className="text-white" />
                        </div>

                        {/* Stars */}
                        <div className="flex items-center gap-1 mb-6">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={20}
                                    className={
                                        i < testimonial.rating
                                            ? "text-brand-gold fill-brand-gold"
                                            : "text-gray-200"
                                    }
                                />
                            ))}
                        </div>

                        {/* Text */}
                        <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-8 font-medium italic">
                            &ldquo;{testimonial.text}&rdquo;
                        </p>

                        {/* Author */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-gold to-brand-gold-dark flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">
                                        {testimonial.name[0]}
                                    </span>
                                </div>
                                <div>
                                    <div className="font-bold text-brand-navy">
                                        {testimonial.name}
                                    </div>
                                    <div className="text-gray-500 text-sm">
                                        {testimonial.origin} &middot; {testimonial.date}
                                    </div>
                                </div>
                            </div>

                            {/* Navigation */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={prev}
                                    className="w-10 h-10 rounded-full border-2 border-gray-200 hover:border-brand-gold hover:bg-brand-gold hover:text-white text-gray-400 flex items-center justify-center transition-all duration-300"
                                    aria-label="Anterior"
                                >
                                    <ChevronLeft size={18} />
                                </button>
                                <button
                                    onClick={next}
                                    className="w-10 h-10 rounded-full border-2 border-gray-200 hover:border-brand-gold hover:bg-brand-gold hover:text-white text-gray-400 flex items-center justify-center transition-all duration-300"
                                    aria-label="Siguiente"
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Dots */}
                    <div className="flex items-center justify-center gap-2 mt-8">
                        {TESTIMONIALS.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                className={`rounded-full transition-all duration-300 ${
                                    i === current
                                        ? "w-8 h-2.5 bg-brand-gold"
                                        : "w-2.5 h-2.5 bg-gray-300 hover:bg-brand-gold/50"
                                }`}
                                aria-label={`Testimonio ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
