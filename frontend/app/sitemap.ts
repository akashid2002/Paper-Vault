import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://pyqpapers.vercel.app",
      lastModified: new Date(),
    },
    {
      url: "https://pyqpapers.vercel.app/browse",
      lastModified: new Date(),
    },
    {
      url: "https://pyqpapers.vercel.app/upload",
      lastModified: new Date(),
    },
  ];
}
