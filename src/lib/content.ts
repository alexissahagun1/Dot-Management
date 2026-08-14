export const site = {
  name: "DOT Management",
  email: "info@dotsportsmanagement.com",
  instagram: {
    handle: "@dotmanagement_",
    href: "https://instagram.com/dotmanagement_",
  },
  description:
    "Drivers Of Tomorrow. Driver management from karting to the highest levels of motorsport.",
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
] as const;

export const home = {
  h1: "Drivers Of Tomorrow",
  quote: "Timing is everything.",
  cta: "Contact us →",
  photoAlt: "Karting — checkered flag",
} as const;

export const house = {
  h2: "About DOT",
  raul: "About Raul",
  dot: [
    "DOT Management is a leading driver management company based in Europe with experience ranging from karting to the highest levels of motorsport, supported by a strong international network. Founded and led by Raul Guzman, DOT works together with a team of experienced advisors, including key figures from Formula 1, the Road to F1 championships, and other major international racing series including sports car racing. Together, they provide guidance, strategic support, and performance development to help talented drivers build and progress their careers.",
    "DOT's approach is focused on identifying every possible opportunity and ensuring that no aspect of a driver's development is overlooked. From young talents taking their first steps in motorsport to established professionals, the goal is to maximise both performance and career potential at every stage.",
    "The team combines extensive experience from within motorsport with expertise from outside the industry, allowing DOT to offer a broader range of services to its drivers. This includes career development, legal advisory, networking, and driver coaching, providing a complete approach to driver management and development.",
  ],
  raulBody: [
    "Raul Guzman has been working as a professional driver and manager in Europe for the last 12 years. DOT Management was founded by Raul in 2020 alongside his driving duties to support and develop drivers through the motorsport ladder.",
    "Raul became a driver from a young age, experiencing all the different aspects the sport involves, from driving great amount of cars, fighting for championships through international karting, the formula ladder, GT cars, prototypes and working for Lamborghini for several years. This has given the right experience in the commercial and performance side of the sport. DOT has the motivation and focus to transmit experience and performance in all the aspects to his drivers all the way from karting up to the very top of motorsport.",
    "Working alongside a strong network of advisors and strategic partners, Raul leads DOT with a clear objective: to identify, develop and create new opportunities for the most talented individuals in sport.",
  ],
} as const;

export const services = [
  {
    n: "01",
    title: "Driver Management",
    body: "DOT is built around providing drivers with the support, structure, and connections they need. Racing team contract negotiations to career planning, traveling logistics, access to trusted sports professionals, and an international partners network. The driver can focus on performance while we take care of all the elements surrounding their career.",
  },
  {
    n: "02",
    title: "Driver Coaching",
    body: "Focused on maximizing driver performance through experience and data. Raul, or a trusted driver coach within the DOT partners, works closely with the driver throughout the event, providing support through telemetry analysis, trackside coaching, racecraft, and overall performance development.",
  },
  {
    n: "03",
    title: "Performance Partners",
    body: "Ensuring a complete package we have specialists across different countries, giving our drivers access to the right people wherever their careers take them. This includes training centers, physiotherapists, sports psychologists, and driver academies, providing support both on and off the track. We help drivers build the physical, mental, and technical tools needed to perform at their best.",
  },
  {
    n: "04",
    title: "Brand and Commercial",
    body: "Providing guidance and support across the commercial and brand side of a driver's career, helping with partnerships, events, hospitality, and commercial opportunities. From planning and coordination to on site support, we help drivers and partners make the most of every opportunity.",
  },
  {
    n: "05",
    title: "On Track Support",
    body: "A DOT member will accompany the driver during tests, race weekends, and selected events, providing hands on support for personal, driving, and performance needs. Our presence at the track ensures the driver has the right support throughout the event, allowing them to stay focused on performance.",
  },
] as const;

export const contact = {
  h1: "Contact us.",
  reply: "Usually inside a day.",
  photoAlt: "On-track support in the pit lane",
} as const;
