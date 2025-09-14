"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Eye, CheckCircle, MapPin, Activity,  Search, Filter, TrendingUp, Users, Clock, Menu } from "lucide-react";
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
    image: "data:image/jpeg;base64,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",
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
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQatUXA8qUFMDIG9nPTDfQ9kzuTY3MU3PAhKw&s",
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
    image: "data:image/jpeg;base64,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",
    progress: 20,
  },
];

export default function BrowseProgress() {
  const router = useRouter();
  const [filtersExpanded, setFiltersExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header darkMode={false} />
      
      {/* HERO HEADER - Mobile Optimized */}
      <div className="relative pt-20 sm:pt-24 pb-8 sm:pb-16 overflow-hidden">
        {/* Background Elements - Adjusted for mobile */}
        <div className="absolute inset-0">
          <div className="absolute top-10 sm:top-20 left-4 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-violet-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-20 sm:top-40 right-4 sm:right-20 w-64 sm:w-96 h-64 sm:h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-10 sm:bottom-20 left-1/2 w-48 sm:w-80 h-48 sm:h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
        
        <div className="relative container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-violet-100 to-purple-100 rounded-full text-violet-700 font-semibold text-xs sm:text-sm mb-4 sm:mb-6 shadow-inner">
              <TrendingUp className="w-3 sm:w-4 h-3 sm:h-4" />
              Live Community Dashboard
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight px-2">
              Browse & Track
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Civic Issues
              </span>
            </h1>
            
            <p className="text-sm sm:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed px-4">
              Explore real-time community reports, verify issues, and monitor progress in your neighborhood
            </p>
          </motion.div>
        </div>
      </div>

      {/* PAGE CONTENT */}
      <div className="container mx-auto px-4 sm:px-6 space-y-8 sm:space-y-12 pb-12 sm:pb-20">
        {/* Quick Stats - Mobile Responsive Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-8 sm:mb-12"
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
              <Card className={`${stat.bg} border-0 shadow-lg sm:shadow-xl shadow-black/5 backdrop-blur-sm relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-16 sm:w-32 h-16 sm:h-32 bg-gradient-to-br opacity-10 rounded-full -translate-y-8 sm:-translate-y-16 translate-x-8 sm:translate-x-16"></div>
                <CardContent className="p-4 sm:p-6 lg:p-8 relative">
                  <div className={`w-8 sm:w-12 lg:w-14 h-8 sm:h-12 lg:h-14 bg-gradient-to-br ${stat.color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-2 sm:mb-4 shadow-lg`}>
                    <stat.icon className="w-4 sm:w-6 lg:w-7 h-4 sm:h-6 lg:h-7 text-white" />
                  </div>
                  <div className="text-xl sm:text-3xl lg:text-4xl font-black text-slate-800 mb-1">{stat.value}</div>
                  <p className="text-xs sm:text-sm lg:text-base text-slate-600 font-semibold leading-tight">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Advanced Filters - Mobile Collapsible */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-white/70 backdrop-blur-xl border-0 shadow-xl sm:shadow-2xl shadow-black/10 rounded-2xl sm:rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-violet-50 to-purple-50 border-b border-white/50 p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-2xl font-bold flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg sm:rounded-xl">
                    <Filter className="h-4 sm:h-6 w-4 sm:w-6 text-white" />
                  </div>
                  <span className="hidden sm:inline">Smart Filtering System</span>
                  <span className="sm:hidden">Filters</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="sm:hidden"
                  onClick={() => setFiltersExpanded(!filtersExpanded)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className={`p-4 sm:p-8 ${!filtersExpanded ? 'hidden sm:block' : ''}`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
                {/* Search */}
                <div className="sm:col-span-2 lg:col-span-2 relative">
                  <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 sm:w-5 h-4 sm:h-5" />
                  <input 
                    type="text" 
                    placeholder="Search issues..." 
                    className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-slate-50 border-0 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-violet-500 focus:bg-white transition-all font-medium text-sm sm:text-base"
                  />
                </div>
                
                {/* Filter Selects - Stack on mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6 lg:contents">
                  {['Category', 'Location', 'Status'].map((filter) => (
                    <Select key={filter}>
                      <SelectTrigger className="h-12 sm:h-14 bg-slate-50 border-0 rounded-xl sm:rounded-2xl hover:bg-white focus:ring-2 focus:ring-violet-500 transition-all text-sm sm:text-base">
                        <SelectValue placeholder={filter} />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-0 shadow-2xl">
                        <SelectItem value="all" className="rounded-lg">All {filter}s</SelectItem>
                      </SelectContent>
                    </Select>
                  ))}
                </div>

                <Button className="h-12 sm:h-14 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-bold rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-sm sm:text-base">
                  Apply Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Interactive Map - Mobile Optimized */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="bg-white/70 backdrop-blur-xl border-0 shadow-xl sm:shadow-2xl shadow-black/10 rounded-2xl sm:rounded-3xl overflow-hidden">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-2xl font-bold flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg sm:rounded-xl">
                  <MapPin className="h-4 sm:h-6 w-4 sm:w-6 text-white" />
                </div>
                Live Issue Map
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-64 sm:h-80 lg:h-96 relative bg-gradient-to-br from-blue-500 via-purple-500 to-violet-600 flex items-center justify-center overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-3 sm:w-4 h-3 sm:h-4 bg-white/30 rounded-full"
                      animate={{
                        x: [0, 50, 100, 50, 0],
                        y: [0, 25, 50, 75, 0],
                        scale: [1, 1.2, 0.8, 1.1, 1],
                      }}
                      transition={{
                        duration: 6 + i,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${30 + i * 10}%`
                      }}
                    />
                  ))}
                </div>
                <div className="relative z-10 text-center text-white px-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-12 sm:w-16 lg:w-20 h-12 sm:h-16 lg:h-20 border-2 sm:border-4 border-white/30 border-t-white rounded-full mx-auto mb-3 sm:mb-4"
                  ></motion.div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">Interactive Map Loading...</h3>
                  <p className="text-white/80 text-sm sm:text-base">Real-time issue tracking</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Issues Grid - Mobile Responsive */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-800">Community Reports</h2>
            <div className="flex gap-2 sm:gap-3">
              <Button variant="outline" className="rounded-lg sm:rounded-xl border-2 hover:border-violet-500 hover:text-violet-600 text-xs sm:text-sm px-3 sm:px-4">
                <span className="hidden sm:inline">Sort by Priority</span>
                <span className="sm:hidden">Priority</span>
              </Button>
              <Button variant="outline" className="rounded-lg sm:rounded-xl border-2 hover:border-violet-500 hover:text-violet-600 text-xs sm:text-sm px-3 sm:px-4">
                View All
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {mockIssues.map((issue, i) => (
              <motion.div
                key={issue.id}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.6, ease: "easeOut" }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group"
              >
                <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-lg sm:shadow-xl shadow-black/10 rounded-2xl sm:rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500">
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <motion.img
                      src={issue.image}
                      alt={issue.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      whileHover={{ scale: 1.1 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                      <StatusBadge status={issue.status} className="backdrop-blur-md bg-white/90 shadow-lg text-xs sm:text-sm">
                        {issue.status}
                      </StatusBadge>
                    </div>
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 flex items-center gap-1.5 sm:gap-2 text-white">
                      <div className="p-1 bg-white/20 backdrop-blur-md rounded-md sm:rounded-lg">
                        <MapPin className="w-3 sm:w-4 h-3 sm:h-4" />
                      </div>
                      <span className="font-medium text-xs sm:text-sm truncate max-w-32 sm:max-w-none">{issue.location}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                    <div>
                      <h3 className="font-bold text-lg sm:text-xl text-slate-800 mb-2 group-hover:text-violet-600 transition-colors line-clamp-2">
                        {issue.title}
                      </h3>
                      <p className="text-slate-600 line-clamp-2 leading-relaxed text-sm sm:text-base">{issue.description}</p>
                    </div>
                    
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex items-center justify-between text-xs sm:text-sm">
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
                      <span className="truncate">By {issue.reporter}</span>
                      <span className="flex-shrink-0 ml-2">{issue.timeAgo}</span>
                    </div>

                    <div className="flex gap-2 sm:gap-3 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-2 border-emerald-200 text-emerald-600 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 rounded-lg sm:rounded-xl font-semibold transition-all text-xs sm:text-sm py-2 sm:py-2.5"
                      >
                        <CheckCircle className="h-3 sm:h-4 w-3 sm:w-4 mr-1 sm:mr-2" />
                        <span className="hidden xs:inline">Verify</span>
                        <span className="xs:hidden">✓</span>
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-xs sm:text-sm py-2 sm:py-2.5"
                        onClick={() => router.push(`/issues/${issue.id}`)}
                      >
                        <Eye className="h-3 sm:h-4 w-3 sm:w-4 mr-1 sm:mr-2" />
                        <span className="hidden xs:inline">Details</span>
                        <span className="xs:hidden">View</span>
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