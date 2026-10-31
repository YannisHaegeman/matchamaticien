export type SatisfactionReel = {
  code: string; // R01..R14, matches /satisfaction/videos/{code}.mp4 and /satisfaction/posters/{code}.jpg
  series: string;
  episode: string; // "1/3", "2/2"...
  title: string;
};

export type SatisfactionSeries = {
  name: string;
  reels: SatisfactionReel[];
};

/**
 * Les 14 reels de révision (algèbre linéaire), groupés par série.
 * Simple liste statique : pas de contenu MDX à pré-rendre ici, juste
 * des titres et des fichiers vidéo servis depuis /public.
 */
const RAW: SatisfactionReel[] = [
  { code: "R01", series: "Polynômes", episode: "1/3", title: "Diviser des polynômes" },
  { code: "R02", series: "Polynômes", episode: "2/3", title: "Compter les racines" },
  { code: "R03", series: "Polynômes", episode: "3/3", title: "Racines complexes" },
  { code: "R04", series: "Familles et bases", episode: "1/2", title: "Familles libres et bases" },
  { code: "R05", series: "Familles et bases", episode: "2/2", title: "Trouver une base en pratique" },
  { code: "R06", series: "Somme directe", episode: "1/3", title: "Somme de sous-espaces" },
  { code: "R07", series: "Somme directe", episode: "2/3", title: "Supplémentaires" },
  { code: "R08", series: "Somme directe", episode: "3/3", title: "Projections" },
  { code: "R09", series: "Applications linéaires", episode: "1/3", title: "Noyau et image" },
  { code: "R10", series: "Applications linéaires", episode: "2/3", title: "Le théorème du rang" },
  { code: "R11", series: "Applications linéaires", episode: "3/3", title: "Injective, surjective, bijective" },
  { code: "R12", series: "Matrices", episode: "1/3", title: "Matrices et composition" },
  { code: "R13", series: "Matrices", episode: "2/3", title: "Changer de base" },
  { code: "R14", series: "Matrices", episode: "3/3", title: "Endomorphismes et trace" },
];

export function getSatisfactionSeries(): SatisfactionSeries[] {
  const bySeries = new Map<string, SatisfactionReel[]>();
  for (const reel of RAW) {
    const list = bySeries.get(reel.series) ?? [];
    list.push(reel);
    bySeries.set(reel.series, list);
  }
  return Array.from(bySeries.entries()).map(([name, reels]) => ({ name, reels }));
}

export function getAllSatisfactionReels(): SatisfactionReel[] {
  return RAW;
}
