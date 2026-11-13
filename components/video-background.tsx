"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

type Scene = {
  label: string
  poster: string
}

const scenes: Scene[] = [
  { label: "Mountains", poster: "/scene-mountains.png" },
  { label: "Forest waterfall", poster: "/scene-waterfall.png" },
  { label: "Snow", poster: "/scene-snow.png" },
  { label: "Desert", poster: "/scene-desert.png" },
]

const SCENE_DURATION = 6000

export function VideoBackground() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % scenes.length)
    }, SCENE_DURATION)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="absolute inset-0">
      {scenes.map((scene, i) => (
        <div
          key={scene.label}
          className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        >
          <div
            className={`absolute inset-0 size-full ${
              i === active ? "animate-kenburns" : ""
            }`}
          >
            <Image
              src={scene.poster}
              alt={scene.label}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      ))}

      {/* Cinematic gradient overlays for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/30 to-background/85" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/50 to-transparent" />
    </div>
  )
}
