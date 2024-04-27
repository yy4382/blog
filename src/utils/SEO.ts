import type { SEOProps } from "astro-seo";

export function getSeo(config: {
  title: string;
  description?: string;
  image?: string;
  type?: string;
  noindex?: boolean;
}): SEOProps {
  const {
    title,
    description,
    image = "https://yfi.moe/icon-512.png",
    type = "website",
    noindex = false,
  } = config;

  return {
    title,
    description,
    openGraph: {
      basic: {
        type,
        title,
        image,
      },
    },
    noindex,
    twitter: {
      creator: "@yunfini",
      card: config.image ? "summary_large_image" : "summary",
      image,
      title,
      description,
    },
  };
}
