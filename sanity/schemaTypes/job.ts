import { defineField, defineType } from "sanity";

export const job = defineType({
  name: "job",
  type: "document",
  title: "Job",
  fields: [
    defineField({
      name: "titleEN",
      title: "Title (EN)",
      type: "string",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "titleFR",
      title: "Title (FR)",
      type: "string",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "titleEN", maxLength: 80 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Open", value: "open" },
          { title: "Filled", value: "filled" },
          { title: "Closed", value: "closed" },
        ],
        layout: "radio",
      },
      initialValue: "open",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "trade",
      title: "Trade / Category",
      type: "string",
      options: {
        list: [
          { title: "Construction / Builder", value: "construction" },
          { title: "Landscaping / Gardening", value: "landscaping" },
          { title: "Removals / Moving", value: "removals" },
          { title: "Site cleanup", value: "cleanup" },
          { title: "Labouring / General", value: "labouring" },
          { title: "Painting", value: "painting" },
          { title: "Other", value: "other" },
        ],
      },
    }),
    defineField({
      name: "suburb",
      title: "Suburb",
      type: "string",
      description: "Melbourne suburb (e.g. Brunswick, Fitzroy, Footscray)",
    }),
    defineField({
      name: "startDate",
      title: "Start date",
      type: "date",
    }),
    defineField({
      name: "durationDays",
      title: "Duration (days)",
      type: "number",
      description: "Estimated total days. Leave blank if ongoing / TBD.",
    }),
    defineField({
      name: "dailyRate",
      title: "Daily rate (AUD)",
      type: "number",
      description: "What the backpacker is paid per day. Default is 250.",
      initialValue: 250,
    }),
    defineField({
      name: "descriptionEN",
      title: "Description (EN)",
      type: "text",
      rows: 6,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "descriptionFR",
      title: "Description (FR)",
      type: "text",
      rows: 6,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "requirementsEN",
      title: "Requirements (EN)",
      type: "array",
      of: [{ type: "string" }],
      description: 'Bullet list (e.g. "White Card required", "Min 1 month commitment")',
    }),
    defineField({
      name: "requirementsFR",
      title: "Requirements (FR)",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "requiresWhiteCard",
      title: "White Card required",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "requiredPPE",
      title: "Required PPE",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Hard hat", value: "hardhat" },
          { title: "Steel cap boots", value: "steelcap" },
          { title: "High-vis vest", value: "highvis" },
        ],
      },
    }),
    defineField({
      name: "requiresVehicle",
      title: "Own vehicle required",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "titleEN",
      subtitle: "suburb",
      status: "status",
    },
    prepare(selection) {
      const { title, subtitle, status } = selection as {
        title?: string;
        subtitle?: string;
        status?: string;
      };
      return {
        title: title || "Untitled job",
        subtitle: [status ? "[" + status + "]" : "", subtitle].filter(Boolean).join(" · "),
      };
    },
  },
  orderings: [
    {
      title: "Newest first",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Start date asc",
      name: "startDateAsc",
      by: [{ field: "startDate", direction: "asc" }],
    },
  ],
});
