"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Camera, MapPin, Upload, ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";

const categories = [
  { id: "fire", label: "Fire Emergency", icon: "🛑" },
  { id: "water", label: "Water Issues", icon: "💧" },
  { id: "electricity", label: "Electricity", icon: "⚡" },
  { id: "infrastructure", label: "Infrastructure", icon: "🛣️" },
  { id: "price", label: "Price Gouging", icon: "💸" },
  { id: "sanitation", label: "Sanitation", icon: "🚮" }
];

export default function ReportIssue() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    location: "",
    contact: "",
    anonymous: false
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Report an Issue</h1>
          <p className="text-muted-foreground">Help improve your community by reporting civic issues</p>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Step {currentStep} of {totalSteps}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>
              {currentStep === 1 && "Select Category"}
              {currentStep === 2 && "Describe the Issue"}
              {currentStep === 3 && "Location & Evidence"}
              {currentStep === 4 && "Contact Information"}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "Choose the category that best describes your issue"}
              {currentStep === 2 && "Provide details about the problem"}
              {currentStep === 3 && "Add location and photo evidence"}
              {currentStep === 4 && "Optional contact details for updates"}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Step 1: Category Selection */}
            {currentStep === 1 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <Card
                    key={category.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedCategory === category.id 
                        ? "ring-2 ring-primary bg-primary/5" 
                        : "hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl mb-2">{category.icon}</div>
                      <div className="font-medium">{category.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            
            {/* Step 2: Issue Details */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Issue Title</Label>
                  <Input 
                    id="title"
                    placeholder="Brief title describing the issue"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description"
                    placeholder="Provide detailed information about the issue..."
                    className="min-h-32"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">AI Suggestion</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Consider adding specific times when the issue occurs and any safety concerns.
                  </p>
                </div>
              </div>
            )}
            
            {/* Step 3: Location & Evidence */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="location"
                      placeholder="Enter address or location"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                    />
                    <Button variant="outline" size="icon">
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Label>Photo Evidence</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">Drag & drop photos here or click to browse</p>
                    <div className="flex gap-2 justify-center">
                      <Button variant="outline" size="sm">
                        <Camera className="h-4 w-4 mr-2" />
                        Take Photo
                      </Button>
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Files
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 4: Contact Information */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-2 mb-2">
                    <input type="checkbox" id="anonymous" className="rounded" />
                    <Label htmlFor="anonymous" className="font-medium">Report Anonymously</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your identity will be kept private. You won&apos;t receive updates about this issue.
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="contact">Email (Optional)</Label>
                  <Input 
                    id="contact"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.contact}
                    onChange={(e) => setFormData({...formData, contact: e.target.value})}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    We&apos;ll send you updates about this issue
                  </p>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Issue Summary</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p><strong>Category:</strong> {selectedCategory}</p>
                    <p><strong>Title:</strong> {formData.title || "Not specified"}</p>
                    <p><strong>Location:</strong> {formData.location || "Not specified"}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          
          {/* Navigation Buttons */}
          <div className="flex justify-between p-6 border-t">
            <Button 
              variant="outline" 
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            
            {currentStep < totalSteps ? (
              <Button 
                onClick={nextStep}
                className="civic-glow"
                disabled={currentStep === 1 && !selectedCategory}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button className="civic-glow">
                Submit Report
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}