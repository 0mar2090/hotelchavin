import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { HOTEL } from "@/lib/constants";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        template: `%s | ${HOTEL.name}`,
        default: `${HOTEL.name} – El mejor hotel en Barranca, Perú`,
    },
    description:
        "Hotel Chavín ofrece 72 habitaciones con Wi-Fi, TV LED y estacionamiento en Barranca, Perú. Cerca de Caral, Paramonga y el Museo Bolivariano. Reserva ahora.",
    keywords: [
        "hotel barranca",
        "hotel chavin",
        "hotel en barranca peru",
        "hospedaje barranca",
        "hotel cerca de caral",
        "hotel paramonga",
        "alojamiento barranca",
    ],
    metadataBase: new URL(HOTEL.website),
    openGraph: {
        title: `${HOTEL.name} – El mejor hotel en Barranca, Perú`,
        description:
            "72 habitaciones equipadas con Wi-Fi y TV LED. Ubicación estratégica cerca de Caral y Paramonga. Reserva vía WhatsApp.",
        url: HOTEL.website,
        siteName: HOTEL.name,
        locale: "es_PE",
        type: "website",
        images: [
            {
                url: "/images/og-hotel.jpg",
                width: 1200,
                height: 630,
                alt: "Hotel Chavín en Barranca, Perú",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: `${HOTEL.name} – El mejor hotel en Barranca`,
        description: "Reserva tu habitación en Barranca. Cerca de Caral y Paramonga.",
        images: ["/images/og-hotel.jpg"],
    },
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: HOTEL.website,
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Hotel",
        name: HOTEL.name,
        description: HOTEL.description,
        url: HOTEL.website,
        telephone: HOTEL.phone,
        email: HOTEL.email,
        address: {
            "@type": "PostalAddress",
            streetAddress: "Av. José Gálvez 222",
            addressLocality: "Barranca",
            addressRegion: "Lima",
            addressCountry: "PE",
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: -10.752,
            longitude: -77.762,
        },
        numberOfRooms: HOTEL.stats.rooms,
        amenityFeature: HOTEL.stats.amenities.map((a) => ({
            "@type": "LocationFeatureSpecification",
            name: a,
            value: true,
        })),
        priceRange: "$$",
        starRating: {
            "@type": "Rating",
            ratingValue: "3",
        },
    };

    return (
        <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                {/* Preconnect to image CDN - saves ~100-300ms on first image load */}
                <link rel="preconnect" href="https://images.unsplash.com" />
                <link rel="dns-prefetch" href="https://images.unsplash.com" />
                {/* Preconnect to Google Maps for footer embed */}
                <link rel="dns-prefetch" href="https://www.google.com" />
                <link rel="dns-prefetch" href="https://maps.googleapis.com" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body className="antialiased">
                <ScrollProgress />
                <Header />
                <main>{children}</main>
                <Footer />
                <WhatsAppWidget />
                <BackToTop />
            </body>
        </html>
    );
}
