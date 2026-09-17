"use client"

import { Star } from "lucide-react"
import { SearchFilter } from "@/components/search-filter"
import { VideoBackground } from "@/components/video-background"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
}

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Cycling nature background: mountains, forest waterfall, snow, desert */}
      <VideoBackground />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-4 pt-20 pb-16 text-center sm:pt-28 sm:px-6">
        {/* Floating accent element */}
        <motion.div
          className="animate-float absolute right-[8%] top-32 hidden size-20 rounded-full border border-primary/30 bg-primary/10 blur-[1px] lg:block"
          aria-hidden="true"
          animate={{
            y: [0, 20, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Badge with animation */}
        <motion.span
          variants={badgeVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-medium tracking-wide text-foreground/90 backdrop-blur-md cursor-pointer"
        >
          <span className="flex items-center gap-0.5 text-primary">
            <Star className="size-3.5 fill-current" />
            <Star className="size-3.5 fill-current" />
            <Star className="size-3.5 fill-current" />
          </span>
          Rated 4.9 by 12,000+ travelers
        </motion.span>

        {/* Staggered content container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full"
        >
          {/* Main heading */}
          <motion.h1
            variants={itemVariants}
            className="mt-6 max-w-4xl text-balance font-serif text-5xl leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          >
            Journeys crafted for the{" "}
            <motion.span
              className="italic text-primary"
              animate={{
                opacity: [1, 0.7, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              extraordinary
            </motion.span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-foreground/75 sm:text-lg mx-auto"
          >
            From private island retreats to alpine hideaways, discover
            handcrafted escapes to the world&apos;s most breathtaking places.
          </motion.p>

          {/* Search bar */}
          <motion.div
            variants={itemVariants}
            className="mt-10 w-full"
          >
            <SearchFilter />
          </motion.div>

          {/* Features list */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-foreground/60"
          >
            <motion.span
              whileHover={{ color: "rgb(var(--color-primary))" }}
              transition={{ duration: 0.2 }}
            >
              Private villas
            </motion.span>
            <span className="hidden size-1 rounded-full bg-foreground/30 sm:inline-block" />
            <motion.span
              whileHover={{ color: "rgb(var(--color-primary))" }}
              transition={{ duration: 0.2 }}
            >
              Curated itineraries
            </motion.span>
            <span className="hidden size-1 rounded-full bg-foreground/30 sm:inline-block" />
            <motion.span
              whileHover={{ color: "rgb(var(--color-primary))" }}
              transition={{ duration: 0.2 }}
            >
              24/7 concierge
            </motion.span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
