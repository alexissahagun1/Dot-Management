import Image from "next/image";
import { house, site } from "@/lib/content";

export function HouseBoard({
  titleAs: Title = "h2",
}: {
  titleAs?: "h1" | "h2";
}) {
  return (
    <section className="a-house" data-board="house" aria-label="The house">
      <div className="copy">
        <Title>{house.h2}</Title>
        <p className="lead">{house.lead}</p>
        <p className="body">{house.body}</p>
        <p className="path">{house.path}</p>
        <p className="base">{site.base}</p>
      </div>
      <div className="stills">
        {house.stills.map((shot) => (
          <figure key={shot.src}>
            <Image
              src={shot.src}
              alt={shot.alt}
              width={1600}
              height={1066}
              sizes="(max-width: 760px) 100vw, 52vw"
            />
            <figcaption>{shot.cap}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
