// seo.js

/**
 * Generate metadata for a page
 */
export function generateMeta({ title, description, image, url }) {
  return {
    title: title ? `${title} | DOT` : "DOT — We make things that matter.",
    description: description || "DOT is a creative studio.",
    openGraph: {
      title,
      description,
      images: image ? [{ url: image }] : [],
      url,
    },
  };
}
