'use client'

import { useState } from 'react'
import {
  GALLERY_CATEGORIES,
  GALLERY_ITEMS,
  type GalleryCategory,
} from '@/data/gallery'

function CategoryIcon({
  category,
  className,
}: {
  category: GalleryCategory
  className?: string
}) {
  const paths: Record<GalleryCategory, React.ReactNode> = {
    video: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
      />
    ),
    audio: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z"
      />
    ),
    interview: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    ),
    press: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m0 0h2a1 1 0 011 1v9a2 2 0 01-2 2M9 8h4m-4 4h4m-4 4h4"
      />
    ),
    conference: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
      />
    ),
    article: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    ),
  }

  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      {paths[category]}
    </svg>
  )
}

export default function GallerySection() {
  const [active, setActive] = useState<GalleryCategory>(
    GALLERY_CATEGORIES[0].id
  )

  const activeMeta =
    GALLERY_CATEGORIES.find((c) => c.id === active) ?? GALLERY_CATEGORIES[0]
  const activeItems = GALLERY_ITEMS.filter((item) => item.category === active)

  return (
    <section
      id="gallery"
      className="relative py-16 md:py-32 bg-white/60 backdrop-blur-sm"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-stone-900 mb-4 md:mb-6">
            Gallery
          </h2>
          <div className="w-12 md:w-16 h-1 bg-amber-600 mx-auto mb-6 md:mb-8"></div>
          <p className="text-lg md:text-xl text-stone-600 max-w-3xl mx-auto px-4">
            Four decades of talks, recordings, conversations and published work,
            gathered in one place.
          </p>
        </div>

        {/* Category tabs */}
        <div
          className="-mx-4 px-4 md:mx-0 md:px-0 overflow-x-auto scrollbar-none mb-8 md:mb-10"
          role="tablist"
          aria-label="Gallery categories"
        >
          <div className="flex gap-2 md:gap-3 md:flex-wrap md:justify-center min-w-max md:min-w-0 pb-1">
            {GALLERY_CATEGORIES.map((category) => {
              const count = GALLERY_ITEMS.filter(
                (item) => item.category === category.id
              ).length
              const isActive = category.id === active

              return (
                <button
                  key={category.id}
                  role="tab"
                  id={`gallery-tab-${category.id}`}
                  aria-selected={isActive}
                  aria-controls={`gallery-panel-${category.id}`}
                  onClick={() => setActive(category.id)}
                  className={`group flex items-center gap-2 whitespace-nowrap rounded-full px-4 md:px-5 py-2.5 md:py-3 text-sm font-medium transition-all duration-200 border ${
                    isActive
                      ? 'bg-stone-900 text-white border-stone-900 shadow-md'
                      : 'bg-white/80 text-stone-600 border-stone-200 hover:border-stone-400 hover:text-stone-900 active:scale-95'
                  }`}
                >
                  <CategoryIcon
                    category={category.id}
                    className={`w-4 h-4 ${
                      isActive ? 'text-amber-400' : 'text-stone-400'
                    }`}
                  />
                  {category.label}
                  <span
                    className={`text-xs tabular-nums rounded-full px-1.5 py-0.5 ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-stone-100 text-stone-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Active category blurb */}
        <p className="text-center text-sm md:text-base text-stone-500 mb-8 md:mb-10">
          {activeMeta.blurb}
        </p>

        {/* Panel */}
        <div
          role="tabpanel"
          id={`gallery-panel-${active}`}
          aria-labelledby={`gallery-tab-${active}`}
        >
          {activeItems.length === 0 ? (
            <div className="bg-white/70 backdrop-blur-sm border border-dashed border-stone-300 rounded-3xl py-16 px-6 text-center max-w-2xl mx-auto">
              <div className="w-14 h-14 bg-stone-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <CategoryIcon
                  category={active}
                  className="w-7 h-7 text-stone-400"
                />
              </div>
              <p className="text-stone-600 text-base md:text-lg">
                {activeMeta.emptyMessage}
              </p>
              <a
                href="#invite"
                className="inline-flex items-center gap-2 mt-6 text-amber-600 hover:text-amber-700 font-medium text-sm transition-colors"
              >
                Have something we should add? Get in touch
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {activeItems.map((item) => (
                <a
                  key={item.url + item.title}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-7 shadow-lg hover:shadow-xl active:shadow-xl transition-all duration-300 hover:-translate-y-1 active:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-stone-50 rounded-3xl opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity"></div>

                  <div className="relative flex flex-col h-full">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="w-11 h-11 bg-amber-100 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-amber-200 transition-colors">
                        <CategoryIcon
                          category={item.category}
                          className="w-5 h-5 text-amber-700"
                        />
                      </div>
                      <svg
                        className="w-4 h-4 text-stone-300 group-hover:text-amber-600 transition-colors shrink-0 mt-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </div>

                    <h3 className="text-lg md:text-xl font-semibold text-stone-900 leading-snug mb-2 group-hover:text-stone-950">
                      {item.title}
                    </h3>

                    {item.description && (
                      <p className="text-stone-600 text-sm md:text-base leading-relaxed mb-4">
                        {item.description}
                      </p>
                    )}

                    <div className="mt-auto pt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs md:text-sm text-stone-500">
                      {item.source && (
                        <span className="font-medium text-stone-600">
                          {item.source}
                        </span>
                      )}
                      {item.source && item.date && (
                        <span className="text-stone-300">•</span>
                      )}
                      {item.date && <span>{item.date}</span>}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
