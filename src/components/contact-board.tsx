import { Photo } from "@/components/photo";
import { ContactForm } from "@/components/contact-form";
import { contact, site } from "@/lib/content";
import { photos } from "@/lib/photos";

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
      <Photo
        className="shot"
        src={photos.pitBottle}
        alt={contact.photoAlt}
        sizes="(max-width: 760px) 100vw, 50vw"
      />
    </section>
  );
}
