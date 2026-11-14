import { profile, siteUrl } from "@/models/profile";
import { skillGroups } from "@/models/skills";
import HomeView from "@/views/HomeView";

// schema.org structured data describing the person this portfolio belongs to
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: siteUrl,
  name: profile.title,
  description: profile.description,
  mainEntity: {
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: profile.name,
    alternateName: profile.shortName,
    jobTitle: profile.role,
    description: profile.description,
    url: siteUrl,
    email: `mailto:${profile.email}`,
    sameAs: [profile.github.url, profile.linkedin.url],
    address: { "@type": "PostalAddress", addressLocality: profile.city, addressCountry: "TH" },
    alumniOf: { "@type": "CollegeOrUniversity", name: profile.university, sameAs: "https://www.kmutt.ac.th" },
    knowsAbout: skillGroups.flatMap((group) => group.items.map((skill) => skill.name)),
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\u003c") }}
      />
      <HomeView />
    </>
  );
}
