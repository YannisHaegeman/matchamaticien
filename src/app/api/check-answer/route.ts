import { NextResponse } from "next/server";
import { getDeck } from "@/lib/flashcards";

export const runtime = "nodejs";

const MAX_ANSWER_LENGTH = 4000;

// gemini-3.5-flash-lite : modèle Gemini le plus léger, dans le palier
// gratuit de l'API (console : aistudio.google.com -> Get API key).
// Pas de carte bancaire requise pour ce palier ; en contrepartie,
// Google peut utiliser les requêtes du palier gratuit pour améliorer
// ses modèles (voir ai.google.dev/gemini-api/docs/pricing).
const MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";

const RESPONSE_SCHEMA = {
  type: "OBJECT",
  properties: {
    verdict: {
      type: "STRING",
      enum: ["correct", "partiel", "incorrect"],
      description:
        "'correct' si la réponse est juste et complète, 'partiel' si l'idée ou le résultat est bon mais la rédaction/la justification est incomplète ou imprécise, 'incorrect' sinon.",
    },
    feedback: {
      type: "STRING",
      description:
        "2 à 4 phrases en français, qui tutoient l'étudiant, bienveillantes mais précises mathématiquement : ce qui est juste, ce qui manque ou est faux, et une piste si besoin. Ne pas simplement recopier le corrigé officiel mot à mot.",
    },
  },
  required: ["verdict", "feedback"],
};

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "Clé GEMINI_API_KEY manquante côté serveur : ajoute-la dans .env.local puis redémarre `npm run dev`.",
      },
      { status: 500 },
    );
  }

  let body: { deckId?: unknown; cardId?: unknown; userAnswer?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const { deckId, cardId, userAnswer } = body;
  if (
    typeof deckId !== "string" ||
    typeof cardId !== "string" ||
    typeof userAnswer !== "string" ||
    !userAnswer.trim()
  ) {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }
  if (userAnswer.length > MAX_ANSWER_LENGTH) {
    return NextResponse.json({ error: "Réponse trop longue." }, { status: 400 });
  }

  const deck = getDeck(deckId);
  const card = deck?.cards.find((c) => c.id === cardId);
  if (!deck || !card) {
    return NextResponse.json({ error: "Carte introuvable." }, { status: 404 });
  }

  const promptParts = [
    card.context ? `Contexte : ${card.context}` : null,
    `Question : ${card.question}`,
    `Corrigé officiel : ${card.answer}`,
    card.remark ? `Remarque associée au corrigé : ${card.remark}` : null,
    `Réponse de l'étudiant : ${userAnswer.trim()}`,
  ].filter(Boolean);

  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: {
            parts: [
              {
                text: "Tu es un correcteur de mathématiques (niveau prépa/licence) rigoureux et bienveillant. On te donne une question de probabilités, son corrigé officiel, et la réponse rédigée par un·e étudiant·e. Évalue cette réponse par rapport au corrigé : juge le fond mathématique (raisonnement, résultat), pas la mise en forme. Réponds uniquement avec le JSON demandé.",
              },
            ],
          },
          contents: [{ role: "user", parts: [{ text: promptParts.join("\n\n") }] }],
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: RESPONSE_SCHEMA,
            maxOutputTokens: 500,
          },
        }),
      },
    );

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      console.error("[check-answer] erreur Gemini :", geminiRes.status, errText);
      return NextResponse.json(
        { error: "La correction IA a échoué, réessaie dans un instant." },
        { status: 502 },
      );
    }

    const data = await geminiRes.json();
    const text: string | undefined = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      console.error("[check-answer] réponse Gemini vide :", JSON.stringify(data));
      return NextResponse.json(
        { error: "Réponse de l'IA illisible, réessaie." },
        { status: 502 },
      );
    }

    let parsed: { verdict?: string; feedback?: string };
    try {
      parsed = JSON.parse(text);
    } catch {
      console.error("[check-answer] JSON invalide reçu de Gemini :", text);
      return NextResponse.json(
        { error: "Réponse de l'IA illisible, réessaie." },
        { status: 502 },
      );
    }

    if (!parsed.verdict || !parsed.feedback) {
      return NextResponse.json(
        { error: "Réponse de l'IA incomplète, réessaie." },
        { status: 502 },
      );
    }

    return NextResponse.json({ verdict: parsed.verdict, feedback: parsed.feedback });
  } catch (error) {
    console.error("[check-answer] erreur :", error);
    return NextResponse.json(
      { error: "La correction IA a échoué, réessaie dans un instant." },
      { status: 502 },
    );
  }
}
