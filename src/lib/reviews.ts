export type Review = {
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  date: string;
  text: string;
  lang?: "FR" | "EN";
};

// Source : Google Business Profile — OZ Connection Melbourne
// Lien public : https://share.google/Ytwopu3UWNU9Mop6h
// Maintenir manuellement depuis la page Google. Texte verbatim (typos inclus).
export const googleReviews: Review[] = [
  {
    author: "Eric Da Costa",
    rating: 5,
    date: "2026-05",
    lang: "FR",
    text: "Je cherchais du travail à Melbourne et un ami m'a passé le numéro de Paul et il m'a aidé a trouver un travail pour quelques jours et m'a aiguillé sur d'autres sujets. Au top",
  },
  {
    author: "Mewen Marous",
    rating: 5,
    date: "2026-05",
    lang: "FR",
    text: "Pour tous les Français en Australie, particulièrement à Melbourne, je vous recommande fortement de passer par Paul pour le travail, trouver une voiture un logement et bien d'autres.",
  },
  {
    author: "Dakika Lou",
    rating: 5,
    date: "2026-05",
    lang: "FR",
    text: "Ça fait maintenant deux ans et demi que je suis en Australie et Paul m'a énormément aidé depuis le début. Il m'a aidé pour trouver du boulot, pour plusieurs démarches et a toujours pris le temps de répondre quand j'avais besoin d'aide.",
  },
  {
    author: "Tiâm Lepêcheux",
    rating: 5,
    date: "2026-05",
    lang: "FR",
    text: "À mon arrivée à Melbourne, je cherchais du travail et Paul m'a aidé à en trouver rapidement. Il a toujours été disponible pour répondre à mes questions, me conseiller.",
  },
  {
    author: "Erwan Richard",
    rating: 5,
    date: "2026-05",
    lang: "EN",
    text: "Paul helped me well when I arrived in Melbourne. Very nice he found me missions and he was very responsive. He also gave me some advice as backpackers it's great",
  },
];

export const GOOGLE_REVIEWS_URL = "https://share.google/Ytwopu3UWNU9Mop6h";

export function formatReviewDate(iso: string, lang: "FR" | "EN"): string {
  const [y, m] = iso.split("-").map(Number);
  if (!y || !m) return iso;
  const d = new Date(y, m - 1);
  return d.toLocaleDateString(lang === "FR" ? "fr-FR" : "en-AU", {
    month: "long",
    year: "numeric",
  });
}
