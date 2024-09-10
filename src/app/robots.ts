import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: [
          "/dashboard/*",
          "/dashboardSuplier/*",
          "/estafeta/*",
          "/pickup/*",
        ],
      },
    ],
    sitemap: `${process.env.BASE_URL}/sitemap.xml`,
  };
}
