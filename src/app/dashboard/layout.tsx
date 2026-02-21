"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import ServerSidebar from "@/components/ServerSidebar";
import ChannelSidebar from "@/components/ChannelSidebar";

const INITIAL_DATA = [
    {
        id: "avengers-tower",
        name: "Avengers Tower",
        icon: "A",
        color: "bg-blue-600",
        channels: [
            { id: "gen-1", name: "general", type: "text" },
            { id: "ann-1", name: "announcements", type: "text" },
            { id: "mis-1", name: "missions", type: "text" },
            { id: "voi-1", name: "Briefing Room", type: "voice" },
        ]
    },
    {
        id: "daily-bugle",
        name: "Daily Bugle",
        icon: "D",
        color: "bg-red-600",
        channels: [
            { id: "gen-2", name: "editorial", type: "text" },
            { id: "ann-2", name: "breaking-news", type: "text" },
            { id: "mis-2", name: "field-reports", type: "text" },
            { id: "voi-2", name: "Press Conference", type: "voice" },
        ]
    },
    {
        id: "queens-hangout",
        name: "Queens Hangout",
        icon: "Q",
        color: "bg-yellow-500",
        channels: [
            { id: "gen-q1", name: "general", type: "text" },
            { id: "voi-q1", name: "Lounge", type: "voice" },
        ]
    },
    {
        id: "multiverse-chat",
        name: "Multiverse Nexus",
        icon: "M",
        color: "bg-purple-600",
        channels: [
            { id: "gen-m1", name: "portal-chat", type: "text" },
            { id: "voi-m1", name: "Nexus Point", type: "voice" },
        ]
    },
    {
        id: "oscorp-labs",
        name: "Oscorp Labs",
        icon: "O",
        color: "bg-green-600",
        channels: [
            { id: "gen-3", name: "research", type: "text" },
            { id: "ann-3", name: "safety-protocols", type: "text" },
            { id: "mis-3", name: "experiments", type: "text" },
            { id: "voi-3", name: "Lab Voice", type: "voice" },
        ]
    }
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [servers, setServers] = useState(INITIAL_DATA);
    const [activeServerId, setActiveServerId] = useState(INITIAL_DATA[0].id);
    const [activeChannelId, setActiveChannelId] = useState(INITIAL_DATA[0].channels[0].id);
    const [mobileOpen, setMobileOpen] = useState(false);

    const activeServer = servers.find(s => s.id === activeServerId) || servers[0];

    const handleServerSelect = (id: string) => {
        const server = servers.find(s => s.id === id);
        if (server) {
            setActiveServerId(id);
            setActiveChannelId(server.channels[0].id);
        }
    };

    const handleAddServer = () => {
        const newServerName = prompt("Enter server name:");
        if (!newServerName) return;

        const newId = newServerName.toLowerCase().replace(/\s+/g, '-');
        const newServer = {
            id: newId,
            name: newServerName,
            icon: newServerName[0].toUpperCase(),
            color: "bg-zinc-700",
            channels: [
                { id: `gen-${newId}`, name: "general", type: "text" as const }
            ]
        };

        setServers([...servers, newServer]);
        setActiveServerId(newId);
        setActiveChannelId(newServer.channels[0].id);
    };

    return (
        <div className="flex h-[calc(100vh-65px)] w-full overflow-hidden bg-[#313338]">
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="fixed bottom-6 right-6 z-[100] md:hidden p-4 bg-red-600 text-white rounded-full shadow-2xl transition-transform active:scale-95"
            >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebars Container */}
            <div className={cn(
                "fixed md:relative top-[65px] md:top-0 bottom-0 left-0 z-50 flex transition-transform duration-300",
                "md:translate-x-0",
                mobileOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                {/* Backdrop for mobile */}
                {mobileOpen && (
                    <div
                        onClick={() => setMobileOpen(false)}
                        className="fixed inset-0 bg-black/60 md:hidden z-[-1]"
                    />
                )}

                {/* Server Sidebar */}
                <ServerSidebar
                    servers={servers.map(({ id, name, icon, color }) => ({ id, name, icon, color }))}
                    activeServerId={activeServerId}
                    onServerSelect={handleServerSelect}
                    onAddServer={handleAddServer}
                />

                {/* Channel Sidebar */}
                <ChannelSidebar
                    serverName={activeServer.name}
                    channels={activeServer.channels as any}
                    activeChannelId={activeChannelId}
                    onChannelSelect={(id) => {
                        setActiveChannelId(id);
                        setMobileOpen(false); // Close mobile menu when channel is selected
                    }}
                />
            </div>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-full overflow-hidden">
                {/* Content Header */}
                <div className="h-12 border-b border-black flex items-center px-4 shadow-sm shrink-0 bg-[#313338]">
                    <div className="flex items-center gap-2 text-zinc-400">
                        <span className="text-2xl font-light opacity-50">#</span>
                        <span className="font-bold text-white">
                            {activeServer.channels.find(c => c.id === activeChannelId)?.name}
                        </span>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                    {children || (
                        <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-4">
                            <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center">
                                <span className="text-4xl text-red-600 font-bold">#</span>
                            </div>
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-white">Welcome to #{activeServer.channels.find(c => c.id === activeChannelId)?.name}!</h2>
                                <p>This is the start of the #{activeServer.channels.find(c => c.id === activeChannelId)?.name} channel.</p>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
