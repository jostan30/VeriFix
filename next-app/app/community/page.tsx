"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  ThumbsUp, MessageCircle, MapPin, Share2, Heart, Bookmark, MoreHorizontal, 
  Camera, Users, TrendingUp, Award, Filter, Search, Bell, Moon, Sun,
  ChevronDown, X, Plus, Eye, Clock, CheckCircle, AlertCircle, 
  Send, Image, Video, Mic, Smile, Tag, Navigation, Star,
  Settings, User, LogOut, Home, FileText, BarChart3, MessageSquare,
  Zap, Shield, Globe, Calendar, ArrowUp, ArrowDown, Reply,
  Edit3, Flag, Share, Download, Upload, RefreshCw, Trash2,
  ThumbsDown, MoreVertical, ExternalLink, Copy, VolumeX, Volume2
} from "lucide-react";

// Enhanced types
type NotificationType = 'like' | 'comment' | 'mention' | 'status_update' | 'achievement';

type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timeAgo: string;
  read: boolean;
  avatar?: string;
  postId?: string;
};

type Achievement = {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
};

type User = {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  location: string;
  joinedDate: string;
  reputation: number;
  achievements: Achievement[];
  followers: number;
  following: number;
  postsCount: number;
  verified: boolean;
};

type Poll = {
  id: string;
  question: string;
  options: { text: string; votes: number }[];
  totalVotes: number;
  userVote?: number;
  endDate: string;
};

type Reply = {
  id: string;
  user: string;
  userId: string;
  avatar: string;
  text: string;
  timeAgo: string;
  official?: boolean;
  likes: number;
  isLiked?: boolean;
  replies?: Reply[];
  edited?: boolean;
  pinned?: boolean;
};

type Post = {
  id: string;
  author: string;
  authorId: string;
  avatar: string;
  timeAgo: string;
  title: string;
  category: string;
  status: string;
  location: string;
  coordinates?: { lat: number; lng: number };
  images?: string[];
  videos?: string[];
  description: string;
  likes: number;
  dislikes: number;
  comments: number;
  shares: number;
  views: number;
  isLiked: boolean;
  isDisliked: boolean;
  isBookmarked: boolean;
  isFollowing: boolean;
  verified: boolean;
  replies: Reply[];
  priority: 'low' | 'medium' | 'high' | 'urgent';
  tags: string[];
  poll?: Poll;
  progress?: number;
  estimatedCost?: string;
  estimatedTime?: string;
  assignedTeam?: string;
  updateHistory: Array<{
    date: string;
    status: string;
    note: string;
    author: string;
  }>;
  donations?: {
    goal: number;
    raised: number;
    donors: number;
  };
  volunteers?: {
    needed: number;
    signed: number;
  };
  pinned?: boolean;
  archived?: boolean;
  sensitive?: boolean;
  anonymous?: boolean;
};

// Mock data with enhanced features
const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "status_update",
    title: "Issue Updated",
    message: "Pothole on Main Street has been marked as 'In Progress'",
    timeAgo: "5 minutes ago",
    read: false,
    postId: "1"
  },
  {
    id: "2",
    type: "like",
    title: "Post Liked",
    message: "Sarah Chen liked your comment on Park Avenue streetlights",
    timeAgo: "1 hour ago",
    read: false,
    avatar: "SC"
  },
  {
    id: "3",
    type: "achievement",
    title: "New Achievement!",
    message: "You've earned the 'Community Hero' badge for 50 helpful reports",
    timeAgo: "2 hours ago",
    read: true
  }
];

const mockPosts: Post[] = [
  {
    id: "1",
    author: "Alice Johnson",
    authorId: "alice_j",
    avatar: "AJ",
    timeAgo: "2 hours ago",
    title: "Pothole on Main Street Causing Traffic Hazards",
    category: "Infrastructure",
    status: "In Progress",
    priority: "urgent",
    location: "Main St & Oak Ave",
    coordinates: { lat: 40.7128, lng: -74.0060 },
    images: ["/api/placeholder/600/300", "/api/placeholder/600/300"],
    description: "A large pothole has developed on Main Street near the intersection with Oak Avenue. It is causing drivers to swerve and could lead to accidents. Urgent repair is needed. Update: City crew has been dispatched and materials are being prepared.",
    likes: 125,
    dislikes: 3,
    comments: 18,
    shares: 5,
    views: 1240,
    isLiked: false,
    isDisliked: false,
    isBookmarked: true,
    isFollowing: false,
    verified: true,
    tags: ["#RoadSafety", "#MainStreet", "#Emergency"],
    progress: 35,
    estimatedCost: "$2,500",
    estimatedTime: "3-5 days",
    assignedTeam: "Public Works Dept",
    donations: {
      goal: 5000,
      raised: 1750,
      donors: 23
    },
    volunteers: {
      needed: 5,
      signed: 3
    },
    updateHistory: [
      {
        date: "2 hours ago",
        status: "Reported",
        note: "Issue reported by community member",
        author: "Alice Johnson"
      },
      {
        date: "1 hour ago",
        status: "Acknowledged",
        note: "City officials have acknowledged the issue",
        author: "CivicAdmin"
      },
      {
        date: "30 minutes ago",
        status: "In Progress",
        note: "Work crew dispatched to location",
        author: "PublicWorks"
      }
    ],
    replies: [
      { 
        id: "r1",
        user: "Bob Williams", 
        userId: "bob_w",
        avatar: "BW", 
        text: "I almost hit it last night! Very dangerous.", 
        timeAgo: "1h", 
        official: false,
        likes: 12,
        isLiked: false
      },
      { 
        id: "r2",
        user: "CivicAdmin", 
        userId: "civic_admin",
        avatar: "CA", 
        text: "Thank you for reporting. Team dispatched and work should begin tomorrow morning.", 
        timeAgo: "30m", 
        official: true,
        likes: 45,
        isLiked: true,
        pinned: true
      },
    ],
    pinned: false,
    archived: false,
    sensitive: false,
    anonymous: false
  },
  {
    id: "2",
    author: "David Lee",
    authorId: "david_l",
    avatar: "DL",
    timeAgo: "1 day ago",
    title: "Streetlights Out on Park Avenue - Safety Concern",
    category: "Public Safety",
    status: "Resolved",
    priority: "high",
    location: "Park Ave (near school)",
    coordinates: { lat: 40.7589, lng: -73.9851 },
    images: ["/api/placeholder/600/300"],
    description: "Several streetlights are out along Park Avenue, making it very dark and unsafe for pedestrians at night, especially near the school. This affects the safety of children walking home and evening commuters.",
    likes: 210,
    dislikes: 1,
    comments: 35,
    shares: 12,
    views: 2100,
    isLiked: true,
    isDisliked: false,
    isBookmarked: false,
    isFollowing: true,
    verified: false,
    tags: ["#StreetLights", "#Safety", "#School"],
    progress: 100,
    estimatedCost: "$1,200",
    estimatedTime: "2 days",
    assignedTeam: "Electrical Services",
    poll: {
      id: "poll1",
      question: "What time should street lights automatically turn on?",
      options: [
        { text: "6:00 PM", votes: 45 },
        { text: "7:00 PM", votes: 78 },
        { text: "Sunset time", votes: 123 },
        { text: "8:00 PM", votes: 12 }
      ],
      totalVotes: 258,
      userVote: 2,
      endDate: "2024-01-15"
    },
    updateHistory: [
      {
        date: "1 day ago",
        status: "Reported",
        note: "Multiple streetlights reported out",
        author: "David Lee"
      },
      {
        date: "12 hours ago",
        status: "In Progress",
        note: "Electrical team dispatched",
        author: "ElectricalServices"
      },
      {
        date: "2 hours ago",
        status: "Resolved",
        note: "All streetlights repaired and tested",
        author: "ElectricalServices"
      }
    ],
    replies: [
      { 
        id: "r3",
        user: "Sarah Chen", 
        userId: "sarah_c",
        avatar: "SC", 
        text: "Great to see this fixed so quickly! Much safer now.", 
        timeAgo: "2h", 
        official: false,
        likes: 28,
        isLiked: true
      },
      { 
        id: "r4",
        user: "Alex Green", 
        userId: "alex_g",
        avatar: "AG", 
        text: "Thank you to everyone who reported this. Community action works!", 
        timeAgo: "1h", 
        official: false,
        likes: 15,
        isLiked: false
      },
    ],
    pinned: false,
    archived: false,
    sensitive: false,
    anonymous: false
  }
];

const trendingTopics = [
  { tag: "#RoadSafety", posts: "1.2k", trending: true },
  { tag: "#StreetLights", posts: "856", trending: false },
  { tag: "#GreenInitiative", posts: "632", trending: true },
  { tag: "#CommunityCleanup", posts: "445", trending: false },
  { tag: "#TrafficSafety", posts: "324", trending: true },
];

const topContributors = [
  { 
    name: "Alice Johnson", 
    points: "2.4k", 
    badge: "Top Reporter",
    avatar: "AJ",
    change: "+12%",
    verified: true
  },
  { 
    name: "David Lee", 
    points: "1.8k", 
    badge: "Safety Advocate",
    avatar: "DL",
    change: "+8%",
    verified: false
  },
  { 
    name: "Emily White", 
    points: "1.5k", 
    badge: "Eco Warrior",
    avatar: "EW",
    change: "+15%",
    verified: true
  },
];

export default function CommunityFeed() {
  // State management
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [activeFilter, setActiveFilter] = useState("All");
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [sortBy, setSortBy] = useState("recent");
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostCategory, setNewPostCategory] = useState("Infrastructure");
  const [newPostLocation, setNewPostLocation] = useState("");
  const [selectedPriority, setSelectedPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [locationFilter, setLocationFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [showComments, setShowComments] = useState<Record<string, boolean>>({});
  const [commentText, setCommentText] = useState<Record<string, string>>({});
  const [expandedPosts, setExpandedPosts] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Refs
  const notificationRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Dark mode toggle
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', (!darkMode).toString());
  };

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Enhanced interaction handlers
  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            isDisliked: post.isLiked ? post.isDisliked : false,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            dislikes: post.isLiked ? post.dislikes : (post.isDisliked ? post.dislikes - 1 : post.dislikes)
          }
        : post
    ));
    
    if (soundEnabled) {
      // Play sound effect
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmAZBzuZz/LJdyQFLHDH8+CTQAYWYLLF6qNODAhGm9/xy2EcBzWa0fPAgCQIM2vG8+OVQAoTWbHy6atJDQxBm+T2yMRgqfWF3OFGNAwAyM4HBYIHkbPM2Z1NWLtfYEo6vSFe5wGR7TDPMEhREYm7JXxZEOHUrVQgjG7cw8p/fIw6vSFe5wGR7TDPMEhREYm7JXxZEOHUrVQgjG7cw8p/fIw6vSFe5wGR7TDPMEhREYm7JXxZEOHUrVQgjG7cw8p/fIw=');
      audio.volume = 0.1;
      audio.play().catch(() => {});
    }
  };

  const handleDislike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isDisliked: !post.isDisliked,
            isLiked: post.isDisliked ? post.isLiked : false,
            dislikes: post.isDisliked ? post.dislikes - 1 : post.dislikes + 1,
            likes: post.isDisliked ? post.likes : (post.isLiked ? post.likes - 1 : post.likes)
          }
        : post
    ));
  };

  const handleBookmark = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isBookmarked: !post.isBookmarked }
        : post
    ));
  };

  const handleFollow = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isFollowing: !post.isFollowing }
        : post
    ));
  };

  const handleShare = (post: Post) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.description,
        url: window.location.href + '/post/' + post.id,
      });
    } else {
      navigator.clipboard.writeText(window.location.href + '/post/' + post.id);
      // Show toast notification
    }
    
    setPosts(posts.map(p => 
      p.id === post.id 
        ? { ...p, shares: p.shares + 1 }
        : p
    ));
  };

  const handleViewPost = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, views: post.views + 1 }
        : post
    ));
  };

  const toggleComments = (postId: string) => {
    setShowComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleAddComment = (postId: string) => {
    const comment = commentText[postId]?.trim();
    if (!comment) return;

    const newReply: Reply = {
      id: `r${Date.now()}`,
      user: "You",
      userId: "current_user",
      avatar: "YU",
      text: comment,
      timeAgo: "now",
      official: false,
      likes: 0,
      isLiked: false
    };

    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            replies: [...post.replies, newReply],
            comments: post.comments + 1
          }
        : post
    ));

    setCommentText(prev => ({
      ...prev,
      [postId]: ""
    }));
  };

  const handleVotePoll = (postId: string, optionIndex: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId && post.poll) {
        const updatedOptions = post.poll.options.map((option, index) => ({
          ...option,
          votes: index === optionIndex ? option.votes + 1 : 
                 (index === post.poll!.userVote ? option.votes - 1 : option.votes)
        }));
        
        return {
          ...post,
          poll: {
            ...post.poll,
            options: updatedOptions,
            totalVotes: post.poll.userVote !== undefined 
              ? post.poll.totalVotes 
              : post.poll.totalVotes + 1,
            userVote: optionIndex
          }
        };
      }
      return post;
    }));
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === notificationId 
        ? { ...notif, read: true }
        : notif
    ));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const handleCreatePost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    const newPost: Post = {
      id: Date.now().toString(),
      author: "You",
      authorId: "current_user",
      avatar: "YU",
      timeAgo: "now",
      title: newPostTitle,
      category: newPostCategory,
      status: "New",
      priority: selectedPriority,
      location: newPostLocation,
      description: newPostContent,
      likes: 0,
      dislikes: 0,
      comments: 0,
      shares: 0,
      views: 1,
      isLiked: false,
      isDisliked: false,
      isBookmarked: false,
      isFollowing: false,
      verified: false,
      tags: extractHashtags(newPostContent + " " + newPostTitle),
      replies: [],
      updateHistory: [{
        date: "now",
        status: "New",
        note: "Issue reported by community member",
        author: "You"
      }],
      pinned: false,
      archived: false,
      sensitive: false,
      anonymous: false
    };

    setPosts([newPost, ...posts]);
    setShowCreatePost(false);
    setNewPostTitle("");
    setNewPostContent("");
    setNewPostLocation("");
    setSelectedPriority('medium');
  };

  const extractHashtags = (text: string): string[] => {
    const hashtags = text.match(/#\w+/g) || [];
    return [...new Set(hashtags)];
  };

  // Filtering and sorting logic
  const filteredPosts = posts.filter(post => {
    const matchesSearch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = activeFilter === "All" || post.category === activeFilter;
    const matchesLocation = locationFilter === "" || 
      post.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesStatus = statusFilter === "All" || post.status === statusFilter;
    const matchesPriority = priorityFilter === "All" || post.priority === priorityFilter;
    
    return matchesSearch && matchesCategory && matchesLocation && matchesStatus && matchesPriority;
  }).sort((a, b) => {
    switch(sortBy) {
      case "popular": return b.likes - a.likes;
      case "comments": return b.comments - a.comments;
      case "recent": 
      default: return new Date(b.timeAgo).getTime() - new Date(a.timeAgo).getTime();
    }
  });

  // Style helpers
  const getStatusColor = (status: string) => {
    const colors = {
      "Urgent": darkMode ? "bg-red-900/20 text-red-400 border-red-800/30" : "bg-red-100 text-red-700 border-red-200",
      "In Progress": darkMode ? "bg-yellow-900/20 text-yellow-400 border-yellow-800/30" : "bg-yellow-100 text-yellow-700 border-yellow-200",
      "New": darkMode ? "bg-blue-900/20 text-blue-400 border-blue-800/30" : "bg-blue-100 text-blue-700 border-blue-200",
      "Resolved": darkMode ? "bg-green-900/20 text-green-400 border-green-800/30" : "bg-green-100 text-green-700 border-green-200",
    };
    return colors[status as keyof typeof colors] || (darkMode ? "bg-gray-800/20 text-gray-400 border-gray-700/30" : "bg-gray-100 text-gray-700 border-gray-200");
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      "Infrastructure": darkMode ? "bg-slate-800/20 text-slate-400 border-slate-700/30" : "bg-slate-100 text-slate-700 border-slate-200",
      "Public Safety": darkMode ? "bg-orange-900/20 text-orange-400 border-orange-800/30" : "bg-orange-100 text-orange-700 border-orange-200",
      "Environment": darkMode ? "bg-emerald-900/20 text-emerald-400 border-emerald-800/30" : "bg-emerald-100 text-emerald-700 border-emerald-200",
    };
    return colors[category as keyof typeof colors] || (darkMode ? "bg-gray-800/20 text-gray-400 border-gray-700/30" : "bg-gray-100 text-gray-700 border-gray-200");
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      "urgent": darkMode ? "bg-red-900/20 text-red-400" : "bg-red-100 text-red-700",
      "high": darkMode ? "bg-orange-900/20 text-orange-400" : "bg-orange-100 text-orange-700",
      "medium": darkMode ? "bg-yellow-900/20 text-yellow-400" : "bg-yellow-100 text-yellow-700",
      "low": darkMode ? "bg-green-900/20 text-green-400" : "bg-green-100 text-green-700",
    };
    return colors[priority as keyof typeof colors] || "";
  };

  const filters = ["All", "Infrastructure", "Public Safety", "Environment", "Transportation", "Community"];
  const sortOptions = [
    { value: "recent", label: "Most Recent" },
    { value: "popular", label: "Most Popular" },
    { value: "comments", label: "Most Discussed" }
  ];

  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gray-900 text-white' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Enhanced Header */}
      <header className={`sticky top-0 z-50 transition-colors duration-300 ${
        darkMode 
          ? 'bg-gray-800/95 backdrop-blur-lg border-b border-gray-700' 
          : 'bg-white/95 backdrop-blur-lg border-b border-gray-200'
      } shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg bg-gradient-to-r from-teal-500 to-teal-600">
                  V
                </div>
                <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  VeriFix
                </span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search posts, users, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 rounded-full border transition-colors ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-teal-500' 
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-teal-500'
                  } focus:outline-none focus:ring-2 focus:ring-teal-500/20`}
                />
              </div>
            </div>

            {/* Navigation & Actions */}
            <div className="flex items-center space-x-4">
              {/* Navigation Links */}
              <nav className="hidden lg:flex space-x-6">
                <a href="/" className={`transition-colors ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Home</a>
                <a href="/reportissues" className={`transition-colors ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Report</a>
                <a href="#" className={`transition-colors ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Progress</a>
                <a href="/community" className={`font-medium transition-colors ${darkMode ? 'text-teal-400' : 'text-teal-600'}`}>Community</a>
                <a href="/dashboard" className={`transition-colors ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Dashboard</a>
              </nav>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full transition-all ${
                  darkMode 
                    ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Sound Toggle */}
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-2 rounded-full transition-all ${
                  darkMode 
                    ? 'bg-gray-700 hover:bg-gray-600' 
                    : 'bg-gray-100 hover:bg-gray-200'
                } ${soundEnabled ? 'text-teal-500' : 'text-gray-400'}`}
              >
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>

              {/* Notifications */}
              <div className="relative" ref={notificationRef}>
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`p-2 rounded-full transition-all relative ${
                    darkMode 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                  }`}
                >
                  <Bell className="w-5 h-5" />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                      {unreadNotifications > 9 ? '9+' : unreadNotifications}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className={`absolute right-0 mt-2 w-80 rounded-xl shadow-xl z-50 ${
                    darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                  }`}>
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg">Notifications</h3>
                        {notifications.length > 0 && (
                          <button 
                            onClick={clearAllNotifications}
                            className="text-sm text-teal-500 hover:text-teal-600"
                          >
                            Clear All
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-6 text-center text-gray-500">
                          <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <p>No notifications yet</p>
                        </div>
                      ) : (
                        notifications.map((notification) => (
                          <div 
                            key={notification.id}
                            onClick={() => markNotificationAsRead(notification.id)}
                            className={`p-4 border-b border-gray-100 dark:border-gray-700 last:border-b-0 cursor-pointer transition-colors ${
                              !notification.read 
                                ? (darkMode ? 'bg-gray-700/50' : 'bg-blue-50') 
                                : 'hover:bg-gray-50 dark:hover:bg-gray-700/30'
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              {notification.avatar && (
                                <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white text-sm font-bold">
                                  {notification.avatar}
                                </div>
                              )}
                              <div className="flex-1">
                                <p className={`font-medium text-sm ${!notification.read ? 'text-teal-600 dark:text-teal-400' : ''}`}>
                                  {notification.title}
                                </p>
                                <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                  {notification.message}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">{notification.timeAgo}</p>
                              </div>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* User Menu */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold hover:shadow-lg transition-all"
                >
                  You
                </button>

                {/* User Dropdown */}
                {showUserMenu && (
                  <div className={`absolute right-0 mt-2 w-64 rounded-xl shadow-xl z-50 ${
                    darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                  }`}>
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold">
                          You
                        </div>
                        <div>
                          <p className="font-bold">Your Name</p>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Community Member</p>
                        </div>
                      </div>
                    </div>
                    <div className="py-2">
                      <button className={`w-full text-left px-4 py-2 flex items-center space-x-3 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                        <User className="w-4 h-4" />
                        <span>Profile</span>
                      </button>
                      <button className={`w-full text-left px-4 py-2 flex items-center space-x-3 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </button>
                      <button className={`w-full text-left px-4 py-2 flex items-center space-x-3 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                        <BarChart3 className="w-4 h-4" />
                        <span>My Reports</span>
                      </button>
                      <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
                        <button className={`w-full text-left px-4 py-2 flex items-center space-x-3 text-red-500 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Create Post Button */}
              <button
                onClick={() => setShowCreatePost(true)}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium transition-all hover:shadow-lg hover:from-teal-600 hover:to-teal-700 flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Report Issue</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Create Post Modal */}
      {showCreatePost && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-2xl rounded-xl shadow-2xl ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Report New Issue</h2>
                <button
                  onClick={() => setShowCreatePost(false)}
                  className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <input
                type="text"
                placeholder="Issue title..."
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-gray-50 border-gray-300 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-teal-500`}
              />
              <div className="grid grid-cols-2 gap-4">
                <select
                  value={newPostCategory}
                  onChange={(e) => setNewPostCategory(e.target.value)}
                  className={`px-4 py-3 rounded-lg border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-gray-50 border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-teal-500`}
                >
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Public Safety">Public Safety</option>
                  <option value="Environment">Environment</option>
                  <option value="Transportation">Transportation</option>
                </select>
                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value as 'low' | 'medium' | 'high' | 'urgent')}
                  className={`px-4 py-3 rounded-lg border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-gray-50 border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-teal-500`}
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              <input
                type="text"
                placeholder="Location (e.g., Main St & Oak Ave)"
                value={newPostLocation}
                onChange={(e) => setNewPostLocation(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-gray-50 border-gray-300 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-teal-500`}
              />
              <textarea
                placeholder="Describe the issue in detail..."
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                rows={4}
                className={`w-full px-4 py-3 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-gray-50 border-gray-300 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none`}
              />
              <div className="flex items-center justify-between">
                <div className="flex space-x-3">
                  <button className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                    <Camera className="w-5 h-5 text-teal-500" />
                  </button>
                  <button className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                    <Navigation className="w-5 h-5 text-teal-500" />
                  </button>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowCreatePost(false)}
                    className={`px-6 py-2 rounded-lg font-medium ${
                      darkMode 
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreatePost}
                    disabled={!newPostTitle.trim() || !newPostContent.trim()}
                    className="px-6 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium hover:from-teal-600 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Report Issue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Sidebar - Enhanced Community Stats */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              
              {/* Community Overview */}
              <div className={`rounded-xl p-6 shadow-sm border transition-colors ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              }`}>
                <h3 className="font-bold text-lg mb-4 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-teal-500" />
                  Community Impact
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Active Issues</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-red-500">247</span>
                      <ArrowUp className="w-3 h-3 text-red-500" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Resolved Today</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-green-500">12</span>
                      <ArrowUp className="w-3 h-3 text-green-500" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Contributors</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-blue-500">1.2k</span>
                      <ArrowUp className="w-3 h-3 text-blue-500" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Response Time</span>
                    <span className="font-bold text-teal-500">2.3h avg</span>
                  </div>
                </div>
              </div>

              {/* Trending Topics */}
              <div className={`rounded-xl p-6 shadow-sm border transition-colors ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              }`}>
                <h3 className="font-bold text-lg mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-orange-500" />
                  Trending
                </h3>
                <div className="space-y-3">
                  {trendingTopics.map((topic, index) => (
                    <div key={index} className="flex justify-between items-center group cursor-pointer">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-teal-500 group-hover:text-teal-600 transition-colors">
                          {topic.tag}
                        </span>
                        {topic.trending && (
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        )}
                      </div>
                      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {topic.posts}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Contributors */}
              <div className={`rounded-xl p-6 shadow-sm border transition-colors ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              }`}>
                <h3 className="font-bold text-lg mb-4 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-yellow-500" />
                  Top Contributors
                </h3>
                <div className="space-y-3">
                  {topContributors.map((contributor, index) => (
                    <div key={index} className="flex items-center space-x-3 group cursor-pointer">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold group-hover:shadow-lg transition-all">
                          {contributor.avatar}
                        </div>
                        {index < 3 && (
                          <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                            index === 0 ? 'bg-yellow-500 text-white' : 
                            index === 1 ? 'bg-gray-400 text-white' : 
                            'bg-amber-600 text-white'
                          }`}>
                            {index + 1}
                          </div>
                        )}
                        {contributor.verified && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-teal-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <p className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {contributor.name}
                          </p>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            contributor.change.startsWith('+') 
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                              : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                          }`}>
                            {contributor.change}
                          </span>
                        </div>
                        <p className="text-xs text-teal-500">{contributor.badge}</p>
                      </div>
                      <span className="text-sm font-bold text-orange-500">{contributor.points}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className={`rounded-xl p-6 shadow-sm border transition-colors ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              }`}>
                <h3 className="font-bold text-lg mb-4">Quick Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-teal-500">98%</div>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Satisfaction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-500">24h</div>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Avg Response</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-500">1.8k</div>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>This Month</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-500">95%</div>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Resolved</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-2">
            {/* Enhanced Feed Header */}
            <div className="mb-6">
              <h1 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Community Feed
              </h1>
              
              {/* Mobile Search */}
              <div className="md:hidden mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                      darkMode 
                        ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 placeholder-gray-500'
                    } focus:outline-none focus:ring-2 focus:ring-teal-500`}
                  />
                </div>
              </div>

              {/* Filter Controls */}
              <div className="flex flex-wrap gap-4 mb-6">
                {/* Category Filters */}
                <div className="flex space-x-2 overflow-x-auto">
                  {filters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                        activeFilter === filter
                          ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-md'
                          : darkMode
                            ? 'bg-gray-800 text-gray-300 hover:text-white border border-gray-700'
                            : 'bg-white text-gray-600 hover:text-gray-800 border border-gray-200'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>

                {/* Sort & Advanced Filters */}
                <div className="flex space-x-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className={`px-4 py-2 rounded-lg border text-sm ${
                      darkMode 
                        ? 'bg-gray-800 border-gray-700 text-white' 
                        : 'bg-white border-gray-200 text-gray-700'
                    } focus:outline-none focus:ring-2 focus:ring-teal-500`}
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  
                  <button
                    onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                    className={`p-2 rounded-lg border transition-all ${
                      showAdvancedFilters
                        ? 'bg-teal-500 text-white border-teal-500'
                        : darkMode
                          ? 'bg-gray-800 border-gray-700 text-gray-300 hover:text-white'
                          : 'bg-white border-gray-200 text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    <Filter className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Advanced Filters */}
              {showAdvancedFilters && (
                <div className={`rounded-lg p-4 mb-6 border ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <input
                      type="text"
                      placeholder="Location..."
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                      className={`px-3 py-2 rounded-lg border text-sm ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 placeholder-gray-500'
                      } focus:outline-none focus:ring-2 focus:ring-teal-500`}
                    />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className={`px-3 py-2 rounded-lg border text-sm ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-teal-500`}
                    >
                      <option value="All">All Status</option>
                      <option value="New">New</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                    <select
                      value={priorityFilter}
                      onChange={(e) => setPriorityFilter(e.target.value)}
                      className={`px-3 py-2 rounded-lg border text-sm ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-teal-500`}
                    >
                      <option value="All">All Priority</option>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                    <select
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                      className={`px-3 py-2 rounded-lg border text-sm ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-teal-500`}
                    >
                      <option value="All">All Time</option>
                      <option value="today">Today</option>
                      <option value="week">This Week</option>
                      <option value="month">This Month</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Results Summary */}
              <div className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Showing {filteredPosts.length} of {posts.length} posts
                {searchQuery && ` for "${searchQuery}"`}
                {activeFilter !== "All" && ` in ${activeFilter}`}
              </div>
            </div>

            {/* Posts */}
            <div className="space-y-6">
              {isLoading ? (
                // Loading State
                <div className="flex items-center justify-center py-12">
                  <RefreshCw className="w-8 h-8 animate-spin text-teal-500" />
                </div>
              ) : filteredPosts.length === 0 ? (
                // Empty State
                <div className={`text-center py-12 rounded-xl ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                } shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <MessageCircle className={`w-12 h-12 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                  <h3 className={`text-lg font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                    No posts found
                  </h3>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                    Try adjusting your filters or search terms
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setActiveFilter("All");
                      setLocationFilter("");
                      setStatusFilter("All");
                      setPriorityFilter("All");
                    }}
                    className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                filteredPosts.map((post) => (
                  <article 
                    key={post.id} 
                    className={`rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-all ${
                      darkMode 
                        ? 'bg-gray-800 border-gray-700' 
                        : 'bg-white border-gray-200'
                    }`}
                    onMouseEnter={() => handleViewPost(post.id)}
                  >
                    {/* Enhanced Post Header */}
                    <div className="p-6 pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold">
                              {post.avatar}
                            </div>
                            {post.verified && (
                              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs">✓</span>
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                {post.author}
                              </span>
                              <button
                                onClick={() => handleFollow(post.id)}
                                className={`text-xs px-2 py-1 rounded-full transition-all ${
                                  post.isFollowing
                                    ? 'bg-teal-500 text-white'
                                    : darkMode
                                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                              >
                                {post.isFollowing ? 'Following' : 'Follow'}
                              </button>
                            </div>
                            <div className={`flex items-center space-x-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              <span>{post.timeAgo}</span>
                              <span>•</span>
                              <div className="flex items-center">
                                <MapPin className="w-3 h-3 mr-1" />
                                {post.location}
                              </div>
                              <span>•</span>
                              <div className="flex items-center">
                                <Eye className="w-3 h-3 mr-1" />
                                {post.views}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {post.pinned && (
                            <div className="p-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            </div>
                          )}
                          <button className={`p-2 rounded-full transition-colors ${
                            darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                          }`}>
                            <MoreHorizontal className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                          </button>
                        </div>
                      </div>

                      {/* Enhanced Title & Tags */}
                      <h2 className={`text-xl font-bold mt-4 mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {post.title}
                      </h2>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getCategoryColor(post.category)}`}>
                          {post.category}
                        </span>
                        <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(post.status)}`}>
                          {post.status}
                        </span>
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getPriorityColor(post.priority)}`}>
                          {post.priority.toUpperCase()}
                        </span>
                        {post.assignedTeam && (
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                            darkMode ? 'bg-blue-900/20 text-blue-400' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {post.assignedTeam}
                          </span>
                        )}
                      </div>

                      {/* Progress Bar (for in-progress items) */}
                      {post.progress !== undefined && post.progress > 0 && (
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Progress</span>
                            <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{post.progress}%</span>
                          </div>
                          <div className={`w-full h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                            <div 
                              className="h-2 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full transition-all duration-500"
                              style={{ width: `${post.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Enhanced Post Images */}
                    {post.images && post.images.length > 0 && (
                      <div className="px-6 pb-4">
                        {post.images.length === 1 ? (
                          <img
                            src={post.images[0]}
                            alt={post.title}
                            className="w-full h-80 object-cover rounded-xl cursor-pointer hover:opacity-95 transition-opacity"
                            onClick={() => {/* Open image modal */}}
                          />
                        ) : (
                          <div className="grid grid-cols-2 gap-2">
                            {post.images.slice(0, 4).map((image, index) => (
                              <div key={index} className="relative">
                                <img
                                  src={image}
                                  alt={`${post.title} ${index + 1}`}
                                  className="w-full h-40 object-cover rounded-lg cursor-pointer hover:opacity-95 transition-opacity"
                                  onClick={() => {/* Open image modal */}}
                                />
                                {index === 3 && post.images!.length > 4 && (
                                  <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold">+{post.images!.length - 4}</span>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Enhanced Post Content */}
                    <div className="px-6 pb-4">
                      <div className={`leading-relaxed ${
                        expandedPosts[post.id] ? '' : 'line-clamp-3'
                      }`}>
                        <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                          {post.description}
                        </p>
                      </div>
                      {post.description.length > 200 && (
                        <button
                          onClick={() => setExpandedPosts(prev => ({
                            ...prev,
                            [post.id]: !prev[post.id]
                          }))}
                          className="text-teal-500 text-sm mt-2 hover:text-teal-600 transition-colors"
                        >
                          {expandedPosts[post.id] ? 'Show less' : 'Show more'}
                        </button>
                      )}

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {post.tags.map((tag, index) => (
                            <span
                              key={index}
                              className={`text-sm text-teal-500 hover:text-teal-600 cursor-pointer transition-colors`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Project Info (Cost, Time, etc.) */}
                    {(post.estimatedCost || post.estimatedTime) && (
                      <div className={`mx-6 mb-4 p-4 rounded-lg border ${
                        darkMode 
                          ? 'bg-gray-700/50 border-gray-600' 
                          : 'bg-blue-50 border-blue-200'
                      }`}>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          {post.estimatedCost && (
                            <div>
                              <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                Estimated Cost:
                              </span>
                              <div className="text-green-500 font-bold">{post.estimatedCost}</div>
                            </div>
                          )}
                          {post.estimatedTime && (
                            <div>
                              <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                Timeline:
                              </span>
                              <div className="text-blue-500 font-bold">{post.estimatedTime}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Donations & Volunteers */}
                    {(post.donations || post.volunteers) && (
                      <div className="px-6 pb-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {post.donations && (
                            <div className={`p-4 rounded-lg border ${
                              darkMode 
                                ? 'bg-gray-700/50 border-gray-600' 
                                : 'bg-green-50 border-green-200'
                            }`}>
                              <h4 className="font-medium text-sm mb-2 flex items-center">
                                <Heart className="w-4 h-4 mr-1 text-red-500" />
                                Crowdfunding
                              </h4>
                              <div className="space-y-2">
                                <div className={`flex justify-between text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                  <span>Raised: ${post.donations.raised.toLocaleString()}</span>
                                  <span>Goal: ${post.donations.goal.toLocaleString()}</span>
                                </div>
                                <div className={`w-full h-2 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                                  <div 
                                    className="h-2 bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                                    style={{ width: `${(post.donations.raised / post.donations.goal) * 100}%` }}
                                  ></div>
                                </div>
                                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                  {post.donations.donors} supporters
                                </p>
                              </div>
                            </div>
                          )}
                          
                          {post.volunteers && (
                            <div className={`p-4 rounded-lg border ${
                              darkMode 
                                ? 'bg-gray-700/50 border-gray-600' 
                                : 'bg-purple-50 border-purple-200'
                            }`}>
                              <h4 className="font-medium text-sm mb-2 flex items-center">
                                <Users className="w-4 h-4 mr-1 text-purple-500" />
                                Volunteers
                              </h4>
                              <div className="space-y-2">
                                <div className={`flex justify-between text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                  <span>Signed up: {post.volunteers.signed}</span>
                                  <span>Needed: {post.volunteers.needed}</span>
                                </div>
                                <div className={`w-full h-2 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                                  <div 
                                    className="h-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"
                                    style={{ width: `${(post.volunteers.signed / post.volunteers.needed) * 100}%` }}
                                  ></div>
                                </div>
                                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                  {post.volunteers.needed - post.volunteers.signed} still needed
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Poll */}
                    {post.poll && (
                      <div className="px-6 pb-4">
                        <div className={`p-4 rounded-lg border ${
                          darkMode 
                            ? 'bg-gray-700/50 border-gray-600' 
                            : 'bg-yellow-50 border-yellow-200'
                        }`}>
                          <h4 className="font-medium mb-3">{post.poll.question}</h4>
                          <div className="space-y-2">
                            {post.poll.options.map((option, index) => {
                              const percentage = post.poll!.totalVotes > 0 
                                ? Math.round((option.votes / post.poll!.totalVotes) * 100) 
                                : 0;
                              const isUserChoice = post.poll!.userVote === index;
                              
                              return (
                                <div
                                  key={index}
                                  className={`relative cursor-pointer p-3 rounded-lg border transition-all ${
                                    isUserChoice
                                      ? darkMode
                                        ? 'bg-teal-900/30 border-teal-600'
                                        : 'bg-teal-100 border-teal-300'
                                      : darkMode
                                        ? 'bg-gray-800 border-gray-700 hover:bg-gray-700'
                                        : 'bg-white border-gray-200 hover:bg-gray-50'
                                  }`}
                                  onClick={() => handleVotePoll(post.id, index)}
                                >
                                  <div className="flex justify-between items-center relative z-10">
                                    <span className={`font-medium ${isUserChoice ? 'text-teal-600 dark:text-teal-400' : ''}`}>
                                      {option.text}
                                    </span>
                                    <div className="flex items-center space-x-2">
                                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                        {percentage}%
                                      </span>
                                      <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                        ({option.votes})
                                      </span>
                                    </div>
                                  </div>
                                  <div 
                                    className={`absolute inset-0 rounded-lg transition-all ${
                                      isUserChoice
                                        ? 'bg-teal-500/20'
                                        : 'bg-gray-500/10'
                                    }`}
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                              );
                            })}
                          </div>
                          <p className={`text-xs mt-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {post.poll.totalVotes} total votes • Ends {post.poll.endDate}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Engagement Stats */}
                    <div className={`px-6 py-3 border-t ${
                      darkMode 
                        ? 'bg-gray-700/20 border-gray-700' 
                        : 'bg-gray-50 border-gray-100'
                    }`}>
                      <div className={`flex items-center justify-between text-sm ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        <div className="flex items-center space-x-4">
                          <span>{post.likes} likes</span>
                          {post.dislikes > 0 && <span>{post.dislikes} dislikes</span>}
                          <span>{post.comments} comments</span>
                          {post.shares > 0 && <span>{post.shares} shares</span>}
                        </div>
                        <div className="flex items-center space-x-4">
                          <span>{post.views} views</span>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Action Buttons */}
                    <div className={`px-6 py-3 border-t ${
                      darkMode ? 'border-gray-700' : 'border-gray-100'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => handleLike(post.id)}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                              post.isLiked 
                                ? 'bg-red-500 text-white shadow-sm' 
                                : darkMode
                                  ? 'text-gray-400 hover:bg-gray-700 hover:text-white'
                                  : 'text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                            <span className="font-medium">{post.likes}</span>
                          </button>
                          
                          <button
                            onClick={() => handleDislike(post.id)}
                            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                              post.isDisliked 
                                ? 'bg-gray-500 text-white shadow-sm' 
                                : darkMode
                                  ? 'text-gray-400 hover:bg-gray-700 hover:text-white'
                                  : 'text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            <ThumbsDown className={`w-4 h-4 ${post.isDisliked ? 'fill-current' : ''}`} />
                            {post.dislikes > 0 && <span className="font-medium">{post.dislikes}</span>}
                          </button>
                          
                          <button 
                            onClick={() => toggleComments(post.id)}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                              darkMode
                                ? 'text-gray-400 hover:bg-gray-700 hover:text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            <MessageCircle className="w-4 h-4" />
                            <span className="font-medium">{post.comments}</span>
                          </button>
                          
                          <button 
                            onClick={() => handleShare(post)}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                              darkMode
                                ? 'text-gray-400 hover:bg-gray-700 hover:text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            <Share2 className="w-4 h-4" />
                            <span className="font-medium">Share</span>
                          </button>
                        </div>
                        
                        <button
                          onClick={() => handleBookmark(post.id)}
                          className={`p-2 rounded-lg transition-all ${
                            post.isBookmarked 
                              ? 'bg-yellow-500 text-white'
                              : darkMode
                                ? 'text-gray-400 hover:bg-gray-700 hover:text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          <Bookmark className={`w-4 h-4 ${post.isBookmarked ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                    </div>

                    {/* Action Buttons - Donate/Volunteer */}
                    {(post.donations || post.volunteers) && (
                      <div className="px-6 pb-4">
                        <div className="flex gap-3">
                          {post.donations && (
                            <button className="flex-1 py-3 px-4 rounded-lg text-white font-medium transition-all hover:shadow-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                              <Heart className="w-4 h-4 inline mr-2" />
                              Donate Now
                            </button>
                          )}
                          {post.volunteers && (
                            <button className={`flex-1 py-3 px-4 rounded-lg font-medium border-2 transition-all hover:shadow-md ${
                              darkMode
                                ? 'border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white'
                                : 'border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white'
                            }`}>
                              <Users className="w-4 h-4 inline mr-2" />
                              Volunteer
                            </button>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Enhanced Comments Section */}
                    {showComments[post.id] && (
                      <div className={`px-6 pb-6 border-t ${
                        darkMode ? 'border-gray-700' : 'border-gray-100'
                      }`}>
                        {/* Add Comment */}
                        <div className="pt-4 mb-4">
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                              You
                            </div>
                            <div className="flex-1">
                              <textarea
                                placeholder="Write a comment..."
                                value={commentText[post.id] || ""}
                                onChange={(e) => setCommentText(prev => ({
                                  ...prev,
                                  [post.id]: e.target.value
                                }))}
                                className={`w-full px-4 py-3 rounded-lg border resize-none ${
                                  darkMode 
                                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                                    : 'bg-gray-50 border-gray-300 placeholder-gray-500'
                                } focus:outline-none focus:ring-2 focus:ring-teal-500`}
                                rows={3}
                              />
                              <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center space-x-2">
                                  <button className={`p-2 rounded-lg transition-colors ${
                                    darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                                  }`}>
                                    <Smile className="w-4 h-4 text-teal-500" />
                                  </button>
                                  <button className={`p-2 rounded-lg transition-colors ${
                                    darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                                  }`}>
                                    <Image className="w-4 h-4 text-teal-500" />
                                  </button>
                                </div>
                                <button
                                  onClick={() => handleAddComment(post.id)}
                                  disabled={!commentText[post.id]?.trim()}
                                  className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                                >
                                  <Send className="w-4 h-4" />
                                  <span>Post</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Comments List */}
                        <div className="space-y-4">
                          {post.replies.map((reply, i) => (
                            <div key={reply.id || i} className={`flex items-start space-x-3 ${
                              reply.pinned ? (darkMode ? 'bg-gray-700/30' : 'bg-blue-50') + ' p-3 rounded-lg' : ''
                            }`}>
                              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-500 to-gray-600 flex items-center justify-center text-white text-sm font-bold">
                                {reply.avatar}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                    {reply.user}
                                  </span>
                                  {reply.official && (
                                    <span className="px-2 py-1 text-xs rounded-full bg-blue-500 text-white">
                                      Official
                                    </span>
                                  )}
                                  {reply.pinned && (
                                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                  )}
                                  <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {reply.timeAgo}
                                  </span>
                                  {reply.edited && (
                                    <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                      (edited)
                                    </span>
                                  )}
                                </div>
                                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                                  {reply.text}
                                </p>
                                <div className="flex items-center space-x-4">
                                  <button className={`flex items-center space-x-1 text-xs ${
                                    reply.isLiked 
                                      ? 'text-red-500' 
                                      : darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'
                                  } transition-colors`}>
                                    <Heart className={`w-3 h-3 ${reply.isLiked ? 'fill-current' : ''}`} />
                                    <span>{reply.likes}</span>
                                  </button>
                                  <button className={`text-xs ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'} transition-colors`}>
                                    <Reply className="w-3 h-3 inline mr-1" />
                                    Reply
                                  </button>
                                  <button className={`text-xs ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'} transition-colors`}>
                                    <Flag className="w-3 h-3 inline mr-1" />
                                    Report
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                          {post.replies.length < post.comments && (
                            <button className="text-sm font-medium text-teal-500 hover:text-teal-600 transition-colors">
                              Load more comments ({post.comments - post.replies.length} remaining)
                            </button>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Update History (for resolved/in-progress items) */}
                    {post.updateHistory && post.updateHistory.length > 1 && (
                      <div className={`px-6 py-4 border-t ${
                        darkMode ? 'border-gray-700' : 'border-gray-100'
                      }`}>
                        <details className="group">
                          <summary className={`cursor-pointer font-medium text-sm flex items-center ${
                            darkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            <Clock className="w-4 h-4 mr-2" />
                            Update History ({post.updateHistory.length})
                            <ChevronDown className="w-4 h-4 ml-auto group-open:rotate-180 transition-transform" />
                          </summary>
                          <div className="mt-3 space-y-3">
                            {post.updateHistory.map((update, index) => (
                              <div key={index} className="flex items-start space-x-3">
                                <div className={`w-2 h-2 rounded-full mt-2 ${
                                  update.status === 'Resolved' ? 'bg-green-500' :
                                  update.status === 'In Progress' ? 'bg-yellow-500' :
                                  update.status === 'Acknowledged' ? 'bg-blue-500' :
                                  'bg-gray-500'
                                }`}></div>
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2">
                                    <span className={`font-medium text-sm ${
                                      update.status === 'Resolved' ? 'text-green-500' :
                                      update.status === 'In Progress' ? 'text-yellow-500' :
                                      update.status === 'Acknowledged' ? 'text-blue-500' :
                                      darkMode ? 'text-gray-300' : 'text-gray-700'
                                    }`}>
                                      {update.status}
                                    </span>
                                    <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                      {update.date} by {update.author}
                                    </span>
                                  </div>
                                  <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {update.note}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </details>
                      </div>
                    )}
                  </article>
                ))
              )}
            </div>

            {/* Load More Button */}
            {filteredPosts.length > 0 && (
              <div className="mt-8 text-center">
                <button 
                  className={`px-6 py-3 rounded-lg border-2 border-dashed transition-all ${
                    darkMode
                      ? 'border-gray-600 text-gray-400 hover:border-gray-500 hover:text-gray-300'
                      : 'border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-800'
                  }`}
                >
                  Load More Posts
                </button>
              </div>
            )}
          </div>

          {/* Enhanced Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              
              {/* Quick Actions */}
              <div className={`rounded-xl p-6 shadow-sm border transition-colors ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              }`}>
                <h3 className="font-bold text-lg mb-4 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-teal-500" />
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <button className="w-full py-3 px-4 rounded-lg text-white font-medium transition-all hover:shadow-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 flex items-center justify-center space-x-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>Report Emergency</span>
                  </button>
                  <button className={`w-full py-3 px-4 rounded-lg font-medium border-2 transition-all hover:shadow-md ${
                    darkMode
                      ? 'border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white'
                      : 'border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white'
                  } flex items-center justify-center space-x-2`}>
                    <FileText className="w-4 h-4" />
                    <span>Submit Issue</span>
                  </button>
                  <button className={`w-full py-3 px-4 rounded-lg font-medium border-2 transition-all hover:shadow-md ${
                    darkMode
                      ? 'border-green-500 text-green-400 hover:bg-green-500 hover:text-white'
                      : 'border-green-500 text-green-500 hover:bg-green-500 hover:text-white'
                  } flex items-center justify-center space-x-2`}>
                    <Users className="w-4 h-4" />
                    <span>Volunteer Today</span>
                  </button>
                </div>
              </div>

              {/* Live Activity Feed */}
              <div className={`rounded-xl p-6 shadow-sm border transition-colors ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              }`}>
                <h3 className="font-bold text-lg mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-blue-500" />
                  Live Activity
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <div className="flex-1">
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <span className="font-medium">Park Ave lights</span> marked as resolved
                      </p>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="flex-1">
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <span className="font-medium">New pothole</span> reported on Oak St
                      </p>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>15 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <div className="flex-1">
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <span className="font-medium">Community cleanup</span> organized
                      </p>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>1 hour ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    <div className="flex-1">
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <span className="font-medium">5 new volunteers</span> joined today
                      </p>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>2 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Weather Impact Alert */}
              <div className={`rounded-xl p-6 shadow-sm border transition-colors ${
                darkMode 
                  ? 'bg-amber-900/20 border-amber-800/30' 
                  : 'bg-amber-50 border-amber-200'
              }`}>
                <h3 className="font-bold text-lg mb-3 flex items-center text-amber-600 dark:text-amber-400">
                  <Shield className="w-5 h-5 mr-2" />
                  Weather Alert
                </h3>
                <p className={`text-sm mb-3 ${darkMode ? 'text-amber-300' : 'text-amber-700'}`}>
                  Heavy rain expected this weekend. Road repairs may be delayed.
                </p>
                <div className={`text-xs ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
                  <Globe className="w-3 h-3 inline mr-1" />
                  Updated 30 minutes ago
                </div>
              </div>

              {/* My Contributions */}
              <div className={`rounded-xl p-6 shadow-sm border transition-colors ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              }`}>
                <h3 className="font-bold text-lg mb-4 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-purple-500" />
                  My Impact
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Issues Reported</span>
                    <span className="font-bold text-teal-500">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Comments Made</span>
                    <span className="font-bold text-blue-500">34</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Issues Resolved</span>
                    <span className="font-bold text-green-500">8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Reputation Points</span>
                    <span className="font-bold text-purple-500">245</span>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Community Rank</span>
                    <span className="font-bold text-yellow-500 flex items-center">
                      <Award className="w-4 h-4 mr-1" />
                      #47
                    </span>
                  </div>
                </div>
              </div>

              {/* Community Guidelines */}
              <div className={`rounded-xl p-6 shadow-sm border transition-colors ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              }`}>
                <h3 className="font-bold text-lg mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-green-500" />
                  Community Guidelines
                </h3>
                <div className={`space-y-3 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Be respectful and constructive</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Report issues with accurate details</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Support fellow community members</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Verify information before sharing</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Follow up on your reports</span>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <button className="text-teal-500 text-sm hover:text-teal-600 transition-colors">
                    View Full Guidelines →
                  </button>
                </div>
              </div>

              {/* Upcoming Events */}
              <div className={`rounded-xl p-6 shadow-sm border transition-colors ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              }`}>
                <h3 className="font-bold text-lg mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-indigo-500" />
                  Upcoming Events
                </h3>
                <div className="space-y-3">
                  <div className={`p-3 rounded-lg border ${
                    darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-blue-50 border-blue-200'
                  }`}>
                    <h4 className="font-medium text-sm mb-1">Community Cleanup</h4>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                      Join us for a city-wide cleanup initiative
                    </p>
                    <div className={`text-xs flex items-center ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                      <Calendar className="w-3 h-3 mr-1" />
                      Saturday, 2:00 PM
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg border ${
                    darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-green-50 border-green-200'
                  }`}>
                    <h4 className="font-medium text-sm mb-1">Town Hall Meeting</h4>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                      Discuss infrastructure improvements
                    </p>
                    <div className={`text-xs flex items-center ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                      <Calendar className="w-3 h-3 mr-1" />
                      Monday, 7:00 PM
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}