'use client'

import { useEffect } from 'react'

export default function RemixIconLoader() {
  useEffect(() => {
    // RemixIcon CSS가 이미 로드되었는지 확인
    const existingLink = document.querySelector('link[href*="remixicon"]')
    
    if (!existingLink) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://cdn.jsdelivr.net/npm/remixicon@4.3.0/fonts/remixicon.css'
      document.head.appendChild(link)
    }
  }, [])

  return null
}

