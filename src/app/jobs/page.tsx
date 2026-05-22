import type { Metadata } from "next";
import { listJobs } from "@/lib/sanity";
import JobsListClient from "@/components/JobsListClient";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Jobs in Melbourne for backpackers",
  description:
    "Open jobs posted via OZ Connection: builders, tradies and small businesses in Melbourne looking for motivated backpackers. Apply in a few minutes.",
  alternates: { canonical: "/jobs" },
  openGraph: {
    title: "Jobs in Melbourne for backpackers | OZ Connection",
    description:
      "Open jobs posted via OZ Connection: builders and tradies in Melbourne looking for motivated backpackers.",
    url: "https://www.oz-connection.com/jobs",
  },
};

export default async function JobsPage() {
  const jobs = await listJobs();
  return <JobsListClient jobs={jobs} />;
}
