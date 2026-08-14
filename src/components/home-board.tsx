import { Photo } from "@/components/photo";
import { HomeCta } from "@/components/home-cta";
import { ScrollCue } from "@/components/scroll-cue";
import { home } from "@/lib/content";
import { photos } from "@/lib/photos";

export function HomeBoard({
  titleAs: Title = "h1",
  priority = false,
}: {
  titleAs?: "h1" | "h2";
  priority?: boolean;
}) {
  return (
    <section className="a-home" data-board="home" aria-label="Home">
      <Photo
        className="bg"
        src={photos.kartFinish}
        alt={home.photoAlt}
        priority={priority}
        fetchPriority={priority ? "high" : "auto"}
        quality={75}
        sizes="(max-width: 760px) 180vw, 100vw"
      />
      <div className="veil" aria-hidden="true" />
      <div className="copy">
        <Title>{home.h1}</Title>
        <p className="quote">{home.quote}</p>
        <HomeCta />
      </div>
      <ScrollCue />
    </section>
  );
}
