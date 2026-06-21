import { defineField, defineType } from "sanity";

export const audioSet = defineType({
  name: "audioSet",
  title: "DJ Set / Mix",
  type: "document",
  fields: [
    defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "sublabel", title: "Genre / Style", type: "string" }),
    defineField({ name: "duration", title: "Duration", type: "string", description: "e.g. 1h 12m" }),
    defineField({ name: "embedCode", title: "Embed Code (SoundCloud / Spotify / etc.)", type: "text",
      description: "Paste the full <iframe> embed code here" }),
    defineField({ name: "order", title: "Order (lower = first)", type: "number", initialValue: 99 }),
  ],
  orderings: [{ title: "Manual order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "label", subtitle: "sublabel" },
    prepare({ title, subtitle }) { return { title: title || "Untitled set", subtitle }; },
  },
});
