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
    <div className={`w-full ${className}`}>
      <div className="relative aspect-video w-full overflow-hidden rounded-lg">
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
            {/* 播放按钮 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-black/70 rounded-full flex items-center justify-center group-hover:bg-red-600 transition-colors">
                <svg 
                  className="w-8 h-8 text-white" 
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
      {/* 可选的标题和描述 */}
      {(title || description) && (
        <div className="mt-4">
          {title && <h3 className="text-lg font-semibold">{title}</h3>}
          {description && <p className="mt-2 text-gray-600">{description}</p>}
        </div>
      )}
    </div>
  );
}
