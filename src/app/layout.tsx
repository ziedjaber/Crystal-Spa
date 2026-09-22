import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://crystal-spa.fr'),
  title: "Crystal Spa – Suite Spa Privative de Luxe",
  description: "L'art du luxe intime et du lâcher-prise absolu. Suites spa privatives haut de gamme avec jacuzzi balnéo XXL, sauna finlandais et services 5 étoiles.",
  keywords: ["crystal spa", "suite spa privative", "jacuzzi privatif", "sauna privatif", "séjour romantique luxe", "spa paris"],
  openGraph: {
    title: "Crystal Spa – Suite Spa Privative de Luxe",
    description: "Écrin d'exception & bien-être intime. Jacuzzi balnéo privatif et sauna.",
    images: ["/a1/Jacuzzi.png"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${outfit.variable} ${jakarta.variable} dark scroll-smooth h-full antialiased`}
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
      </body>
    </html>
  );
}
