import cortes from "../../public/images/cortes.jpg";
import curbJump from "../../public/images/curb-jump.jpg";
import delatorrePaddock from "../../public/images/delatorre-paddock.jpg";
import efoOne from "../../public/images/efo-one.jpg";
import efoTrophy from "../../public/images/efo-trophy.jpg";
import f4Chase from "../../public/images/f4-chase.jpg";
import f4Wheel from "../../public/images/f4-wheel.jpg";
import goldenHour from "../../public/images/golden-hour.jpg";
import gridWalk from "../../public/images/grid-walk.jpg";
import gt3 from "../../public/images/gt3.jpg";
import halo from "../../public/images/halo.jpg";
import kartFinish from "../../public/images/kart-finish.jpg";
import kartPodium from "../../public/images/kart-podium.jpg";
import misanoPodium from "../../public/images/misano-podium.jpg";
import monaco from "../../public/images/monaco.jpg";
import monzaHug from "../../public/images/monza-hug.jpg";
import monzaPodium from "../../public/images/monza-podium.jpg";
import paddockWalk from "../../public/images/paddock-walk.jpg";
import paddock from "../../public/images/paddock.jpg";
import parcFerme from "../../public/images/parc-ferme.jpg";
import pitBottle from "../../public/images/pit-bottle.jpg";
import podiumPerez from "../../public/images/podium-perez.jpg";
import portraitPit from "../../public/images/portrait-pit.jpg";
import renaultAerial from "../../public/images/renault-aerial.jpg";
import renaultPan from "../../public/images/renault-pan.jpg";
import squadraWin from "../../public/images/squadra-win.jpg";
import tecnica from "../../public/images/tecnica.jpg";
import telmexWin from "../../public/images/telmex-win.jpg";

export const photos = {
  kartFinish,
  kartPodium,
  tecnica,
  renaultAerial,
  gt3,
  podiumPerez,
  cortes,
  portraitPit,
  efoTrophy,
  delatorrePaddock,
  halo,
  renaultPan,
  squadraWin,
  parcFerme,
  gridWalk,
  misanoPodium,
  efoOne,
  f4Wheel,
  paddockWalk,
  monzaHug,
  monzaPodium,
  f4Chase,
  telmexWin,
  goldenHour,
  curbJump,
  pitBottle,
  monaco,
  paddock,
} as const;

export const houseStills = [
  { src: photos.kartPodium, alt: "SKUSA SuperNats podium", cap: "Karting" },
  { src: photos.monaco, alt: "Formula Renault, Monaco", cap: "Monaco" },
  { src: photos.gt3, alt: "Lamborghini Huracán GT3", cap: "GT3" },
] as const;

export const raulShot = {
  src: photos.paddock,
  alt: "Raul Guzman in the paddock",
} as const;

export const raulFilm = [
  { src: photos.f4Wheel, alt: "Italian F4 — helmet and wheel", cap: "Italian F4" },
  { src: photos.halo, alt: "Into the cockpit", cap: "Cockpit" },
] as const;

export const lane = [
  { src: photos.tecnica, alt: "Huracán Tecnica" },
  { src: photos.renaultAerial, alt: "Formula Renault, overhead" },
  { src: photos.portraitPit, alt: "Pit lane" },
  { src: photos.cortes, alt: "Podium with N. Cortés" },
  { src: photos.renaultPan, alt: "Formula Regional on track" },
  { src: photos.squadraWin, alt: "Lamborghini Squadra Corse" },
  { src: photos.monzaHug, alt: "Monza" },
  { src: photos.monzaPodium, alt: "Italian F4 podium, Monza" },
  { src: photos.parcFerme, alt: "Parc fermé" },
  { src: photos.efoTrophy, alt: "Euroformula Open" },
  { src: photos.efoOne, alt: "Euroformula Open — P1" },
  { src: photos.gridWalk, alt: "On-track support, Paul Ricard" },
  { src: photos.misanoPodium, alt: "Italian F4, Misano" },
  { src: photos.paddockWalk, alt: "Paddock walk" },
  { src: photos.f4Chase, alt: "Italian F4 on track" },
  { src: photos.goldenHour, alt: "Golden hour" },
  { src: photos.curbJump, alt: "Over the kerb" },
  { src: photos.podiumPerez, alt: "Podium" },
  { src: photos.telmexWin, alt: "After the session" },
  { src: photos.delatorrePaddock, alt: "On-track support in the paddock" },
] as const;

export const videos = {
  track: {
    src: "/video/track.mp4",
    poster: "/images/track-poster.jpg",
    label: "On track",
  },
  replay: {
    src: "/video/replay.mp4",
    poster: "/images/replay-poster.jpg",
    label: "Session replay",
  },
  onboard: {
    src: "/video/onboard.mp4",
    poster: "/images/onboard-poster.jpg",
    label: "Onboard",
  },
} as const;
