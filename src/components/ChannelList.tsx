"use client";
import React from 'react';
import { Hash, Volume2, ChevronDown, UserPlus, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HoverBorderGradient } from './ui/hover-border-gradient';

export default function ChannelList() {
    return (
        <div className="w-60 bg-zinc-900 h-full flex flex-col border-r border-black font-medium">
            {/* Server Header */}
            <div className="h-12 shadow-sm flex items-center justify-between px-4 border-b border-black hover:bg-zinc-800/50 transition cursor-pointer">
                <h1 className="font-bold text-white truncate text-sm">Avengers Tower</h1>
                <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>

            {/* Scrollable Area */}
            <div className="flex-1 overflow-y-auto py-3 space-y-4 px-2 custom-scrollbar">
                {/* Category: Information */}
                <ChannelCategory name="INFORMATION">
                    <ChannelItem name="announcements" type="text" active />
                    <ChannelItem name="rules" type="text" />
                    <ChannelItem name="resources" type="text" />
                </ChannelCategory>

                {/* Category: Text Channels */}
                <ChannelCategory name="TEXT CHANNELS">
                    <ChannelItem name="general" type="text" />
                    <ChannelItem name="mission-briefing" type="text" unread />
                    <ChannelItem name="tech-support" type="text" />
                    <ChannelItem name="memes" type="text" />
                </ChannelCategory>

                {/* Category: Voice Channels */}
                <ChannelCategory name="VOICE CHANNELS">
                    <ChannelItem name="Lounge" type="voice" />
                    <ChannelItem name="War Room" type="voice" users={[{ name: 'Tony S.', avatar: 'https://placehold.co/20/blue/fff' }]} />
                    <ChannelItem name="Lab" type="voice" />
                </ChannelCategory>
            </div>

            {/* User Area */}
            <div className="bg-black/40 p-2 flex items-center gap-2">
                <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center font-bold text-xs ring-2 ring-zinc-900">
                        P
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-900"></div>
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-white truncate">Peter Parker</div>
                    <div className="text-[10px] text-gray-400 truncate">#Spidey101</div>
                </div>
                <div className="flex items-center">
                    <button className="p-1.5 hover:bg-zinc-700 rounded-md transition"><Settings className="w-4 h-4 text-gray-400" /></button>
                </div>
            </div>
        </div>
    );
}

function ChannelCategory({ name, children }: { name: string, children: React.ReactNode }) {
    return (
        <div className="space-y-0.5">
            <div className="flex items-center justify-between px-2 pb-1 text-gray-500 hover:text-gray-300 cursor-pointer group uppercase text-[10px] font-bold tracking-wide">
                <span>{name}</span>
                <ChevronDown className="w-3 h-3 opacity-0 group-hover:opacity-100" />
            </div>
            {children}
        </div>
    );
}

interface User {
    name: string;
    avatar: string;
}

function ChannelItem({ name, type, active, unread, users }: { name: string, type: 'text' | 'voice', active?: boolean, unread?: boolean, users?: User[] }) {
    return (
        <div className={cn(
            "group relative px-2 py-1.5 rounded-md flex items-center gap-1.5 cursor-pointer text-gray-400 hover:text-gray-200 hover:bg-zinc-800/50 transition-all mx-1",
            active && "bg-zinc-700/50 text-white hover:bg-zinc-700/50 hover:text-white"
        )}>
            {type === 'text' ? (
                <Hash className="w-4 h-4 text-gray-500" />
            ) : (
                <Volume2 className="w-4 h-4 text-gray-500" />
            )}

            <span className={cn("truncate flex-1 text-sm font-medium", unread && "text-white font-bold")}>{name}</span>

            {unread && <div className="w-1.5 h-1.5 bg-white rounded-full ml-auto" />}
            {users && users.length > 0 && (
                <div className="flex -space-x-1">
                    {users.map((u, i) => (
                        <img key={i} src={u.avatar} className="w-4 h-4 rounded-full border border-zinc-900" alt="" />
                    ))}
                </div>
            )}
        </div>
    );
}
