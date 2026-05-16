import type { Metadata } from "next";
import "./globals.css";
import { ScrollProgress } from "@/components/ScrollProgress";

export const metadata: Metadata = {
  title: "Cenit Digital — We Build Presence",
  description:
    "Digital media marketing & solutions agency. We don't build websites — we build presence. And then we optimize it. Miami-based.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500&amp;display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&amp;display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
