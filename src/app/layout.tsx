import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import WhatsAppFloatingButton from "@/components/ui/WhatsAppFloatingButton";
import CookieBanner from "@/components/ui/CookieBanner";

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
  title: "Crystal Spa – Suite Spa Privée de Luxe",
  description: "L'art du luxe intime. Quand le bien-être devient une histoire à deux. Suites spa privées haut de gamme avec jacuzzi privatif, sauna finlandais et services hôteliers 5 étoiles.",
  keywords: ["crystal spa", "suite spa privée", "jacuzzi privatif", "sauna privatif", "séjour romantique luxe", "spa paris"],
  openGraph: {
    title: "Crystal Spa – Suite Spa Privée de Luxe",
    description: "Suites spa privées haut de gamme avec jacuzzi privatif et sauna.",
    images: ["/a1/Jacuzzi.png"],
  },
};

const themeInitScript = `
  (function() {
    try {
      var saved = localStorage.getItem('crystal_spa_theme');
      var root = document.documentElement;
      var isDark = true;
      if (saved === 'light') {
        isDark = false;
      } else if (saved === 'dark') {
        isDark = true;
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        isDark = false;
      }
      if (!isDark) {
        root.classList.remove('dark');
        root.classList.add('light');
        root.setAttribute('data-theme', 'light');
        root.style.colorScheme = 'light';
      } else {
        root.classList.remove('light');
        root.classList.add('dark');
        root.setAttribute('data-theme', 'dark');
        root.style.colorScheme = 'dark';
      }
    } catch (e) {
      document.documentElement.classList.add('dark');
    }
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${outfit.variable} ${jakarta.variable} ${cormorant.variable} dark scroll-smooth h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col font-sans antialiased selection:bg-[#d4af37] selection:text-[#3c2f00] relative"
      >
        {/* Subtle Luxury Boutique Hotel Tactile Grain Texture */}
        <div
          aria-hidden="true"
          className="fixed inset-0 pointer-events-none z-50 opacity-20 luxury-grain-overlay"
        />
        <ThemeProvider>
          {children}
          <WhatsAppFloatingButton />
          <CookieBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}
