const AUTOPLAY_GESTURE_EVENTS = ["pointerdown", "touchstart", "keydown", "wheel", "focus"] as const;

export function attemptVideoAutoplay(video: HTMLVideoElement) {
  video.defaultMuted = true;
  video.muted = true;
  video.autoplay = true;
  video.playsInline = true;
  video.setAttribute("autoplay", "");
  video.setAttribute("muted", "");
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "true");

  const playPromise = video.play();
  if (playPromise) {
    void playPromise.catch(() => {});
  }
}

export function bindVideoAutoplay(video: HTMLVideoElement) {
  const retryAutoplay = () => attemptVideoAutoplay(video);

  retryAutoplay();
  video.addEventListener("loadedmetadata", retryAutoplay);
  video.addEventListener("canplay", retryAutoplay);
  document.addEventListener("visibilitychange", retryAutoplay);
  window.addEventListener("pageshow", retryAutoplay);

  for (const eventName of AUTOPLAY_GESTURE_EVENTS) {
    window.addEventListener(eventName, retryAutoplay, { once: true });
  }

  return () => {
    video.removeEventListener("loadedmetadata", retryAutoplay);
    video.removeEventListener("canplay", retryAutoplay);
    document.removeEventListener("visibilitychange", retryAutoplay);
    window.removeEventListener("pageshow", retryAutoplay);

    for (const eventName of AUTOPLAY_GESTURE_EVENTS) {
      window.removeEventListener(eventName, retryAutoplay);
    }
  };
}
