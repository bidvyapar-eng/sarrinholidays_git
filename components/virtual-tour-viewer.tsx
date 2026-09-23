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
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  MapPin,
  X,
  ArrowUpRight,
  ShieldCheck,
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
          loadingTxt: null,
          loadingImg: null,
          defaultZoomLvl: 45,
          minFov: 30,
          maxFov: 90,
          touchmoveTwoFingers: false,
          mousewheelCtrlKey: false,
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

  // Zoom controls
  const handleZoom = (direction: 'in' | 'out') => {
    if (!viewerRef.current) return
    try {
      const current = viewerRef.current.getZoomLevel()
      const target = direction === 'in' ? Math.min(100, current + 15) : Math.max(0, current - 15)
      viewerRef.current.zoom(target)
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
      <div className="relative aspect-[16/10] w-full min-h-[480px] sm:min-h-[560px] lg:min-h-[640px]">
        <div ref={containerRef} className="size-full overflow-hidden" />

        {/* Ambient Overlay Vignette */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

        {/* Loading Spinner / HUD Shield */}
        {isLoading && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md transition-opacity duration-500">
            <div className="relative flex size-16 items-center justify-center">
              <span className="absolute size-full animate-ping rounded-full bg-primary/20" />
              <Compass className="size-10 animate-spin text-primary duration-1000" />
            </div>
            <p className="mt-4 font-sans text-xs uppercase tracking-[0.25em] text-primary">
              Streaming Equirectangular 360° Canvas…
            </p>
          </div>
        )}

        {/* Top Header Badge */}
        <div className="absolute left-6 top-6 z-20 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary backdrop-blur-md">
            <Sparkles className="size-3.5 text-primary" />
            Interactive 360° Virtual Tour
          </span>
          <span className="hidden rounded-full border border-white/15 bg-white/10 px-3.5 py-1 text-xs text-foreground/80 backdrop-blur-md sm:inline-block">
            {activeScene.tag}
          </span>
          {activeScene.hotspots && activeScene.hotspots.length > 0 && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary backdrop-blur-md">
              <MapPin className="size-3" />
              {activeScene.hotspots.length} Clickable Hotspots
            </span>
          )}
        </div>

        {/* Top Right Floating Controls */}
        <div className="absolute right-6 top-6 z-20 flex items-center gap-2">
          {/* Toggle Hotspots Button */}
          <button
            onClick={toggleHotspots}
            title={showHotspots ? 'Hide Amenity Hotspots' : 'Show Amenity Hotspots'}
            className={`flex size-10 items-center justify-center rounded-full border border-white/15 backdrop-blur-md transition-all hover:scale-105 active:scale-95 ${
              showHotspots
                ? 'bg-primary/30 text-primary border-primary/40'
                : 'bg-black/50 text-foreground/60 hover:bg-white/20'
            }`}
          >
            <MapPin className="size-4" />
          </button>

          <button
            onClick={toggleAutorotate}
            title={isRotating ? 'Pause Ambient Rotation' : 'Start Ambient Rotation'}
            className={`flex size-10 items-center justify-center rounded-full border border-white/15 backdrop-blur-md transition-all hover:scale-105 active:scale-95 ${
              isRotating
                ? 'bg-primary/30 text-primary border-primary/40'
                : 'bg-black/50 text-foreground hover:bg-white/20'
            }`}
          >
            {isRotating ? <Pause className="size-4" /> : <Play className="size-4 ml-0.5" />}
          </button>
          <button
            onClick={resetOrientation}
            title="Reset Horizon View"
            className="flex size-10 items-center justify-center rounded-full border border-white/15 bg-black/50 text-foreground backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105 active:scale-95"
          >
            <RotateCcw className="size-4" />
          </button>
          <button
            onClick={() => handleZoom('in')}
            title="Zoom In"
            className="hidden size-10 items-center justify-center rounded-full border border-white/15 bg-black/50 text-foreground backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105 active:scale-95 sm:flex"
          >
            <ZoomIn className="size-4" />
          </button>
          <button
            onClick={() => handleZoom('out')}
            title="Zoom Out"
            className="hidden size-10 items-center justify-center rounded-full border border-white/15 bg-black/50 text-foreground backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105 active:scale-95 sm:flex"
          >
            <ZoomOut className="size-4" />
          </button>
          <button
            onClick={toggleFullscreen}
            title="Toggle Fullscreen"
            className="flex size-10 items-center justify-center rounded-full border border-white/15 bg-primary px-3 text-primary-foreground backdrop-blur-md transition-all hover:brightness-110 hover:scale-105 active:scale-95"
          >
            {isFullscreen ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
          </button>
        </div>

        {/* Active Hotspot Spotlight Detail Card */}
        {activeHotspot && (
          <div className="absolute left-6 bottom-32 z-30 max-w-sm rounded-3xl border border-primary/30 bg-black/85 p-5 shadow-2xl backdrop-blur-2xl animate-in slide-in-from-bottom-5 duration-300">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                  {activeHotspot.tag || 'Interactive Amenity'}
                </span>
                <h4 className="mt-1 font-serif text-xl font-medium text-white">
                  {activeHotspot.title}
                </h4>
              </div>
              <button
                onClick={() => setActiveHotspot(null)}
                className="rounded-full border border-white/15 p-1 text-foreground/60 hover:text-white"
              >
                <X className="size-3.5" />
              </button>
            </div>

            {activeHotspot.subtitle && (
              <p className="mt-1.5 text-xs font-medium text-primary/90">
                {activeHotspot.subtitle}
              </p>
            )}

            {activeHotspot.description && (
              <p className="mt-2 text-xs leading-relaxed text-foreground/75">
                {activeHotspot.description}
              </p>
            )}

            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
              <span className="text-[10px] uppercase tracking-wider text-foreground/50">
                Spatial Feature
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

        {/* Bottom Floating Info & Scene HUD */}
        <div className="absolute inset-x-6 bottom-6 z-20 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          {/* Active Suite Meta */}
          <div className="max-w-xl rounded-3xl border border-white/15 bg-black/60 p-5 backdrop-blur-xl sm:p-6">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {activeScene.location}
            </span>
            <h3 className="mt-1 font-serif text-2xl font-medium tracking-tight text-white sm:text-3xl">
              {activeScene.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground/75">
              {activeScene.description}
            </p>

            {/* Highlights pill tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {activeScene.features.map((feat) => (
                <span
                  key={feat}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-0.5 text-[11px] font-medium text-foreground/80"
                >
                  {feat}
                </span>
              ))}
            </div>
          </div>

          {/* Scene Carousel Switcher */}
          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
            {scenes.map((scene) => {
              const isSelected = scene.id === activeScene.id
              return (
                <button
                  key={scene.id}
                  onClick={() => handleSceneSelect(scene)}
                  className={`group relative flex items-center gap-3 rounded-2xl border p-2 text-left transition-all ${
                    isSelected
                      ? 'border-primary bg-primary/20 shadow-lg shadow-primary/20 scale-[1.03]'
                      : 'border-white/15 bg-black/60 hover:border-white/40 hover:bg-black/80'
                  }`}
                >
                  <div className="relative size-14 shrink-0 overflow-hidden rounded-xl border border-white/20">
                    <img
                      src={scene.thumbnail}
                      alt={scene.title}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {isSelected && (
                      <span className="absolute inset-0 bg-primary/25 ring-2 ring-primary ring-inset" />
                    )}
                  </div>
                  <div className="pr-3">
                    <span className="block text-[10px] uppercase tracking-wider text-primary">
                      {scene.tag}
                    </span>
                    <span className="block font-serif text-xs font-semibold text-white whitespace-nowrap">
                      {scene.title.split('—')[0].trim()}
                    </span>
                    <span className="block text-[10px] text-foreground/60">
                      {scene.hotspots ? `${scene.hotspots.length} Hotspots` : '360° Panorama'}
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
