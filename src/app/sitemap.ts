import type { MetadataRoute } from "next";
import { getAllMathThemes, resultHref } from "@/lib/mathmap";
import { getAllDeckMetas } from "@/lib/flashcards";

const siteUrl = "https://matchamaticien.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    {
      url: `${siteUrl}/carte-des-maths`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/carte-des-maths/graphe`,
      changeFrequency: "weekly",
      priority: 0.5,
    },
    { url: `${siteUrl}/flashcards`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/a-propos`, changeFrequency: "monthly", priority: 0.4 },
  ];

  const mathThemes = getAllMathThemes();
  const mathThemeRoutes: MetadataRoute.Sitemap = mathThemes.map((theme) => ({
    url: `${siteUrl}/carte-des-maths/${theme.id}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));
  const mathSubtopicRoutes: MetadataRoute.Sitemap = mathThemes.flatMap((theme) =>
    theme.subtopics.map((subtopic) => ({
      url: `${siteUrl}/carte-des-maths/${theme.id}/${subtopic.id}`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }))
  );
  const mathResultRoutes: MetadataRoute.Sitemap = mathThemes.flatMap((theme) =>
    theme.subtopics.flatMap((subtopic) =>
      subtopic.results.map((result) => ({
        url: `${siteUrl}${resultHref({
          themeId: theme.id,
          subtopicId: subtopic.id,
          id: result.id,
        })}`,
        changeFrequency: "monthly" as const,
        priority: 0.5,
      }))
    )
  );

  const flashDeckRoutes: MetadataRoute.Sitemap = getAllDeckMetas().map(
    (deck) => ({
      url: `${siteUrl}/flashcards/${deck.id}`,
      changeFrequency: "weekly",
      priority: 0.6,
    })
  );

  return [
    ...staticRoutes,
    ...mathThemeRoutes,
    ...mathSubtopicRoutes,
    ...mathResultRoutes,
    ...flashDeckRoutes,
  ];
}
