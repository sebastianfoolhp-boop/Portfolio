import { defineField, defineType } from "sanity";

export const galleryImage = defineType({
  name: "galleryImage",
  title: "Gallery Photo",
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({ name: "alt", title: "Caption / Alt text", type: "string" }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: ["Photography", "Cinematography"], layout: "radio" },
      initialValue: "Photography",
    }),
    defineField({
      name: "aspect",
      title: "Orientation",
      type: "string",
      options: { list: [{ title: "Landscape", value: "landscape" }, { title: "Portrait", value: "portrait" }], layout: "radio" },
      initialValue: "landscape",
    }),
    defineField({ name: "order", title: "Order (lower = first)", type: "number", initialValue: 99 }),
  ],
  orderings: [{ title: "Manual order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "alt", media: "image", subtitle: "category" },
    prepare({ title, media, subtitle }) {
      return { title: title || "Untitled photo", media, subtitle };
    },
  },
});
