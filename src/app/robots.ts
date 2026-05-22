import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/studio", "/api"] },
      { userAgent: "GPTBot", allow: "/", disallow: ["/studio", "/api"] },
      { userAgent: "ClaudeBot", allow: "/", disallow: ["/studio", "/api"] },
      { userAgent: "PerplexityBot", allow: "/", disallow: ["/studio", "/api"] },
      { userAgent: "Google-Extended", allow: "/", disallow: ["/studio", "/api"] },
      { userAgent: "CCBot", disallow: "/" },
    ],
    sitemap: "https://www.oz-connection.com/sitemap.xml",
    host: "https://www.oz-connection.com",
  };
}
