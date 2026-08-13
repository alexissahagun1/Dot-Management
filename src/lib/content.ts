export const site = {
  name: "DOT Management",
  email: "info@dotsportsmanagement.com",
  instagram: {
    handle: "@dotmanagement_",
    href: "https://instagram.com/dotmanagement_",
  },
  description:
    "Driver management. Founded 2020. We take the seat — karting to GT3.",
  base: "Bologna · Mexico",
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
] as const;

export const home = {
  h1: ["Driver", "management."] as const,
  quote: "Timing is everything.",
  cta: "Send a briefing →",
  proof: "Founded 2020 · We take the seat.",
  photoAlt: "Raúl Guzmán, Formula Renault 85, Monaco",
} as const;

export const house = {
  h2: "The house.",
  lead: "Bologna · Mexico.",
  body: "A driver-management house for careers that start in karting and have to arrive in GT3 with the seat still making sense. Italian F4, third, 2016 — the house starts from that kind of year, not from a roster. Contract, calendar, coaching, partners, commercial — and the radio when the lights go out.",
  path: "Karting → F4 → Formula Renault → Super Trofeo → GT3",
  stills: [
    {
      src: "/images/nav-kart.jpg",
      alt: "Karting, checkered flag",
      cap: "Karting",
    },
    {
      src: "/images/home-monaco.jpg",
      alt: "Formula Renault, Monaco",
      cap: "Formula Renault · Monaco",
    },
    {
      src: "/images/nav-gt3.jpg",
      alt: "Lamborghini Huracán GT3",
      cap: "Huracán GT3",
    },
  ],
} as const;

export const about = {
  h1: "Raúl Guzmán Marchina",
  bio: "Mexican racing driver, based in Bologna. Karting into Italian F4 — third in 2016 with DR Formula — then Formula Renault, Formula Regional, Lamborghini Super Trofeo Europe and Italian GT. Lamborghini Squadra Corse Driver Academy and instructor from 2020, the year he founded DOT Management.",
  photoAlt: "Raúl Guzmán in the paddock, Barcelona 2019",
  film: [
    {
      src: "/images/about-f4.jpg",
      alt: "Raúl Guzmán, Italian F4 — helmet and pole-position wheel",
      cap: "Italian F4 · 2016",
    },
    {
      src: "/images/about-track.jpg",
      alt: "Raúl Guzmán with a Lamborghini Huracán on track",
      cap: "Squadra Corse · 2020",
    },
  ],
  career: [
    { cat: "Karting", where: "SKUSA" },
    { cat: "Italian F4", where: "3rd · 2016" },
    { cat: "Formula Renault", where: "Eurocup · 2017–18" },
    { cat: "Formula Regional", where: "6th · 2019" },
    { cat: "Super Trofeo Europe", where: "Target · 2020" },
    { cat: "Squadra Corse", where: "Academy · 2020" },
    { cat: "Italian GT", where: "Imperiale · 2022–23" },
  ],
} as const;

export const services = [
  {
    n: "01",
    title: "Driver Management",
    body: "Seat, contract, calendar. Which championship, which team, which year — and when to wait. The decisions that keep a driver in the right car at the right time.",
  },
  {
    n: "02",
    title: "Driver Coaching",
    body: "On-track and simulator. Data, video, the line and the brake point. The call on the radio that wins the session.",
  },
  {
    n: "03",
    title: "Performance Partners",
    body: "Engineer, physio, mental performance. Briefed, and in the same loop as the driver.",
  },
  {
    n: "04",
    title: "Branding & Commercial",
    body: "Image, partners, and the long commercial path of a career — so the seat still exists next season.",
  },
  {
    n: "05",
    title: "On-Track Support",
    body: "Paddock, pit and radio. We are there when the session starts — bottle, data, and the call from the wall.",
  },
] as const;

export const contact = {
  h1: "Send a briefing.",
  note: "A name, a series, and where the seat needs to go. We read every one.",
  reply: "Reply from Bologna. Usually inside a day.",
  photoAlt: "On-track support in the pit lane",
} as const;
