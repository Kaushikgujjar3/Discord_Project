"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Plus, Compass } from 'lucide-react';

const SERVERS = [
    { id: 'avengers-tower', name: 'Avengers Tower', icon: 'A', color: 'bg-blue-600' },
    { id: 'daily-bugle', name: 'Daily Bugle', icon: 'D', color: 'bg-red-600' },
    { id: 'queens-hangout', name: 'Queens Hangout', icon: 'Q', color: 'bg-yellow-500' },
    { id: 'multiverse-chat', name: 'Multiverse Nexus', icon: 'M', color: 'bg-purple-600' },
    { id: 'oscorp-labs', name: 'Oscorp Labs', icon: 'O', color: 'bg-green-600' },
];

export default function Sidebar() {
    const pathname = usePathname();
    const isHome = pathname === "/";

    return (
        <div className={cn(
            "w-[72px] bg-zinc-950 flex flex-col items-center py-3 gap-2 border-r border-zinc-900 overflow-y-auto z-50 fixed left-0",
            isHome ? "top-0 h-screen" : "top-[65px] h-[calc(100vh-65px)]"
        )}>
            {/* Home Button */}
            <SidebarIcon
                icon={<img src="/spidey-icon.png" alt="Home" className="w-7 h-7" onError={(e) => e.currentTarget.src = 'https://placehold.co/28x28/bf1f1f/ffffff?text=S'} />}
                label="Direct Messages"
                active
            />

            <div className="w-8 h-[2px] bg-zinc-800 rounded-lg mx-auto my-1" />

            {/* Servers */}
            {SERVERS.map((server) => (
                <SidebarIcon
                    key={server.id}
                    icon={<span className="font-bold text-white">{server.icon}</span>}
                    label={server.name}
                    className={server.color}
                />
            ))}

            <div className="w-8 h-[2px] bg-zinc-800 rounded-lg mx-auto my-1" />

            {/* Actions */}
            <SidebarIcon
                icon={<Plus className="w-6 h-6 text-green-500" />}
                label="Add Server"
                className="bg-zinc-800 hover:bg-green-600 hover:text-white group-hover:text-white"
            />
            <SidebarIcon
                icon={<Compass className="w-6 h-6 text-green-500" />}
                label="Explore"
                className="bg-zinc-800 hover:bg-green-600 hover:text-white group-hover:text-white"
            />
        </div>
    );
}

function SidebarIcon({ icon, label, active, className }: { icon: React.ReactNode, label: string, active?: boolean, className?: string }) {
    return (
        <div className="relative group flex items-center justify-center w-full">
            {/* Active Indicator */}
            <div className={cn(
                "absolute left-0 bg-white w-[4px] rounded-r-full transition-all duration-200",
                active ? "h-10" : "h-2 group-hover:h-5 opacity-0 group-hover:opacity-100"
            )} />

            {/* Icon Button */}
            <button className={cn(
                "relative w-12 h-12 rounded-[24px] group-hover:rounded-[16px] transition-all duration-200 flex items-center justify-center overflow-hidden bg-zinc-800",
                active && "bg-blue-600 rounded-[16px]",
                className
            )}>
                {icon}
            </button>

            {/* Tooltip */}
            <div className="absolute left-[76px] bg-black text-white px-3 py-2 rounded-lg font-bold text-sm opacity-0 group-hover:opacity-100 transition-all pointer-events-none z-50 whitespace-nowrap shadow-xl border border-zinc-800 origin-left scale-90 group-hover:scale-100">
                {label}
                {/* Tooltip Arrow */}
                <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-black rotate-45 border-l border-b border-zinc-800" />
            </div>
        </div>
    );
}
