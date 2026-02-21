"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isHome = pathname === "/";

    return (
        <>
            <nav
                className={cn(
                    "w-full z-[100] transition-all duration-300 px-6 py-4",
                    isHome
                        ? "fixed top-0 left-0"
                        : "sticky top-0 bg-black border-b border-white/10",
                    isHome &&
                    (isScrolled
                        ? "bg-black/80 backdrop-blur-md border-b border-white/10"
                        : "bg-transparent")
                )}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">

                    {/* Logo - LEFT */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center transition-transform group-hover:rotate-12">
                            <svg
                                viewBox="0 0 24 24"
                                className="w-6 h-6 fill-white"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M12,2C15.84,2 19,5.16 19,9C19,10.61 18.45,12.09 17.5,13.27C19.06,14.84 20,17 20,19.4V20.4C20,21.28 19.28,22 18.4,22H5.6C4.72,22 4,21.28 4,20.4V19.4C4,17 4.94,14.84 6.5,13.27C5.55,12.09 5,10.61 5,9C5,5.16 8.16,2 12,2Z" />
                            </svg>
                        </div>
                        <span className="spidey-font text-2xl text-white tracking-widest uppercase ml-2">
                            OPENTL
                        </span>
                    </Link>

                    {/* Desktop Nav - CENTER */}
                    <div className="hidden md:flex items-center gap-10 absolute left-1/2 transform -translate-x-1/2">
                        <NavLink href="/">Home</NavLink>
                        <NavLink href="/dashboard">Dashboard</NavLink>
                        <NavLink href="/community">Community</NavLink>
                        <NavLink href="/webhub">Web Hub</NavLink>
                        <NavLink href="/streaming-meetings">Streaming/Meetings</NavLink>
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-4">
                        {/* Login - Desktop */}
                        <Link
                            href="/signin"
                            className="hidden md:block px-6 py-2 bg-white text-black font-bold rounded-full hover:bg-neutral-200 transition-colors text-sm"
                        >
                            Login
                        </Link>

                        {/* Mobile Toggle */}
                        <button
                            className="md:hidden text-white"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div
                className={cn(
                    "fixed inset-0 bg-zinc-950 z-[90] flex flex-col items-center justify-center gap-8 text-2xl font-bold transition-all duration-300 md:hidden",
                    mobileMenuOpen
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                )}
            >
                <MobileNavLink href="/" onClick={() => setMobileMenuOpen(false)}>
                    Home
                </MobileNavLink>
                <MobileNavLink href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                    Dashboard
                </MobileNavLink>
                <MobileNavLink href="/community" onClick={() => setMobileMenuOpen(false)}>
                    Community
                </MobileNavLink>
                <MobileNavLink href="/GamingHub" onClick={() => setMobileMenuOpen(false)}>
                    Web Hub
                </MobileNavLink>

                <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="mt-6 px-6 py-3 bg-white text-black rounded-full"
                >
                    Login
                </Link>
            </div>
        </>
    );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={cn(
                "font-bold text-sm transition-colors relative group",
                isActive ? "text-red-600" : "text-white hover:text-red-500"
            )}
        >
            {children}
            <span
                className={cn(
                    "absolute -bottom-1 left-0 h-0.5 bg-red-600 transition-all",
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                )}
            />
        </Link>
    );
}


function MobileNavLink({
    href,
    onClick,
    children
}: {
    href: string;
    onClick: () => void;
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            onClick={onClick}
            className={cn(
                "spidey-font text-4xl transition-colors",
                isActive ? "text-red-600" : "text-white hover:text-red-600"
            )}
        >
            {children}
        </Link>
    );
}
