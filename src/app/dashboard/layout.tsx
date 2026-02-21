"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import ServerSidebar from "@/components/ServerSidebar";
import ChannelSidebar from "@/components/ChannelSidebar";
import ChatArea from "@/components/ChatArea";
import VoiceArea from "@/components/VoiceArea";
import CreateServerModal from "@/components/CreateServerModal";
import CreateChannelModal from "@/components/CreateChannelModal";
import UserSettingsModal from "@/components/UserSettingsModal";
import StreamMeetingModal from "@/components/StreamMeetingModal";
import MeetingArea from "@/components/MeetingArea";
import StreamingArea from "@/components/StreamingArea";

type ViewMode = "normal" | "streaming" | "meeting";

const INITIAL_DATA = [
    {
        id: "avengers-tower",
        name: "Avengers Tower",
        icon: "A",
        color: "bg-blue-600",
        channels: [
            { id: "gen-1", name: "general", type: "text" },
            { id: "voi-gen-1", name: "General Voice", type: "voice" },
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
            { id: "gen-2", name: "general", type: "text" },
            { id: "voi-gen-2", name: "General Voice", type: "voice" },
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
            { id: "voi-gen-q1", name: "General Voice", type: "voice" },
            { id: "voi-q1", name: "Lounge", type: "voice" },
        ]
    },
    {
        id: "multiverse-chat",
        name: "Multiverse Nexus",
        icon: "M",
        color: "bg-purple-600",
        channels: [
            { id: "gen-m1", name: "general", type: "text" },
            { id: "voi-gen-m1", name: "General Voice", type: "voice" },
            { id: "voi-m1", name: "Nexus Point", type: "voice" },
        ]
    },
    {
        id: "oscorp-labs",
        name: "Oscorp Labs",
        icon: "O",
        color: "bg-green-600",
        channels: [
            { id: "gen-3", name: "general", type: "text" },
            { id: "voi-gen-3", name: "General Voice", type: "voice" },
            { id: "ann-3", name: "safety-protocols", type: "text" },
            { id: "mis-3", name: "experiments", type: "text" },
            { id: "voi-3", name: "Lab Voice", type: "voice" },
        ]
    }
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [servers, setServers] = useState(INITIAL_DATA);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isChannelModalOpen, setIsChannelModalOpen] = useState(false);
    const [isUserSettingsOpen, setIsUserSettingsOpen] = useState(false);
    const [isStreamMeetingOpen, setIsStreamMeetingOpen] = useState(false);
    const [viewMode, setViewMode] = useState<ViewMode>("normal");

    // Get active IDs from URL or fall back to defaults
    const activeServerId = searchParams.get("s") || INITIAL_DATA[0].id;
    const activeChannelId = searchParams.get("c") || (servers.find(s => s.id === activeServerId)?.channels[0].id || INITIAL_DATA[0].channels[0].id);

    const activeServer = servers.find(s => s.id === activeServerId) || servers[0];
    const activeChannel = activeServer.channels.find(c => c.id === activeChannelId) || activeServer.channels[0];

    const handleServerSelect = (id: string) => {
        const server = servers.find(s => s.id === id);
        if (server) {
            router.push(`${pathname}?s=${id}&c=${server.channels[0].id}`);
        }
    };

    const handleChannelSelect = (channelId: string) => {
        router.push(`${pathname}?s=${activeServerId}&c=${channelId}`);
        setMobileOpen(false);
    };

    const handleCreateChannel = (name: string, type: "text" | "voice") => {
        const updatedServers = servers.map(server => {
            if (server.id === activeServerId) {
                const newChannel = {
                    id: `${type === 'text' ? 'gen' : 'voi'}-${Date.now()}`,
                    name,
                    type
                };
                return {
                    ...server,
                    channels: [...server.channels, newChannel]
                };
            }
            return server;
        });

        setServers(updatedServers);
        const newlyCreatedServer = updatedServers.find(s => s.id === activeServerId);
        const newlyCreatedChannel = newlyCreatedServer?.channels[newlyCreatedServer.channels.length - 1];

        if (newlyCreatedChannel) {
            router.push(`${pathname}?s=${activeServerId}&c=${newlyCreatedChannel.id}`);
        }
        setIsChannelModalOpen(false);
    };

    const handleCreateServer = (name: string, topic: string, audience: string, logo: string) => {
        const newId = name.toLowerCase().replace(/\s+/g, '-');
        const newServer = {
            id: newId,
            name: name,
            icon: logo || name[0].toUpperCase(),
            color: "bg-red-600",
            channels: [
                { id: `gen-${newId}`, name: "general", type: "text" as const },
                { id: `voi-${newId}`, name: "General Voice", type: "voice" as const }
            ]
        };

        setServers([...servers, newServer]);
        router.push(`${pathname}?s=${newId}&c=${newServer.channels[0].id}`);
        setIsCreateModalOpen(false);
    };

    return (
        <div className="flex h-[calc(100vh-65px)] w-full overflow-hidden bg-[#313338]">
            {/* Modals */}
            <CreateServerModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onCreate={handleCreateServer}
            />
            <CreateChannelModal
                isOpen={isChannelModalOpen}
                onClose={() => setIsChannelModalOpen(false)}
                onCreate={handleCreateChannel}
            />
            <UserSettingsModal
                isOpen={isUserSettingsOpen}
                onClose={() => setIsUserSettingsOpen(false)}
            />
            <StreamMeetingModal
                isOpen={isStreamMeetingOpen}
                onClose={() => setIsStreamMeetingOpen(false)}
                onSelect={(mode) => {
                    setViewMode(mode);
                    setIsStreamMeetingOpen(false);
                }}
            />

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
                    onServerSelect={(id) => {
                        handleServerSelect(id);
                        setViewMode("normal");
                    }}
                    onAddServer={() => setIsCreateModalOpen(true)}
                    onMeet={() => setIsStreamMeetingOpen(true)}
                />

                {/* Channel Sidebar */}
                <ChannelSidebar
                    serverName={activeServer.name}
                    channels={activeServer.channels as any}
                    activeChannelId={activeChannelId}
                    onChannelSelect={handleChannelSelect}
                    onCreateChannel={() => setIsChannelModalOpen(true)}
                    onUserSettings={() => setIsUserSettingsOpen(true)}
                />
            </div>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-full overflow-hidden">
                {viewMode === "meeting" ? (
                    <MeetingArea onEnd={() => setViewMode("normal")} />
                ) : viewMode === "streaming" ? (
                    <StreamingArea onEnd={() => setViewMode("normal")} />
                ) : (
                    <>
                        {activeChannel.type === "text" ? (
                            <>
                                {/* Content Header (Text Only) */}
                                <div className="h-12 border-b border-black flex items-center px-4 shadow-sm shrink-0 bg-[#313338] z-10">
                                    <div className="flex items-center gap-2 text-zinc-400">
                                        <span className="text-2xl font-light opacity-50">#</span>
                                        <span className="font-bold text-white">
                                            {activeChannel.name}
                                        </span>
                                    </div>
                                </div>

                                {/* Chat Area */}
                                <div className="flex-1 overflow-hidden relative">
                                    <ChatArea channelName={activeChannel.name} />
                                </div>
                            </>
                        ) : (
                            /* Voice Area */
                            <VoiceArea channelName={activeChannel.name} />
                        )}
                    </>
                )}
            </main>
        </div>
    );
}
