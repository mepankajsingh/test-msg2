export function generateMetaTags({
  title = "Supabase SSR Demo",
  description = "A demo of Supabase with SSR in Remix",
  image = "/og-image.png",
  url = "https://supabase-ssr-demo.vercel.app",
}) {
  return [
    { title },
    { name: "description", content: description },
    
    // Open Graph / Facebook
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: image },
    
    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:url", content: url },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
  ];
}
