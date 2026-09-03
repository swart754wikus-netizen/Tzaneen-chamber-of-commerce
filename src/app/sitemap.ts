import type { MetadataRoute } from "next";

const baseUrl = "https://tzaneen-chamber-of-commerce.vercel.app";

// Static Phase 1/2 routes only. /events/[id] and /documents/[id] are
// omitted — their content is admin-managed in Firestore and not knowable
// at build time, and generally shouldn't be indexed on their own anyway.
const staticRoutes = [
  "",
  "/about",
  "/directory",
  "/invest",
  "/events",
  "/articles",
  "/exco",
  "/certificate-of-origin",
  "/awards",
  "/contact",
  "/apply",
  "/documents",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
