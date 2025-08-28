"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Camera, 
  MapPin, 
  Upload, 
  ChevronRight, 
  ChevronLeft,
  Moon, 
  Sun, 
  Menu, 
  X,
  CheckCircle,
  AlertTriangle,
  FileText,
  Eye,
  Bell,
  Shield,
  Zap,
  Droplets,
  Lightbulb,
  Construction,
  DollarSign,
  Trash2,
  LocateFixed,
  Phone,
  Mail,
  User,
  Lock,
  Clock,
  Star,
  TrendingUp
} from "lucide-react";
import Header from "@/components/layout/Header";

type ThemeToggleProps = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const ThemeToggle = ({ darkMode, setDarkMode }: ThemeToggleProps) => {
  return (
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
};

type NavigationProps = {
  darkMode: boolean;
};


type ProgressBarProps = {
  progress: number;
};

const ProgressBar = ({ progress }: ProgressBarProps) => (
  <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
    <motion.div
      className="h-full bg-gradient-to-r from-teal-500 to-blue-500 rounded-full"
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.5 }}
    />
  </div>
);

type Category = {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
  color: string;
};

type CategoryCardProps = {
  category: Category;
  isSelected: boolean;
  onClick: () => void;
  delay?: number;
};

const CategoryCard = ({ category, isSelected, onClick, delay = 0 }: CategoryCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ scale: 1.02, y: -5 }}
    whileTap={{ scale: 0.98 }}
    className={`cursor-pointer rounded-2xl p-6 text-center shadow-lg transition-all duration-300 relative overflow-hidden ${
      isSelected
        ? "bg-gradient-to-br from-teal-500 to-blue-600 text-white shadow-2xl"
        : "bg-white dark:bg-slate-800 hover:shadow-2xl border border-gray-200 dark:border-slate-700"
    }`}
    onClick={onClick}
  >
    {isSelected && (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="absolute top-2 right-2"
      >
        <CheckCircle className="h-6 w-6 text-white" />
      </motion.div>
    )}
    
    <div className="text-5xl mb-4">{category.icon}</div>
    <div className={`font-bold text-lg ${isSelected ? 'text-white' : 'text-slate-800 dark:text-white'}`}>
      {category.label}
    </div>
    <div className={`text-sm mt-2 ${isSelected ? 'text-white/90' : 'text-slate-500 dark:text-slate-400'}`}>
      {category.description}
    </div>
  </motion.div>
);

type FormInputProps = {
  label: string;
  icon?: React.ElementType;
  children: React.ReactNode;
  [key: string]: unknown;
};

const FormInput = ({ label, icon: Icon, children, ...props }: FormInputProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="space-y-2"
  >
    <label className="flex items-center space-x-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
      {Icon && <Icon className="h-4 w-4" />}
      <span>{label}</span>
    </label>
    {children}
  </motion.div>
);

export default function ReportIssue() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    location: "",
    contact: "",
    anonymous: false,
  });
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const categories = [
    { 
      id: "fire", 
      label: "Fire Emergency", 
      icon: <Shield className="h-8 w-8" />,
      description: "Fire safety issues & emergencies",
      color: "from-red-500 to-orange-500"
    },
    { 
      id: "water", 
      label: "Water Issues", 
      icon: <Droplets className="h-8 w-8" />,
      description: "Water supply & quality problems",
      color: "from-blue-500 to-cyan-500"
    },
    { 
      id: "electricity", 
      label: "Electricity", 
      icon: <Zap className="h-8 w-8" />,
      description: "Power outages & electrical issues",
      color: "from-yellow-500 to-orange-500"
    },
    { 
      id: "infrastructure", 
      label: "Infrastructure", 
      icon: <Construction className="h-8 w-8" />,
      description: "Roads, bridges & public facilities",
      color: "from-gray-500 to-slate-600"
    },
    { 
      id: "price", 
      label: "Price Gouging", 
      icon: <DollarSign className="h-8 w-8" />,
      description: "Unfair pricing & market issues",
      color: "from-green-500 to-emerald-500"
    },
    { 
      id: "sanitation", 
      label: "Sanitation", 
      icon: <Trash2 className="h-8 w-8" />,
      description: "Waste management & cleanliness",
      color: "from-purple-500 to-indigo-500"
    },
  ];

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

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedCategory !== "";
      case 2:
        return formData.title.trim() !== "" && formData.description.trim() !== "";
      case 3:
        return formData.location.trim() !== "";
      case 4:
        return true;
      default:
        return false;
    }
  };

  const stepTitles = [
    "Select Issue Category",
    "Describe the Issue", 
    "Location & Evidence",
    "Contact Information"
  ];

  const stepDescriptions = [
    "Choose the category that best describes your civic issue",
    "Provide detailed information about the problem you've encountered",
    "Add precise location and photo evidence to help verification",
    "Optional contact details for updates on resolution progress"
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-500`}>
      <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      <Header darkMode={darkMode} />

      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header Section */}
          <motion.div 
            className="text-center mb-10"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
              className="inline-block mb-4"
            >
              <FileText className="h-16 w-16 text-teal-500 mx-auto" />
            </motion.div>
            
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-slate-800 dark:text-white">Report &</span>
              <br />
              <span className="bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Solve Civic Issues
              </span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Help improve your community by reporting issues, providing evidence, and 
              collaborating with authorities for faster resolutions.
            </p>
          </motion.div>

          {/* Progress Section */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex justify-between items-center text-sm text-slate-600 dark:text-slate-300 mb-4">
              <span className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Step {currentStep} of {totalSteps}</span>
              </span>
              <span className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4" />
                <span>{Math.round(progress)}% Complete</span>
              </span>
            </div>
            <ProgressBar progress={progress} />
          </motion.div>

          {/* Main Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-slate-700 overflow-hidden"
          >
            {/* Card Header */}
            <div className="bg-gradient-to-r from-teal-500 to-blue-600 p-8 text-white">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-2">{stepTitles[currentStep - 1]}</h2>
                <p className="text-teal-100">{stepDescriptions[currentStep - 1]}</p>
              </motion.div>
            </div>

            {/* Card Content */}
            <div className="p-8">
              <AnimatePresence mode="wait">
                {/* Step 1: Category Selection */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {categories.map((category, index) => (
                      <CategoryCard
                        key={category.id}
                        category={category}
                        isSelected={selectedCategory === category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        delay={index * 0.1}
                      />
                    ))}
                  </motion.div>
                )}

                {/* Step 2: Issue Description */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <FormInput label="Issue Title" icon={FileText}>
                      <input
                        type="text"
                        placeholder="Brief, descriptive title of the issue"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                      />
                    </FormInput>

                    <FormInput label="Detailed Description" icon={FileText}>
                      <textarea
                        placeholder="Provide comprehensive details about the issue, when it occurred, its impact, and any other relevant information..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 min-h-32 resize-y"
                      />
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                        {formData.description.length}/500 characters
                      </div>
                    </FormInput>

                    {/* Category Preview */}
                    {selectedCategory && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-700 rounded-xl p-4"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">
                            {categories.find(c => c.id === selectedCategory)?.icon}
                          </div>
                          <div>
                            <div className="font-semibold text-teal-800 dark:text-teal-300">
                              Selected Category: {categories.find(c => c.id === selectedCategory)?.label}
                            </div>
                            <div className="text-sm text-teal-600 dark:text-teal-400">
                              {categories.find(c => c.id === selectedCategory)?.description}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* Step 3: Location & Evidence */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <FormInput label="Precise Location" icon={MapPin}>
                      <div className="flex gap-3">
                        <input
                          type="text"
                          placeholder="Enter complete address or landmark"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="flex-1 px-4 py-3 border border-gray-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                        />
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-3 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 border border-teal-200 dark:border-teal-700 rounded-xl hover:bg-teal-100 dark:hover:bg-teal-900/50 transition-colors duration-300"
                        >
                          <LocateFixed className="h-5 w-5" />
                        </motion.button>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                        Use GPS or provide detailed address for accurate location
                      </div>
                    </FormInput>

                    <FormInput label="Photo Evidence" icon={Camera}>
                      <div className="border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-xl p-8 text-center hover:border-teal-400 dark:hover:border-teal-500 transition-colors cursor-pointer bg-gray-50 dark:bg-slate-800/50">
                        <Upload className="h-12 w-12 mx-auto mb-4 text-slate-400 dark:text-slate-500" />
                        <p className="text-slate-600 dark:text-slate-300 mb-4">
                          Drop photos here or click to browse
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-gray-200 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors duration-300"
                          >
                            <Camera className="h-4 w-4" />
                            <span>Take Photo</span>
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-gray-200 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors duration-300"
                          >
                            <Upload className="h-4 w-4" />
                            <span>Upload Files</span>
                          </motion.button>
                        </div>
                      </div>
                    </FormInput>
                  </motion.div>
                )}

                {/* Step 4: Contact Information */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {/* Anonymous Option */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 rounded-xl p-6"
                    >
                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          id="anonymous"
                          checked={formData.anonymous}
                          onChange={(e) => setFormData({ ...formData, anonymous: e.target.checked })}
                          className="mt-1 rounded border-orange-300 text-orange-600 focus:ring-orange-500"
                        />
                        <div className="flex-1">
                          <label htmlFor="anonymous" className="flex items-center space-x-2 font-semibold text-orange-800 dark:text-orange-300 mb-2">
                            <Lock className="h-4 w-4" />
                            <span>Report Anonymously</span>
                          </label>
                          <p className="text-sm text-orange-700 dark:text-orange-400">
                            Your identity will be kept completely private. You won&apos;t receive updates about this issue, 
                            but it will still be processed by authorities.
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Contact Form */}
                    {!formData.anonymous && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <FormInput label="Email Address (Optional)" icon={Mail}>
                          <input
                            type="email"
                            placeholder="your.email@example.com"
                            value={formData.contact}
                            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-200 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                          />
                          <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                            We&apos;ll send you updates about resolution progress and any follow-up questions
                          </div>
                        </FormInput>

                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-4">
                          <div className="flex items-center space-x-2 text-blue-800 dark:text-blue-300 mb-2">
                            <Shield className="h-4 w-4" />
                            <span className="font-semibold">Privacy Guarantee</span>
                          </div>
                          <p className="text-sm text-blue-700 dark:text-blue-400">
                            Your contact information is encrypted and only used for issue updates. 
                            We never share your details with third parties.
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {/* Summary */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl p-6"
                    >
                      <h3 className="flex items-center space-x-2 font-bold text-green-800 dark:text-green-300 mb-4">
                        <CheckCircle className="h-5 w-5" />
                        <span>Report Summary</span>
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-600 dark:text-slate-400">Category:</span>
                          <span className="font-medium text-slate-800 dark:text-white">
                            {categories.find(c => c.id === selectedCategory)?.label}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600 dark:text-slate-400">Title:</span>
                          <span className="font-medium text-slate-800 dark:text-white">
                            {formData.title || "Not specified"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600 dark:text-slate-400">Location:</span>
                          <span className="font-medium text-slate-800 dark:text-white">
                            {formData.location || "Not specified"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600 dark:text-slate-400">Anonymous:</span>
                          <span className="font-medium text-slate-800 dark:text-white">
                            {formData.anonymous ? "Yes" : "No"}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Navigation Footer */}
            <div className="flex justify-between items-center px-8 py-6 bg-gray-50 dark:bg-slate-800/50 border-t border-gray-200 dark:border-slate-700">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  currentStep === 1
                    ? "bg-gray-100 dark:bg-slate-700 text-gray-400 dark:text-slate-500 cursor-not-allowed"
                    : "bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-600"
                }`}
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </motion.button>

              {currentStep < totalSteps ? (
                <motion.button
                  whileHover={{ scale: canProceed() ? 1.05 : 1 }}
                  whileTap={{ scale: canProceed() ? 0.95 : 1 }}
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className={`flex items-center space-x-2 px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    canProceed()
                      ? "bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl"
                      : "bg-gray-300 dark:bg-slate-600 text-gray-500 dark:text-slate-400 cursor-not-allowed"
                  }`}
                >
                  <span>Next Step</span>
                  <ChevronRight className="h-4 w-4" />
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CheckCircle className="h-5 w-5" />
                  <span>Submit Report</span>
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Help Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 p-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Eye className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">Need Help?</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Phone className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                </div>
                <h4 className="font-semibold text-slate-800 dark:text-white mb-2">Emergency Helpline</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300">For urgent issues, call our 24/7 helpline at <strong>1800-CIVIC-HELP</strong></p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="font-semibold text-slate-800 dark:text-white mb-2">Reporting Guidelines</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300">Learn how to create effective reports with our comprehensive guide</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Star className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h4 className="font-semibold text-slate-800 dark:text-white mb-2">Track Progress</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300">Monitor your report status and receive real-time updates via email/SMS</p>
              </div>
            </div>
          </motion.div>
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