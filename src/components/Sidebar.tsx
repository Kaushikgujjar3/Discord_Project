"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { Plus, Compass, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import ChannelList from "./ChannelList";

const SERVERS = [
    { id: "avengers-tower", name: "Avengers Tower", icon: "A", color: "bg-blue-600" },
    { id: "daily-bugle", name: "Daily Bugle", icon: "D", color: "bg-red-600" },
    { id: "queens-hangout", name: "Queens Hangout", icon: "Q", color: "bg-yellow-500" },
    { id: "multiverse-chat", name: "Multiverse Nexus", icon: "M", color: "bg-purple-600" },
    { id: "oscorp-labs", name: "Oscorp Labs", icon: "O", color: "bg-green-600" },
];

export default function Sidebar() {
    const router = useRouter();
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    // Get serverId from pathname: /server/[serverId]/channel/[channelName]
    const serverId = pathname?.split("/")[2];

    return (
        <>
            {/* Mobile Button */}
            <div className="md:hidden fixed top-4 left-4 z-[60]">
                <button
                    onClick={() => setOpen(!open)}
                    className="p-2 bg-zinc-900 rounded-md border border-zinc-800 shadow-lg"
                >
                    {open ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
                </button>
            </div>

            {/* Overlay */}
            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
                />
            )}

            {/* Sidebar Container */}
            <div
                className={cn(
                    "fixed top-[65px] bottom-0 left-0 flex transition-all duration-300 z-50 overflow-hidden",
                    open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                )}
            >
                {/* Servers Rail */}
                <div className="w-[72px] bg-zinc-950 flex flex-col items-center py-3 gap-2 border-r border-zinc-900 h-full overflow-y-auto custom-scrollbar">
                    {SERVERS.map((server) => {
                        const isActive = serverId === server.id;

                        return (
                            <button
                                key={server.id}
                                onClick={() => {
                                    router.push(`/server/${server.id}`);
                                }}
                                className={cn(
                                    "w-12 h-12 rounded-[24px] hover:rounded-[16px] transition-all flex items-center justify-center text-white font-bold relative group shrink-0",
                                    isActive ? "bg-blue-600 rounded-[16px]" : "bg-zinc-800",
                                    server.color
                                )}
                            >
                                {isActive && (
                                    <div className="absolute left-[-12px] w-2 h-8 bg-white rounded-r-full" />
                                )}
                                {server.icon}
                            </button>
                        );
                    })}

                    <div className="w-8 h-[2px] bg-zinc-800 my-2 shrink-0" />

                    <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-500 hover:text-white transition-colors group shrink-0">
                        <Plus className="w-5 h-5 text-green-500 group-hover:text-white" />
                    </div>

                    <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-500 hover:text-white transition-colors group shrink-0">
                        <Link href='/community'><Compass className="w-5 h-5 text-green-500 group-hover:text-white" /></Link>
                    </div>
                </div>

                {/* Channels (Mobile Only in Sidebar) */}
                {serverId && (
                    <div className={cn(
                        "w-64 h-full bg-zinc-900 md:hidden border-r border-black overflow-hidden transition-all duration-300",
                        open ? "opacity-100" : "opacity-0 invisible w-0"
                    )}>
                        <ChannelList serverId={serverId} />
                    </div>
                )}
            </div>
        </>
    );
}