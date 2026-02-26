import type { Metadata } from "next";
import { Inter, Bangers } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });
const bangers = Bangers({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bangers",
});

export const metadata: Metadata = {
  title: "OpenTL Spider-Network",
  description: "Your friendly neighborhood real-time community hub",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${bangers.variable} web-pattern min-h-screen`}
      >
        <AuthProvider>
          <Navbar />
          <main className="">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}