
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { CheckCircle, Eye } from "lucide-react";

const mockIssues = [
  {
    id: "1",
    title: "Large Pothole on Main Street",
    category: "Infrastructure",
    location: "123 Main St, Springfield",
    status: "urgent" as const,
    votes: 23,
    description: "A very large and deep pothole causing significant disruption and potential danger to vehicles.",
    timeAgo: "2 hours ago",
    reporter: "Jane Doe",
    image: "/lovable-uploads/ec88450d-6455-4d8a-b152-85653dacf284.png",
    progress: 75
  },
  {
    id: "2", 
    title: "Water Leakage in Public Park", 
    category: "Water",
    location: "Central Park, Section B",
    status: "verified" as const,
    votes: 45,
    description: "Continuous water leakage from a broken pipe near the fountain area.",
    timeAgo: "5 hours ago",
    reporter: "John Smith",
    image: "/api/placeholder/300/200",
    progress: 45
  },
  {
    id: "3",
    title: "Streetlight Out on Elm Avenue",
    category: "Electricity", 
    location: "45 Elm Ave, Downtown",
    status: "pending" as const,
    votes: 67,
    description: "The streetlight at the intersection of Elm and 5th has been out for several days.",
    timeAgo: "1 day ago",
    reporter: "Emily White",
    image: "/api/placeholder/300/200",
    progress: 20
  },
  {
    id: "4",
    title: "Illegal Dumping in Alleyway",
    category: "Sanitation",
    location: "Behind 15th Street Market",
    status: "pending" as const,
    votes: 12,
    description: "Someone has been illegally dumping construction waste in the alley.",
    timeAgo: "3 days ago",
    reporter: "Mark Johnson",
    image: "/api/placeholder/300/200", 
    progress: 10
  },
  {
    id: "5",
    title: "Graffiti on Public Wall",
    category: "Vandalism",
    location: "City Hall, West Wall",
    status: "pending" as const,
    votes: 8,
    description: "Fresh graffiti tags appeared on the west wall of City Hall overnight.",
    timeAgo: "1 week ago",
    reporter: "Alex Chen",
    image: "/api/placeholder/300/200",
    progress: 60
  },
  {
    id: "6",
    title: "Overgrown Public Area",
    category: "Maintenance", 
    location: "Park entrance, North Gate",
    status: "resolved" as const,
    votes: 15,
    description: "Vegetation has overgrown and is blocking the walking path at the park entrance.",
    timeAgo: "2 weeks ago",
    reporter: "Sarah Lee",
    image: "/api/placeholder/300/200",
    progress: 100
  }
];

export default function IssuesDashboard() {
  return (
    <div className="min-h-screen bg-background">
      
      <div className="flex">
        <Sidebar />
        
        <div className="flex-1 p-8">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Verification Dashboard</h1>
            <p className="text-muted-foreground">Browse and verify civic issues in your community</p>
          </div>
          
          {/* Filter Issues Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-lg">Filter Issues:</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="infrastructure">Infrastructure</SelectItem>
                    <SelectItem value="water">Water</SelectItem>
                    <SelectItem value="electricity">Electricity</SelectItem>
                    <SelectItem value="sanitation">Sanitation</SelectItem>
                    <SelectItem value="vandalism">Vandalism</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="downtown">Downtown</SelectItem>
                    <SelectItem value="north">North District</SelectItem>
                    <SelectItem value="south">South District</SelectItem>
                    <SelectItem value="central">Central Park Area</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Date Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="all">All Time</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="reported">Reported</SelectItem>
                    <SelectItem value="verified">Verified</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-end mt-4">
                <Button className="civic-glow">
                  Apply Filters
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Reset Filters */}
          <div className="mb-6">
            <Button variant="link" className="text-sm text-muted-foreground p-0">
              Reset Filters
            </Button>
          </div>
          
          {/* Statistics Row */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-foreground mb-2">8</div>
                <div className="text-sm text-muted-foreground">Total Issues</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-warning mb-2">6</div>
                <div className="text-sm text-muted-foreground">Pending Issues</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-success mb-2">2</div>
                <div className="text-sm text-muted-foreground">Resolved Issues</div>
              </CardContent>
            </Card>
          </div>
          
          {/* Issue Locations Map */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Issue Locations Map</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted rounded-lg flex items-center justify-center relative">
                <p className="text-muted-foreground">Interactive map showing issue locations</p>
                <div className="absolute top-4 left-4 flex gap-2">
                  <div className="w-3 h-3 bg-urgent rounded-full"></div>
                  <div className="w-3 h-3 bg-warning rounded-full"></div>
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* All Reported Issues */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-6">All Reported Issues</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockIssues.map((issue) => (
                <Card key={issue.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative">
                    <img 
                      src={issue.image} 
                      alt={issue.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <StatusBadge status={issue.status}>
                        {issue.status === "urgent" ? "Urgent" : 
                         issue.status === "verified" ? "Verified" :
                         issue.status === "pending" ? "Pending" : 
                         issue.status === "resolved" ? "Resolved" : "Reported"}
                      </StatusBadge>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{issue.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      A very large and deep pothole causing significant disruption and potential danger to vehicles.
                    </p>
                    <div className="text-xs text-muted-foreground mb-3">
                      📍 {issue.location} • ⏰ Reported by {issue.reporter}
                    </div>
                    <div className="text-xs text-muted-foreground mb-4">
                      Progress: {issue.progress}% • Springfield
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Verify Issue
                      </Button>
                      <Button size="sm" variant="default" className="flex-1">
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}