"use client";

import { useState, useEffect } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";
import { HOTEL, NAV_LINKS } from "@/lib/constants";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavClick = (href: string) => {
        setIsOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? "bg-white/95 backdrop-blur-md shadow-lg"
                    : "bg-brand-navy/90 backdrop-blur-sm"
                }`}
        >
            {/* Top bar – contact */}
            <div
                className={`hidden md:flex items-center justify-between px-8 py-2 text-sm transition-colors duration-300 ${scrolled
                        ? "bg-brand-navy text-white"
                        : "bg-brand-navy-dark text-gray-300"
                    }`}
            >
                <div className="flex items-center gap-6">
                    <a
                        href={`tel:${HOTEL.phone}`}
                        className="flex items-center gap-2 hover:text-brand-gold transition-colors"
                    >
                        <Phone size={14} />
                        {HOTEL.phone}
                    </a>
                    <a
                        href={`mailto:${HOTEL.email}`}
                        className="flex items-center gap-2 hover:text-brand-gold transition-colors"
                    >
                        <Mail size={14} />
                        {HOTEL.email}
                    </a>
                </div>
                <a
                    href={`mailto:${HOTEL.email}?subject=Trabajo`}
                    className="hover:text-brand-gold transition-colors font-medium"
                >
                    Trabaja con nosotros
                </a>
            </div>

            {/* Main nav */}
            <div className="container-max flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 md:h-20">
                {/* Logo */}
                <a
                    href="#inicio"
                    onClick={(e) => {
                        e.preventDefault();
                        handleNavClick("#inicio");
                    }}
                    className="flex items-center gap-3"
                >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-gold to-brand-gold-dark flex items-center justify-center">
                        <span className="text-white font-display font-bold text-lg">H</span>
                    </div>
                    <div className="flex flex-col">
                        <span
                            className={`font-display font-bold text-lg leading-tight transition-colors ${scrolled ? "text-brand-navy" : "text-white"
                                }`}
                        >
                            Hotel Chavín
                        </span>
                        <span
                            className={`text-[10px] uppercase tracking-[0.2em] transition-colors ${scrolled ? "text-brand-gold" : "text-brand-gold-light"
                                }`}
                        >
                            Barranca – Perú
                        </span>
                    </div>
                </a>

                {/* Desktop nav */}
                <nav className="hidden lg:flex items-center gap-1">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavClick(link.href);
                            }}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${scrolled
                                    ? "text-gray-700 hover:text-brand-navy hover:bg-gray-100"
                                    : "text-gray-200 hover:text-white hover:bg-white/10"
                                }`}
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href={`https://wa.me/${HOTEL.whatsapp}?text=${encodeURIComponent(
                            "Hola Hotel Chavín, deseo hacer una reservación."
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 btn-primary text-sm py-2"
                    >
                        Reservar ahora
                    </a>
                </nav>

                {/* Mobile toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? "text-brand-navy hover:bg-gray-100" : "text-white hover:bg-white/10"
                        }`}
                    aria-label="Menú"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile menu */}
            <div
                className={`lg:hidden overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="bg-white border-t border-gray-100 px-4 py-4 space-y-1">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavClick(link.href);
                            }}
                            className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-brand-cream hover:text-brand-navy font-medium transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                    <div className="pt-2">
                        <a
                            href={`https://wa.me/${HOTEL.whatsapp}?text=${encodeURIComponent(
                                "Hola Hotel Chavín, deseo hacer una reservación."
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary w-full text-center text-sm"
                        >
                            Reservar ahora
                        </a>
                    </div>
                    <div className="pt-2 flex flex-col gap-2 text-sm text-gray-500">
                        <a href={`tel:${HOTEL.phone}`} className="flex items-center gap-2">
                            <Phone size={14} /> {HOTEL.phone}
                        </a>
                        <a href={`mailto:${HOTEL.email}`} className="flex items-center gap-2">
                            <Mail size={14} /> {HOTEL.email}
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
}
