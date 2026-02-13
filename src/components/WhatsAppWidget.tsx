"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { HOTEL, getWhatsAppLink } from "@/lib/constants";

export default function WhatsAppWidget() {
    const [expanded, setExpanded] = useState(false);
    const [showHint, setShowHint] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowHint(true), 4000);
        const hideTimer = setTimeout(() => setShowHint(false), 10000);
        return () => {
            clearTimeout(timer);
            clearTimeout(hideTimer);
        };
    }, []);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
            {/* Auto hint bubble */}
            {showHint && !expanded && (
                <div className="animate-slide-left bg-white rounded-2xl shadow-xl px-4 py-3 text-sm text-gray-700 max-w-[200px] border border-gray-100">
                    <button
                        onClick={() => setShowHint(false)}
                        className="absolute -top-1 -left-1 w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-300 transition-colors"
                    >
                        <X size={10} />
                    </button>
                    ¿Necesitas ayuda? ¡Escríbenos!
                </div>
            )}

            {/* Expanded chat */}
            {expanded && (
                <div className="animate-scale-in bg-white rounded-3xl shadow-2xl w-80 border border-gray-100 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-green-600 to-green-500 px-5 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                <MessageCircle size={20} className="text-white" />
                            </div>
                            <div>
                                <div className="font-semibold text-sm text-white">
                                    {HOTEL.name}
                                </div>
                                <div className="text-[11px] text-green-100 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse" />
                                    En línea
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setExpanded(false)}
                            className="text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
                            aria-label="Cerrar"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Chat body */}
                    <div className="p-4 bg-[#ECE5DD] min-h-[120px]">
                        <div className="bg-white rounded-2xl rounded-tl-sm p-4 shadow-sm max-w-[85%]">
                            <p className="text-sm text-gray-700 leading-relaxed">
                                ¡Hola! ¿Deseas alojarte? Chatea con nosotros y te
                                ayudaremos a encontrar la habitación perfecta.
                            </p>
                            <p className="text-[10px] text-gray-400 text-right mt-2">
                                Ahora
                            </p>
                        </div>
                    </div>

                    {/* Action */}
                    <div className="p-4 bg-white border-t border-gray-100">
                        <a
                            href={getWhatsAppLink(
                                "Hola Hotel Chavín, deseo información sobre disponibilidad y tarifas de habitaciones."
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 w-full text-sm hover:shadow-lg hover:shadow-green-500/25"
                        >
                            <MessageCircle size={18} />
                            Iniciar conversación
                        </a>
                    </div>
                </div>
            )}

            {/* FAB button */}
            <button
                onClick={() => {
                    setExpanded(!expanded);
                    setShowHint(false);
                }}
                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 ${
                    expanded
                        ? "bg-gray-600 hover:bg-gray-700 shadow-gray-600/30 rotate-90"
                        : "bg-green-500 hover:bg-green-600 shadow-green-500/30 animate-pulse-soft hover:animate-none"
                }`}
                aria-label="Abrir chat de WhatsApp"
            >
                {expanded ? (
                    <X size={24} className="text-white" />
                ) : (
                    <MessageCircle size={24} className="text-white" />
                )}
            </button>
        </div>
    );
}
