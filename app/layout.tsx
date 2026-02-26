import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ritinder Singh | Portfolio",
  description: "Backend Developer specializing in scalable APIs, Flutter, and Python.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}