import { Clip } from "@/components/clip";
import { ServicesPit } from "@/components/services-pit";
import { videos } from "@/lib/photos";

export function ServicesBoard({
  skip = false,
}: {
  priority?: boolean;
  skip?: boolean;
}) {
  return (
    <section className="a-services" data-board="services" aria-label="Services">
      <ServicesPit skip={skip} />
      <Clip
        className="hero"
        src={videos.replay.src}
        poster={videos.replay.poster}
        label={videos.replay.label}
      />
    </section>
  );
}
