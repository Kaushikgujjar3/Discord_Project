"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import MeetingArea from "@/components/MeetingArea";
import StreamingArea from "@/components/StreamingArea";
import { Radio, Video, Zap, Globe, Monitor, Users, Shield, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type ViewMode = "selection" | "streaming" | "meeting";

export default function StreamingMeetingsPage() {
    const [viewMode, setViewMode] = useState<ViewMode>("selection");

    return (
        <div className="min-h-screen bg-[#1e1f22] flex flex-col">

            <main className="flex-1 flex flex-col overflow-hidden">
                {viewMode === "selection" ? (
                    <div className="flex-1 flex items-center justify-center p-6 bg-radial-gradient">
                        <div className="max-w-5xl w-full">
                            <div className="text-center mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
                                <h1 className="text-5xl md:text-7xl font-black text-white mb-4 uppercase italic tracking-tighter spidey-font animate-glow">
                                    Broadcast & Connect
                                </h1>
                                <p className="text-zinc-400 text-xl max-w-2xl mx-auto">
                                    Experience the next generation of live streaming and professional video collaboration.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                                {/* Streaming Card */}
                                <div
                                    onClick={() => setViewMode("streaming")}
                                    className="group relative bg-[#2b2d31] rounded-3xl p-10 border-2 border-transparent hover:border-red-600 transition-all cursor-pointer hover:-translate-y-2 shadow-2xl overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-3xl group-hover:bg-red-600/20 transition-all" />

                                    <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mb-8 shadow-glow-red">
                                        <Radio className="w-8 h-8 text-white" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-white mb-4">Go Live</h2>
                                    <p className="text-zinc-400 mb-8 leading-relaxed">
                                        Start a professional broadcast to YouTube, Facebook, or your own private channel. Features multi-stream support and live chat.
                                    </p>
                                    <div className="space-y-3">
                                        <FeatureItem icon={<Zap className="w-4 h-4 text-yellow-500" />} text="Ultra-low latency streaming" />
                                        <FeatureItem icon={<Globe className="w-4 h-4 text-blue-500" />} text="Simultaneous multi-platform" />
                                        <FeatureItem icon={<Monitor className="w-4 h-4 text-green-500" />} text="Built-in streaming dashboard" />
                                    </div>
                                    <div className="mt-10 flex items-center text-red-500 font-bold group-hover:translate-x-2 transition-transform">
                                        Enter Dashboard <ChevronLeft className="w-5 h-5 rotate-180 ml-2" />
                                    </div>
                                </div>

                                {/* Meeting Card */}
                                <div
                                    onClick={() => setViewMode("meeting")}
                                    className="group relative bg-[#2b2d31] rounded-3xl p-10 border-2 border-transparent hover:border-blue-600 transition-all cursor-pointer hover:-translate-y-2 shadow-2xl overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl group-hover:bg-blue-600/20 transition-all" />

                                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-glow-blue">
                                        <Video className="w-8 h-8 text-white" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-white mb-4">Meetings</h2>
                                    <p className="text-zinc-400 mb-8 leading-relaxed">
                                        Collaborate with high-definition video conferencing. Screen sharing, real-time whiteboarding, and encrypted connections.
                                    </p>
                                    <div className="space-y-3">
                                        <FeatureItem icon={<Users className="w-4 h-4 text-purple-500" />} text="Up to 100+ participants" />
                                        <FeatureItem icon={<Monitor className="w-4 h-4 text-cyan-500" />} text="4K Screen sharing capability" />
                                        <FeatureItem icon={<Shield className="w-4 h-4 text-red-500" />} text="Encrypted private meetings" />
                                    </div>
                                    <div className="mt-10 flex items-center text-blue-500 font-bold group-hover:translate-x-2 transition-transform">
                                        Launch Meeting <ChevronLeft className="w-5 h-5 rotate-180 ml-2" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : viewMode === "streaming" ? (
                    <StreamingArea onEnd={() => setViewMode("selection")} />
                ) : (
                    <MeetingArea onEnd={() => setViewMode("selection")} />
                )}
            </main>
        </div>
    );
}

function FeatureItem({ icon, text }: { icon: React.ReactNode, text: string }) {
    return (
        <div className="flex items-center gap-3 text-zinc-500 text-sm font-medium">
            <div className="shrink-0">{icon}</div>
            <span>{text}</span>
        </div>
    );
}
