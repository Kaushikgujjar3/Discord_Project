"use client";

import React, { useState, useEffect, useRef } from "react";
import { PlusCircle, Gift, Sticker, Smile, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
    id: string;
    user: string;
    avatar: string;
    content: string;
    timestamp: string;
    color: string;
}

const DUMMY_MESSAGES: Message[] = [
    {
        id: "1",
        user: "IronMan",
        avatar: "I",
        content: "Anyone seen my new nanosuit? I left it in the lab.",
        timestamp: "Today at 2:15 PM",
        color: "bg-red-600"
    },
    {
        id: "2",
        user: "CaptainAmerica",
        avatar: "C",
        content: "Tony, I think Peter was checking it out earlier.",
        timestamp: "Today at 2:17 PM",
        color: "bg-blue-600"
    },
    {
        id: "3",
        user: "SpiderMan",
        avatar: "S",
        content: "It was just so cool! I promise I'll put it back in one piece! 🕸️",
        timestamp: "Today at 2:18 PM",
        color: "bg-red-500"
    },
    {
        id: "4",
        user: "BlackWidow",
        avatar: "B",
        content: "Focus team, we have a mission briefing in 5 minutes.",
        timestamp: "Today at 2:20 PM",
        color: "bg-zinc-800"
    }
];

export default function ChatArea({ channelName }: { channelName: string }) {
    const [messages, setMessages] = useState<Message[]>(DUMMY_MESSAGES);
    const [inputValue, setInputValue] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            user: "UserAccount",
            avatar: "U",
            content: inputValue,
            timestamp: "Just now",
            color: "bg-red-600"
        };

        setMessages([...messages, newMessage]);
        setInputValue("");
    };

    return (
        <div className="flex flex-col h-full bg-[#313338] relative overflow-hidden">
            {/* Messages List */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto px-4 py-6 space-y-6 custom-scrollbar"
            >
                {/* Welcome Message */}
                <div className="mb-8">
                    <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                        <span className="text-4xl text-white font-bold">#</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-1">Welcome to #{channelName}!</h1>
                    <p className="text-zinc-400">This is the start of the #{channelName} channel.</p>
                </div>

                <div className="border-t border-zinc-700/50 my-6" />

                {messages.map((msg) => (
                    <div key={msg.id} className="flex gap-4 group hover:bg-black/5 -mx-4 px-4 py-1 transition-colors">
                        <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shrink-0 mt-0.5 shadow-sm",
                            msg.color
                        )}>
                            {msg.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-white hover:underline cursor-pointer">{msg.user}</span>
                                <span className="text-[12px] text-zinc-400 font-medium">{msg.timestamp}</span>
                            </div>
                            <p className="text-[#dbdee1] leading-relaxed break-words">
                                {msg.content}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Box Area */}
            <div className="px-4 pb-6 mt-auto">
                <form
                    onSubmit={handleSendMessage}
                    className="bg-[#383a40] rounded-lg flex items-center px-4 py-2.5 gap-4 shadow-sm"
                >
                    <button type="button" className="text-zinc-400 hover:text-zinc-200 transition">
                        <PlusCircle className="w-6 h-6" />
                    </button>

                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={`Message #${channelName}`}
                        className="bg-transparent flex-1 text-zinc-200 outline-none placeholder:text-zinc-500 text-sm md:text-base border-none focus:ring-0 w-full"
                    />

                    <div className="flex items-center gap-3 text-zinc-400">
                        <button type="button" className="hidden sm:block hover:text-zinc-200 transition">
                            <Gift className="w-6 h-6" />
                        </button>
                        <button type="button" className="hidden sm:block hover:text-zinc-200 transition">
                            <Sticker className="w-6 h-6" />
                        </button>
                        <button type="button" className="hover:text-zinc-200 transition">
                            <Smile className="w-6 h-6" />
                        </button>
                        <button
                            type="submit"
                            className={cn(
                                "p-1.5 rounded transition-all",
                                inputValue.trim() ? "bg-red-600 text-white" : "text-zinc-500"
                            )}
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </form>

                {/* Branding / Fine print */}
                <p className="text-[10px] text-zinc-500 px-1 pt-1 ml-12">
                    Press Enter to send
                </p>
            </div>
        </div>
    );
}
