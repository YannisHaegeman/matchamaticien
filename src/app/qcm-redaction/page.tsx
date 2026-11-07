import type { Metadata } from "next";
import { redactionQcmQuestions } from "@/lib/qcm/data/redaction";
import { QcmPlayer } from "@/components/qcm/QcmPlayer";

export const metadata: Metadata = {
  title: "QCM : rédaction mathématique",
  description:
    "Un QCM pour s'entraîner à repérer les bonnes et les mauvaises rédactions mathématiques, exemple par exemple.",
};

export default function QcmRedactionPage() {
  // QcmPlayer est un composant client qui rend lui-même le
  // Markdown/LaTeX de chaque champ (via MathAnswer, comme l'aperçu de
  // réponse tapée dans FlashCard) : pas besoin de pré-rendu MDX côté
  // serveur ici (voir src/types/qcm.ts).
  return <QcmPlayer questions={redactionQcmQuestions} />;
}
