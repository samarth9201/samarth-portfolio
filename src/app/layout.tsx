"use client";

import Navbar from "@/components/Navbar";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const Home = pathname === "/";
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <ThemeProvider>
          <Navbar DisplayName={Home ? false : true}/>
          <div className="flex justify-center items-center mt-16 p-8 max-w-full md:max-w-[70%] min-h-screen mx-auto">{children}</div>
          <Footer/>
          <SpeedInsights />
          <Analytics/>
        </ThemeProvider>
      </body>
    </html>
  );
}
