"use client";

import { useRouter, usePathname } from "next/navigation";
import { Hash, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ChannelList({ serverId }: { serverId: string }) {
    const router = useRouter();
    const pathname = usePathname();

    const channels = [
        { name: "general", type: "text" },
        { name: "announcements", type: "text" },
        { name: "memes", type: "text" },
        { name: "Lounge", type: "voice" },
    ];

    return (
        <div className="hidden md:flex w-60 bg-zinc-900 h-full flex-col border-r border-black overflow-hidden min-w-[240px]">
            <div className="h-12 flex items-center px-4 border-b border-black font-bold text-zinc-200">
                {serverId.replace(/-/g, ' ').toUpperCase()}
            </div>

            <div className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
                {channels.map((channel) => {
                    const isActive = pathname?.includes(channel.name);

                    return (
                        <div
                            key={channel.name}
                            onClick={() => {
                                router.push(
                                    `/server/${serverId}/channel/${channel.name}`
                                );
                                // On mobile, clicking a channel should probably close the drawer
                                // We can use window.dispatchEvent as a simple hack if we don't have context
                            }}
                            className={cn(
                                "px-2 py-1.5 rounded-md flex items-center gap-2 cursor-pointer group transition",
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
                        </div>
                    );
                })}
            </div>
        </div>
    );
}