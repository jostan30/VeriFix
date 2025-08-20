"use client";

import { useRouter } from "next/navigation";

export function Footer() {
  const router = useRouter();

  const sections = [
    {
      title: "Platform",
      links: [
        { label: "Browse Issues", path: "/issues" },
        { label: "Report Issue", path: "/report" },
        { label: "Dashboard", path: "/dashboard" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", path: "/help" },
        { label: "Contact", path: "/contact" },
        { label: "Privacy Policy", path: "/privacy" },
      ],
    },
    {
      title: "Partners",
      links: [
        { label: "NGO Partners", path: "/ngos" },
        { label: "Government", path: "/government" },
        { label: "API Access", path: "/api" },
      ],
    },
  ];

  const navigate = (path: string) => {
    router.push(path);
  };

  return (
    <footer className="bg-card border-t py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo + description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">C</span>
              </div>
              <span className="font-bold text-xl">CivicVerify</span>
            </div>
            <p className="text-muted-foreground">
              Building better communities through transparent civic engagement.
            </p>
          </div>

          {/* Dynamic Sections */}
          {sections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="font-semibold">{section.title}</h3>
              <div className="space-y-2">
                {section.links.map((link) => (
                  <button
                    key={link.path}
                    onClick={() => navigate(link.path)}
                    className="block text-left w-full text-muted-foreground hover:text-primary"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 CivicVerify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
