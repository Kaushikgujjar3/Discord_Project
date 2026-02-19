"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, MessageCircle, Flame } from "lucide-react";

export default function CommunityPage() {
    const [active, setActive] = useState<number | null>(null);

    const cards = [
        {
            title: "Active Members",
            icon: <Users size={40} />,
            desc: "Thousands of developers connected worldwide.",
            content:
                "Our community has developers from all over the world collaborating, learning, and growing together every single day.",
        },
        {
            title: "Live Chat",
            icon: <MessageCircle size={40} />,
            desc: "Real-time discussions like Discord.",
            content:
                "Experience seamless real-time chat, topic-based channels, and direct messaging just like modern community platforms.",
        },
        {
            title: "Trending Topics",
            icon: <Flame size={40} />,
            desc: "Stay updated with latest tech trends.",
            content:
                "From AI to Web3 to MERN stack — discover and discuss the hottest topics in tech with fellow developers.",
        },
    ];

    return (
        <div className="relative min-h-screen bg-black text-white overflow-hidden">

            {/* 🕸 Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ff000020_1px,transparent_1px),linear-gradient(to_bottom,#ff000020_1px,transparent_1px)] bg-[size:40px_40px]" />

            {/* 🔥 Red + Blue Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-600/30 blur-[150px] rounded-full" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full" />

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">

                {/* 🕷 Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="text-center"
                >
                    <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-red-500 via-white to-blue-500 bg-clip-text text-transparent">
                        Spider Community
                    </h1>

                    <p className="mt-6 text-gray-400 max-w-2xl mx-auto text-lg">
                        Join the most powerful developer community. Connect, collaborate,
                        and build like a true superhero.
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-8 px-8 py-4 rounded-xl bg-red-600 hover:bg-red-700 transition-all shadow-lg shadow-red-500/30"
                    >
                        Join Now
                    </motion.button>
                </motion.div>

                {/* 🕸 Expandable Cards Section */}
                <div className="grid md:grid-cols-3 gap-8 mt-20">
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            layout
                            onClick={() =>
                                setActive(active === index ? null : index)
                            }
                            whileHover={{ y: -5 }}
                            className={`relative cursor-pointer rounded-2xl p-8 backdrop-blur-xl border transition-all duration-300
                                    ${active === index
                                    ? "bg-gradient-to-br from-red-600/20 to-blue-600/20 border-red-500 shadow-2xl shadow-red-500/20"
                                    : "bg-white/5 border-white/10 hover:border-red-500"
                                }`}
                        >
                            {/* Icon */}
                            <div className="text-red-500 mb-4">
                                {card.icon}
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl font-semibold">
                                {card.title}
                            </h3>

                            {/* Short Description */}
                            <p className="mt-4 text-gray-400">
                                {card.desc}
                            </p>

                            {/* Expandable Content */}
                            <AnimatePresence>
                                {active === index && (
                                    <motion.div
                                        key="content"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="mt-6 text-gray-300 text-sm leading-relaxed"
                                    >
                                        {card.content}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
// done