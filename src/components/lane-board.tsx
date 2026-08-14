import { Photo } from "@/components/photo";
import { lane } from "@/lib/photos";

export function LaneBoard() {
  return (
    <section className="a-lane" data-board="lane" aria-label="Archive">
      <div className="track">
        {lane.map((shot) => (
          <figure key={shot.alt}>
            <Photo
              src={shot.src}
              alt={shot.alt}
              sizes="(max-width: 760px) 85vw, 42vw"
            />
          </figure>
        ))}
      </div>
    </section>
  );
}
