import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MedIntel",
  description: "Hospital Management System built with FastAPI and Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-slate-100">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: "10px",
              background: "#1e293b",
              color: "#fff",
            },
          }}
        />

        {children}
      </body>
    </html>
  );
}