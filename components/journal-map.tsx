'use client'

import React, { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Plus, Minus, Compass, Navigation } from 'lucide-react'

export interface MappedArticle {
  id: string
  title: string
  slug: string
  excerpt: string
  category: string
  region: 'Rajasthan' | 'Kerala' | 'Himalayas'
  locationName: string
  lat: number
  lng: number
  imageUrl: string
  readTime: string
  relatedPackageSlug?: string
  highlights?: string[]
}

interface JournalMapProps {
  articles: MappedArticle[]
  selectedArticleId: string | null
  onSelectArticle: (id: string) => void
  activeRegion: string
}

export default function JournalMap({
  articles,
  selectedArticleId,
  onSelectArticle,
  activeRegion,
}: JournalMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const markersRef = useRef<Map<string, L.Marker>>(new Map())

  // Custom DivIcon generator
  const createMarkerIcon = (isActive: boolean, region: string) => {
    return L.divIcon({
      className: 'custom-journal-marker',
      html: `
        <div class="relative flex items-center justify-center cursor-pointer group select-none">
          <!-- Pulse ripple animation -->
          <span class="absolute -inset-2.5 rounded-full ${
            isActive ? 'bg-amber-400/40 animate-ping' : 'bg-amber-500/20 group-hover:animate-ping'
          } pointer-events-none"></span>
          
          <!-- Outer glowing circle -->
          <div class="relative flex size-11 items-center justify-center rounded-full transition-all duration-300 ${
            isActive
              ? 'bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 ring-4 ring-amber-400/40 shadow-[0_0_30px_rgba(245,158,11,0.9)] scale-110'
              : 'bg-slate-950/90 border border-amber-400/70 hover:border-amber-300 hover:scale-110 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
          }">
            <svg class="size-5 ${isActive ? 'text-slate-950 font-bold' : 'text-amber-400'}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </div>

          <!-- Region label pill -->
          <div class="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/85 backdrop-blur-md px-3 py-0.5 text-[11px] font-semibold tracking-wider ${
            isActive ? 'text-amber-300 border border-amber-400/80 shadow-[0_0_12px_rgba(245,158,11,0.5)]' : 'text-foreground/80 border border-white/15'
          } transition-all duration-200 pointer-events-none">
            ${region}
          </div>
        </div>
      `,
      iconSize: [44, 44],
      iconAnchor: [22, 22],
      popupAnchor: [0, -22],
    })
  }

  // Initialize Map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const map = L.map(containerRef.current, {
      center: [22.5, 78.5],
      zoom: 5,
      minZoom: 4,
      maxZoom: 14,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
    })

    // Esri World Dark Gray Base tiles (Free, dark luxury aesthetic, no watermark)
    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom: 16,
        attribution: 'Tiles &copy; Esri &mdash; Sources: Esri, DeLorme, NAVTEQ',
      }
    ).addTo(map)

    // Esri World Dark Gray Reference (subtle city & boundary labels)
    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom: 16,
        opacity: 0.65,
      }
    ).addTo(map)

    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
      markersRef.current.clear()
    }
  }, [])

  // Manage Markers
  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    // Clear old markers
    markersRef.current.forEach((marker) => marker.remove())
    markersRef.current.clear()

    // Add updated markers
    articles.forEach((article) => {
      const isActive = article.id === selectedArticleId
      const icon = createMarkerIcon(isActive, article.region)

      const marker = L.marker([article.lat, article.lng], {
        icon,
        title: article.title,
        riseOnHover: true,
      }).addTo(map)

      marker.on('click', () => {
        onSelectArticle(article.id)
      })

      markersRef.current.set(article.id, marker)
    })
  }, [articles, selectedArticleId, onSelectArticle])

  // Pan to selected article or region
  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    if (activeRegion === 'all') {
      if (selectedArticleId) {
        const activeArticle = articles.find((a) => a.id === selectedArticleId)
        if (activeArticle) {
          map.flyTo([activeArticle.lat, activeArticle.lng], 6.5, { duration: 1.2 })
        }
      } else if (articles.length > 0) {
        const bounds = L.latLngBounds(articles.map((a) => [a.lat, a.lng]))
        map.flyToBounds(bounds, { padding: [60, 60], maxZoom: 6, duration: 1.2 })
      } else {
        map.flyTo([22.5, 78.5], 5, { duration: 1.2 })
      }
    } else if (activeRegion.toLowerCase() === 'rajasthan') {
      map.flyTo([26.8, 74.8], 6.5, { duration: 1.2 })
    } else if (activeRegion.toLowerCase() === 'kerala') {
      map.flyTo([10.2, 76.4], 7, { duration: 1.2 })
    } else if (activeRegion.toLowerCase() === 'himalayas') {
      map.flyTo([30.1, 78.5], 7, { duration: 1.2 })
    }
  }, [activeRegion, selectedArticleId, articles])

  // HUD Controls
  const handleZoomIn = () => mapRef.current?.zoomIn()
  const handleZoomOut = () => mapRef.current?.zoomOut()
  const handleResetOverview = () => {
    if (articles.length > 0) {
      const bounds = L.latLngBounds(articles.map((a) => [a.lat, a.lng]))
      mapRef.current?.flyToBounds(bounds, { padding: [60, 60], maxZoom: 6, duration: 1.2 })
    } else {
      mapRef.current?.flyTo([22.5, 78.5], 5, { duration: 1.2 })
    }
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl bg-slate-950">
      {/* Map Container */}
      <div ref={containerRef} className="h-full w-full z-0 cursor-grab active:cursor-grabbing" />

      {/* Luxury Map Overlay Gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

      {/* Floating HUD Controls */}
      <div className="absolute top-5 right-5 z-[500] flex flex-col gap-2">
        <div className="flex flex-col rounded-2xl border border-white/15 bg-black/75 backdrop-blur-xl p-1 shadow-2xl">
          <button
            onClick={handleZoomIn}
            title="Zoom In"
            aria-label="Zoom In"
            className="flex size-9 items-center justify-center rounded-xl text-foreground/80 transition-colors hover:bg-white/15 hover:text-white"
          >
            <Plus className="size-4" />
          </button>
          <div className="my-0.5 h-[1px] bg-white/10" />
          <button
            onClick={handleZoomOut}
            title="Zoom Out"
            aria-label="Zoom Out"
            className="flex size-9 items-center justify-center rounded-xl text-foreground/80 transition-colors hover:bg-white/15 hover:text-white"
          >
            <Minus className="size-4" />
          </button>
        </div>

        <button
          onClick={handleResetOverview}
          title="Reset to India Overview"
          aria-label="Reset to India Overview"
          className="flex size-10 items-center justify-center rounded-2xl border border-amber-400/30 bg-black/75 backdrop-blur-xl text-amber-400 shadow-2xl transition-all hover:bg-amber-400/20 hover:scale-105"
        >
          <Compass className="size-5" />
        </button>
      </div>

      {/* Subcontinent HUD Info Badge */}
      <div className="absolute top-5 left-5 z-[500] pointer-events-none hidden sm:flex items-center gap-2 rounded-full border border-white/10 bg-black/70 backdrop-blur-md px-3.5 py-1.5 shadow-lg">
        <Navigation className="size-3.5 text-primary animate-pulse" />
        <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-foreground/75">
          Cartographic Discovery • India
        </span>
      </div>
    </div>
  )
}
