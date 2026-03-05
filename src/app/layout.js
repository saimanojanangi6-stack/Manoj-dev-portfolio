"use client"; // Layout must be client-side to handle the loading state
import "./globals.css";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-[#0F172A] text-white antialiased`}>
        <AnimatePresence mode="wait">
          {isLoading ? (
            <SplashScreen key="splash" finishLoading={() => setIsLoading(false)} />
          ) : (
            <div key="content">
              <Navbar />
              <main>{children}</main>
              <Footer />
            </div>
          )}
        </AnimatePresence>
      </body>
    </html>
  );
}