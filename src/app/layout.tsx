import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Terra Peak | RunnerCoach Platform",
  description:
    "Terra Peak conecta runners y coaches con planes personalizados, eventos y gestión integral.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} antialiased bg-base text-base-foreground`}>
        {children}
      </body>
    </html>
  );
}
