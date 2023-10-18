import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Chris Karampagias' blog",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  other: {
    charset: "UTF-8",
  },
};

export default function RootLayout({ children }) {
  return (
    <html data-theme="winter" lang="en">
      <body className="min-h-screen">
        <Navbar />
        {children}
        <Footer />
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
