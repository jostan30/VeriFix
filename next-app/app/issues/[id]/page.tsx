"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { 
  ArrowLeft, 
  Bell, 
  Menu, 
  X, 
  MapPin, 
  ThumbsUp, 
  MessageCircle, 
  Share2, 
  Calendar,
  User,
  CheckCircle,
  Clock,
  AlertTriangle,
  Camera,
  Heart,
  Flag,
  Send,
  Moon,
  Sun
} from "lucide-react";

// --- Mock Data ---
const mockIssues = [
  {
    id: "1",
    title: "Large Pothole on Main Street",
    category: "Infrastructure",
    location: "123 Main St, Springfield",
    status: "urgent" as const,
    votes: 23,
    description: "A very large and deep pothole causing significant disruption and potential danger to vehicles. This has been an ongoing issue that needs immediate attention from the city council.",
    timeAgo: "2 hours ago",
    reporter: "Jane Doe",
    image: "/lovable-uploads/ec88450d-6455-4d8a-b152-85653dacf284.png",
    progress: 75,
    timeline: [
      { step: "Reported", date: "October 26, 2023", desc: "Issue reported by a concerned citizen via CivicVerify platform.", status: "completed" },
      { step: "Verified", date: "October 27, 2023", desc: "Community members verified with photos and upvotes.", status: "completed" },
      { step: "Assigned", date: "October 28, 2023", desc: "Assigned to City Public Works Department for assessment.", status: "completed" },
      { step: "In Progress", date: "October 30, 2023", desc: "Road crew dispatched. Repair work scheduled for completion.", status: "current" },
      { step: "Resolved", date: "November 2, 2023", desc: "Final inspection and community confirmation pending.", status: "pending" },
    ],
    comments: [
      { 
        user: "Jane Doe", 
        avatar: "JD",
        text: "This pothole is huge! Almost hit it last night. Really appreciate everyone's support on this.", 
        date: "October 26, 2023",
        likes: 12
      },
      { 
        user: "Community Watch", 
        avatar: "CW",
        text: "We can confirm this is a major hazard. Hope it gets fixed soon. Our safety team has documented this.", 
        date: "October 27, 2023",
        likes: 8
      },
      { 
        user: "RoadRepairFan", 
        avatar: "RF",
        text: "Saw the city crew ready today, maybe they'll get it fixed. Great to see community action!", 
        date: "October 30, 2023",
        likes: 5
      }
    ]
  },
];

export default function IssueDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(23);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load dark mode preference
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    setIsDarkMode(savedMode === 'true');
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
  };

  const issue = mockIssues.find((i) => i.id === params.id);

  if (!issue) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-all duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-[#2C3E50] via-[#34495E] to-[#2C3E50]' 
          : 'bg-gradient-to-br from-[#ECF0F1] via-[#3498DB]/10 to-[#16A085]/10'
      }`}>
        <div className="text-center">
          <h1 className={`text-4xl font-bold mb-4 transition-colors ${
            isDarkMode ? 'text-[#ECF0F1]' : 'text-[#2C3E50]'
          }`}>Issue Not Found</h1>
          <Button 
            onClick={() => router.push("/browseprogress")} 
            className="bg-gradient-to-r from-[#16A085] to-[#27AE60] hover:from-[#16A085]/90 hover:to-[#27AE60]/90 text-white font-bold"
          >
            Back to Browse
          </Button>
        </div>
      </div>
    );
  }

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      setNewComment("");
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-[#2C3E50] via-[#34495E] to-[#2C3E50]' 
        : 'bg-gradient-to-br from-[#ECF0F1] via-[#3498DB]/10 to-[#16A085]/10'
    }`}>
      {/* NAVIGATION HEADER */}
      <header className={`fixed top-0 w-full z-50 backdrop-blur-xl border-b shadow-lg transition-all duration-500 ${
        isDarkMode 
          ? 'bg-[#2C3E50]/90 border-[#34495E]/50 shadow-black/20' 
          : 'bg-white/90 border-white/20 shadow-black/5'
      }`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-18">
            <motion.div
              className="flex items-center space-x-4"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-[#8E44AD] to-[#3498DB] rounded-2xl flex items-center justify-center shadow-lg shadow-[#8E44AD]/25">
                  <span className="text-white font-bold text-2xl">C</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-[#27AE60] to-[#16A085] rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="font-black text-3xl bg-gradient-to-r from-[#8E44AD] to-[#3498DB] bg-clip-text text-transparent">
                  CivicVerify
                </span>
                <div className={`text-xs font-medium transition-colors ${
                  isDarkMode ? 'text-[#ECF0F1]/70' : 'text-[#34495E]/70'
                }`}>Issue Details</div>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
             {/* Desktop Navigation */}
                      <nav className="hidden md:flex items-center space-x-8">
                        {['Home', 'ReportIssues', 'BrowseProgress', 'OrganizationDashboard',"Community"].map((item, index) => (
                          <motion.a
                            key={item}
                            href={`/${item.toLowerCase()}`}
                            className="text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 font-medium transition-colors duration-300"
                            whileHover={{ y: -2 }}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            {item}
                          </motion.a>
                        ))}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                        >
                          Get Started
                        </motion.button>
                      
              <div className="flex items-center space-x-3 ml-8">
                {/* Dark Mode Toggle */}
                <motion.button
                  onClick={toggleDarkMode}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    isDarkMode 
                      ? 'text-[#F1C40F] hover:bg-[#F1C40F]/10' 
                      : 'text-[#E67E22] hover:bg-[#E67E22]/10'
                  }`}
                >
                  {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1, rotate: 15 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative p-3 rounded-xl transition-all duration-300 ${
                    isDarkMode 
                      ? 'text-[#ECF0F1] hover:text-[#3498DB] hover:bg-[#3498DB]/10' 
                      : 'text-[#2C3E50] hover:text-[#3498DB] hover:bg-[#3498DB]/10'
                  }`}
                >
                  <Bell className="h-5 w-5" />
                  <div className="absolute top-1 right-1 w-2 h-2 bg-[#E74C3C] rounded-full animate-bounce"></div>
                </motion.button>
                
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-[#8E44AD] to-[#2980B9] rounded-full shadow-lg cursor-pointer border-2 border-white"></div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#27AE60] rounded-full border-2 border-white"></div>
                </motion.div>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-3 lg:hidden">
              <motion.button
                onClick={toggleDarkMode}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 rounded-xl transition-all ${
                  isDarkMode 
                    ? 'text-[#F1C40F] hover:bg-[#F1C40F]/10' 
                    : 'text-[#E67E22] hover:bg-[#E67E22]/10'
                }`}
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </motion.button>

              <motion.button
                className={`p-3 rounded-xl transition-colors ${
                  isDarkMode ? 'hover:bg-[#34495E]' : 'hover:bg-[#3498DB]/10'
                }`}
                onClick={() => setIsOpen(!isOpen)}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className={`h-6 w-6 ${isDarkMode ? 'text-[#ECF0F1]' : 'text-[#2C3E50]'}`} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className={`h-6 w-6 ${isDarkMode ? 'text-[#ECF0F1]' : 'text-[#2C3E50]'}`} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`lg:hidden backdrop-blur-xl border-t transition-colors ${
                isDarkMode 
                  ? 'bg-[#2C3E50]/95 border-[#34495E]/50' 
                  : 'bg-white/95 border-white/20'
              }`}
            >
              <nav className="px-6 py-6 space-y-1">
                {['Home', 'Report', 'Browse', 'Dashboard', 'Community'].map((item, index) => (
                  <motion.a
                    key={item}
                    href={`/${item.toLowerCase()}`}
                    className={`block py-3 px-4 font-semibold rounded-xl transition-all ${
                      isDarkMode 
                        ? 'text-[#ECF0F1] hover:text-[#3498DB] hover:bg-[#3498DB]/10' 
                        : 'text-[#2C3E50] hover:text-[#3498DB] hover:bg-[#3498DB]/10'
                    }`}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 8 }}
                  >
                    {item}
                  </motion.a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* MAIN CONTENT */}
      <div className="pt-20 container mx-auto px-6 py-12 space-y-8">
        {/* Back Button & Actions */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center justify-between"
        >
          <Button 
            variant="ghost" 
            className={`flex items-center gap-3 font-semibold rounded-xl p-3 transition-all ${
              isDarkMode 
                ? 'text-[#ECF0F1] hover:text-[#3498DB] hover:bg-[#3498DB]/10' 
                : 'text-[#2C3E50] hover:text-[#3498DB] hover:bg-[#3498DB]/10'
            }`}
            onClick={() => router.push("/browseprogress")}
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Browse
          </Button>
          
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
                isLiked 
                  ? isDarkMode 
                    ? 'bg-[#E74C3C]/20 text-[#E74C3C] border border-[#E74C3C]/30' 
                    : 'bg-[#E74C3C]/10 text-[#E74C3C] border border-[#E74C3C]/20'
                  : isDarkMode 
                    ? 'bg-[#34495E] text-[#ECF0F1] hover:bg-[#E74C3C]/20 hover:text-[#E74C3C]' 
                    : 'bg-[#ECF0F1] text-[#2C3E50] hover:bg-[#E74C3C]/10 hover:text-[#E74C3C]'
              }`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              {likeCount}
            </motion.button>
            
            <Button className="bg-gradient-to-r from-[#8E44AD] to-[#2980B9] hover:from-[#8E44AD]/90 hover:to-[#2980B9]/90 text-white rounded-xl font-bold shadow-lg">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </motion.div>

        {/* Issue Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <h1 className={`text-5xl font-black mb-4 leading-tight transition-colors ${
                isDarkMode ? 'text-[#ECF0F1]' : 'text-[#2C3E50]'
              }`}>{issue.title}</h1>
              <p className={`text-xl leading-relaxed mb-6 transition-colors ${
                isDarkMode ? 'text-[#ECF0F1]/80' : 'text-[#34495E]'
              }`}>{issue.description}</p>
              
              <div className="flex flex-wrap items-center gap-4">
                <StatusBadge status={issue.status} className="text-lg px-4 py-2 bg-gradient-to-r from-[#E74C3C] to-[#E67E22] text-white">
                  {issue.status}
                </StatusBadge>
                <div className={`flex items-center gap-2 transition-colors ${
                  isDarkMode ? 'text-[#ECF0F1]/80' : 'text-[#34495E]'
                }`}>
                  <User className="h-5 w-5" />
                  <span className="font-semibold">Reported by {issue.reporter}</span>
                </div>
                <div className={`flex items-center gap-2 transition-colors ${
                  isDarkMode ? 'text-[#ECF0F1]/80' : 'text-[#34495E]'
                }`}>
                  <Clock className="h-5 w-5" />
                  <span>{issue.timeAgo}</span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className={`text-4xl font-black mb-2 transition-colors ${
                isDarkMode ? 'text-[#ECF0F1]' : 'text-[#2C3E50]'
              }`}>{issue.progress}%</div>
              <p className={`font-semibold mb-4 transition-colors ${
                isDarkMode ? 'text-[#ECF0F1]/80' : 'text-[#34495E]'
              }`}>Complete</p>
              <div className="w-32 h-3 bg-gradient-to-r from-[#27AE60] to-[#16A085] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#27AE60] to-[#16A085] rounded-full transition-all"
                  style={{ width: `${issue.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="xl:col-span-2 space-y-8">
            {/* Media Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className={`backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden transition-all duration-500 ${
                isDarkMode 
                  ? 'bg-[#34495E]/50 shadow-black/20' 
                  : 'bg-white/80 shadow-black/10'
              }`}>
                <CardHeader className={`transition-colors duration-500 ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-[#2980B9]/20 to-[#8E44AD]/20' 
                    : 'bg-gradient-to-r from-[#2980B9]/10 to-[#8E44AD]/10'
                }`}>
                  <CardTitle className={`text-2xl font-bold flex items-center gap-3 transition-colors ${
                    isDarkMode ? 'text-[#ECF0F1]' : 'text-[#2C3E50]'
                  }`}>
                    <div className="p-2 bg-gradient-to-r from-[#2980B9] to-[#8E44AD] rounded-xl">
                      <Camera className="h-6 w-6 text-white" />
                    </div>
                    Supporting Evidence
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative rounded-2xl overflow-hidden shadow-xl"
                  >
                    <img 
                      src={issue.image} 
                      alt={issue.title} 
                      className="w-full h-96 object-cover" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className={`backdrop-blur-xl border-0 shadow-2xl rounded-3xl transition-all duration-500 ${
                isDarkMode 
                  ? 'bg-[#34495E]/50 shadow-black/20' 
                  : 'bg-white/80 shadow-black/10'
              }`}>
                <CardHeader className={`transition-colors duration-500 ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-[#3498DB]/20 to-[#16A085]/20' 
                    : 'bg-gradient-to-r from-[#3498DB]/10 to-[#16A085]/10'
                }`}>
                  <CardTitle className={`text-2xl font-bold flex items-center gap-3 transition-colors ${
                    isDarkMode ? 'text-[#ECF0F1]' : 'text-[#2C3E50]'
                  }`}>
                    <div className="p-2 bg-gradient-to-r from-[#3498DB] to-[#16A085] rounded-xl">
                      <Calendar className="h-6 w-6 text-white" />
                    </div>
                    Progress Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    {issue.timeline.map((step, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * idx }}
                        className="relative flex items-start gap-6 group"
                      >
                        {/* Timeline Line */}
                        {idx !== issue.timeline.length - 1 && (
                          <div className={`absolute left-6 top-12 w-0.5 h-16 transition-colors ${
                            isDarkMode 
                              ? 'bg-gradient-to-b from-[#8E44AD]/50 to-[#3498DB]/50' 
                              : 'bg-gradient-to-b from-[#8E44AD]/30 to-[#3498DB]/30'
                          }`}></div>
                        )}
                        
                        {/* Status Icon */}
                        <div className={`relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${
                          step.status === 'completed' ? 'bg-gradient-to-r from-[#27AE60] to-[#16A085]' :
                          step.status === 'current' ? 'bg-gradient-to-r from-[#8E44AD] to-[#2980B9] animate-pulse' :
                          isDarkMode ? 'bg-gradient-to-r from-[#34495E] to-[#2C3E50]' : 'bg-gradient-to-r from-[#ECF0F1] to-[#34495E]/20'
                        }`}>
                          {step.status === 'completed' ? (
                            <CheckCircle className="h-6 w-6 text-white" />
                          ) : step.status === 'current' ? (
                            <AlertTriangle className="h-6 w-6 text-white" />
                          ) : (
                            <Clock className={`h-6 w-6 ${isDarkMode ? 'text-[#ECF0F1]' : 'text-[#34495E]'}`} />
                          )}
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 group-hover:translate-x-2 transition-transform">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className={`text-xl font-bold transition-colors ${
                              isDarkMode ? 'text-[#ECF0F1]' : 'text-[#2C3E50]'
                            }`}>{step.step}</h3>
                            <span className={`text-sm font-semibold px-3 py-1 rounded-full transition-colors ${
                              isDarkMode 
                                ? 'text-[#ECF0F1]/70 bg-[#34495E]' 
                                : 'text-[#34495E] bg-[#ECF0F1]'
                            }`}>
                              {step.date}
                            </span>
                          </div>
                          <p className={`leading-relaxed transition-colors ${
                            isDarkMode ? 'text-[#ECF0F1]/80' : 'text-[#34495E]'
                          }`}>{step.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Location Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className={`backdrop-blur-xl border-0 shadow-2xl rounded-3xl transition-all duration-500 ${
                isDarkMode 
                  ? 'bg-[#34495E]/50 shadow-black/20' 
                  : 'bg-white/80 shadow-black/10'
              }`}>
                <CardHeader>
                  <CardTitle className={`text-xl font-bold flex items-center gap-3 transition-colors ${
                    isDarkMode ? 'text-[#ECF0F1]' : 'text-[#2C3E50]'
                  }`}>
                    <div className="p-2 bg-gradient-to-r from-[#27AE60] to-[#16A085] rounded-xl">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    Location
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className={`font-semibold transition-colors ${
                    isDarkMode ? 'text-[#ECF0F1]' : 'text-[#2C3E50]'
                  }`}>{issue.location}</p>
                  <div className="h-48 bg-gradient-to-br from-[#27AE60] via-[#3498DB] to-[#8E44AD] rounded-2xl flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative z-10 text-white text-center">
                      <MapPin className="h-12 w-12 mx-auto mb-3" />
                      <p className="font-semibold">Interactive Map</p>
                      <p className="text-sm opacity-80">Click to view full map</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Community Stats */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className={`backdrop-blur-xl border-0 shadow-2xl rounded-3xl transition-all duration-500 ${
                isDarkMode 
                  ? 'bg-[#34495E]/50 shadow-black/20' 
                  : 'bg-white/80 shadow-black/10'
              }`}>
                <CardHeader>
                  <CardTitle className={`text-xl font-bold flex items-center gap-3 transition-colors ${
                    isDarkMode ? 'text-[#ECF0F1]' : 'text-[#2C3E50]'
                  }`}>
                    <div className="p-2 bg-gradient-to-r from-[#E67E22] to-[#F1C40F] rounded-xl">
                      <ThumbsUp className="h-5 w-5 text-white" />
                    </div>
                    Community Impact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className={`text-center p-4 rounded-2xl transition-colors ${
                      isDarkMode 
                        ? 'bg-gradient-to-br from-[#8E44AD]/20 to-[#2980B9]/20' 
                        : 'bg-gradient-to-br from-[#8E44AD]/10 to-[#2980B9]/10'
                    }`}>
                      <div className="text-3xl font-black text-[#8E44AD] mb-1">{issue.votes}</div>
                      <p className={`text-sm font-semibold transition-colors ${
                        isDarkMode ? 'text-[#ECF0F1]/80' : 'text-[#34495E]'
                      }`}>Upvotes</p>
                    </div>
                    <div className={`text-center p-4 rounded-2xl transition-colors ${
                      isDarkMode 
                        ? 'bg-gradient-to-br from-[#3498DB]/20 to-[#16A085]/20' 
                        : 'bg-gradient-to-br from-[#3498DB]/10 to-[#16A085]/10'
                    }`}>
                      <div className="text-3xl font-black text-[#3498DB] mb-1">{issue.comments.length}</div>
                      <p className={`text-sm font-semibold transition-colors ${
                        isDarkMode ? 'text-[#ECF0F1]/80' : 'text-[#34495E]'
                      }`}>Comments</p>
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-2xl transition-colors ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-[#27AE60]/20 to-[#16A085]/20' 
                      : 'bg-gradient-to-r from-[#27AE60]/10 to-[#16A085]/10'
                  }`}>
                    <p className={`text-sm font-semibold mb-2 transition-colors ${
                      isDarkMode ? 'text-[#ECF0F1]/80' : 'text-[#34495E]'
                    }`}>Verification Status</p>
                    <p className="text-[#27AE60] font-bold">✅ Community Verified</p>
                    <p className={`text-xs mt-1 transition-colors ${
                      isDarkMode ? 'text-[#ECF0F1]/60' : 'text-[#34495E]/70'
                    }`}>
                      Confirmed by multiple community members and cross-referenced with municipal data
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Comments Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className={`backdrop-blur-xl border-0 shadow-2xl rounded-3xl transition-all duration-500 ${
            isDarkMode 
              ? 'bg-[#34495E]/50 shadow-black/20' 
              : 'bg-white/80 shadow-black/10'
          }`}>
            <CardHeader className={`transition-colors duration-500 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-[#2980B9]/20 to-[#3498DB]/20' 
                : 'bg-gradient-to-r from-[#2980B9]/10 to-[#3498DB]/10'
            }`}>
              <CardTitle className={`text-2xl font-bold flex items-center gap-3 transition-colors ${
                isDarkMode ? 'text-[#ECF0F1]' : 'text-[#2C3E50]'
              }`}>
                <div className="p-2 bg-gradient-to-r from-[#2980B9] to-[#3498DB] rounded-xl">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                Community Discussion ({issue.comments.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              {/* Add Comment */}
              <div className={`mb-8 p-6 rounded-2xl transition-colors ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-[#8E44AD]/20 to-[#2980B9]/20' 
                  : 'bg-gradient-to-r from-[#8E44AD]/10 to-[#2980B9]/10'
              }`}>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#8E44AD] to-[#2980B9] rounded-full flex items-center justify-center text-white font-bold shadow-lg text-sm">
                    You
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Share your thoughts about this issue..."
                      className={`w-full p-4 border-0 rounded-xl resize-none focus:ring-2 focus:ring-[#3498DB] transition-all ${
                        isDarkMode 
                          ? 'bg-[#2C3E50] text-[#ECF0F1] placeholder-[#ECF0F1]/50' 
                          : 'bg-white text-[#2C3E50] placeholder-[#34495E]/50'
                      }`}
                      rows={3}
                    />
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className={`rounded-lg border-2 transition-all ${
                            isDarkMode 
                              ? 'border-[#34495E] text-[#ECF0F1] hover:border-[#3498DB] hover:text-[#3498DB] hover:bg-[#3498DB]/10' 
                              : 'border-[#ECF0F1] text-[#2C3E50] hover:border-[#3498DB] hover:text-[#3498DB] hover:bg-[#3498DB]/10'
                          }`}
                        >
                          <Camera className="h-4 w-4 mr-2" />
                          Add Photo
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className={`rounded-lg border-2 transition-all ${
                            isDarkMode 
                              ? 'border-[#34495E] text-[#ECF0F1] hover:border-[#27AE60] hover:text-[#27AE60] hover:bg-[#27AE60]/10' 
                              : 'border-[#ECF0F1] text-[#2C3E50] hover:border-[#27AE60] hover:text-[#27AE60] hover:bg-[#27AE60]/10'
                          }`}
                        >
                          <Flag className="h-4 w-4 mr-2" />
                          Tag Location
                        </Button>
                      </div>
                      <Button 
                        onClick={handleCommentSubmit}
                        className="bg-gradient-to-r from-[#8E44AD] to-[#2980B9] hover:from-[#8E44AD]/90 hover:to-[#2980B9]/90 text-white rounded-xl font-bold shadow-lg"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Post Comment
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-6">
                {issue.comments.map((comment, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    className={`flex gap-4 p-6 rounded-2xl transition-all group ${
                      isDarkMode 
                        ? 'hover:bg-[#2C3E50]/30' 
                        : 'hover:bg-[#ECF0F1]/50'
                    }`}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-[#3498DB] to-[#2980B9] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                      {comment.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className={`font-bold transition-colors ${
                          isDarkMode ? 'text-[#ECF0F1]' : 'text-[#2C3E50]'
                        }`}>{comment.user}</h4>
                        <span className={`text-sm transition-colors ${
                          isDarkMode ? 'text-[#ECF0F1]/60' : 'text-[#34495E]/70'
                        }`}>{comment.date}</span>
                      </div>
                      <p className={`leading-relaxed mb-3 transition-colors ${
                        isDarkMode ? 'text-[#ECF0F1]/80' : 'text-[#2C3E50]'
                      }`}>{comment.text}</p>
                      <div className="flex items-center gap-4">
                        <button className={`flex items-center gap-2 transition-colors hover:text-[#E74C3C] ${
                          isDarkMode ? 'text-[#ECF0F1]/60' : 'text-[#34495E]/70'
                        }`}>
                          <Heart className="h-4 w-4" />
                          <span className="text-sm font-semibold">{comment.likes}</span>
                        </button>
                        <button className={`text-sm font-semibold transition-colors hover:text-[#8E44AD] ${
                          isDarkMode ? 'text-[#ECF0F1]/60' : 'text-[#34495E]/70'
                        }`}>
                          Reply
                        </button>
                        <button className={`text-sm font-semibold transition-colors hover:text-[#3498DB] ${
                          isDarkMode ? 'text-[#ECF0F1]/60' : 'text-[#34495E]/70'
                        }`}>
                          Share
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}