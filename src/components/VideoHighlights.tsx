import React, { useState, useEffect } from 'react';
import { Play, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type VideoItem = { id: number; title: string; thumbnail: string; youtubeUrl: string };

const videos: VideoItem[] = [
  { id: 1, title: 'Anti-corruption cartoon competition and exhibition 2025', thumbnail: '/images/video-1.jpg', youtubeUrl: 'https://www.youtube.com/watch?v=XXXXXXXX' },
  { id: 2, title: 'Inter-University Anti-Corruption Debate Competition 2025', thumbnail: '/images/video-2.jpg', youtubeUrl: 'https://www.youtube.com/watch?v=XXXXXXXX' },
  { id: 3, title: 'Anti-corruption cartoon competition and exhibition 2024', thumbnail: '/images/video-3.jpg', youtubeUrl: 'https://www.youtube.com/watch?v=XXXXXXXX' },
];

const PLACEHOLDER_THUMBNAIL =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='640' height='360'><rect width='100%' height='100%' fill='%23cccccc'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23666666' font-size='24'>Video</text></svg>";

function getYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtube.com')) {
      if (u.pathname.startsWith('/embed/')) {
        return u.pathname.split('/')[2] || null;
      }
      return u.searchParams.get('v');
    }
    if (u.hostname === 'youtu.be' || u.hostname === 'www.youtu.be') {
      return u.pathname.slice(1).split('/')[0] || null;
    }
    return null;
  } catch {
    return null;
  }
}

function getEmbedUrl(url: string): string {
  const id = getYouTubeId(url);
  return id ? `https://www.youtube.com/embed/${id}?autoplay=1` : url;
}

export const VideoHighlights: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  useEffect(() => {
    if (!activeVideo) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveVideo(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeVideo]);

  const closeModal = () => setActiveVideo(null);

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <h2 className="text-center font-bold text-brand-dark text-3xl md:text-4xl mb-8 md:mb-12">
          Video Highlights
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <button
              key={video.id}
              type="button"
              onClick={() => setActiveVideo(video)}
              aria-label={`Play video: ${video.title}`}
              className="group text-left rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark"
            >
              <div className="relative aspect-video overflow-hidden bg-gray-100">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.src = PLACEHOLDER_THUMBNAIL;
                  }}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-3 left-3 w-11 h-11 rounded-full bg-gray-300/60 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 group-hover:bg-gray-300/80">
                  <Play className="w-5 h-5 text-black fill-black ml-0.5" />
                </div>
              </div>
              <div className="bg-brand-deep text-white p-5 min-h-[108px] flex items-start">
                <h3 className="font-medium text-lg line-clamp-2">{video.title}</h3>
              </div>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeVideo && (
          <motion.div
            key="video-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
            aria-label={`Play video: ${activeVideo.title}`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-4xl"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close video"
                className="absolute -top-10 right-0 text-white hover:text-gray-200 transition-colors"
              >
                <X className="w-7 h-7" />
              </button>
              <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
                <iframe
                  src={getEmbedUrl(activeVideo.youtubeUrl)}
                  title={activeVideo.title}
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default VideoHighlights;
