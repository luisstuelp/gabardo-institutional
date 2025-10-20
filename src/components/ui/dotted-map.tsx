import * as React from "react"
import { createMap } from "svg-dotted-map"
import { motion, useInView } from "framer-motion"

import { cn } from "@/lib/utils"

interface Marker {
  lat: number
  lng: number
  size?: number
}

export interface DottedMapProps extends React.SVGProps<SVGSVGElement> {
  width?: number
  height?: number
  mapSamples?: number
  markers?: Marker[]
  dotColor?: string
  markerColor?: string
  dotRadius?: number
  stagger?: boolean
  focusOnMarkers?: boolean
  focusPadding?: number
  animateZoom?: boolean
  zoomDuration?: number
  hideMarkers?: boolean
}

export function DottedMap({
  width = 150,
  height = 75,
  mapSamples = 5000,
  markers = [],
  markerColor = "#FF6900",
  dotRadius = 0.2,
  stagger = true,
  focusOnMarkers = false,
  focusPadding = 12,
  animateZoom = false,
  zoomDuration = 2,
  hideMarkers = false,
  className,
  style,
}: DottedMapProps) {
  const { points, addMarkers } = React.useMemo(() => createMap({
    width,
    height,
    mapSamples,
  }), [width, height, mapSamples])

  const processedMarkers = React.useMemo(() => addMarkers(markers), [addMarkers, markers])

  // Compute stagger helpers in a single, simple pass
  const { xStep, yToRowIndex } = React.useMemo(() => {
    const sorted = [...points].sort((a, b) => a.y - b.y || a.x - b.x)
    const rowMap = new Map<number, number>()
    let step = 0
    let prevY = Number.NaN
    let prevXInRow = Number.NaN

    for (const p of sorted) {
      if (p.y !== prevY) {
        // new row
        prevY = p.y
        prevXInRow = Number.NaN
        if (!rowMap.has(p.y)) rowMap.set(p.y, rowMap.size)
      }
      if (!Number.isNaN(prevXInRow)) {
        const delta = p.x - prevXInRow
        if (delta > 0) step = step === 0 ? delta : Math.min(step, delta)
      }
      prevXInRow = p.x
    }

    return { xStep: step || 1, yToRowIndex: rowMap }
  }, [points])

  const viewBox = React.useMemo(() => {
    if (!focusOnMarkers || processedMarkers.length === 0) {
      return `0 0 ${width} ${height}`
    }

    const xs = processedMarkers.map((marker) => marker.x)
    const ys = processedMarkers.map((marker) => marker.y)

    const minX = Math.max(0, Math.min(...xs) - focusPadding)
    const maxX = Math.min(width, Math.max(...xs) + focusPadding)
    const minY = Math.max(0, Math.min(...ys) - focusPadding)
    const maxY = Math.min(height, Math.max(...ys) + focusPadding)

    const vbWidth = Math.max(10, maxX - minX)
    const vbHeight = Math.max(10, maxY - minY)

    return `${minX} ${minY} ${vbWidth} ${vbHeight}`
  }, [focusOnMarkers, processedMarkers, width, height, focusPadding])

  const [currentViewBox, setCurrentViewBox] = React.useState(
    animateZoom ? `0 0 ${width} ${height}` : viewBox
  )

  const svgRef = React.useRef<SVGSVGElement | null>(null)
  const isInView = useInView(svgRef, { margin: "0px", once: true })
  const hasAnimatedRef = React.useRef(false)

  React.useEffect(() => {
    if (!animateZoom || !focusOnMarkers) return

    if (isInView && !hasAnimatedRef.current) {
      hasAnimatedRef.current = true
      const timer = setTimeout(() => {
        setCurrentViewBox(viewBox)
      }, 200)
      return () => clearTimeout(timer)
    }
  }, [animateZoom, focusOnMarkers, isInView, viewBox])

  return (
    <>
      <style>
        {`
          @keyframes markerPulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(1.15); }
          }
          .marker-dot {
            filter: drop-shadow(0 0 3px currentColor) drop-shadow(0 0 6px currentColor);
            animation: markerPulse 2.5s ease-in-out infinite;
          }
        `}
      </style>
      <motion.svg
        ref={svgRef}
        viewBox={currentViewBox}
        animate={{ viewBox: currentViewBox }}
        transition={{ duration: zoomDuration, ease: "easeInOut" }}
        className={cn("text-gray-500 dark:text-gray-500", className)}
        style={{ width: "100%", height: "100%", ...style }}
      >
      {points.map((point, index) => {
        const rowIndex = yToRowIndex.get(point.y) ?? 0
        const offsetX = stagger && rowIndex % 2 === 1 ? xStep / 2 : 0
        return (
          <circle
            cx={point.x + offsetX}
            cy={point.y}
            r={dotRadius}
            fill="currentColor"
            key={`${point.x}-${point.y}-${index}`}
          />
        )
      })}
      {!hideMarkers && processedMarkers.map((marker, index) => {
        const rowIndex = yToRowIndex.get(marker.y) ?? 0
        const offsetX = stagger && rowIndex % 2 === 1 ? xStep / 2 : 0
        const pinSize = (marker.size ?? dotRadius) * 3
        return (
          <g
            key={`${marker.x}-${marker.y}-${index}`}
            className="marker-dot"
            transform={`translate(${marker.x + offsetX - pinSize / 2}, ${marker.y - pinSize})`}
          >
            <path
              d={`M ${pinSize / 2} ${pinSize} 
                  C ${pinSize / 2} ${pinSize} 0 ${pinSize * 0.6} 0 ${pinSize * 0.4}
                  C 0 ${pinSize * 0.2} ${pinSize * 0.2} 0 ${pinSize / 2} 0
                  C ${pinSize * 0.8} 0 ${pinSize} ${pinSize * 0.2} ${pinSize} ${pinSize * 0.4}
                  C ${pinSize} ${pinSize * 0.6} ${pinSize / 2} ${pinSize} ${pinSize / 2} ${pinSize}
                  Z`}
              fill={markerColor}
              style={{ color: markerColor }}
            />
            <circle
              cx={pinSize / 2}
              cy={pinSize * 0.35}
              r={pinSize * 0.2}
              fill="white"
              opacity="0.9"
            />
          </g>
        )
      })}
    </motion.svg>
    </>
  )
}
