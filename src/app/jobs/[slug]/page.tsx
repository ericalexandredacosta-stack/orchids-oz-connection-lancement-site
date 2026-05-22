import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getJobBySlug, listJobSlugs } from "@/lib/sanity";
import JobDetailClient from "@/components/JobDetailClient";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await listJobSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job) return { title: "Job not found" };
  const title = job.titleEN;
  const description =
    job.descriptionEN.length > 160
      ? job.descriptionEN.slice(0, 157) + "..."
      : job.descriptionEN;
  return {
    title,
    description,
    alternates: { canonical: `/jobs/${slug}` },
    openGraph: {
      title: `${title} | OZ Connection`,
      description,
      url: `https://www.oz-connection.com/jobs/${slug}`,
    },
  };
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job) notFound();
  return <JobDetailClient job={job} />;
}
