export const site = {
  name: "Renz",
  role: "Full-Stack Developer",
  tagline:
    "Saya membangun aplikasi web dan mobile yang cepat, rapi, dan enak dipakai.",
  email: "halo@example.com",
  socials: [
    { label: "GitHub", href: "https://github.com/RenzIP" },
    { label: "LinkedIn", href: "https://linkedin.com/in/username" },
    { label: "Email", href: "mailto:halo@example.com" },
  ],
  skills: [
    { group: "Frontend", items: ["Astro", "React", "TypeScript", "Tailwind CSS"] },
    { group: "Mobile", items: ["Flutter", "Dart"] },
    { group: "Backend", items: ["Node.js", "Python", "REST API"] },
    { group: "Tooling", items: ["Git", "Vite", "Figma"] },
  ],
} as const;
