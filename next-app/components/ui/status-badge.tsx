import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/utils";

const statusBadgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      status: {
        reported: "bg-muted text-muted-foreground",
        verified: "bg-primary text-primary-foreground",
        pending: "bg-warning text-warning-foreground",
        urgent: "bg-urgent text-urgent-foreground", 
        resolved: "bg-success text-success-foreground",
        assigned: "bg-accent text-accent-foreground"
      }
    },
    defaultVariants: {
      status: "reported"
    }
  }
);

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBadgeVariants> {}

function StatusBadge({ className, status, ...props }: StatusBadgeProps) {
  return (
    <div
      className={cn(statusBadgeVariants({ status }), className)}
      {...props}
    />
  );
}

export { StatusBadge, statusBadgeVariants };