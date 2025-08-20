import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { MapPin, Eye, ThumbsUp } from "lucide-react";
import { useState } from "react";

interface IssueCardProps {
  id: string;
  title: string;
  category: string;
  location: string;
  status: "reported" | "verified" | "pending" | "urgent" | "resolved" | "assigned";
  image?: string;
  votes: number;
  description: string;
  timeAgo: string;
}

export function IssueCard({ 
  id, 
  title, 
  category, 
  location, 
  status, 
  image, 
  votes, 
  description, 
  timeAgo 
}: IssueCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className={`transition-all duration-300 hover:shadow-lg cursor-pointer ${isHovered ? 'transform -translate-y-1' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg line-clamp-2">{title}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
              <span>•</span>
              <span>{timeAgo}</span>
            </div>
          </div>
          <StatusBadge status={status}>{status}</StatusBadge>
        </div>
      </CardHeader>
      
      {image && (
        <div className="px-6 pb-3">
          <img 
            src={image} 
            alt={title}
            className="w-full h-32 object-cover rounded-lg"
          />
        </div>
      )}
      
      <CardContent className="pb-3">
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        <div className="mt-2 inline-block">
          <span className="text-xs bg-secondary px-2 py-1 rounded-full">{category}</span>
        </div>
      </CardContent>
      
      <CardFooter className="pt-3 border-t flex items-center justify-between">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <ThumbsUp className="h-4 w-4" />
          <span>{votes}</span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
          <Button variant="default" size="sm" className="civic-glow">
            Verify
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}