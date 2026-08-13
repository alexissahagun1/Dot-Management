import Image from "next/image";
import { services } from "@/lib/content";

export function ServicesPit({
  skip = false,
}: {
  skip?: boolean;
}) {
  const Tag = skip ? "main" : "div";

  return (
    <Tag className="a-pit" id={skip ? "content" : undefined}>
      {skip ? <h1 className="hp">Services</h1> : null}
      {services.map((item, i) => (
        <details key={item.n} name="dot-svc" open={i === 0 ? true : undefined}>
          <summary>
            <span className="n">{item.n}</span>
            <span className="t">{item.title}</span>
          </summary>
          <div className="reveal">
            <p className="body">{item.body}</p>
            {item.n === "05" ? (
              <Image
                className="strip"
                src="/images/services-trackside.jpg"
                alt="On-track support in the pit lane — De la Torre"
                width={1600}
                height={900}
                sizes="100vw"
              />
            ) : null}
          </div>
        </details>
      ))}
    </Tag>
  );
}
