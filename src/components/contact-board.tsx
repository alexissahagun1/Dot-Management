import Image from "next/image";
import { ContactForm } from "@/components/contact-form";
import { contact, site } from "@/lib/content";

export function ContactBoard({
  titleAs: Title = "h1",
  skip = false,
}: {
  titleAs?: "h1" | "h2";
  skip?: boolean;
}) {
  const body = (
    <>
      <div className="brief">
        <Title>{contact.h1}</Title>
        <p className="note">{contact.note}</p>
        <ContactForm />
        <p className="reply">{contact.reply}</p>
      </div>
      <p className="alt">
        <a
          href={site.instagram.href}
          rel="noopener noreferrer"
          target="_blank"
        >
          {site.instagram.handle}
        </a>
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>
    </>
  );

  return (
    <section className="a-contact" data-board="contact" aria-label="Contact">
      {skip ? (
        <main className="pane" id="content">
          {body}
        </main>
      ) : (
        <div className="pane">{body}</div>
      )}
      <Image
        className="shot"
        src="/images/services-trackside.jpg"
        alt={contact.photoAlt}
        width={1600}
        height={900}
        sizes="(max-width: 760px) 100vw, 50vw"
      />
    </section>
  );
}
