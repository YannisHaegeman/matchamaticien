/**
 * Types du QCM de rédaction mathématique.
 *
 * Même principe que les flash cards : aucune question n'est codée en
 * dur dans un composant. Les questions vivent dans des objets typés
 * sous src/lib/qcm/, et le lecteur (QcmPlayer, src/components/qcm/)
 * ne fait que les afficher et gérer l'interaction (sélection,
 * validation).
 *
 * Contrairement aux flash cards, le texte n'est pas pré-rendu côté
 * serveur via MDXRemote : les champs ci-dessous ($...$ / $$...$$
 * seulement, pas de Markdown riche) sont rendus directement côté
 * client par QcmPlayer avec MathAnswer (comme l'aperçu de réponse
 * tapée dans FlashCard), ce qui garantit un vrai rendu KaTeX "display"
 * pour les blocs $$...$$, y compris au milieu d'un texte plus long.
 */
export interface QcmOption {
  /** Unique au sein de la question. */
  id: string;
  /** Texte de l'option — $...$ / $$...$$ seulement (voir MathAnswer). */
  text: string;
  /** true si cette rédaction est correcte (une question peut avoir plusieurs bonnes réponses). */
  correct: boolean;
}

export interface QcmQuestion {
  /** Unique sur tout le QCM. */
  id: string;
  /** Regroupement affiché en badge au-dessus de la question (ex. une règle du manuel). */
  section: string;
  /** L'énoncé de la question. */
  prompt: string;
  options: QcmOption[];
  /** Explication affichée après validation, quelle que soit la réponse donnée. */
  explanation: string;
}
