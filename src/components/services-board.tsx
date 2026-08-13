import Image from "next/image";
import { ServicesPit } from "@/components/services-pit";

export function ServicesBoard({
  priority = false,
  skip = false,
}: {
  priority?: boolean;
  skip?: boolean;
}) {
  return (
    <section className="a-services" data-board="services" aria-label="Services">
      <ServicesPit skip={skip} />
      <Image
        className="hero"
        src="/images/nav-gt3.jpg"
        alt="Lamborghini Huracán GT3"
        width={1600}
        height={2400}
        priority={priority}
        sizes="(max-width: 760px) 100vw, 50vw"
      />
    </section>
  );
}
