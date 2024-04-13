import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "./providers";
import Header from "./Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alt Form",
  description: "Create any form",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <Header />
        <Providers>
          <div className="w-1/2 mx-auto border m-8 p-8">{children}</div>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
