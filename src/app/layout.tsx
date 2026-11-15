import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "Certification Hub", description: "Preparación personal de certificaciones" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
