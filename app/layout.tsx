import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata: Metadata = {
  title: "Kevin V. Alcaide | Junior Software Engineer & Full-Stack Developer",
  description: "Explore the portfolio of Kevin V. Alcaide, a Junior Software Engineer, Full-Stack Developer, and Mobile Developer specializing in modern web applications, mobile solutions, and IoT systems.",
  openGraph: { title: "Kevin V. Alcaide | Software Engineer", description: "Modern web applications, mobile solutions, and practical digital experiences.", type: "website" },
  twitter: { card: "summary_large_image", title: "Kevin V. Alcaide | Software Engineer", description: "Modern web applications, mobile solutions, and practical digital experiences." },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geist.variable} ${geistMono.variable} ${spaceGrotesk.variable}`}>{children}</body></html>;
}
