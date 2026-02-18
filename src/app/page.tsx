import Link from "next/link";
import WorldGlobe from "@/components/ui/WorldGlobe";

export default function Home() {
  return (
    <div className="flex flex-col items-center overflow-hidden">

      {/* Hero Section */}
      <section className="
        relative w-full 
        max-w-7xl 
        mx-auto 
        px-4 sm:px-6 lg:px-8 
        py-14 sm:py-20 lg:py-28 
        flex flex-col lg:flex-row 
        items-center 
        justify-between 
        gap-14 lg:gap-20
      ">

        {/* LEFT SIDE */}
        <div className="
          w-full lg:w-1/2 
          space-y-6 
          text-center lg:text-left
          animate-fadeInUp
        ">

          <div className="
            inline-block 
            px-4 py-1 
            bg-red-900/30 
            border border-red-600/50 
            rounded-full 
            text-red-400 
            text-xs sm:text-sm 
            font-bold 
            uppercase 
            tracking-widest 
            animate-pulse
          ">
            Your friendly neighborhood network
          </div>

          <h1 className="
            text-3xl 
            sm:text-4xl 
            md:text-5xl 
            lg:text-6xl 
            xl:text-7xl 
            spidey-font 
            leading-tight
          ">
            SWING INTO THE{" "}
            <span className="text-red-600 animate-glow">
              CONVERSATION
            </span>
          </h1>

          <p className="
            text-base sm:text-lg lg:text-xl 
            text-gray-400 
            max-w-xl 
            mx-auto lg:mx-0 
            leading-relaxed
          ">
            OpenTL is the ultimate community hub for voice, audio, and chat.
            Connect with your friends in real-time with zero lag and total privacy.
          </p>

          {/* Buttons */}
          <div className="
            flex flex-col sm:flex-row 
            gap-4 
            pt-4 
            justify-center lg:justify-start
          ">
            <Link
              href="/dashboard"
              className="
                w-full sm:w-auto
                px-6 sm:px-8 
                py-3 sm:py-4 
                spidey-gradient 
                rounded-xl 
                font-black 
                text-sm sm:text-base lg:text-lg 
                shadow-xl 
                shadow-red-600/20 
                hover:scale-105 
                hover:shadow-red-600/40 
                transition-all 
                duration-300 
                text-white 
                text-center
              "
            >
              LAUNCH WEB HUB
            </Link>

            <button
              className="
                w-full sm:w-auto
                px-6 sm:px-8 
                py-3 sm:py-4 
                bg-gray-900 
                border border-gray-700 
                rounded-xl 
                font-bold 
                text-sm sm:text-base lg:text-lg 
                hover:bg-gray-800 
                hover:scale-105 
                transition-all 
                duration-300 
                text-white
              "
            >
              LEARN MORE
            </button>
          </div>

          {/* Users */}
          <div className="
            flex flex-col sm:flex-row 
            items-center 
            justify-center lg:justify-start 
            gap-4 sm:gap-6 
            pt-6
          ">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  src={`https://picsum.photos/seed/${i + 10}/100/100`}
                  className="
                    w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 
                    rounded-full 
                    border-2 border-black 
                    hover:scale-110 
                    transition-transform
                  "
                  alt="User"
                />
              ))}
            </div>

            <p className="text-gray-500 text-xs sm:text-sm text-center sm:text-left">
              Join <span className="text-white font-bold">2,500+</span> web-heads online right now
            </p>
          </div>
        </div>

        {/* RIGHT SIDE (Globe) */}
        <div className="
          w-full lg:w-1/2 
          flex justify-center 
          relative 
          animate-fadeIn
        ">

          <div className="relative z-10 w-full max-w-sm sm:max-w-md lg:max-w-lg">
            <WorldGlobe />
          </div>

          {/* Floating Badge */}
          <div className="
            absolute
            top-3 right-3
            sm:top-6 sm:right-6
            lg:-top-8 lg:-right-8
            bg-black/90
            px-3 py-2
            sm:px-4 sm:py-3
            rounded-xl
            border border-red-600
            shadow-xl
            z-20
            backdrop-blur-md
            animate-bounce
          ">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative flex items-center justify-center">
                <span className="absolute w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75"></span>
                <span className="relative w-3 h-3 bg-green-500 rounded-full"></span>
              </div>

              <span className="text-[10px] sm:text-xs md:text-sm font-bold text-white whitespace-nowrap">
                2,500+ Users Connected
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section className="w-full bg-zinc-950 py-16 sm:py-20 lg:py-24 border-y border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-12 lg:mb-16">
            <h2 className="spidey-font text-2xl sm:text-3xl lg:text-4xl mb-4">
              PETER'S UPGRADES
            </h2>
            <div className="w-20 sm:w-24 h-1 bg-red-600 mx-auto"></div>
          </div>

          <div className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            lg:grid-cols-3 
            gap-6 sm:gap-8
          ">

            {/* Card */}
            {[
              {
                icon: "🎤",
                title: "Crystal Clear Voice",
                text: "Spatial audio that makes it feel like you're swinging right next to your team.",
              },
              {
                icon: "💬",
                title: "Real-time Chat",
                text: "Instant messaging with support for rich media, reactions, and spider-emojis.",
              },
              {
                icon: "🔒",
                title: "Secret Identity",
                text: "End-to-end encryption keeps your identity safer than Spider-Man's secret.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="
                  bg-zinc-900/50 
                  p-6 sm:p-8 
                  rounded-2xl 
                  border border-zinc-800 
                  hover:border-red-600/50 
                  hover:-translate-y-2 
                  hover:shadow-xl 
                  hover:shadow-red-600/20 
                  transition-all 
                  duration-300 
                  group
                "
              >
                <div className="w-12 h-12 bg-red-600 rounded-lg mb-6 flex items-center justify-center group-hover:rotate-12 transition-transform">
                  {item.icon}
                </div>

                <h3 className="text-lg sm:text-xl font-bold mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-500 text-sm sm:text-base">
                  {item.text}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>
    </div>
  );
}
