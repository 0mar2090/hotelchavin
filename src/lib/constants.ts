export const HOTEL = {
    name: "Hotel Chavín",
    tagline: "El mejor lugar para disfrutar de Barranca",
    description:
        "Hotel Chavín busca convertirse en un destino necesario al visitar la ciudad de Barranca y otros destinos turísticos cercanos. Es parte de su estrategia de desarrollo consolidarse como una marca con servicios de calidad y claramente definidos en beneficio de sus clientes.",
    mission:
        "Nos esforzamos continuamente por satisfacer las necesidades de nuestros clientes a fin de generar en ellos la mejor experiencia a través del servicio de nuestro personal y el cuidado de nuestras instalaciones.",
    phone: "01-235-2253",
    email: "info@hotelchavin.com.pe",
    whatsapp: "51977819019",
    whatsappDisplay: "+51 977 819 019",
    address: "Av. José Gálvez, 222. Barranca",
    website: "https://hotelchavin.com.pe",
    mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3892.8!2d-77.762!3d-10.752!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQ1JzA3LjIiUyA3N8KwNDUnNDMuMiJX!5e0!3m2!1ses!2spe!4v1700000000000!5m2!1ses!2spe",
    stats: {
        rooms: 72,
        amenities: ["Wi-Fi", "TV LED", "Estacionamiento", "Ambiente acogedor"],
    },
} as const;

export const NAV_LINKS = [
    { label: "Inicio", href: "#inicio" },
    { label: "Habitaciones", href: "#habitaciones" },
    { label: "Descubre Barranca", href: "#atractivos" },
    { label: "Contacto", href: "#contacto" },
] as const;

export const ROOMS = [
    {
        id: "simple",
        name: "Habitación Simple",
        description: "Ideal para viajeros individuales, cómoda y funcional.",
        whatsappMsg:
            "Hola Hotel Chavín, deseo reservar una habitación simple. ¿Podrían darme información de disponibilidad y tarifas?",
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop",
        gradient: "from-amber-800/60 to-stone-900/80",
    },
    {
        id: "doble",
        name: "Habitación Doble",
        description: "Perfecta para compartir, con dos camas confortables.",
        whatsappMsg:
            "Hola Hotel Chavín, deseo reservar una habitación doble. ¿Podrían darme información de disponibilidad y tarifas?",
        image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600&h=400&fit=crop",
        gradient: "from-blue-800/60 to-stone-900/80",
    },
    {
        id: "triple",
        name: "Habitación Triple",
        description: "Espacio amplio para grupos o familias pequeñas.",
        whatsappMsg:
            "Hola Hotel Chavín, deseo reservar una habitación triple. ¿Podrían darme información de disponibilidad y tarifas?",
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&h=400&fit=crop",
        gradient: "from-emerald-800/60 to-stone-900/80",
    },
    {
        id: "matrimonial",
        name: "Habitación Matrimonial",
        description: "Ambiente romántico y acogedor para parejas.",
        whatsappMsg:
            "Hola Hotel Chavín, deseo reservar una habitación matrimonial. ¿Podrían darme información de disponibilidad y tarifas?",
        image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&h=400&fit=crop",
        gradient: "from-rose-800/60 to-stone-900/80",
    },
] as const;

export const FACILITIES_IMAGES = [
    { src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop", alt: "Estacionamiento amplio y seguro" },
    { src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop", alt: "Recepción y área común" },
] as const;

export const ATTRACTIONS = [
    {
        id: "caral",
        name: "Caral",
        description:
            "La ciudad sagrada más antigua de América, con más de 5,000 años de antigüedad. Patrimonio Mundial de la UNESCO.",
        image: "https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?w=600&h=400&fit=crop",
    },
    {
        id: "paramonga",
        name: "Paramonga",
        description:
            "Imponente fortaleza precolombina de la cultura Chimú, construida con adobe sobre una colina con vista al valle.",
        image: "https://images.unsplash.com/photo-1518638150340-f706e86654de?w=600&h=400&fit=crop",
    },
    {
        id: "museo",
        name: "Museo Bolivariano",
        description:
            "Centro cultural e histórico que preserva la memoria de la independencia sudamericana y la herencia de Simón Bolívar.",
        image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=600&h=400&fit=crop",
    },
] as const;

export function getWhatsAppLink(message: string): string {
    return `https://wa.me/${HOTEL.whatsapp}?text=${encodeURIComponent(message)}`;
}
