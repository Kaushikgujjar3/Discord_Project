"use client";

import React from "react";
import { Hash, Volume2, ChevronDown, Settings, Mic, Headphones, Megaphone } from "lucide-react";
import { cn } from "@/lib/utils";

interface Channel {
    id: string;
    name: string;
    type: "text" | "voice";
}

interface ChannelSidebarProps {
    serverName: string;
    channels: Channel[];
    activeChannelId: string;
    onChannelSelect: (id: string) => void;
    onCreateChannel: () => void;
    onUserSettings: () => void;
}

export default function ChannelSidebar({ serverName, channels, activeChannelId, onChannelSelect, onCreateChannel, onUserSettings }: ChannelSidebarProps) {
    const textChannels = channels.filter(c => c.type === "text");
    const voiceChannels = channels.filter(c => c.type === "voice");

    return (
        <div className="w-60 bg-zinc-900 flex flex-col h-full border-r border-black shrink-0">
            {/* Server Header */}
            <button className="h-12 px-4 flex items-center justify-between border-b border-black hover:bg-zinc-800/50 transition truncate">
                <span className="font-bold text-white truncate">{serverName}</span>
                <ChevronDown className="w-5 h-5 text-zinc-400" />
            </button>

            {/* Channels List */}
            <div className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
                {/* Text Channels */}
                <div>
                    <div className="px-2 flex items-center justify-between group cursor-pointer text-zinc-500 hover:text-zinc-200 uppercase text-[12px] font-bold mb-1">
                        <div className="flex items-center gap-1">
                            <ChevronDown className="w-3 h-3" />
                            <span>Text Channels</span>
                        </div>
                        <button
                            onClick={(e) => { e.stopPropagation(); onCreateChannel(); }}
                            className="transition text-zinc-400 hover:text-zinc-200"
                        >
                            <Plus className="w-4 h-4 hover:cursor-pointer" />
                        </button>
                    </div>
                    <div className="space-y-0.5">
                        {textChannels.map(channel => (
                            <ChannelItem
                                key={channel.id}
                                channel={channel}
                                isActive={activeChannelId === channel.id}
                                onClick={() => onChannelSelect(channel.id)}
                            />
                        ))}
                    </div>
                </div>

                {/* Voice Channels */}
                <div>
                    <div className="px-2 flex items-center justify-between group cursor-pointer text-zinc-500 hover:text-zinc-200 uppercase text-[12px] font-bold mb-1">
                        <div className="flex items-center gap-1">
                            <ChevronDown className="w-3 h-3" />
                            <span>Voice Channels</span>
                        </div>
                        <button
                            onClick={(e) => { e.stopPropagation(); onCreateChannel(); }}
                            className="transition text-zinc-400 hover:text-zinc-200"
                        >
                            <Plus className="w-4 h-4 hover:cursor-pointer" />
                        </button>
                    </div>
                    <div className="space-y-0.5">
                        {voiceChannels.map(channel => (
                            <ChannelItem
                                key={channel.id}
                                channel={channel}
                                isActive={activeChannelId === channel.id}
                                onClick={() => onChannelSelect(channel.id)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* User Profile Section */}
            <div className="bg-[#232428] p-2 flex items-center gap-2">
                <div className="relative group">
                    <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-xs font-bold text-white">
                        U
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#232428] rounded-full" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white truncate leading-tight">UserAccount</p>
                    <p className="text-xs text-zinc-400 truncate leading-tight">#0001</p>
                </div>
                <div className="flex items-center gap-0.5">
                    <button className="p-1.5 hover:bg-zinc-700 rounded transition text-zinc-400 hover:text-zinc-200"><Mic className="w-4.5 h-4.5" /></button>
                    <button className="p-1.5 hover:bg-zinc-700 rounded transition text-zinc-400 hover:text-zinc-200"><Headphones className="w-4.5 h-4.5" /></button>
                    <button
                        onClick={onUserSettings}
                        className="p-1.5 hover:bg-zinc-700 rounded transition text-zinc-400 hover:text-zinc-200"
                    >
                        <Settings className="w-4.5 h-4.5" />
                    </button>
                </div>
            </div>
        </div>
    );
}

function Plus({ className }: { className?: string }) {
    return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
    );
}

function ChannelItem({ channel, isActive, onClick }: { channel: Channel, isActive: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "w-full px-2 py-1.5 rounded-md flex items-center gap-2 cursor-pointer group transition",
                isActive
                    ? "bg-zinc-700 text-white"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
            )}
        >
            {channel.type === "text" ? (
                <Hash className="w-4 h-4 text-zinc-500 group-hover:text-zinc-200" />
            ) : (
                <Volume2 className="w-4 h-4 text-zinc-500 group-hover:text-zinc-200" />
            )}
            <span className="text-sm font-medium">{channel.name}</span>
        </button>
    );
}
