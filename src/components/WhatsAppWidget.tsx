"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { HOTEL, getWhatsAppLink } from "@/lib/constants";

export default function WhatsAppWidget() {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
            {/* Tooltip / expanded state */}
            {expanded && (
                <div className="animate-fade-in bg-white rounded-2xl shadow-2xl p-5 w-72 border border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                <MessageCircle size={16} className="text-white" />
                            </div>
                            <div>
                                <div className="font-semibold text-sm text-gray-800">
                                    {HOTEL.name}
                                </div>
                                <div className="text-[11px] text-green-600">En línea</div>
                            </div>
                        </div>
                        <button
                            onClick={() => setExpanded(false)}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                            aria-label="Cerrar"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-3 mb-4">
                        <p className="text-sm text-gray-600">
                            ¡Hola! 👋 ¿Deseas alojarte? Chatea con nosotros y te ayudaremos
                            a encontrar la habitación perfecta.
                        </p>
                    </div>

                    <a
                        href={getWhatsAppLink(
                            "Hola Hotel Chavín, deseo información sobre disponibilidad y tarifas de habitaciones."
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-xl transition-colors w-full text-sm"
                    >
                        <MessageCircle size={18} />
                        Iniciar conversación
                    </a>
                </div>
            )}

            {/* FAB button */}
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 transition-all duration-300 animate-pulse-soft hover:animate-none"
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
