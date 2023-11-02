import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import QueryProvider from "@/utils/QueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
      <body className="min-h-screen flex flex-col justify-between">
        <QueryProvider>
          <Navbar />
          {children}
          <Footer />
          <Toaster position="bottom-right" />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryProvider>
      </body>
    </html>
  );
}
