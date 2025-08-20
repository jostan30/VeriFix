"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Building2,
  Bell
} from "lucide-react";

const navigation = [
  {
    name: "Verification Dashboard",
    href: "/issues",
    icon: LayoutDashboard
  },
  {
    name: "Report an Issue", 
    href: "/report",
    icon: FileText
  },
  {
    name: "Community Engagement",
    href: "/community", 
    icon: Users
  },
  {
    name: "NGO/Authority Panel",
    href: "/organization",
    icon: Building2
  }
];

export function Sidebar() {
  const pathname = usePathname(); // current route
  
  return (
    <div className="w-64 bg-card border-r border-border min-h-screen p-4">
      <div className="space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.name}
            </Link>
          );
        })}
      </div>

      <div className="mt-8 pt-4 border-t border-border">
        <div className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground">
          <Bell className="h-4 w-4" />
          Notifications
        </div>
      </div>
    </div>
  );
}
