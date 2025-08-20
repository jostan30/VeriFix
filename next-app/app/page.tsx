"use client";

import Image from "next/image"; 
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/civic/FeatureCard";
import { MapPin, Search, Users } from "lucide-react";
import heroImage from "@/app/assets/hero-city.jpg";
import { useRouter } from "next/navigation";

export default function Landing() { 
  const router  =useRouter();
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                  Verify and Solve{" "}
                  <span className="text-primary">Civic Issues</span> Together
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Report local problems, verify with real-time data, and connect with NGOs & authorities for faster resolutions.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={()=>router.push('/report')} size="lg"  className="civic-glow text-lg px-8 py-6">
                  Report Issue
                </Button>
                <Button onClick={()=>router.push('/issues')} variant="outline" size="lg"  className="text-lg px-8 py-6">
                  View Issues
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">2,547</div>
                  <div className="text-sm text-muted-foreground">Issues Resolved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">89%</div>
                  <div className="text-sm text-muted-foreground">Verification Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">156</div>
                  <div className="text-sm text-muted-foreground">Partner NGOs</div>
                </div>
              </div>
            </div>

            <div className="relative">
              {/* Using Next.js Image */}
              <Image
                src={heroImage}
                alt="City with civic infrastructure"
                className="w-full h-auto rounded-2xl shadow-2xl"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              How CivicVerify Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to make your community better
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={MapPin}
              title="Track Local Problems"
              description="Report issues in your neighborhood with precise location data and photo evidence."
            />
            <FeatureCard
              icon={Search}
              title="Verify with Real-Time Data"
              description="AI-powered verification using government APIs and community validation."
            />
            <FeatureCard
              icon={Users}
              title="Connect with Authorities"
              description="Direct routing to relevant NGOs and government departments for quick resolution."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of citizens working together to improve their communities.
            </p>
            <Button onClick={()=> router.push('/report')} size="lg"  className="civic-glow text-lg px-8 py-6">
                Start Reporting Issues
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
