import { Photo } from "@/components/photo";
import { house } from "@/lib/content";
import { raulFilm, raulShot } from "@/lib/photos";

export function AboutBoard({
  titleAs: Title = "h2",
  priority = false,
  skip = false,
}: {
  titleAs?: "h1" | "h2";
  priority?: boolean;
  skip?: boolean;
}) {
  const Copy = skip ? "main" : "div";

  return (
    <section className="a-about" data-board="about" aria-label="About Raul">
      <Copy className="copy" id={skip ? "content" : undefined}>
        <Title>{house.raul}</Title>
        {house.raulBody.map((p) => (
          <p className="bio" key={p.slice(0, 24)}>
            {p}
          </p>
        ))}
      </Copy>
      <Photo
        className="full"
        src={raulShot.src}
        alt={raulShot.alt}
        priority={priority}
        sizes="(max-width: 760px) 100vw, 56vw"
      />
      <div className="film" data-board="film">
        {raulFilm.map((shot) => (
          <figure key={shot.cap}>
            <Photo
              src={shot.src}
              alt={shot.alt}
              sizes="(max-width: 760px) 100vw, 50vw"
            />
            <figcaption>{shot.cap}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
