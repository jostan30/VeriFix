"use client";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Eye, Filter } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { Header } from "@/components/layout/Header";

const OrganizationPanel = () => {
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");

  const assignedIssues = [
    {
      id: "CS-001",
      category: "Water Supply",
      location: "Sector 14, Urbanville",
      status: "assigned" as const,
      priority: "high"
    },
    {
      id: "CS-005",
      category: "Sanitation",
      location: "Market Street, Central City",
      status: "pending" as const,
      priority: "medium"
    },
    {
      id: "CS-008",
      category: "Infrastructure",
      location: "Old Town Bridge, Heritage District",
      status: "pending" as const,
      priority: "urgent"
    },
    {
      id: "CS-012",
      category: "Electricity",
      location: "Main Road, Green Park",
      status: "assigned" as const,
      priority: "high"
    },
    {
      id: "CS-015",
      category: "Fire",
      location: "Industrial Zone, West End",
      status: "pending" as const,
      priority: "urgent"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">NGO and Authority Panel</h1>
          <p className="text-muted-foreground">Manage and track assigned civic issues</p>
        </div>

        <Tabs defaultValue="ngo" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="ngo" className="text-lg py-3">NGO Dashboard</TabsTrigger>
            <TabsTrigger value="authority" className="text-lg py-3">Authority Dashboard</TabsTrigger>
          </TabsList>

          <TabsContent value="ngo" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-2xl">My Assigned Issues</CardTitle>
                    <CardDescription>Track and update the status of issues assigned to your organization</CardDescription>
                  </div>
                  <div className="flex gap-4">
                    <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                      <SelectTrigger className="w-[180px]">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="All Regions" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Regions</SelectItem>
                        <SelectItem value="central">Central City</SelectItem>
                        <SelectItem value="urban">Urbanville</SelectItem>
                        <SelectItem value="heritage">Heritage District</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                      <SelectTrigger className="w-[180px]">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="All Priorities" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Priorities</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Issue ID</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Current Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assignedIssues.map((issue) => (
                      <TableRow key={issue.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{issue.id}</TableCell>
                        <TableCell>{issue.category}</TableCell>
                        <TableCell>{issue.location}</TableCell>
                        <TableCell>
                          <StatusBadge status={issue.status}>
                            {issue.status === "assigned" ? "Assigned" : 
                             issue.status === "pending" ? "Under Review" : 
                             "Pending"}
                          </StatusBadge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Select defaultValue={issue.status}>
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="assigned">Assigned</SelectItem>
                                <SelectItem value="pending">Under Review</SelectItem>
                                <SelectItem value="resolved">Resolved</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button size="sm" variant="outline">
                              <Upload className="w-4 h-4 mr-1" />
                              Upload Proof
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="authority" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Authority Dashboard</CardTitle>
                <CardDescription>Monitor and assign civic issues to appropriate organizations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-2xl font-bold text-primary">47</div>
                      <p className="text-sm text-muted-foreground">Total Active Issues</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-2xl font-bold text-success">23</div>
                      <p className="text-sm text-muted-foreground">Resolved This Month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-2xl font-bold text-warning">5.2 days</div>
                      <p className="text-sm text-muted-foreground">Avg Resolution Time</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="text-center text-muted-foreground">
                  <p>Authority dashboard features coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default OrganizationPanel;