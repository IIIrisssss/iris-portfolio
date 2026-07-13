"use client";

import { useRef, useState } from "react";

type MavaVideoPlayerProps = {
  src: string;
  poster?: string;
};

export function MavaVideoPlayer({ src, poster }: MavaVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.muted = false;
      try {
        await video.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
      return;
    }

    video.pause();
    setPlaying(false);
  };

  return (
    <div className="mava-video-player">
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div className="mava-video-player__surface" onClick={togglePlay}>
        <video
          ref={videoRef}
          className="mava-video-player__video"
          src={src}
          poster={poster}
          playsInline
          preload="metadata"
          onEnded={() => setPlaying(false)}
          onPause={() => setPlaying(false)}
          onPlay={() => setPlaying(true)}
        />
        <button
          type="button"
          className={[
            "mava-video-player__play",
            playing ? "mava-video-player__play--hidden" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={(event) => {
            event.stopPropagation();
            void togglePlay();
          }}
          aria-label={playing ? "Pause video" : "Play video with sound"}
        >
          <span className="mava-video-player__play-icon" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
