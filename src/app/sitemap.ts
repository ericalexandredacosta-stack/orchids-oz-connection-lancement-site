import type { MetadataRoute } from "next";
import { listJobSlugs } from "@/lib/sanity";

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://www.oz-connection.com";
  const now = new Date();

  let jobSlugs: string[] = [];
  try {
    jobSlugs = await listJobSlugs();
  } catch {
    jobSlugs = [];
  }

  const jobUrls: MetadataRoute.Sitemap = jobSlugs.map((slug) => ({
    url: `${base}/jobs/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${base}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/packages`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/jobs`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${base}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/pro`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    ...jobUrls,
  ];
}
