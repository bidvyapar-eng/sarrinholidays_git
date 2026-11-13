'use client'

import { useEffect, useRef, useState } from 'react'
import { Viewer } from '@photo-sphere-viewer/core'
import '@photo-sphere-viewer/core/index.css'
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin'
import '@photo-sphere-viewer/markers-plugin/index.css'
import {
  Compass,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  RotateCcw,
  MapPin,
  X,
  ArrowUpRight,
  ArrowRight,
  ChevronDown,
  Info,
} from 'lucide-react'

export interface VirtualTourHotspot {
  id: string
  title: string
  subtitle?: string
  description?: string
  tag?: string
  position: { yaw: number; pitch: number }
}

export interface VirtualTourScene {
  id: string
  title: string
  subtitle: string
  location: string
  tag: string
  panorama: string
  thumbnail: string
  description: string
  features: string[]
  hotspots?: VirtualTourHotspot[]
}

interface VirtualTourViewerProps {
  scenes: VirtualTourScene[]
  initialSceneId?: string
}

function getSceneShortTitle(scene: VirtualTourScene): string {
  if (scene.id === 'taj-palace-suite') return 'Taj Mahal Palace'
  if (scene.id === 'kerala-houseboat-lagoon') return 'Kerala Houseboat'
  if (scene.id === 'rajasthan-heritage-terrace') return 'Rajasthan Citadel'
  return scene.title.split('—')[0].trim()
}

function getSceneShortTag(scene: VirtualTourScene): string {
  if (scene.id === 'taj-palace-suite') return 'Palace Suite'
  if (scene.id === 'kerala-houseboat-lagoon') return 'Backwaters'
  if (scene.id === 'rajasthan-heritage-terrace') return 'Terrace Suite'
  return scene.tag
}

function buildMarkers(hotspots?: VirtualTourHotspot[]) {
  if (!hotspots || hotspots.length === 0) return []
  return hotspots.map((h) => ({
    id: h.id,
    position: h.position,
    html: `
      <div class="sarrin-hotspot group flex items-center cursor-pointer select-none" data-hotspot-id="${h.id}">
        <div class="relative flex size-8 items-center justify-center">
          <span class="absolute size-full animate-ping rounded-full bg-primary/40 duration-1000"></span>
          <span class="relative flex size-6 items-center justify-center rounded-full border border-primary/90 bg-black/90 text-primary shadow-lg shadow-primary/30 backdrop-blur-md transition-all duration-300 group-hover:scale-125 group-hover:bg-primary group-hover:text-black">
            <svg class="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3" fill="currentColor"/></svg>
          </span>
        </div>
        <div class="ml-2 whitespace-nowrap rounded-full border border-white/20 bg-black/85 px-3 py-1 text-xs font-semibold text-white shadow-xl backdrop-blur-md transition-all duration-300 group-hover:border-primary group-hover:scale-105">
          ${h.title}
        </div>
      </div>
    `,
    anchor: 'center center',
    data: h,
    tooltip: {
      content: `<div style="padding:2px 4px;"><strong>${h.title}</strong><br><span style="font-size:11px;color:#d99a32;">${h.subtitle || 'Click to explore amenity'}</span></div>`,
      position: 'top center',
    },
  }))
}

export default function VirtualTourViewer({ scenes, initialSceneId }: VirtualTourViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const viewerRef = useRef<Viewer | null>(null)
  const markersPluginRef = useRef<MarkersPlugin | null>(null)
  const isRotatingRef = useRef<boolean>(true)
  const animFrameRef = useRef<number | null>(null)

  const [activeSceneId, setActiveSceneId] = useState<string>(initialSceneId || scenes[0]?.id)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isRotating, setIsRotating] = useState<boolean>(true)
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false)
  const [showHotspots, setShowHotspots] = useState<boolean>(true)
  const [activeHotspot, setActiveHotspot] = useState<VirtualTourHotspot | null>(null)
  const [isInfoExpanded, setIsInfoExpanded] = useState<boolean>(false)

  const activeScene = scenes.find((s) => s.id === activeSceneId) || scenes[0]
  const isInteractingRef = useRef<boolean>(false)

  // Continuous smooth ambient drift
  const startDriftLoop = () => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    const drift = () => {
      if (viewerRef.current && isRotatingRef.current && !isInteractingRef.current) {
        try {
          const pos = viewerRef.current.getPosition()
          if (pos && typeof pos.yaw === 'number') {
            viewerRef.current.rotate({
              yaw: pos.yaw + 0.0012,
              pitch: pos.pitch,
            })
          }
        } catch (_) {}
      }
      animFrameRef.current = requestAnimationFrame(drift)
    }
    animFrameRef.current = requestAnimationFrame(drift)
  }

  // Initialize Viewer safely
  useEffect(() => {
    if (!containerRef.current) return

    setIsLoading(true)
    isRotatingRef.current = true
    setIsRotating(true)

    let isCancelled = false
    let viewer: Viewer | null = null

    // Defer initialization by 100ms to allow React StrictMode lifecycle to settle
    const timer = setTimeout(() => {
      if (isCancelled || !containerRef.current) return

      try {
        viewer = new Viewer({
          container: containerRef.current,
          panorama: activeScene.panorama,
          caption: `${activeScene.title} • ${activeScene.location}`,
          loadingTxt: undefined,
          loadingImg: undefined,
          defaultZoomLvl: 45,
          minFov: 25,
          maxFov: 95,
          mousewheel: true,
          mousewheelCtrlKey: false,
          touchmoveTwoFingers: false,
          mousemove: true,
          moveSpeed: 1.2,
          zoomSpeed: 1.3,
          moveInertia: 0.85,
          navbar: false, // Custom luxury HUD
          plugins: [
            [
              MarkersPlugin,
              {
                markers: buildMarkers(activeScene.hotspots),
              },
            ],
          ],
        })

        viewerRef.current = viewer
        ;(window as any).__psv = viewer

        const markersPlugin = viewer.getPlugin(MarkersPlugin) as MarkersPlugin
        markersPluginRef.current = markersPlugin

        markersPlugin.addEventListener('select-marker', ({ marker }: any) => {
          if (marker?.data) {
            setActiveHotspot(marker.data)
            try {
              markersPlugin.gotoMarker(marker.id, 1000)
            } catch (_) {}
          }
        })

        const onLoaded = () => {
          if (!isCancelled) {
            setIsLoading(false)
          }
        }

        viewer.addEventListener('panorama-loaded' as any, onLoaded)
        viewer.addEventListener('ready' as any, onLoaded)

        // Start ambient drift
        startDriftLoop()
      } catch (err) {
        console.error('Error initializing 360 viewer with markers:', err)
        if (!isCancelled) {
          setIsLoading(false)
        }
      }
    }, 100)

    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', onFullscreenChange)

    const onPointerDown = () => {
      isInteractingRef.current = true
    }
    const onPointerUp = () => {
      isInteractingRef.current = false
    }

    const containerEl = containerRef.current
    containerEl?.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('pointercancel', onPointerUp)

    return () => {
      isCancelled = true
      clearTimeout(timer)
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      document.removeEventListener('fullscreenchange', onFullscreenChange)
      containerEl?.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointercancel', onPointerUp)
      try {
        viewer?.destroy()
      } catch (_) {}
      viewerRef.current = null
      markersPluginRef.current = null
    }
  }, []) // initialize on mount

  // Switch scene smoothly and refresh markers
  const handleSceneSelect = async (scene: VirtualTourScene) => {
    if (scene.id === activeSceneId || !viewerRef.current) return
    setActiveSceneId(scene.id)
    setActiveHotspot(null)
    setIsLoading(true)

    try {
      await viewerRef.current.setPanorama(scene.panorama, {
        transition: true,
        showLoader: false,
      })
      if (markersPluginRef.current) {
        markersPluginRef.current.setMarkers(buildMarkers(scene.hotspots))
      }
    } catch (err) {
      console.error('Failed to change panorama:', err)
    } finally {
      setIsLoading(false)
    }
  }

  // Toggle Auto-Rotation
  const toggleAutorotate = () => {
    const nextState = !isRotating
    isRotatingRef.current = nextState
    setIsRotating(nextState)
  }

  // Reset Orientation
  const resetOrientation = () => {
    if (!viewerRef.current) return
    try {
      viewerRef.current.animate({
        yaw: 0,
        pitch: 0,
        zoom: 45,
        speed: 1000,
      })
    } catch (_) {}
  }

  // Fullscreen
  const toggleFullscreen = () => {
    if (!viewerRef.current) return
    try {
      viewerRef.current.toggleFullscreen()
    } catch (_) {}
  }

  // Toggle Hotspot Visibility
  const toggleHotspots = () => {
    if (!markersPluginRef.current) return
    const next = !showHotspots
    setShowHotspots(next)
    if (next) {
      markersPluginRef.current.showAllMarkers()
    } else {
      markersPluginRef.current.hideAllMarkers()
    }
  }

  return (
    <div className="relative w-full overflow-hidden rounded-[2.5rem] border border-white/15 bg-background/80 shadow-2xl shadow-black/50 backdrop-blur-2xl">
      {/* 360 Canvas Container */}
      <div className="relative w-full h-[500px] sm:h-[560px] lg:h-[640px]">
        <div
          ref={containerRef}
          className="size-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
        />

        {/* Ambient Overlay Vignette */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40" />

        {/* Loading Spinner / HUD Shield */}
        {isLoading && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md transition-opacity duration-500">
            <div className="relative flex size-16 items-center justify-center">
              <span className="absolute size-full animate-ping rounded-full bg-primary/20" />
              <Compass className="size-10 animate-spin text-primary duration-1000" />
            </div>
            <p className="mt-4 font-sans text-xs uppercase tracking-[0.1em] text-primary">
              Streaming Equirectangular 360° Canvas…
            </p>
          </div>
        )}

        {/* Top Right Floating Controls (Compact on Mobile) */}
        <div className="absolute right-3 sm:right-6 top-3 sm:top-6 z-20 flex items-center gap-1.5 sm:gap-2">
          {/* Toggle Hotspots Button */}
          <button
            onClick={toggleHotspots}
            title={showHotspots ? 'Hide Amenity Hotspots' : 'Show Amenity Hotspots'}
            className={`flex size-8 sm:size-10 items-center justify-center rounded-full border border-white/15 backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer ${
              showHotspots
                ? 'bg-primary/30 text-primary border-primary/40'
                : 'bg-black/50 text-foreground/60 hover:bg-white/20'
            }`}
          >
            <MapPin className="size-3.5 sm:size-4" />
          </button>

          <button
            onClick={toggleAutorotate}
            title={isRotating ? 'Pause Ambient Rotation' : 'Start Ambient Rotation'}
            className={`flex size-8 sm:size-10 items-center justify-center rounded-full border border-white/15 backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer ${
              isRotating
                ? 'bg-primary/30 text-primary border-primary/40'
                : 'bg-black/50 text-foreground hover:bg-white/20'
            }`}
          >
            {isRotating ? <Pause className="size-3.5 sm:size-4" /> : <Play className="size-3.5 sm:size-4 ml-0.5" />}
          </button>

          <button
            onClick={resetOrientation}
            title="Reset Horizon View"
            className="flex size-8 sm:size-10 items-center justify-center rounded-full border border-white/15 bg-black/50 text-foreground backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <RotateCcw className="size-3.5 sm:size-4" />
          </button>

          <button
            onClick={toggleFullscreen}
            title="Toggle Fullscreen"
            className="flex size-8 sm:size-10 items-center justify-center rounded-full border border-white/15 bg-primary px-2 sm:px-3 text-primary-foreground backdrop-blur-md transition-all hover:brightness-110 hover:scale-105 active:scale-95 cursor-pointer"
          >
            {isFullscreen ? <Minimize2 className="size-3.5 sm:size-4" /> : <Maximize2 className="size-3.5 sm:size-4" />}
          </button>
        </div>

        {/* Active Amenity Hotspot Detail Card - Cleanly positioned top-left without overlapping bottom suite info */}
        {activeHotspot && (
          <div className="absolute left-3 sm:left-6 top-3 sm:top-6 z-30 w-[calc(100%-1.5rem)] max-w-xs sm:max-w-sm rounded-2xl border border-primary/30 bg-black/85 p-4 sm:p-5 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-3 duration-200">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[10px] font-mono font-medium uppercase tracking-[0.1em] text-primary">
                  {activeHotspot.tag || 'Amenity Highlight'}
                </span>
                <h4 className="mt-1.5 font-serif text-base sm:text-lg font-medium text-white">
                  {activeHotspot.title}
                </h4>
              </div>
              <button
                onClick={() => setActiveHotspot(null)}
                aria-label="Close amenity details"
                className="flex size-7 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-foreground/70 transition-colors hover:bg-white/20 hover:text-white cursor-pointer"
              >
                <X className="size-3.5" />
              </button>
            </div>

            {activeHotspot.subtitle && (
              <p className="mt-1 text-xs font-medium text-primary/90">
                {activeHotspot.subtitle}
              </p>
            )}

            {activeHotspot.description && (
              <p className="mt-2 text-xs leading-relaxed text-foreground/75 font-normal">
                {activeHotspot.description}
              </p>
            )}

            <div className="mt-3.5 flex items-center justify-between border-t border-white/10 pt-2.5">
              <span className="text-[10px] uppercase tracking-wider text-foreground/50">
                Amenity Feature
              </span>
              <a
                href="#about"
                className="inline-flex items-center gap-1 rounded-full bg-primary/20 px-3 py-1 text-[11px] font-semibold text-primary transition-colors hover:bg-primary/30"
              >
                <span>Request Amenity</span>
                <ArrowUpRight className="size-3" />
              </a>
            </div>
          </div>
        )}

        {/* Bottom Floating Info & Scene HUD — Fully Responsive for Mobile, Tablet & Desktop */}
        <div className="absolute inset-x-3 sm:inset-x-6 bottom-3 sm:bottom-6 z-20 flex flex-col justify-between gap-2.5 sm:gap-4 lg:flex-row lg:items-end pointer-events-none">
          
          {/* DESKTOP SUITE META: Expanded Rich Card (>= lg) */}
          <div className="hidden lg:block pointer-events-auto max-w-sm sm:max-w-md rounded-sm border border-white/15 bg-[#0C0B09]/90 p-5 backdrop-blur-md transition-all hover:bg-[#0C0B09]/95 shadow-xl shadow-black/50">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-sans font-medium uppercase tracking-[0.1em] text-[#C5A059]">
                {activeScene.location}
              </span>
              <span className="size-1 rounded-full bg-[#C5A059]/40" />
              <span className="text-[10px] font-sans text-[#E5E2DC] uppercase tracking-wider">
                {activeScene.tag}
              </span>
            </div>
            <h3 className="mt-1.5 font-serif text-lg lg:text-xl font-medium tracking-tight text-[#F4F2EC]">
              {activeScene.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#E5E2DC] font-normal">
              {activeScene.description}
            </p>

            {/* Highlights tags */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {activeScene.features.slice(0, 3).map((feat) => (
                <span
                  key={feat}
                  className="rounded-sm border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-sans font-medium text-[#E5E2DC]"
                >
                  {feat}
                </span>
              ))}
            </div>

            {/* Interactive Gold CTA Link */}
            <div className="mt-3.5 pt-3 border-t border-white/10">
              <a
                href="#destinations"
                className="group/cta inline-flex items-center gap-1.5 text-xs font-sans font-medium text-[#C5A059] hover:text-[#D4B475] transition-colors"
              >
                <span>Explore Itinerary Featuring This Suite</span>
                <ArrowRight className="size-3.5 transition-transform group-hover/cta:translate-x-1" />
              </a>
            </div>
          </div>

          {/* MOBILE SUITE META: Compact Sleek Pill (< lg) */}
          <div className="lg:hidden pointer-events-auto w-full space-y-2">
            {/* Pop-up Details Sheet when tapped */}
            {isInfoExpanded && (
              <div className="rounded-sm border border-[#C5A059]/40 bg-[#0C0B09]/95 p-4 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-bottom-2 duration-200">
                <div className="flex items-start justify-between gap-2 border-b border-white/10 pb-2 mb-2">
                  <div>
                    <span className="text-[10px] font-sans text-[#C5A059] uppercase tracking-widest block">{activeScene.location}</span>
                    <h4 className="font-serif text-sm font-semibold text-[#F4F2EC]">{activeScene.title}</h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsInfoExpanded(false)}
                    aria-label="Close details"
                    className="size-7 rounded-sm bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs text-[#E5E2DC] hover:text-white cursor-pointer"
                  >
                    <X className="size-3.5" />
                  </button>
                </div>
                <p className="text-base text-[#E5E2DC] leading-relaxed font-normal">{activeScene.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {activeScene.features.map((feat) => (
                    <span key={feat} className="rounded-sm border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-sans text-[#E5E2DC]">
                      {feat}
                    </span>
                  ))}
                </div>
                <div className="mt-3 pt-2.5 border-t border-white/10">
                  <a
                    href="#destinations"
                    onClick={() => setIsInfoExpanded(false)}
                    className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-[#C5A059] hover:text-[#D4B475]"
                  >
                    <span>Explore Itinerary Featuring This Suite</span>
                    <ArrowRight className="size-3.5" />
                  </a>
                </div>
              </div>
            )}

            {/* Compact Mini Pill Bar */}
            <div className="flex items-center justify-between gap-2 rounded-sm border border-white/15 bg-[#0C0B09]/80 px-3.5 py-2 backdrop-blur-md shadow-lg">
              <div className="min-w-0 flex-1 flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-[#C5A059] shrink-0" />
                <span className="font-serif text-xs font-medium text-[#F4F2EC] truncate">
                  {activeScene.title.split('—')[0].trim()}
                </span>
                <span className="text-[10px] text-[#E5E2DC] truncate hidden sm:inline">• {activeScene.location}</span>
              </div>
              <button
                type="button"
                onClick={() => setIsInfoExpanded(!isInfoExpanded)}
                className="shrink-0 flex items-center gap-1 rounded-sm bg-white/10 hover:bg-white/20 px-2.5 py-0.5 text-[10px] font-sans text-[#C5A059] border border-[#C5A059]/20 transition-colors"
              >
                <span>{isInfoExpanded ? 'Hide' : 'Suite Details'}</span>
                <ChevronDown className={`size-3 transition-transform ${isInfoExpanded ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

          {/* Scene Switcher Dock — Smooth Horizontal Carousel on All Viewports */}
          <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 overflow-x-auto max-w-full p-1.5 rounded-2xl border border-white/10 bg-black/45 backdrop-blur-md [scrollbar-width:none] [&::-webkit-scrollbar]:hidden shadow-xl shadow-black/40">
            {scenes.map((scene) => {
              const isSelected = scene.id === activeScene.id
              const shortTitle = getSceneShortTitle(scene)
              const shortTag = getSceneShortTag(scene)
              return (
                <button
                  key={scene.id}
                  onClick={() => {
                    handleSceneSelect(scene)
                    setIsInfoExpanded(false)
                  }}
                  className={`group relative flex items-center gap-2 sm:gap-2.5 rounded-xl border p-1 sm:p-1.5 pr-2.5 sm:pr-3 text-left transition-all shrink-0 cursor-pointer ${
                    isSelected
                      ? 'border-primary/80 bg-primary/20 shadow-md shadow-primary/20'
                      : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10'
                  }`}
                >
                  <div className="relative size-8 sm:size-10 shrink-0 overflow-hidden rounded-lg border border-white/15">
                    <img
                      src={scene.thumbnail}
                      alt={scene.title}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {isSelected && (
                      <span className="absolute inset-0 bg-primary/20 ring-1 ring-primary ring-inset" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[8px] sm:text-[9px] font-mono uppercase tracking-wider text-primary truncate">
                      {shortTag}
                    </span>
                    <span className="block font-serif text-[11px] sm:text-xs font-medium text-white truncate max-w-[105px] sm:max-w-[125px]">
                      {shortTitle}
                    </span>
                    <span className="block text-[8px] sm:text-[9px] text-foreground/50">
                      {scene.hotspots ? `${scene.hotspots.length} Hotspots` : '360° View'}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
