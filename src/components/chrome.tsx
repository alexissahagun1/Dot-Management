"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { Photo } from "@/components/photo";
import { pathBoard, useSection, type Board } from "@/components/section-context";
import { useChromeBoard } from "@/components/site-scroll";
import { nav, site } from "@/lib/content";
import { photos } from "@/lib/photos";

function Lockup({ ink }: { ink: boolean }) {
  return (
    <Image
      src={ink ? "/logo-ink.png" : "/logo.png"}
      alt={site.name}
      width={946}
      height={421}
      className="lockup"
      priority
      sizes="170px"
      quality={75}
    />
  );
}

function focusables(root: ParentNode) {
  return [
    ...root.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
    ),
  ].filter((el) => el.offsetParent !== null && !el.closest("[inert]"));
}

export function Chrome() {
  const pathname = usePathname();
  const { board, currentHref } = useSection();
  useChromeBoard();
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);
  const firstLink = useRef<HTMLAnchorElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
    setShown(false);
  }

  const onPaper = board === "about";
  const lockupInk = shown ? false : !onPaper;

  function scrollToBoard(name: Board) {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.querySelector(`[data-board="${name}"]`)?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
      inline: "nearest",
    });
  }

  function goHome() {
    setOpen(false);
    setShown(false);
    document.body.classList.remove("menu-open");
    document.documentElement.classList.remove("menu-open");
    if (pathname === "/") {
      requestAnimationFrame(() => scrollToBoard("home"));
    }
  }

  useEffect(() => {
    const page = document.getElementById("page");
    document.body.classList.toggle("menu-open", shown);
    document.documentElement.classList.toggle("menu-open", shown);
    if (shown) {
      page?.setAttribute("inert", "");
    } else {
      page?.removeAttribute("inert");
    }
    document.documentElement.dataset.surface =
      onPaper && !shown ? "paper" : "carbon";
    return () => {
      document.body.classList.remove("menu-open");
      document.documentElement.classList.remove("menu-open");
      page?.removeAttribute("inert");
      delete document.documentElement.dataset.surface;
    };
  }, [shown, onPaper]);

  useEffect(() => {
    if (open) firstLink.current?.focus();
  }, [open]);

  useEffect(() => {
    if (open || !shown) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = window.setTimeout(() => setShown(false), reduce ? 0 : 180);
    return () => window.clearTimeout(t);
  }, [open, shown]);

  useEffect(() => {
    if (!shown) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        toggle.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const chrome = document.querySelector(".chrome");
      const menu = document.getElementById("site-menu");
      if (!chrome || !menu) return;
      const nodes = [...focusables(chrome), ...focusables(menu)];
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [shown]);

  return (
    <>
      <header className={onPaper && !shown ? "chrome is-paper" : "chrome"}>
        <Link className="brand" href="/" transitionTypes={["nav-back"]} onClick={goHome}>
          {shown ? (
            <picture>
              <source media="(max-width: 760px)" srcSet="/logo-ink.png" />
              <img
                className="lockup"
                src="/logo.png"
                alt={site.name}
                width={946}
                height={421}
              />
            </picture>
          ) : (
            <Lockup ink={lockupInk} />
          )}
        </Link>
        <button
          ref={toggle}
          className={[
            "ham",
            open ? "is-open" : "",
            onPaper && !shown ? "is-dark" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          type="button"
          aria-expanded={shown}
          aria-haspopup="dialog"
          aria-controls="site-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => {
            if (open) setOpen(false);
            else {
              setShown(true);
              setOpen(true);
            }
          }}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {shown ? (
        <div
          className={open ? "menu-layer a-overlay" : "menu-layer a-overlay is-closing"}
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
        >
          <h2 id={titleId} className="hp">
            Menu
          </h2>
          <div className="a-stills" aria-hidden="true">
            <Photo src={photos.monaco} alt="" sizes="38vw" quality={75} />
            <Photo src={photos.gt3} alt="" sizes="38vw" quality={75} />
            <Photo src={photos.tecnica} alt="" sizes="38vw" quality={75} />
          </div>
          <nav className="a-nav" aria-label="Primary">
            <div className="links">
              {nav.map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  transitionTypes={item.href === "/" ? ["nav-back"] : ["nav-forward"]}
                  aria-current={currentHref === item.href ? "page" : undefined}
                  ref={i === 0 ? firstLink : undefined}
                  onClick={(e) => {
                    if (pathname === "/") {
                      e.preventDefault();
                      const name = pathBoard(item.href);
                      setOpen(false);
                      setShown(false);
                      document.body.classList.remove("menu-open");
                      document.documentElement.classList.remove("menu-open");
                      document.getElementById("page")?.removeAttribute("inert");
                      requestAnimationFrame(() => scrollToBoard(name));
                    }
                    setOpen(false);
                    toggle.current?.focus();
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <p className="foot">
              <a
                href={site.instagram.href}
                rel="noopener noreferrer"
                target="_blank"
              >
                {site.instagram.handle}
              </a>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          </nav>
        </div>
      ) : null}
    </>
  );
}
