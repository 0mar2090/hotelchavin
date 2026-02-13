"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, MapPin, Star, ChevronDown, Shield, Clock, Wifi } from "lucide-react";
import { HOTEL, getWhatsAppLink } from "@/lib/constants";
import { useState, useEffect } from "react";

const reservationSchema = z.object({
    name: z.string().min(2, "Ingresa tu nombre completo"),
    phone: z.string().min(6, "Ingresa un teléfono válido"),
    email: z.string().email("Ingresa un email válido"),
    message: z.string().optional(),
});

type ReservationData = z.infer<typeof reservationSchema>;

export default function Hero() {
    const [submitted, setSubmitted] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ReservationData>({
        resolver: zodResolver(reservationSchema),
        defaultValues: { name: "", phone: "", email: "", message: "" },
    });

    useEffect(() => {
        const handleMouse = (e: MouseEvent) => {
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20,
            });
        };
        window.addEventListener("mousemove", handleMouse);
        return () => window.removeEventListener("mousemove", handleMouse);
    }, []);

    const onSubmit = (data: ReservationData) => {
        const msg = `Hola Hotel Chavín, soy ${data.name}.\n📧 Email: ${data.email}\n📱 Teléfono: ${data.phone}\n${
            data.message
                ? `💬 Consulta: ${data.message}`
                : "Deseo información sobre disponibilidad y tarifas."
        }`;
        window.open(getWhatsAppLink(msg), "_blank");
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            reset();
        }, 3000);
    };

    return (
        <section
            id="inicio"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Background with parallax */}
            <div className="absolute inset-0 bg-brand-navy">
                <div
                    className="absolute inset-0 opacity-30 scale-110 transition-transform duration-[2s] ease-out"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px) scale(1.1)`,
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/80 via-brand-navy/60 to-brand-navy/95" />

                {/* Decorative floating elements */}
                <div
                    className="absolute top-20 left-10 w-72 h-72 bg-brand-gold/10 rounded-full blur-3xl animate-float"
                    style={{ transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)` }}
                />
                <div
                    className="absolute bottom-20 right-10 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl animate-float-delayed"
                    style={{ transform: `translate(${mousePos.x * -0.3}px, ${mousePos.y * -0.3}px)` }}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/[0.03] rounded-full blur-3xl" />

                {/* Grid pattern overlay */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(200,164,92,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(200,164,92,0.3) 1px, transparent 1px)`,
                        backgroundSize: "60px 60px",
                    }}
                />
            </div>

            <div className="relative z-10 container-max px-4 sm:px-6 lg:px-8 pt-32 pb-16 md:pt-40 md:pb-24">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left – Text */}
                    <div className="text-center lg:text-left animate-fade-in">
                        <div className="inline-flex items-center gap-2 bg-brand-gold/20 text-brand-gold-light px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-brand-gold/20">
                            <MapPin size={16} />
                            Barranca, Perú
                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                        </div>
                        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-6">
                            {HOTEL.tagline.split("Barranca")[0]}
                            <span className="text-gradient-gold">Barranca</span>
                        </h1>
                        <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
                            {HOTEL.stats.rooms} habitaciones equipadas con WiFi y TV LED, a
                            minutos de Caral y Paramonga. Tu mejor opción para disfrutar el
                            norte chico.
                        </p>

                        {/* Trust badges */}
                        <div className="flex flex-wrap items-center gap-6 justify-center lg:justify-start mb-8">
                            <div className="flex items-center gap-1 text-brand-gold">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={18} fill="currentColor" />
                                ))}
                            </div>
                            <span className="text-gray-400 text-sm">
                                Desde 1995 atendiendo viajeros
                            </span>
                        </div>

                        {/* Mini feature badges */}
                        <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                            {[
                                { icon: Shield, label: "Seguro" },
                                { icon: Clock, label: "24/7" },
                                { icon: Wifi, label: "Wi-Fi" },
                            ].map((badge) => (
                                <div
                                    key={badge.label}
                                    className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 px-4 py-2 rounded-full text-sm"
                                >
                                    <badge.icon size={14} className="text-brand-gold" />
                                    {badge.label}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right – Form */}
                    <div className="animate-slide-up">
                        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl relative overflow-hidden">
                            {/* Shimmer effect */}
                            <div className="absolute inset-0 bg-gold-shimmer bg-[length:200%_100%] animate-shimmer pointer-events-none" />

                            <div className="relative z-10">
                                <h2 className="font-display text-2xl font-bold text-white mb-2">
                                    Reservaciones
                                </h2>
                                <p className="text-gray-400 text-sm mb-6">
                                    Completa tus datos y te contactaremos al instante vía WhatsApp
                                </p>

                                {submitted ? (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-scale-in">
                                            <Send className="text-green-400" size={28} />
                                        </div>
                                        <p className="text-white font-semibold text-lg">
                                            ¡Mensaje enviado!
                                        </p>
                                        <p className="text-gray-400 text-sm mt-1">
                                            Revisa tu WhatsApp para continuar
                                        </p>
                                    </div>
                                ) : (
                                    <form
                                        onSubmit={handleSubmit(onSubmit)}
                                        className="space-y-4"
                                        noValidate
                                    >
                                        <div>
                                            <input
                                                {...register("name")}
                                                type="text"
                                                placeholder="Nombre completo"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold/50 transition-all"
                                            />
                                            {errors.name && (
                                                <p className="text-red-400 text-xs mt-1">
                                                    {errors.name.message}
                                                </p>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <input
                                                    {...register("phone")}
                                                    type="tel"
                                                    placeholder="Teléfono"
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold/50 transition-all"
                                                />
                                                {errors.phone && (
                                                    <p className="text-red-400 text-xs mt-1">
                                                        {errors.phone.message}
                                                    </p>
                                                )}
                                            </div>
                                            <div>
                                                <input
                                                    {...register("email")}
                                                    type="email"
                                                    placeholder="Email"
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold/50 transition-all"
                                                />
                                                {errors.email && (
                                                    <p className="text-red-400 text-xs mt-1">
                                                        {errors.email.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <textarea
                                                {...register("message")}
                                                placeholder="¿Tienes alguna consulta? (opcional)"
                                                rows={3}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold/50 transition-all resize-none"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full btn-primary py-4 text-base rounded-xl group"
                                        >
                                            <Send
                                                size={18}
                                                className="transition-transform duration-300 group-hover:translate-x-1"
                                            />
                                            Enviar consulta por WhatsApp
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce-subtle">
                <button
                    onClick={() =>
                        document
                            .querySelector("#experiencia")
                            ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="flex flex-col items-center gap-2 text-gray-400 hover:text-brand-gold transition-colors"
                    aria-label="Desplazar hacia abajo"
                >
                    <span className="text-xs uppercase tracking-widest">Descubre</span>
                    <ChevronDown size={20} />
                </button>
            </div>
        </section>
    );
}
