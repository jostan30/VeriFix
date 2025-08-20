"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">C</span>
            </div>
            <span className="font-bold text-xl">CivicVerify</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/issues" className="text-sm font-medium hover:text-primary transition-colors">
              Browse Issues
            </Link>
            <Link href="/report" className="text-sm font-medium hover:text-primary transition-colors">
              Report Issue
            </Link>
            <Link href="/community" className="text-sm font-medium hover:text-primary transition-colors">
              Community
            </Link>
            <Link href="/organization" className="text-sm font-medium hover:text-primary transition-colors">
              NGO/Auth Panel
            </Link>
            <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
              Dashboard
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild className="civic-glow">
              <Link href="/report">Report Issue</Link>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link href="/issues" className="text-sm font-medium hover:text-primary transition-colors">
                Browse Issues
              </Link>
              <Link href="/report" className="text-sm font-medium hover:text-primary transition-colors">
                Report Issue
              </Link>
              <Link href="/community" className="text-sm font-medium hover:text-primary transition-colors">
                Community
              </Link>
              <Link href="/organization" className="text-sm font-medium hover:text-primary transition-colors">
                NGO/Auth Panel
              </Link>
              <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
                Dashboard
              </Link>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="outline" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild className="civic-glow">
                  <Link href="/report">Report Issue</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
