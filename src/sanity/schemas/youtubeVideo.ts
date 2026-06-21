import { defineField, defineType } from "sanity";

export const youtubeVideo = defineType({
  name: "youtubeVideo",
  title: "YouTube Video",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "videoId", title: "YouTube Video ID", type: "string",
      description: "The part after ?v= in the YouTube URL", validation: (r) => r.required() }),
    defineField({
      name: "page",
      title: "Page",
      type: "string",
      options: { list: [{ title: "Audio", value: "audio" }, { title: "Visual", value: "visual" }], layout: "radio" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "label", title: "Label (optional)", type: "string",
      description: "Short genre/style tag shown on the card" }),
    defineField({ name: "order", title: "Order (lower = first)", type: "number", initialValue: 99 }),
  ],
  preview: {
    select: { title: "title", subtitle: "page" },
    prepare({ title, subtitle }) {
      return { title: title || "Untitled video", subtitle: subtitle === "audio" ? "Audio page" : "Visual page" };
    },
  },
});
