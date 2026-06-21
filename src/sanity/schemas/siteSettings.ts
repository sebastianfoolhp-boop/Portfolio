import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "tagline", title: "Home tagline", type: "string" }),
    defineField({ name: "heroCopy", title: "Home hero copy", type: "string" }),
    defineField({ name: "aboutHeading", title: "About heading", type: "string" }),
    defineField({ name: "aboutBody", title: "About body", type: "text" }),
    defineField({ name: "linkedinUrl", title: "LinkedIn URL", type: "url" }),
    defineField({ name: "instagramUrl", title: "Instagram URL", type: "url" }),
    defineField({ name: "email", title: "Email address", type: "string" }),
  ],
  preview: { prepare() { return { title: "Site Settings" }; } },
});
