"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Sparkles } from "lucide-react"

const destinations = [
  { name: "Amalfi Coast", country: "Italy", image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=900&q=85" },
  { name: "Ubud, Bali", country: "Indonesia", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&q=85" },
  { name: "The Dolomites", country: "Italy", image: "https://images.unsplash.com/photo-1464278533981-50106e6176b1?w=900&q=85" },
]

export function MotionDemo() {
  return (
    <section className="mt-28 border-t border-foreground/10 pt-20" aria-labelledby="motion-demo-title">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-primary">
            <Sparkles className="size-3.5" /> Motion preview
          </span>
          <h2 id="motion-demo-title" className="mt-3 max-w-2xl font-serif text-4xl leading-tight text-foreground sm:text-5xl">
            The art of the unhurried journey.
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-foreground/60">
          Subtle movement helps every destination feel discovered, not announced.
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {destinations.map((destination, index) => (
          <motion.article
            key={destination.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            whileHover={{ y: -8 }}
            className="group relative overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/[0.04]"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <motion.img
                src={destination.image}
                alt={`${destination.name} travel destination`}
                className="size-full object-cover"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5 pt-20 text-white">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-white/60">{destination.country}</p>
                  <h3 className="mt-1 font-serif text-2xl">{destination.name}</h3>
                </div>
                <motion.span
                  className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md"
                  whileHover={{ rotate: 45, backgroundColor: "rgba(255,255,255,0.25)" }}
                  transition={{ duration: 0.25 }}
                >
                  <ArrowUpRight className="size-4" />
                </motion.span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

export function MotionPrinciples() {
  return (
    <div className="mt-10 grid gap-3 sm:grid-cols-3">
      {["Staggered reveal", "Parallax depth", "Tactile hover"].map((label, index) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="rounded-2xl border border-foreground/10 bg-foreground/[0.04] px-4 py-3 text-sm text-foreground/70"
        >
          <span className="mr-2 text-primary">0{index + 1}</span>{label}
        </motion.div>
      ))}
    </div>
  )
}
