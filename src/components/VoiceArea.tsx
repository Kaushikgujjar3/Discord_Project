"use client";

import React from "react";
import { Mic, Headphones, Settings, PhoneOff, Video, ScreenShare, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";

interface Participant {
    id: string;
    name: string;
    avatar: string;
    color: string;
    isSpeaking?: boolean;
    isMuted?: boolean;
}

const DUMMY_PARTICIPANTS: Participant[] = [
    { id: "1", name: "IronMan", avatar: "I", color: "bg-red-600", isSpeaking: true },
    { id: "2", name: "SpiderMan", avatar: "S", color: "bg-red-500" },
    { id: "3", name: "CaptainAmerica", avatar: "C", color: "bg-blue-600", isMuted: true },
    { id: "4", name: "BlackWidow", avatar: "B", color: "bg-zinc-800" },
];

export default function VoiceArea({ channelName }: { channelName: string }) {
    return (
        <div className="flex flex-col h-full bg-[#1e1f22]">
            {/* Call Header */}
            <div className="h-12 px-4 flex items-center justify-between border-b border-black shadow-sm bg-[#313338] z-10 shrink-0">
                <div className="flex items-center gap-2 text-zinc-400">
                    <Megaphone className="w-5 h-5" />
                    <span className="font-bold text-white">{channelName}</span>
                </div>
                <div className="flex items-center gap-4 text-zinc-400">
                    <button className="hover:text-zinc-200 transition"><UserPlus className="w-5 h-5" /></button>
                    <button className="hover:text-zinc-200 transition"><Settings className="w-5 h-5" /></button>
                </div>
            </div>

            {/* Participants Grid */}
            <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 h-fit">
                    {DUMMY_PARTICIPANTS.map((p) => (
                        <div
                            key={p.id}
                            className={cn(
                                "aspect-video bg-[#2b2d31] rounded-lg flex flex-col items-center justify-center relative group transition-all duration-300",
                                p.isSpeaking && "ring-2 ring-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                            )}
                        >
                            <div className={cn(
                                "w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-xl",
                                p.color
                            )}>
                                {p.avatar}
                            </div>
                            <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 rounded text-xs font-bold text-white backdrop-blur-sm">
                                {p.name}
                            </span>
                            {p.isMuted && (
                                <div className="absolute top-2 right-2 p-1 bg-red-500 rounded-full">
                                    <Mic className="w-3 h-3 text-white" />
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Empty Slots */}
                    <div className="aspect-video bg-[#2b2d31]/40 border-2 border-dashed border-zinc-700/50 rounded-lg flex items-center justify-center text-zinc-600 italic text-sm">
                        Waiting for others...
                    </div>
                </div>
            </div>

            {/* Bottom Controls */}
            <div className="p-4 bg-[#1e1f22] border-t border-black flex items-center justify-center gap-4 shrink-0">
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
                    <ControlBtn icon={<Video className="w-5 h-5" />} label="Video" />
                    <ControlBtn icon={<ScreenShare className="w-5 h-5" />} label="Screen" />
                    <ControlBtn icon={<Mic className="w-5 h-5" />} label="Mute" />
                    <ControlBtn icon={<Headphones className="w-5 h-5" />} label="Deafen" />

                    <button className="flex flex-col items-center gap-1 group">
                        <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20 active:scale-95">
                            <PhoneOff className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] uppercase font-bold text-zinc-500 group-hover:text-red-400 transition-colors">Disconnect</span>
                    </button>

                    <ControlBtn icon={<Settings className="w-5 h-5" />} label="More" />
                </div>
            </div>
        </div>
    );
}

function Megaphone({ className }: { className?: string }) {
    return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
    );
}

function ControlBtn({ icon, label }: { icon: React.ReactNode, label: string }) {
    return (
        <button className="flex flex-col items-center gap-1 group min-w-[60px]">
            <div className="w-12 h-12 rounded-full bg-[#313338] flex items-center justify-center text-zinc-300 hover:bg-[#383a40] hover:text-white transition-all shadow-md active:scale-95">
                {icon}
            </div>
            <span className="text-[10px] uppercase font-bold text-zinc-500 group-hover:text-zinc-300 transition-colors">{label}</span>
        </button>
    );
}
