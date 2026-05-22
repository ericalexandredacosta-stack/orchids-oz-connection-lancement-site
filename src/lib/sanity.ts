import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "bvijbnif",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-05-22",
  useCdn: true,
  perspective: "published",
});

export type Job = {
  _id: string;
  titleEN: string;
  titleFR: string;
  slug: string;
  status: "open" | "filled" | "closed";
  trade?: string;
  suburb?: string;
  startDate?: string;
  durationDays?: number;
  dailyRate?: number;
  descriptionEN: string;
  descriptionFR: string;
  requirementsEN?: string[];
  requirementsFR?: string[];
  requiresWhiteCard?: boolean;
  requiredPPE?: ("hardhat" | "steelcap" | "highvis")[];
  requiresVehicle?: boolean;
  publishedAt?: string;
};

const jobProjection = `{
  _id,
  titleEN,
  titleFR,
  "slug": slug.current,
  status,
  trade,
  suburb,
  startDate,
  durationDays,
  dailyRate,
  descriptionEN,
  descriptionFR,
  requirementsEN,
  requirementsFR,
  requiresWhiteCard,
  requiredPPE,
  requiresVehicle,
  publishedAt
}`;

export async function listJobs(): Promise<Job[]> {
  return sanityClient.fetch(
    `*[_type == "job" && status == "open"] | order(publishedAt desc) ${jobProjection}`,
    {},
    { next: { revalidate: 60 } }
  );
}

export async function listJobSlugs(): Promise<string[]> {
  return sanityClient.fetch(
    `*[_type == "job" && defined(slug.current)].slug.current`,
    {},
    { next: { revalidate: 300 } }
  );
}

export async function getJobBySlug(slug: string): Promise<Job | null> {
  return sanityClient.fetch(
    `*[_type == "job" && slug.current == $slug][0] ${jobProjection}`,
    { slug },
    { next: { revalidate: 60 } }
  );
}
