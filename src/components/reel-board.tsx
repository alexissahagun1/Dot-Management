import { Clip } from "@/components/clip";
import { videos } from "@/lib/photos";

export function ReelBoard() {
  return (
    <section className="a-reel" data-board="reel" aria-label="On track">
      <Clip
        className="bg"
        src={videos.track.src}
        poster={videos.track.poster}
        label={videos.track.label}
      />
      <p className="mark">On track.</p>
    </section>
  );
}
