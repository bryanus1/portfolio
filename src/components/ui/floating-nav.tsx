import clsx from "clsx"
import { useEffect, useState } from "react"

const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About Me" },
  { id: "experience", label: "Professional Experience" },
  { id: "skills", label: "Skills & Expertise" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Get in Touch" },
]

export function FloatingNav() {
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 },
    )

    sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div
      className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50"
    >
      <div className="flex flex-col gap-3">
        {sections.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
            className="group relative flex items-center"
            aria-label={`Scroll to ${label}`}
          >
            <span className="absolute right-8 px-2 py-1 rounded bg-rose-300 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {label}
            </span>
            <div
            className={clsx('w-3 h-3 rounded-full transition-all duration-300', {
              'bg-yellow-200 scale-125': activeSection === id,
              'bg-gray-400 hover:scale-110': activeSection !== id,
            })} />
          </button>
        ))}
      </div>
    </div>
  )
}
