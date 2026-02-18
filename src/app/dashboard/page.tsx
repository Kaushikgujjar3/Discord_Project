"use client";
import React from 'react';
import { Hash, Bell, Users, Inbox, HelpCircle, Gift } from 'lucide-react';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
    return (
        <div className="flex-1 flex flex-col h-full">
            {/* Top Navigation Bar */}
            <div className="h-12 border-b border-black flex items-center justify-between px-4 bg-zinc-900/50 backdrop-blur-sm z-10 shrink-0">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <Hash className="w-5 h-5 text-gray-400" />
                    <span>announcements</span>
                </div>

                <div className="flex items-center gap-4 text-gray-400">
                    <Bell className="w-5 h-5 hover:text-white cursor-pointer" />
                    <Users className="w-5 h-5 hover:text-white cursor-pointer" />
                    <div className="relative">
                        <input type="text" placeholder="Search" className="bg-black/50 border-none rounded-sm px-2 py-0.5 text-sm w-36 transition-all focus:w-52" />
                    </div>
                    <Inbox className="w-5 h-5 hover:text-white cursor-pointer" />
                    <HelpCircle className="w-5 h-5 hover:text-white cursor-pointer" />
                </div>
            </div>

            {/* Scrollable Message Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
                {/* Welcome Message */}
                <div className="mt-10 mb-8 px-4">
                    <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                        <Hash className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome to #announcements!</h1>
                    <p className="text-gray-400">This is the start of the <span className="text-white font-bold">#announcements</span> channel. Check here for important updates about the Spider-Network.</p>

                    <div className="mt-4">
                        <HoverBorderGradient className="bg-blue-600/20 text-blue-400 flex items-center gap-2">
                            <Gift className="w-4 h-4" />
                            <span>Invite your friends</span>
                        </HoverBorderGradient>
                    </div>
                </div>

                <div className="h-px bg-zinc-800 w-full" />

                {/* Dummy Messages */}
                <Message
                    author="Tony Stark"
                    avatar="https://placehold.co/40/blue/fff?text=TS"
                    time="Today at 10:42 AM"
                    content="Just pushed an update to the web-shooters firmware. Let me know if anyone experiences recoil issues."
                    role="Admin"
                    roleColor="text-blue-400"
                />
                <Message
                    author="Peter Parker"
                    avatar="https://placehold.co/40/red/fff?text=PP"
                    time="Today at 10:45 AM"
                    content="Thanks Mr. Stark! The new targeting system is amazing. 🕷️"
                />
                <Message
                    author="Miles Morales"
                    avatar="https://placehold.co/40/black/fff?text=MM"
                    time="Today at 10:50 AM"
                    content="Can we get a patch for the stealth mode? It's draining battery too fast."
                />
                <Message
                    author="Jarvis"
                    avatar="https://placehold.co/40/orange/fff?text=J"
                    time="Today at 10:51 AM"
                    content="Ticket #402 created. Analyzing energy consumption patterns."
                    isBot
                />
            </div>

            {/* Message Input */}
            <div className="px-4 pb-6 pt-2 shrink-0">
                <div className="bg-zinc-800/50 rounded-lg p-3 flex items-center gap-3 border border-zinc-700/50 focus-within:border-blue-500/50 transition-colors">
                    <button className="text-gray-400 hover:text-white bg-zinc-700/50 rounded-full w-6 h-6 flex items-center justify-center font-bold">
                        <span className="mb-0.5">+</span>
                    </button>
                    <input
                        type="text"
                        placeholder="Message #announcements"
                        className="bg-transparent border-none focus:outline-none flex-1 text-white placeholder-gray-500"
                    />
                    <div className="flex gap-3 text-gray-400">
                        <Gift className="w-5 h-5 hover:text-white cursor-pointer" />
                        <div className="w-5 h-5 hover:text-white cursor-pointer">GIF</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Message({ author, avatar, time, content, isBot, role, roleColor }: { author: string, avatar: string, time: string, content: string, isBot?: boolean, role?: string, roleColor?: string }) {
    return (
        <div className="flex gap-4 px-4 hover:bg-black/10 py-1 -mx-4 transition-colors group">
            <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 mt-0.5 cursor-pointer hover:opacity-80 transition">
                <img src={avatar} alt={author} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                    <span className={cn("font-bold text-white hover:underline cursor-pointer", roleColor)}>{author}</span>
                    {isBot && <span className="bg-blue-600 text-[10px] px-1.5 py-0.5 rounded text-white font-bold flex items-center h-4 pb-0.5">BOT</span>}
                    <span className="text-xs text-gray-500 ml-1">{time}</span>
                </div>
                <p className="text-gray-300 whitespace-pre-wrap">{content}</p>
            </div>
        </div>
    )
}
