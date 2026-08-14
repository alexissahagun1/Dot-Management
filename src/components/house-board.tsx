import { Photo } from "@/components/photo";
import { house } from "@/lib/content";
import { houseStills } from "@/lib/photos";

export function HouseBoard({
  titleAs: Title = "h2",
  skip = false,
}: {
  titleAs?: "h1" | "h2";
  skip?: boolean;
}) {
  return (
    <section
      className="a-house"
      data-board="house"
      aria-label="About DOT"
      id={skip ? "content" : undefined}
    >
      <div className="copy">
        <Title>{house.h2}</Title>
        {house.dot.map((p) => (
          <p className="body" key={p.slice(0, 24)}>
            {p}
          </p>
        ))}
      </div>
      <div className="stills">
        {houseStills.map((shot) => (
          <figure key={shot.cap}>
            <Photo
              src={shot.src}
              alt={shot.alt}
              sizes="(max-width: 760px) 100vw, 54vw"
            />
            <figcaption>{shot.cap}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
