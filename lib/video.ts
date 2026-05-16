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
