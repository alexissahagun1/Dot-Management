"use client";

import { Photo } from "@/components/photo";
import { services } from "@/lib/content";
import { photos } from "@/lib/photos";

const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";
const MS = 280;

function panelOf(details: HTMLDetailsElement) {
  return details.querySelector<HTMLElement>(":scope > .reveal");
}

function prefersReduce() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function animateHeight(panel: HTMLElement, from: number, to: number) {
  panel.getAnimations().forEach((a) => a.cancel());
  panel.style.overflow = "hidden";
  panel.dataset.busy = "1";
  return panel
    .animate([{ height: `${from}px` }, { height: `${to}px` }], {
      duration: MS,
      easing: EASE,
    })
    .finished.finally(() => {
      panel.style.height = "";
      panel.style.overflow = "";
      delete panel.dataset.busy;
    });
}

function closeDetails(details: HTMLDetailsElement, reduce: boolean) {
  const panel = panelOf(details);
  if (!panel || !details.open) return;
  if (reduce) {
    details.open = false;
    return;
  }
  const from = panel.scrollHeight;
  void animateHeight(panel, from, 0).then(() => {
    details.open = false;
  });
}

function onSummaryClick(event: React.MouseEvent<HTMLElement>) {
  const details = event.currentTarget.closest("details");
  if (!details) return;
  const panel = panelOf(details);
  if (!panel || panel.dataset.busy === "1") return;
  event.preventDefault();

  const reduce = prefersReduce();
  const opening = !details.open;
  const root = details.parentElement;

  if (!opening) {
    closeDetails(details, reduce);
    return;
  }

  root?.querySelectorAll<HTMLDetailsElement>("details[open]").forEach((other) => {
    if (other !== details) closeDetails(other, reduce);
  });

  details.open = true;
  if (reduce) return;
  panel.style.height = "0px";
  void animateHeight(panel, 0, panel.scrollHeight);
}

export function ServicesPit({
  skip = false,
}: {
  skip?: boolean;
}) {
  const Tag = skip ? "main" : "div";

  return (
    <Tag className="a-pit" id={skip ? "content" : undefined}>
      {skip ? <h1 className="sec">Services</h1> : <h2 className="sec">Services</h2>}
      {services.map((item, i) => (
        <details key={item.n} open={i === 0 ? true : undefined}>
          <summary onClick={onSummaryClick}>
            <span className="n">{item.n}</span>
            <span className="t">{item.title}</span>
          </summary>
          <div className="reveal">
            <p className="body">{item.body}</p>
            {item.n === "05" ? (
              <Photo
                className="strip"
                src={photos.pitBottle}
                alt="On-track support in the pit lane"
                sizes="100vw"
              />
            ) : null}
          </div>
        </details>
      ))}
    </Tag>
  );
}
