import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://crystal-spa.fr'),
  title: "Crystal Spa – Suite Spa Privative de Luxe",
  description: "L'art du luxe intime. Quand le bien-être devient une histoire à deux. Suites spa privatives haut de gamme avec jacuzzi privatif, sauna finlandais et services 5 étoiles.",
  keywords: ["crystal spa", "suite spa privative", "jacuzzi privatif", "sauna privatif", "séjour romantique luxe", "spa paris"],
  openGraph: {
    title: "Crystal Spa – Suite Spa Privative de Luxe",
    description: "Suites spa privatives haut de gamme avec jacuzzi privatif et sauna.",
    images: ["/a1/Jacuzzi.png"],
  },
};


import WhatsAppFloatingButton from "@/components/ui/WhatsAppFloatingButton";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${outfit.variable} ${jakarta.variable} ${cormorant.variable} dark scroll-smooth h-full antialiased`}
    >
      <head>
        <link
          rel="preload"
          as="image"
          href="/a2/Jacuzzi.png"
          type="image/png"
          fetchPriority="high"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#131313] text-[#e5e2e1] font-sans antialiased selection:bg-[#d4af37] selection:text-[#3c2f00]">
        {children}
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
