"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Upload, 
  Eye, 
  Moon, 
  Sun, 
  Menu, 
  X,
  CheckCircle,
  Clock,
  Users,
  TrendingUp,
  Calendar,
  FileText,
  Settings,
  Bell,
  Search,
  Download,
  MapPin,
  Activity,
  BarChart3,
  Zap,
  Shield
} from "lucide-react";
import Header from "@/components/layout/Header";

type ThemeToggleProps = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const ThemeToggle = ({ darkMode, setDarkMode }: ThemeToggleProps) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={() => setDarkMode(!darkMode)}
    className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white dark:bg-slate-800 shadow-lg border border-gray-200 dark:border-slate-700 transition-all duration-300"
  >
    {darkMode ? (
      <Sun className="h-5 w-5 text-yellow-500" />
    ) : (
      <Moon className="h-5 w-5 text-slate-600" />
    )}
  </motion.button>
);

type NavigationProps = {
  darkMode: boolean;
};



function StatusBadge({ status, children }: { status: "assigned" | "pending" | "resolved" | "urgent"; children: React.ReactNode }): React.JSX.Element {
  const statusStyles = {
    assigned: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700",
    pending: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-700",
    resolved: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700",
    urgent: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-700"
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${statusStyles[status] || statusStyles.pending}`}>
      {children}
    </span>
  );
}

const PriorityBadge = ({ priority }: { priority: "urgent" | "high" | "medium" | "low" }) => {
  const priorityStyles = {
    urgent: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-700",
    high: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-700",
    medium: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700",
    low: "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700"
  };
  
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold border ${priorityStyles[priority]}`}>
      {priority.toUpperCase()}
    </span>
  );
};

type AnimatedCardProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

const AnimatedCard = ({ children, className = "", delay = 0 }: AnimatedCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ 
      y: -2,
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    }}
    className={`bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 ${className}`}
  >
    {children}
  </motion.div>
);

const StatCard = ({
  icon: Icon,
  title,
  value,
  description,
  color = "teal",
  delay = 0
}: {
  icon: React.ComponentType<{ className?: string }>,
  title: string,
  value: string,
  description: string,
  color?: "teal" | "blue" | "green" | "orange" | "purple",
  delay?: number
}) => {
  const colorClasses = {
    teal: "from-teal-500 to-teal-600 text-teal-600 dark:text-teal-400",
    blue: "from-blue-500 to-blue-600 text-blue-600 dark:text-blue-400", 
    green: "from-green-500 to-green-600 text-green-600 dark:text-green-400",
    orange: "from-orange-500 to-orange-600 text-orange-600 dark:text-orange-400",
    purple: "from-purple-500 to-purple-600 text-purple-600 dark:text-purple-400"
  };
  
  return (
    <AnimatedCard delay={delay}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 bg-gradient-to-br ${colorClasses[color]} rounded-xl flex items-center justify-center`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className={`text-xs font-semibold px-2 py-1 rounded-full bg-${color}-50 dark:bg-${color}-900/20 ${colorClasses[color].split(' ')[2]}`}
          >
            Live
          </motion.div>
        </div>
        <div className="space-y-1">
          <div className="text-3xl font-bold text-slate-800 dark:text-white">{value}</div>
          <div className="text-sm font-medium text-slate-600 dark:text-slate-300">{title}</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">{description}</div>
        </div>
      </div>
    </AnimatedCard>
  );
};

export default function OrganizationPanel() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("ngo");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const assignedIssues = [
    {
      id: "CS-001",
      category: "Water Supply",
      location: "Sector 14, Urbanville",
      status: "assigned",
      priority: "high",
      assignedDate: "2024-01-15",
      description: "Water pipeline burst causing supply disruption"
    },
    {
      id: "CS-005", 
      category: "Sanitation",
      location: "Market Street, Central City",
      status: "pending",
      priority: "medium",
      assignedDate: "2024-01-18",
      description: "Garbage collection not happening regularly"
    },
    {
      id: "CS-008",
      category: "Infrastructure",
      location: "Old Town Bridge, Heritage District", 
      status: "pending",
      priority: "urgent",
      assignedDate: "2024-01-20",
      description: "Bridge showing structural damage"
    },
    {
      id: "CS-012",
      category: "Electricity",
      location: "Main Road, Green Park",
      status: "assigned",
      priority: "high",
      assignedDate: "2024-01-22",
      description: "Street lights not working"
    },
    {
      id: "CS-015",
      category: "Fire Safety",
      location: "Industrial Zone, West End",
      status: "resolved",
      priority: "urgent",
      assignedDate: "2024-01-10",
      description: "Fire safety equipment inspection needed"
    }
  ];

  const filteredIssues = assignedIssues.filter(issue => {
    const matchesRegion = selectedRegion === "all" || issue.location.toLowerCase().includes(selectedRegion);
    const matchesPriority = selectedPriority === "all" || issue.priority === selectedPriority;
    const matchesSearch = issue.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRegion && matchesPriority && matchesSearch;
  });

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-500`}>
      <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      <Header darkMode={darkMode} />
      
      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-2">
                  Organization Dashboard
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-300">
                  Manage and track assigned civic issues efficiently
                </p>
              </div>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 bg-gradient-to-r from-teal-600 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                  <Download className="h-4 w-4" />
                  <span>Export Report</span>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex space-x-1 bg-gray-100 dark:bg-slate-800 p-1 rounded-xl">
              {[
                { id: "ngo", label: "NGO Dashboard", icon: Users },
                { id: "authority", label: "Authority Dashboard", icon: Shield }
              ].map(({ id, label, icon: Icon }) => (
                <motion.button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    activeTab === id
                      ? "bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-400 shadow-sm"
                      : "text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="h-5 w-5" />
                  <span>{label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {activeTab === "ngo" && (
              <motion.div
                key="ngo"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <StatCard
                    icon={Activity}
                    title="Active Issues"
                    value="12"
                    description="Currently assigned"
                    color="teal"
                    delay={0}
                  />
                  <StatCard
                    icon={CheckCircle}
                    title="Resolved"
                    value="34"
                    description="This month"
                    color="green"
                    delay={0.1}
                  />
                  <StatCard
                    icon={Clock}
                    title="Avg Resolution"
                    value="4.2 days"
                    description="Current average"
                    color="blue"
                    delay={0.2}
                  />
                  <StatCard
                    icon={TrendingUp}
                    title="Efficiency"
                    value="94%"
                    description="Success rate"
                    color="purple"
                    delay={0.3}
                  />
                </div>

                {/* Main Issues Table */}
                <AnimatedCard delay={0.4}>
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                      <div>
                        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
                          Assigned Issues
                        </h2>
                        <p className="text-slate-600 dark:text-slate-300">
                          Track and update the status of issues assigned to your organization
                        </p>
                      </div>
                      
                      {/* Filters and Search */}
                      <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                          <input
                            type="text"
                            placeholder="Search issues..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                          />
                        </div>
                        
                        <select
                          value={selectedRegion}
                          onChange={(e) => setSelectedRegion(e.target.value)}
                          className="px-4 py-2 border border-gray-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                        >
                          <option value="all">All Regions</option>
                          <option value="central">Central City</option>
                          <option value="urbanville">Urbanville</option>
                          <option value="heritage">Heritage District</option>
                        </select>
                        
                        <select
                          value={selectedPriority}
                          onChange={(e) => setSelectedPriority(e.target.value)}
                          className="px-4 py-2 border border-gray-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                        >
                          <option value="all">All Priorities</option>
                          <option value="urgent">Urgent</option>
                          <option value="high">High</option>
                          <option value="medium">Medium</option>
                        </select>
                      </div>
                    </div>

                    {/* Issues Table */}
                    <div className="overflow-x-auto">
  <table className="w-full">
    <thead>
      <tr className="border-b border-gray-200 dark:border-slate-700">
        <th className="text-left py-3 px-4 font-semibold text-slate-800 dark:text-white">Issue ID</th>
        <th className="text-left py-3 px-4 font-semibold text-slate-800 dark:text-white">Category</th>
        <th className="text-left py-3 px-4 font-semibold text-slate-800 dark:text-white">Location</th>
        <th className="text-left py-3 px-4 font-semibold text-slate-800 dark:text-white">Priority</th>
        <th className="text-left py-3 px-4 font-semibold text-slate-800 dark:text-white">Status</th>
        <th className="text-left py-3 px-4 font-semibold text-slate-800 dark:text-white">Actions</th>
      </tr> 
      {/* ✅ fixed: was </motion.tr>, should be </tr> */}
    </thead>

    <tbody>
      {filteredIssues.map((issue, index) => (
        <motion.tr
          key={issue.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors duration-200"
        >
          <td className="py-4 px-4">
            <div className="font-medium text-slate-800 dark:text-white">{issue.id}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {new Date(issue.assignedDate).toLocaleDateString()}
            </div>
          </td>

          <td className="py-4 px-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
              <span className="text-slate-700 dark:text-slate-300">{issue.category}</span>
            </div>
          </td>

          <td className="py-4 px-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-slate-500" />
              <span className="text-slate-700 dark:text-slate-300">{issue.location}</span>
            </div>
          </td>

          <td className="py-4 px-4">
            <PriorityBadge priority={issue.priority as "urgent" | "high" | "medium" | "low"} />
          </td>

          <td className="py-4 px-4">
            <StatusBadge status={issue.status as "assigned" | "pending" | "urgent" | "resolved"}>
              {issue.status === "assigned" ? "Assigned" : 
               issue.status === "pending" ? "Under Review" : 
               issue.status === "resolved" ? "Resolved" :
               "Pending"}
            </StatusBadge>
          </td>

          <td className="py-4 px-4">
            <div className="flex items-center space-x-2">
              {/* Status select */}
              <select className="px-3 py-1 text-sm border border-gray-200 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-800 dark:text-white">
                <option value={issue.status}>
                  {issue.status === "assigned" ? "Assigned" : 
                   issue.status === "pending" ? "Under Review" : 
                   issue.status === "resolved" ? "Resolved" : "Pending"}
                </option>
                <option value="assigned">Assigned</option>
                <option value="pending">Under Review</option>
                <option value="resolved">Resolved</option>
              </select>
              
              {/* Upload button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-1 px-3 py-1 text-sm bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-700 rounded-md hover:bg-teal-100 dark:hover:bg-teal-900/50 transition-colors duration-200"
              >
                <Upload className="h-3 w-3" />
                <span>Upload</span>
              </motion.button>
              
              {/* View button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-1 text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200"
              >
                <Eye className="h-4 w-4" />
              </motion.button>
            </div>
          </td>
        </motion.tr>
      ))}
    </tbody>
  </table>
</div>

                  </div>
                </AnimatedCard>
              </motion.div>
            )}

            {activeTab === "authority" && (
              <motion.div
                key="authority"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Authority Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <StatCard
                    icon={BarChart3}
                    title="Total Issues"
                    value="47"
                    description="Active across city"
                    color="blue"
                    delay={0}
                  />
                  <StatCard
                    icon={CheckCircle}
                    title="Resolved"
                    value="23"
                    description="This month"
                    color="green"
                    delay={0.1}
                  />
                  <StatCard
                    icon={Clock}
                    title="Avg Time"
                    value="5.2 days"
                    description="Resolution time"
                    color="orange"
                    delay={0.2}
                  />
                  <StatCard
                    icon={Users}
                    title="NGO Partners"
                    value="156"
                    description="Active partnerships"
                    color="purple"
                    delay={0.3}
                  />
                </div>

                {/* Authority Dashboard Content */}
                <AnimatedCard delay={0.4}>
                  <div className="p-8 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Settings className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
                      Authority Dashboard
                    </h3>
                    <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-md mx-auto">
                      Advanced monitoring and assignment features for civic authorities are being developed.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                    >
                      Request Early Access
                    </motion.button>
                  </div>
                </AnimatedCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(20, 184, 166, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20, 184, 166, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>
    </div>
  );
}