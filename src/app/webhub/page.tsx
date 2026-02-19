"use client";

import React, { useState, useId, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const servers = [
    {
        title: "Valorant Pro Hub",
        description: "Competitive Valorant Community Server",
        image:
            "https://images.unsplash.com/photo-1542751371-adc38448a05e",
        members: "25K Members",
        content:
            "Join the ultimate Valorant competitive hub. Scrims, tournaments, team recruitment and daily practice sessions.",
    },
    {
        title: "Minecraft Legends",
        description: "Survival + Creative Multiplayer",
        image:
            "https://i.pinimg.com/736x/c7/4b/2e/c74b2eee827373e51ceb84a8221f238a.jpg",
        members: "18K Members",
        content:
            "Explore massive worlds, build epic cities and survive together in our advanced Minecraft server.",
    },
    {
        title: "BGMI Warriors",
        description: "India's Largest BGMI Community",
        image:
            "https://images.unsplash.com/photo-1511512578047-dfb367046420",
        members: "40K Members",
        content:
            "Daily scrims, tournaments, custom rooms and pro-level strategies for BGMI players.",
    },
    {
        title: "Call of Duty Elite",
        description: "Warzone Competitive Squad",
        image:
            "https://images.unsplash.com/photo-1509198397868-475647b2a1e5",
        members: "30K Members",
        content:
            "Find teammates, participate in ranked tournaments and dominate Warzone lobbies.",
    },
];

export default function webhub() {
    const [active, setActive] = useState(null);
    const id = useId();
    const ref = useRef(null);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") {
                setActive(null);
            }
        };

        window.addEventListener("keydown", handleEsc);

        if (active) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => window.removeEventListener("keydown", handleEsc);
    }, [active]);


    return (
        <div className="min-h-screen bg-neutral-950 text-white px-6 py-16">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
                🎮 Gaming Server Hub
            </h1>

            {/* GRID */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                {servers.map((server) => (
                    <motion.div
                        key={server.title}
                        layoutId={`card-${server.title}-${id}`}
                        onClick={() => setActive(server)}
                        className="cursor-pointer bg-neutral-900 rounded-2xl overflow-hidden hover:scale-[1.02] transition"
                    >
                        <motion.img
                            layoutId={`image-${server.title}-${id}`}
                            src={server.image}
                            className="h-52 w-full object-cover"
                        />
                        <div className="p-5">
                            <motion.h2
                                layoutId={`title-${server.title}-${id}`}
                                className="text-xl font-semibold"
                            >
                                {server.title}
                            </motion.h2>
                            <motion.p
                                layoutId={`desc-${server.title}-${id}`}
                                className="text-neutral-400 text-sm mt-2"
                            >
                                {server.description}
                            </motion.p>
                            <p className="text-green-400 mt-3 text-sm">
                                {server.members}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* EXPANDED CARD */}
            <AnimatePresence>
                {active && (
                    <>
                        {/* Background Overlay */}
                        <motion.div
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setActive(null)}
                        />

                        <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
                            <motion.div
                                layoutId={`card-${active.title}-${id}`}
                                className="relative bg-neutral-900 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl"
                            >
                                {/* CLOSE BUTTON */}
                                <button
                                    onClick={() => setActive(null)}
                                    className="absolute top-4 right-4 z-50 bg-white text-black rounded-full w-8 h-8 flex items-center justify-center font-bold hover:scale-110 transition"
                                >
                                    ✕
                                </button>

                                <motion.img
                                    layoutId={`image-${active.title}-${id}`}
                                    src={active.image}
                                    className="h-64 w-full object-cover"
                                />

                                <div className="p-6">
                                    <motion.h2
                                        layoutId={`title-${active.title}-${id}`}
                                        className="text-2xl font-bold"
                                    >
                                        {active.title}
                                    </motion.h2>

                                    <motion.p
                                        layoutId={`desc-${active.title}-${id}`}
                                        className="text-neutral-400 mt-2"
                                    >
                                        {active.description}
                                    </motion.p>

                                    <p className="mt-4 text-neutral-300 text-sm">
                                        {active.content}
                                    </p>

                                    <button
                                        onClick={() => setActive(null)}
                                        className="mt-6 w-full bg-green-500 hover:bg-green-600 transition py-3 rounded-xl font-semibold"
                                    >
                                        Join Server
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>

        </div>
    );
}
