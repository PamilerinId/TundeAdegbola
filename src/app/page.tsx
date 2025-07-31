'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showEventPopup, setShowEventPopup] = useState(false)
  const [showFullImage, setShowFullImage] = useState(false)

  const handleCloseEventPopup = useCallback(() => {
    setShowEventPopup(false)
    localStorage.setItem('ta-70th-event-dismissed', 'true')
  }, [])

  const handleOpenFullImage = useCallback(() => {
    setShowFullImage(true)
  }, [])

  const handleCloseFullImage = useCallback(() => {
    setShowFullImage(false)
  }, [])

  useEffect(() => {
    // Check if popup should be shown (within event period and not dismissed)
    const checkEventPopup = () => {
      const eventEndDate = new Date('2025-08-08') // 1 week from now
      const currentDate = new Date()
      const isDismissed = localStorage.getItem('ta-70th-event-dismissed')
      
      if (currentDate <= eventEndDate && !isDismissed) {
        // Show popup after a short delay for better UX
        setTimeout(() => {
          setShowEventPopup(true)
        }, 1500)
      }
    }

    checkEventPopup()
  }, [])

  // Handle ESC key to close modals and body scroll lock
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (showFullImage) {
          handleCloseFullImage()
        } else if (showEventPopup) {
          handleCloseEventPopup()
        }
      }
    }

    if (showEventPopup || showFullImage) {
      // Prevent body scroll when any modal is open
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', handleEscKey)
    } else {
      // Restore body scroll when all modals are closed
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
      document.removeEventListener('keydown', handleEscKey)
    }
  }, [showEventPopup, showFullImage, handleCloseEventPopup, handleCloseFullImage])

  return (
    <div className="min-h-screen bg-stone-50 relative overflow-hidden">
      {/* Event Popup Modal */}
      {showEventPopup && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={handleCloseEventPopup}
        >
          <div 
            className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 ease-out scale-100 opacity-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleCloseEventPopup}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-200"
              aria-label="Close event announcement"
            >
              <svg className="w-5 h-5 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Event poster */}
            <div 
              className="relative w-full h-full min-h-[400px] md:min-h-[500px] cursor-pointer group"
              onClick={handleOpenFullImage}
            >
              <Image
                src="/programme_events.jpeg"
                alt="Tunde Adegbola at 70 - Festival and Celebration Events Programme"
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-105"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              />
              {/* Click to expand indicator */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                  <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Optional overlay content */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 pointer-events-none">
              <div className="text-white text-center">
                <h3 className="text-xl md:text-2xl font-bold mb-2">Join Us in Celebrating!</h3>
                <p className="text-white/90 text-sm md:text-base mb-2">Tunde Adegbola at 70 - A Festival of Language, Technology & Culture</p>
                <p className="text-white/70 text-xs md:text-sm flex items-center justify-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                  Click to view full details
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Image Viewer Modal */}
      {showFullImage && (
        <div 
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={handleCloseFullImage}
        >
          <div 
            className="relative w-full h-full max-w-7xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleCloseFullImage}
              className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-200"
              aria-label="Close full image view"
            >
              <svg className="w-6 h-6 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Full-size image */}
            <div className="relative w-full h-full">
              <Image
                src="/programme_events.jpeg"
                alt="Tunde Adegbola at 70 - Festival and Celebration Events Programme - Full View"
                fill
                className="object-contain"
                priority
                sizes="100vw"
              />
            </div>
            
            {/* Download/Info overlay */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-4 text-white text-center">
                <p className="text-sm md:text-base mb-2">
                  <strong>Tunde Adegbola at 70</strong> - Festival and Celebration Events Programme
                </p>
                <p className="text-xs md:text-sm text-white/80">
                  July 30 - August 3, 2025 • Multiple venues in Ibadan
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Fabric texture background */}
      <div 
        className="fixed inset-0 opacity-30 bg-repeat"
        style={{
          backgroundImage: 'url(/fabric_of_squares_gray.png)',
          backgroundSize: '200px 200px'
        }}
      ></div>
      
      {/* Mobile Navigation */}
      <nav className="fixed top-4 left-4 right-4 md:top-6 md:left-1/2 md:transform md:-translate-x-1/2 md:right-auto md:w-auto z-50">
        <div className="bg-white/90 backdrop-blur-md border border-stone-200 rounded-full shadow-lg">
          <div className="flex items-center justify-between md:justify-center md:space-x-8 px-4 md:px-8 py-3">
            <div className="text-stone-800 font-bold text-sm">Tunde Adegbola</div>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden w-8 h-8 flex items-center justify-center relative"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-5 h-4 relative flex flex-col justify-between">
                <div className={`w-full h-0.5 bg-stone-600 transform transition-all duration-300 origin-center ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
                <div className={`w-full h-0.5 bg-stone-600 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                <div className={`w-full h-0.5 bg-stone-600 transform transition-all duration-300 origin-center ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
              </div>
            </button>
            
            {/* Desktop navigation */}
            <div className="hidden md:flex space-x-6 text-sm">
              <a href="#about" className="text-stone-600 hover:text-stone-900 transition-colors">About</a>
              <a href="#work" className="text-stone-600 hover:text-stone-900 transition-colors">Work</a>
              <a href="#speaking" className="text-stone-600 hover:text-stone-900 transition-colors">Speaking</a>
              <a href="#contact" className="text-stone-600 hover:text-stone-900 transition-colors">Contact</a>
            </div>
          </div>
        </div>
        
        {/* Mobile menu dropdown - positioned absolutely */}
        <div className={`md:hidden absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md border border-stone-200 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-64 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2'}`}>
          <div className="p-4">
            <div className="flex flex-col space-y-1">
              <a 
                href="#about" 
                className="text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-all py-3 px-4 rounded-xl text-sm font-medium" 
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a 
                href="#work" 
                className="text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-all py-3 px-4 rounded-xl text-sm font-medium" 
                onClick={() => setIsMenuOpen(false)}
              >
                Work
              </a>
              <a 
                href="#speaking" 
                className="text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-all py-3 px-4 rounded-xl text-sm font-medium" 
                onClick={() => setIsMenuOpen(false)}
              >
                Speaking
              </a>
              <a 
                href="#contact" 
                className="text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-all py-3 px-4 rounded-xl text-sm font-medium" 
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Mobile optimized */}
      <section className="relative min-h-screen flex items-center justify-center px-4 md:px-0">
        <div className="relative z-10 max-w-6xl mx-auto px-2 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Left side - Text content */}
            <div className="space-y-6 md:space-y-8 text-center lg:text-left order-2 lg:order-1">
              <div className="space-y-3 md:space-y-4">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-light text-stone-900 leading-tight">
                  Tunde<br />
                  <span className="font-bold">Adegbola</span>
                </h1>
                <div className="w-16 md:w-24 h-1 bg-amber-600 mx-auto lg:mx-0"></div>
              </div>
              
              <p className="text-lg sm:text-xl lg:text-2xl text-stone-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Nigerian polymath pioneering the digital transformation of African languages through technology, research, and cultural advocacy.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
                <button className="bg-stone-900 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-medium hover:bg-stone-800 active:bg-stone-800 transition-all transform active:scale-95 text-sm md:text-base">
                  Explore Work
                </button>
                <button className="border border-stone-400 text-stone-700 px-6 md:px-8 py-3 md:py-4 rounded-full font-medium hover:bg-stone-100 active:bg-stone-100 transition-all text-sm md:text-base">
                  Read Biography
                </button>
              </div>
            </div>
            
            {/* Right side - Portrait */}
            <div className="relative order-1 lg:order-2">
              <div className="relative w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden bg-gradient-to-br from-stone-100 to-stone-200 shadow-2xl mx-auto max-w-sm lg:max-w-none">
                <Image 
                  src="/ta_no_bg.png" 
                  alt="Tunde Adegbola - Nigerian polymath and language technology pioneer"
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              
              {/* Floating elements - Smaller on mobile */}
              <div className="absolute -top-4 md:-top-8 -right-4 md:-right-8 w-16 md:w-32 h-16 md:h-32 bg-amber-200 rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute -bottom-4 md:-bottom-8 -left-4 md:-left-8 w-12 md:w-24 h-12 md:h-24 bg-stone-300 rounded-full opacity-40 animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-5 md:w-6 h-8 md:h-10 border-2 border-stone-400 rounded-full flex justify-center">
            <div className="w-1 h-2 md:h-3 bg-stone-400 rounded-full mt-1.5 md:mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About Section - Mobile optimized */}
      <section id="about" className="relative py-16 md:py-32 bg-white/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 md:gap-16 items-start">
            {/* Left - Title */}
            <div className="lg:col-span-1 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-stone-900 mb-4 md:mb-6">
                About
              </h2>
              <div className="w-12 md:w-16 h-1 bg-amber-600 mx-auto lg:mx-0"></div>
            </div>
            
            {/* Right - Content */}
            <div className="lg:col-span-2 space-y-6 md:space-y-8">
              <div className="space-y-4 md:space-y-6 text-base md:text-lg text-stone-700 leading-relaxed">
                <p>
                  Born August 1, 1955, in Ibadan, Nigeria, Tunde Adegbola is a scientist, musician, engineer, linguist, and cultural activist who has dedicated his life to bridging African heritage with modern innovation.
                </p>
                <p>
                  With degrees in electrical engineering, computer science, and a PhD in information science specializing in human language technology, he has spent over four decades at the intersection of language, technology, and culture.
                </p>
                <p>
                  As founder and executive director of <strong>Alt-i (African Languages Technology Initiative)</strong>, he has pioneered the development of speech recognition, text-to-speech synthesis, and machine translation technologies for African languages, making digital technology accessible to millions.
                </p>
              </div>
              
              {/* Key achievements - Stack on mobile */}
              <div className="grid md:grid-cols-2 gap-6 md:gap-8 pt-6 md:pt-8">
                <div className="space-y-3 md:space-y-4">
                  <h3 className="text-lg md:text-xl font-semibold text-stone-900">Language Technology</h3>
                  <ul className="space-y-2 text-stone-600 text-sm md:text-base">
                    <li>• Speech recognition for Yoruba, Igbo, Hausa</li>
                    <li>• Microsoft Windows localization</li>
                    <li>• Yoruba keyboard development</li>
                    <li>• Text-to-speech synthesis</li>
                  </ul>
                </div>
                <div className="space-y-3 md:space-y-4">
                  <h3 className="text-lg md:text-xl font-semibold text-stone-900">Broadcasting & Media</h3>
                  <ul className="space-y-2 text-stone-600 text-sm md:text-base">
                    <li>• Africa Independent Television (AIT)</li>
                    <li>• Channels Television setup</li>
                    <li>• West Africa Democracy Radio</li>
                    <li>• São Tomé and Príncipe projects</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Section - Mobile optimized */}
      <section id="work" className="relative py-16 md:py-32">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-stone-900 mb-4 md:mb-6">
              Featured Work
            </h2>
            <div className="w-12 md:w-16 h-1 bg-amber-600 mx-auto mb-6 md:mb-8"></div>
            <p className="text-lg md:text-xl text-stone-600 max-w-3xl mx-auto px-4">
              Pioneering technologies and initiatives that bridge the digital divide for African languages
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Alt-i Initiative */}
            <div className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-xl active:shadow-xl transition-all duration-300 hover:transform hover:scale-105 active:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-stone-50 rounded-3xl opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="w-12 md:w-16 h-12 md:h-16 bg-amber-100 rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:bg-amber-200 group-active:bg-amber-200 transition-colors">
                  <svg className="w-6 md:w-8 h-6 md:h-8 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-stone-900 mb-3 md:mb-4">Alt-i Initiative</h3>
                <p className="text-stone-600 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                  Founded in 2002, the African Languages Technology Initiative develops resources to facilitate ICT engagement in African languages, addressing technology as a factor in language preservation.
                </p>
                <a href="https://alt-i.org" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-amber-600 font-medium hover:text-amber-700 active:text-amber-700 transition-colors text-sm md:text-base">
                  Visit Alt-i.org
                  <svg className="w-3 md:w-4 h-3 md:h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            {/* TIWA Systems */}
            <div className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-xl active:shadow-xl transition-all duration-300 hover:transform hover:scale-105 active:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-stone-50 to-amber-50 rounded-3xl opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="w-12 md:w-16 h-12 md:h-16 bg-stone-100 rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:bg-stone-200 group-active:bg-stone-200 transition-colors">
                  <svg className="w-6 md:w-8 h-6 md:h-8 text-stone-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-stone-900 mb-3 md:mb-4">TIWA Systems</h3>
                <p className="text-stone-600 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                  Established in 1985, pioneering digital technology in Nigeria through desktop publishing, nonlinear video editing, and broadcast station design for major Nigerian media houses.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-stone-200 text-stone-700 rounded-full text-xs md:text-sm">Broadcasting</span>
                  <span className="px-3 py-1 bg-amber-200 text-amber-700 rounded-full text-xs md:text-sm">Innovation</span>
                </div>
              </div>
            </div>

            {/* Yoruba Keyboard */}
            <div className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-xl active:shadow-xl transition-all duration-300 hover:transform hover:scale-105 active:scale-105 md:col-span-2 lg:col-span-1">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-stone-50 rounded-3xl opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="w-12 md:w-16 h-12 md:h-16 bg-amber-100 rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:bg-amber-200 group-active:bg-amber-200 transition-colors">
                  <svg className="w-6 md:w-8 h-6 md:h-8 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 5H4c-1.1 0-1.99.9-1.99 2L2 17c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-9 3h2v2h-2V8zm0 3h2v2h-2v-2zM8 8h2v2H8V8zm0 3h2v2H8v-2zm-1 2H5v-2h2v2zm0-3H5V8h2v2zm9 7H8v-2h8v2zm0-4h-2v-2h2v2zm0-3h-2V8h2v2zm3 3h-2v-2h2v2zm0-3h-2V8h2v2z"/>
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-stone-900 mb-3 md:mb-4">Yoruba Keyboard</h3>
                <p className="text-stone-600 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                  Award-winning tone-aware keyboard layout that addresses the unique orthographic needs of Yoruba, making it easier to type diacritical marks and tones.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-amber-200 text-amber-700 rounded-full text-xs md:text-sm">Innovation</span>
                  <span className="px-3 py-1 bg-stone-200 text-stone-700 rounded-full text-xs md:text-sm">Typography</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Speaking Section - Mobile optimized */}
      <section id="speaking" className="relative py-16 md:py-32 bg-white/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Left - Image */}
            <div className="relative order-2 lg:order-1">
              <div className="relative w-full h-64 md:h-96 rounded-3xl overflow-hidden bg-stone-200 shadow-xl mx-auto max-w-sm lg:max-w-none">
                <Image 
                  src="/1 344.JPG" 
                  alt="Tunde Adegbola speaking at a conference - sharing insights on language technology and African cultural preservation"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </div>
            
            {/* Right - Content */}
            <div className="space-y-6 md:space-y-8 order-1 lg:order-2 text-center lg:text-left">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-stone-900 mb-4 md:mb-6">
                  Speaking
                </h2>
                <div className="w-12 md:w-16 h-1 bg-amber-600 mx-auto lg:mx-0 mb-6 md:mb-8"></div>
                <p className="text-lg md:text-xl text-stone-600 leading-relaxed">
                  Sharing insights on language technology, digital transformation, and African cultural preservation at conferences and forums worldwide.
                </p>
              </div>
              
              <div className="space-y-4 md:space-y-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-sm">
                  <h3 className="text-base md:text-lg font-semibold text-stone-900 mb-2">TEDx Talks & Conferences</h3>
                  <p className="text-stone-600 text-sm md:text-base">Regular speaker at technology and cultural preservation events across Africa and beyond.</p>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-sm">
                  <h3 className="text-base md:text-lg font-semibold text-stone-900 mb-2">Academic Lectures</h3>
                  <p className="text-stone-600 text-sm md:text-base">Teaching artificial intelligence at University of Lagos, University of Ibadan, and Afe Babalola University.</p>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-sm">
                  <h3 className="text-base md:text-lg font-semibold text-stone-900 mb-2">UNESCO & Pan-African Forums</h3>
                  <p className="text-stone-600 text-sm md:text-base">Advocating for indigenous languages and digital inclusion at international policy forums.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Mobile optimized */}
      <section id="contact" className="relative py-16 md:py-32">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <div className="space-y-6 md:space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-stone-900 mb-4 md:mb-6">
                Connect
              </h2>
              <div className="w-12 md:w-16 h-1 bg-amber-600 mx-auto mb-6 md:mb-8"></div>
              <p className="text-lg md:text-xl text-stone-600 leading-relaxed max-w-2xl mx-auto px-4">
                Interested in collaboration, speaking engagements, or learning more about African language technology and cultural preservation?
              </p>
            </div>
            
            {/* Contact Information */}
            <div className="space-y-4 pt-6 md:pt-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-sm max-w-md mx-auto">
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-3">
                    <svg className="w-5 h-5 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a 
                      href="mailto:iam@tundeadegbola.com" 
                      className="text-stone-700 hover:text-stone-900 transition-colors font-medium"
                    >
                      iam@tundeadegbola.com
                    </a>
                  </div>
                  
                  {/* <div className="flex items-center justify-center gap-3">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <a 
                      href="https://www.linkedin.com/in/tunde-adegbola-2659681/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 transition-colors font-medium"
                    >
                      LinkedIn Profile
                    </a>
                  </div> */}
                </div>
              </div>
            </div>
            
            {/* Social Links - Mobile optimized */}
            <div className="flex justify-center space-x-6 md:space-x-8 pt-12 md:pt-16">
              <a href="https://en.wikipedia.org/wiki/Tunde_Adegbola" target="_blank" rel="noopener noreferrer" className="group">
                <div className="w-10 md:w-12 h-10 md:h-12 bg-stone-200 rounded-full flex items-center justify-center group-hover:bg-stone-300 group-active:bg-stone-300 transition-colors">
                  <svg className="w-5 md:w-6 h-5 md:h-6 text-stone-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                </div>
                <p className="text-xs text-stone-500 mt-2">Wikipedia</p>
              </a>
              
              <a href="https://www.linkedin.com/in/tunde-adegbola-2659681/" target="_blank" rel="noopener noreferrer" className="group">
                <div className="w-10 md:w-12 h-10 md:h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 group-active:bg-blue-200 transition-colors">
                  <svg className="w-5 md:w-6 h-5 md:h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <p className="text-xs text-stone-500 mt-2">LinkedIn</p>
              </a>
              
              <a href="https://instagram.com/drtundeadegbola" target="_blank" rel="noopener noreferrer" className="group">
                <div className="w-10 md:w-12 h-10 md:h-12 bg-stone-200 rounded-full flex items-center justify-center group-hover:bg-stone-300 group-active:bg-stone-300 transition-colors">
                  <svg className="w-5 md:w-6 h-5 md:h-6 text-stone-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <p className="text-xs text-stone-500 mt-2">Instagram</p>
              </a>
              
              <a href="https://alt-i.org" target="_blank" rel="noopener noreferrer" className="group">
                <div className="w-10 md:w-12 h-10 md:h-12 bg-amber-200 rounded-full flex items-center justify-center group-hover:bg-amber-300 group-active:bg-amber-300 transition-colors">
                  <svg className="w-5 md:w-6 h-5 md:h-6 text-amber-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
              </div>
                <p className="text-xs text-stone-500 mt-2">Alt-i</p>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Mobile optimized */}
      <footer className="relative py-8 md:py-12 bg-stone-900 text-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <div className="mb-4 md:mb-0">
              <p className="text-stone-300 text-sm md:text-base">© {new Date().getFullYear()} Tunde Adegbola. All rights reserved.</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs md:text-sm text-stone-400">
              <span>Founder & Director, Alt-i</span>
              <span className="hidden sm:inline">•</span>
              <span>Language Technology Pioneer</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 