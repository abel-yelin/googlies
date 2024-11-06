'use client';

import { useState } from 'react';
import Image from 'next/image';

interface YouTubeEmbedProps {
  videoId: string;
  thumbnailUrl: string;
  title?: string;
  description?: string;
  className?: string;
}


export function YouTubeEmbed({
  videoId,
  thumbnailUrl,
  title,
  description,
  className = '',
}: YouTubeEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className={`max-w-3xl mx-auto ${className}`}>
      <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-lg">
        {!isPlaying ? (
          <div 
            className="relative w-full h-full cursor-pointer group"
            onClick={() => setIsPlaying(true)}
          >
            <Image
              src={thumbnailUrl}
              alt={title || 'Video thumbnail'}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
              <div className="w-20 h-20 bg-black/70 rounded-full flex items-center justify-center group-hover:bg-red-600 transition-all transform group-hover:scale-110">
                <svg 
                  className="w-10 h-10 text-white" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={title || 'YouTube video player'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full border-0"
          />
        )}
      </div>
      {(title || description) && (
        <div className="mt-4">
          {title && <h3 className="text-lg font-semibold">{title}</h3>}
          {description && <p className="mt-2 text-gray-600">{description}</p>}
        </div>
      )}
    </div>
  );
}
