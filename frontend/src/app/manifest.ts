import type { MetadataRoute } from "next";
import { profile } from "@/models/profile";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: profile.title,
    short_name: profile.shortName,
    description: profile.description,
    start_url: "/",
    display: "standalone",
    background_color: "#b8c0ff",
    theme_color: profile.themeColor,
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
