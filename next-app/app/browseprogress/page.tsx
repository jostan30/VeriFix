"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Eye, CheckCircle, MapPin, BarChart2, Activity, Bell, Menu, X, Search, Filter, TrendingUp, Users, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/layout/Header";

// --- Mock Issues Data ---
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
    progress: 75,
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
    progress: 45,
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
    progress: 20,
  },
];

export default function BrowseProgress() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      
    <Header darkMode={false} />

      {/* HERO HEADER */}
      <div className="relative pt-24 pb-16 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-violet-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
        
        <div className="relative container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-100 to-purple-100 rounded-full text-violet-700 font-semibold text-sm mb-6 shadow-inner">
              <TrendingUp className="w-4 h-4" />
              Live Community Dashboard
            </div>
            
            <h1 className="text-6xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight">
              Browse & Track
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Civic Issues
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Explore real-time community reports, verify issues, and monitor progress in your neighborhood with our advanced tracking system
            </p>
          </motion.div>
        </div>
      </div>

      {/* PAGE CONTENT */}
      <div className="container mx-auto px-6 space-y-12 pb-20">
        {/* Quick Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          {[
            { icon: Activity, value: "147", label: "Active Issues", color: "from-blue-500 to-cyan-500", bg: "bg-blue-50" },
            { icon: Users, value: "2.3k", label: "Community Reports", color: "from-violet-500 to-purple-500", bg: "bg-violet-50" },
            { icon: CheckCircle, value: "89%", label: "Resolution Rate", color: "from-emerald-500 to-green-500", bg: "bg-emerald-50" },
            { icon: Clock, value: "2.1", label: "Avg Days to Fix", color: "from-amber-500 to-orange-500", bg: "bg-amber-50" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className={`${stat.bg} border-0 shadow-xl shadow-black/5 backdrop-blur-sm relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
                <CardContent className="p-8 relative">
                  <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-4xl font-black text-slate-800 mb-1">{stat.value}</div>
                  <p className="text-slate-600 font-semibold">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Advanced Filters */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-white/70 backdrop-blur-xl border-0 shadow-2xl shadow-black/10 rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-violet-50 to-purple-50 border-b border-white/50">
              <CardTitle className="text-2xl font-bold flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl">
                  <Filter className="h-6 w-6 text-white" />
                </div>
                Smart Filtering System
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Search */}
                <div className="lg:col-span-2 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input 
                    type="text" 
                    placeholder="Search issues, locations..." 
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-0 rounded-2xl focus:ring-2 focus:ring-violet-500 focus:bg-white transition-all font-medium"
                  />
                </div>
                
                {['Category', 'Location', 'Status'].map((filter) => (
                  <Select key={filter}>
                    <SelectTrigger className="h-14 bg-slate-50 border-0 rounded-2xl hover:bg-white focus:ring-2 focus:ring-violet-500 transition-all">
                      <SelectValue placeholder={filter} />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-0 shadow-2xl">
                      <SelectItem value="all" className="rounded-lg">All {filter}s</SelectItem>
                    </SelectContent>
                  </Select>
                ))}

                <Button className="h-14 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                  Apply Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Interactive Map */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="bg-white/70 backdrop-blur-xl border-0 shadow-2xl shadow-black/10 rounded-3xl overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                Live Issue Map
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-96 relative bg-gradient-to-br from-blue-500 via-purple-500 to-violet-600 flex items-center justify-center overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-4 h-4 bg-white/30 rounded-full"
                      animate={{
                        x: [0, 100, 200, 100, 0],
                        y: [0, 50, 100, 150, 0],
                        scale: [1, 1.2, 0.8, 1.1, 1],
                      }}
                      transition={{
                        duration: 8 + i,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      style={{
                        left: `${20 + i * 12}%`,
                        top: `${30 + i * 8}%`
                      }}
                    />
                  ))}
                </div>
                <div className="relative z-10 text-center text-white">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-20 h-20 border-4 border-white/30 border-t-white rounded-full mx-auto mb-4"
                  ></motion.div>
                  <h3 className="text-2xl font-bold mb-2">Interactive Map Loading...</h3>
                  <p className="text-white/80">Real-time issue tracking across your community</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Issues Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-black text-slate-800">Community Reports</h2>
            <div className="flex gap-3">
              <Button variant="outline" className="rounded-xl border-2 hover:border-violet-500 hover:text-violet-600">
                Sort by Priority
              </Button>
              <Button variant="outline" className="rounded-xl border-2 hover:border-violet-500 hover:text-violet-600">
                View All
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {mockIssues.map((issue, i) => (
              <motion.div
                key={issue.id}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.6, ease: "easeOut" }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-xl shadow-black/10 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500">
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <motion.img
                      src={issue.image}
                      alt={issue.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      whileHover={{ scale: 1.1 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <StatusBadge status={issue.status} className="backdrop-blur-md bg-white/90 shadow-lg">
                        {issue.status}
                      </StatusBadge>
                    </div>
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                      <div className="p-1 bg-white/20 backdrop-blur-md rounded-lg">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <span className="font-medium text-sm">{issue.location}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h3 className="font-bold text-xl text-slate-800 mb-2 group-hover:text-violet-600 transition-colors">
                        {issue.title}
                      </h3>
                      <p className="text-slate-600 line-clamp-2 leading-relaxed">{issue.description}</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500 font-medium">Progress</span>
                        <span className="font-bold text-slate-700">{issue.progress}%</span>
                      </div>
                      <Progress 
                        value={issue.progress} 
                        className="h-2 bg-slate-100" 
                        style={{
                          background: `linear-gradient(to right, #8b5cf6 0%, #a855f7 50%, #3b82f6 100%)`
                        }}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                      <span>By {issue.reporter}</span>
                      <span>{issue.timeAgo}</span>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-2 border-emerald-200 text-emerald-600 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 rounded-xl font-semibold transition-all"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" /> Verify
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                        onClick={() => router.push(`/issues/${issue.id}`)}
                      >
                        <Eye className="h-4 w-4 mr-2" /> Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}