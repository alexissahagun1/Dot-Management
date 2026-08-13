import Image from "next/image";
import { HomeCta } from "@/components/home-cta";
import { ScrollCue } from "@/components/scroll-cue";
import { home } from "@/lib/content";

export function HomeBoard({
  titleAs: Title = "h1",
  priority = false,
}: {
  titleAs?: "h1" | "h2";
  priority?: boolean;
}) {
  return (
    <section className="a-home" data-board="home" aria-label="Home">
      <Image
        className="bg"
        src="/images/home-monaco.jpg"
        alt={home.photoAlt}
        width={2400}
        height={1600}
        priority={priority}
        sizes="100vw"
      />
      <div className="veil" aria-hidden="true" />
      <div className="copy">
        <Title>
          <span>{home.h1[0]}</span>
          <span>{home.h1[1]}</span>
        </Title>
        <p className="quote">{home.quote}</p>
        <HomeCta />
        <p className="proof">{home.proof}</p>
      </div>
      <ScrollCue />
    </section>
  );
}
