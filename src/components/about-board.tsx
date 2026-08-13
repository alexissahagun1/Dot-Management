import Image from "next/image";
import { about } from "@/lib/content";

export function AboutBoard({
  titleAs: Title = "h1",
  priority = false,
  skip = false,
}: {
  titleAs?: "h1" | "h2";
  priority?: boolean;
  skip?: boolean;
}) {
  const Copy = skip ? "main" : "div";

  return (
    <section className="a-about" data-board="about" aria-label="About">
      <Copy className="copy" id={skip ? "content" : undefined}>
        <div>
          <Title>{about.h1}</Title>
          <p className="bio">{about.bio}</p>
        </div>
        <ol>
          {about.career.map((row) => (
            <li key={row.cat}>
              <span className="cat">{row.cat}</span>
              <span className="where">{row.where}</span>
            </li>
          ))}
        </ol>
      </Copy>
      <Image
        className="full"
        src="/images/about-paddock.jpg"
        alt={about.photoAlt}
        width={1600}
        height={2400}
        priority={priority}
        sizes="(max-width: 760px) 100vw, 56vw"
      />
      <div className="film" data-board="film">
        {about.film.map((shot) => (
          <figure key={shot.src}>
            <Image
              src={shot.src}
              alt={shot.alt}
              width={1600}
              height={1066}
              sizes="(max-width: 760px) 100vw, 50vw"
            />
            <figcaption>{shot.cap}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
