import SexyScroll from "@/components/SexyScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import { i } from "framer-motion/client";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

//<SexyScroll preset="Portfolio" showBadge={false} />