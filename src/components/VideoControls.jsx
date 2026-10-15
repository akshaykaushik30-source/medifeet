import React from 'react';
import { Play, Volume2, VolumeX, Maximize2 } from 'lucide-react';

const IconButton = ({ label, onClick, children }) => (
  <button
    type="button"
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
    aria-label={label}
    title={label}
    className="w-9 h-9 rounded-full bg-black/35 hover:bg-black/60 backdrop-blur-md text-white ring-1 ring-white/20 flex items-center justify-center transition cursor-pointer"
  >
    {children}
  </button>
);

// Quiet controls for a video card: icon buttons that appear on hover (always
// shown on touch screens) and a centred play button while the video is paused.
// Place inside a `relative group` container.
export const VideoControls = ({ muted, onToggleMute, onExpand, playing = true, onTogglePlay, position = 'top-4 right-4' }) => (
  <>
    {onTogglePlay && !playing && (
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onTogglePlay();
        }}
        aria-label="Play video"
        className="absolute inset-0 m-auto z-10 w-16 h-16 rounded-full bg-white/90 hover:bg-white text-[#1E3F20] shadow-xl flex items-center justify-center pointer-events-auto transition hover:scale-105 cursor-pointer"
      >
        <Play size={24} className="fill-current ml-1" />
      </button>
    )}
    {(onToggleMute || onExpand) && (
      <div
        className={`absolute ${position} z-10 flex gap-2 pointer-events-auto opacity-0 group-hover:opacity-100 focus-within:opacity-100 [@media(hover:none)]:opacity-100 transition-opacity`}
      >
        {onToggleMute && (
          <IconButton label={muted ? 'Turn sound on' : 'Turn sound off'} onClick={onToggleMute}>
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </IconButton>
        )}
        {onExpand && (
          <IconButton label="Watch full screen" onClick={onExpand}>
            <Maximize2 size={15} />
          </IconButton>
        )}
      </div>
    )}
  </>
);

export default VideoControls;
