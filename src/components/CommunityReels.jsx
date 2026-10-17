import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

export const REELS = [
  { id: 'shilpa', name: 'Shilpa Shetty Kundra', handle: '@theshilpashetty', title: 'A perfect blend of comfort, technology & style', time: '0:45', image: '/assets/medifeet-reel-5-shilpa-shetty-ambassador.jpg', video: '/assets/medifeet-reel-5-shilpa-shetty-ambassador.mp4' },
  { id: 'bobby-shilpa', name: 'Bobby Deol & Shilpa Shetty', handle: '@iambobbydeol', title: 'Bobby Deol & Shilpa Shetty bring star power to MediFeet', time: '0:38', image: '/assets/medifeet-reel-3-bobby-deol-shilpa-shetty.jpg', video: '/assets/medifeet-reel-3-bobby-deol-shilpa-shetty.mp4' },
  { id: 'sandals', name: 'MediFeet Comfort Sandals', handle: '@medifeet.care', title: 'Comfort that keeps up with you all day', time: '0:35', image: '/assets/medifeet-reel-2-comfort-sandals.jpg', video: '/assets/medifeet-reel-2-comfort-sandals.mp4' },
  { id: 'manjot', name: 'Manjot Singh', handle: '@oyemanjot', title: 'Innovation, cushioning & real experience', time: '0:50', image: '/assets/medifeet-reel-4-manjot-business-meet.jpg', video: '/assets/medifeet-reel-4-manjot-business-meet.mp4' },
  { id: 'meet', name: 'MediFeet Innovation Meet', handle: '@medifeet.care', title: 'A celebration of innovation and partnerships', time: '1:02', image: '/assets/medifeet-reel-1-business-meet.jpg', video: '/assets/medifeet-reel-1-business-meet.mp4' },
];

// One reel: poster at rest, muted preview on hover, full video on click.
const ReelCard = ({ reel, onOpen, hidden }) => {
  const videoRef = useRef(null);
  const preview = (play) => {
    const video = videoRef.current;
    if (!video) return;
    if (play) video.play().catch(() => {});
    else {
      video.pause();
      video.currentTime = 0;
    }
  };
  return (
    <button
      type="button"
      onClick={onOpen}
      onMouseEnter={() => preview(true)}
      onMouseLeave={() => preview(false)}
      onFocus={() => preview(true)}
      onBlur={() => preview(false)}
      aria-label={`Play ${reel.name}: ${reel.title}`}
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : 0}
      className="group relative w-[230px] sm:w-[270px] aspect-[9/16] shrink-0 rounded-3xl overflow-hidden bg-[#1A3520] outline-none focus-visible:ring-2 focus-visible:ring-[#1E3F20] transition hover:-translate-y-1 cursor-pointer text-left"
    >
      <img src={reel.image} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
      <video ref={videoRef} src={reel.video} muted loop playsInline preload="none" className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/25" />
      <span className="absolute top-4 left-4 bg-black/45 backdrop-blur-md text-white text-[11px] font-['Geist_Mono'] px-2.5 py-1 rounded-full">{reel.time}</span>
      <div className="absolute inset-x-0 bottom-0 p-5 space-y-1.5">
        <p className="text-[11px] text-white/70">{reel.handle}</p>
        <p className="font-['Outfit'] font-bold text-base text-white leading-snug">{reel.name}</p>
        <p className="text-xs text-white/75 leading-relaxed line-clamp-2">{reel.title}</p>
      </div>
    </button>
  );
};

const ReelViewer = ({ reel, onClose }) => {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={reel.name} onClick={onClose}>
      <div className="relative w-full max-w-[400px] aspect-[9/16] max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
        <video src={reel.video} poster={reel.image} autoPlay controls playsInline className="w-full h-full object-contain rounded-2xl bg-black" />
        <button onClick={onClose} aria-label="Close video" className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white text-[#14301A] flex items-center justify-center shadow-lg cursor-pointer">
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

// Community and ambassador reels in a continuously moving strip.
export const CommunityReels = () => {
  const [open, setOpen] = useState(null);
  return (
    <section className="bg-[#F4F6F2] py-28 sm:py-36 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 mb-10">
        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#667360] mb-5">Real people, real comfort</p>
        <h2 className="font-['Outfit'] font-medium text-4xl sm:text-5xl tracking-[-0.03em] text-[#1E3F20]">Seen on feet.</h2>
      </div>
      <div className="reel-strip overflow-hidden">
        <div className="reel-track gap-6 px-3 py-4">
          {[...REELS, ...REELS].map((reel, i) => (
            <ReelCard key={`${reel.id}-${i}`} reel={reel} hidden={i >= REELS.length} onOpen={() => setOpen(reel)} />
          ))}
        </div>
      </div>
      {open && <ReelViewer reel={open} onClose={() => setOpen(null)} />}
    </section>
  );
};

export default CommunityReels;
