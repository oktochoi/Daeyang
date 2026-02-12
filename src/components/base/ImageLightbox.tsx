'use client'

import { useEffect, useCallback } from 'react';
import Image from 'next/image';

interface ImageLightboxProps {
  src: string;
  alt: string;
  caption?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageLightbox({ src, alt, caption, isOpen, onClose }: ImageLightboxProps) {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
        aria-label="닫기"
      >
        <i className="ri-close-line text-2xl" />
      </button>
      <div
        className="relative max-h-[90vh] w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-full min-h-[200px] flex items-center justify-center">
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={1600}
            className="max-h-[85vh] w-auto h-auto object-contain"
            unoptimized
            onClick={(e) => e.stopPropagation()}
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </div>
        {caption && (
          <p className="mt-3 text-center text-white/90 text-sm sm:text-base">{caption}</p>
        )}
      </div>
    </div>
  );
}
