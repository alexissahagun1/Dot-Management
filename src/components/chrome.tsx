"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { pathBoard, useSection, type Board } from "@/components/section-context";
import { useChromeBoard } from "@/components/site-scroll";
import { nav, site } from "@/lib/content";

function Lockup({ ink }: { ink: boolean }) {
  return (
    <Image
      src={ink ? "/logo-ink.png" : "/logo.png"}
      alt={site.name}
      width={946}
      height={421}
      className="lockup"
      priority
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

  const onCarbon =
    board === "services" ||
    board === "contact" ||
    board === "house" ||
    board === "film" ||
    (pathname !== "/" && pathname !== "/about");
  const onAbout = board === "about";
  const lockupInk = shown ? false : onCarbon;

  function scrollToBoard(name: Board) {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.querySelector(`[data-board="${name}"]`)?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
    });
  }

  function goHome() {
    setOpen(false);
    if (pathname === "/") scrollToBoard("home");
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
      onAbout && !shown ? "paper" : "carbon";
    return () => {
      document.body.classList.remove("menu-open");
      document.documentElement.classList.remove("menu-open");
      page?.removeAttribute("inert");
      delete document.documentElement.dataset.surface;
    };
  }, [shown, onAbout]);

  useEffect(() => {
    if (open) firstLink.current?.focus();
  }, [open]);

  useEffect(() => {
    if (open) {
      setShown(true);
      return;
    }
    if (!shown) return;
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
      <header className={onAbout && !shown ? "chrome is-paper" : "chrome"}>
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
            onAbout && !shown ? "is-dark" : "",
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
            <Image
              src="/images/home-monaco.jpg"
              alt=""
              width={2000}
              height={1333}
              sizes="38vw"
            />
            <Image
              src="/images/nav-kart.jpg"
              alt=""
              width={2000}
              height={1333}
              sizes="38vw"
            />
            <Image
              src="/images/nav-gt3.jpg"
              alt=""
              width={2000}
              height={1333}
              sizes="38vw"
            />
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
                      scrollToBoard(pathBoard(item.href));
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
