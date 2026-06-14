import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import { CustomCursor } from "@/components/CustomCursor";
import { TopNav } from "@/components/TopNav";
import { ColorPicker } from "@/components/ColorPicker";

const anton = Anton({
  variable: "--font-headline",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Spencer Gabor",
  description:
    "Spencer Gabor is an illustrator, designer and muralist based in Brooklyn, New York.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${anton.variable} ${inter.variable}`}>
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <CustomCursor />
            <TopNav />
            <ColorPicker />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
