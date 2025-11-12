import { clsx, type ClassValue } from "clsx"
import type { MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from "react"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleScrollToSection = (sectionId: string) => (
  event: ReactMouseEvent | ReactTouchEvent
) => {
  event.preventDefault()

  if (typeof document === "undefined" || typeof window === "undefined") {
    return
  }

  const section = document.getElementById(sectionId)
  if (!section) {
    console.warn(`Section with id "${sectionId}" not found`)
    return
  }

  try {
    if ("scrollBehavior" in document.documentElement.style) {
      section.scrollIntoView({ behavior: "smooth", block: "start" })
    } else {
      const targetPosition = section.getBoundingClientRect().top + window.pageYOffset
      const startPosition = window.pageYOffset
      const distance = targetPosition - startPosition
      const duration = 1000
      let start: number | null = null

      const step = (timestamp: number) => {
        if (!start) start = timestamp
        const progress = timestamp - start
        const percentage = Math.min(progress / duration, 1)

        const easeInOutQuad = (t: number) => {
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
        }

        window.scrollTo(0, startPosition + distance * easeInOutQuad(percentage))

        if (progress < duration) {
          window.requestAnimationFrame(step)
        }
      }

      window.requestAnimationFrame(step)
    }
  } catch (error) {
    console.error("Scroll error:", error)

    try {
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth"
      })
    } catch (fallbackError) {
      console.error("Fallback scroll error:", fallbackError)

      window.scrollTo(0, section.offsetTop)
      window.location.hash = sectionId
    }
  }
}
