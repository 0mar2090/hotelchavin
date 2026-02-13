"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send } from "lucide-react";
import { getWhatsAppLink } from "@/lib/constants";
import { useState } from "react";

const reservationSchema = z.object({
    name: z.string().min(2, "Ingresa tu nombre completo"),
    phone: z.string().min(6, "Ingresa un telefono valido"),
    email: z.string().email("Ingresa un email valido"),
    message: z.string().optional(),
});

type ReservationData = z.infer<typeof reservationSchema>;

export default function HeroForm() {
    const [submitted, setSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ReservationData>({
        resolver: zodResolver(reservationSchema),
        defaultValues: { name: "", phone: "", email: "", message: "" },
    });

    const onSubmit = (data: ReservationData) => {
        const msg = `Hola Hotel Chavin, soy ${data.name}.\n📧 Email: ${data.email}\n📱 Telefono: ${data.phone}\n${
            data.message
                ? `💬 Consulta: ${data.message}`
                : "Deseo informacion sobre disponibilidad y tarifas."
        }`;
        window.open(getWhatsAppLink(msg), "_blank");
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            reset();
        }, 3000);
    };

    return (
        <>
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
                                placeholder="Telefono"
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
        </>
    );
}
