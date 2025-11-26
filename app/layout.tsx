import type { Metadata } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const sans = Space_Grotesk({ subsets: ["latin"], variable: "--font-sans" });
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Signal Distiller AI",
  description:
    "Mock data dashboard showing the Signal Distiller AI lab view (Noise → Filter → Signal).",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="ko" className={`${sans.variable} ${mono.variable}`}>
      <body className="bg-canvas text-white antialiased">
        <div className="pointer-events-none fixed inset-0 opacity-[0.6] blur-3xl" aria-hidden>
          <div className="absolute left-20 top-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(123,240,193,0.25)_0%,_rgba(0,0,0,0)_60%)]" />
          <div className="absolute right-10 top-0 h-80 w-80 rounded-full bg-[radial-gradient(circle,_rgba(109,213,255,0.15)_0%,_rgba(0,0,0,0)_60%)]" />
        </div>
        <div className="relative z-10 min-h-screen">{children}</div>
      </body>
    </html>
  );
}
