"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const navigate = (path: string) => {
    setIsMenuOpen(false); // close mobile menu after navigation
    router.push(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">C</span>
            </div>
            <span className="font-bold text-xl">CivicVerify</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            <button onClick={() => navigate("/issues")} className="text-sm font-medium hover:text-primary transition-colors">
              Browse Issues
            </button>
            <button onClick={() => navigate("/report")} className="text-sm font-medium hover:text-primary transition-colors">
              Report Issue
            </button>
            <button onClick={() => navigate("/community")} className="text-sm font-medium hover:text-primary transition-colors">
              Community
            </button>
            <button onClick={() => navigate("/organization")} className="text-sm font-medium hover:text-primary transition-colors">
              NGO/Auth Panel
            </button>
            <button onClick={() => navigate("/dashboard")} className="text-sm font-medium hover:text-primary transition-colors">
              Dashboard
            </button>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button onClick={() => navigate("/login")} variant="outline">
              Sign In
            </Button>
            <Button onClick={() => navigate("/report")} className="civic-glow">
              Report Issue
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <button onClick={() => navigate("/issues")} className="text-sm font-medium hover:text-primary transition-colors">
                Browse Issues
              </button>
              <button onClick={() => navigate("/report")} className="text-sm font-medium hover:text-primary transition-colors">
                Report Issue
              </button>
              <button onClick={() => navigate("/community")} className="text-sm font-medium hover:text-primary transition-colors">
                Community
              </button>
              <button onClick={() => navigate("/organization")} className="text-sm font-medium hover:text-primary transition-colors">
                NGO/Auth Panel
              </button>
              <button onClick={() => navigate("/dashboard")} className="text-sm font-medium hover:text-primary transition-colors">
                Dashboard
              </button>
              <div className="flex flex-col space-y-2 pt-4">
                <Button onClick={() => navigate("/login")} variant="outline">
                  Sign In
                </Button>
                <Button onClick={() => navigate("/report")} className="civic-glow">
                  Report Issue
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
