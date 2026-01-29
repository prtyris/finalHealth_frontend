import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("this-month");
  const [activeWeek, setActiveWeek] = useState(2);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [consultationTime, setConsultationTime] = useState(0);
  const [viewMode, setViewMode] = useState("overview");

  // Icons as SVG components
  const CalendarIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  );

  const UsersIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  );

  const CheckCircleIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );

  const XCircleIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="15" y1="9" x2="9" y2="15"></line>
      <line x1="9" y1="9" x2="15" y2="15"></line>
    </svg>
  );

  const ClockIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  );

  const CreditCardIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
      <line x1="1" y1="10" x2="23" y2="10"></line>
    </svg>
  );

  const ActivityIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
    </svg>
  );

  const BuildingIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  );

  const TrendingUpIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
      <polyline points="17 6 23 6 23 12"></polyline>
    </svg>
  );

  const TrendingDownIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
      <polyline points="17 18 23 18 23 12"></polyline>
    </svg>
  );

  const MapPinIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  );

  const PhoneIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
  );

  const StarIcon = ({ filled = false }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  );

  const ChevronRightIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  );

  const MoreVerticalIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="1"></circle>
      <circle cx="12" cy="5" r="1"></circle>
      <circle cx="12" cy="19" r="1"></circle>
    </svg>
  );

  const DownloadIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
  );

  const FilterIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
    </svg>
  );

  const SearchIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  );

  const PlusIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );

  const EyeIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  );

  // Stats data
  const stats = [
    { 
      label: "Total Clinics", 
      value: 4,
      icon: <BuildingIcon />,
      change: "+1 this month",
      color: "from-blue-50 to-blue-100",
      trend: "up",
      details: "Across 3 cities"
    },
    { 
      label: "Appointments", 
      value: 56,
      icon: <CalendarIcon />,
      sub: "This Month",
      color: "from-purple-50 to-purple-100",
      change: "↑ 12%",
      trend: "up",
      details: "42 completed, 12 upcoming"
    },
    { 
      label: "Completed", 
      value: "48",
      icon: <CheckCircleIcon />,
      color: "from-green-50 to-green-100",
      progress: 85,
      trend: "up",
      details: "85% completion rate"
    },
    { 
      label: "Cancelled", 
      value: "8",
      icon: <XCircleIcon />,
      color: "from-red-50 to-red-100",
      progress: 15,
      trend: "down",
      details: "15% cancellation rate"
    },
    { 
      label: "Upcoming", 
      value: 12,
      icon: <ClockIcon />,
      color: "from-amber-50 to-amber-100",
      details: "Next 7 days"
    },
    {
      label: "Current Plan",
      value: "Pro Plan",
      icon: <CreditCardIcon />,
      sub: "Renews on: Jan 15, 2025",
      color: "from-indigo-50 to-indigo-100",
      badge: "Active",
      details: "Premium features enabled"
    },
  ];

  // Appointment data
  const appointments = [
    {
      id: 1,
      date: "Oct 28, 2025",
      time: "10:00 AM - 11:00 AM",
      patient: "Carl Orence",
      type: "Follow-up",
      clinic: "Happy Clinic",
      status: "confirmed",
      avatarColor: "bg-blue-500"
    },
    {
      id: 2,
      date: "Oct 29, 2025",
      time: "02:00 PM - 03:00 PM",
      patient: "Mariz Esparago",
      type: "New Patient",
      clinic: "City Care Clinic",
      status: "confirmed",
      avatarColor: "bg-purple-500"
    },
    {
      id: 3,
      date: "Oct 30, 2025",
      time: "11:00 AM - 12:00 PM",
      patient: "Elena Hilario",
      type: "Consultation",
      clinic: "Wellness Hub",
      status: "pending",
      avatarColor: "bg-green-500"
    },
    {
      id: 4,
      date: "Nov 1, 2025",
      time: "09:00 AM - 09:30 AM",
      patient: "Ivan Sampan",
      type: "Check-up",
      clinic: "Happy Clinic",
      status: "confirmed",
      avatarColor: "bg-pink-500"
    },
  ];

  // Clinic data
  const clinics = [
    { 
      name: "Happy Clinic", 
      address: "Davao City", 
      contact: "09871027946",
      patients: 42,
      rating: 4.8,
      status: "active",
      appointmentsToday: 8
    },
    {
      name: "City Care Clinic",
      address: "Taal, Cavite City",
      contact: "09348203458",
      patients: 38,
      rating: 4.6,
      status: "active",
      appointmentsToday: 6
    },
    {
      name: "Wellness Hub",
      address: "Manila, Davao City",
      contact: "09710864856",
      patients: 56,
      rating: 4.9,
      status: "active",
      appointmentsToday: 12
    },
    {
      name: "Metro Health Center",
      address: "Makati City",
      contact: "09234567890",
      patients: 31,
      rating: 4.7,
      status: "active",
      appointmentsToday: 5
    }
  ];

  // Chart data
  const weeks = [
    { week: 1, appointments: 40, completed: 32, cancelled: 8, revenue: 3200 },
    { week: 2, appointments: 70, completed: 65, cancelled: 5, revenue: 5600 },
    { week: 3, appointments: 60, completed: 52, cancelled: 8, revenue: 4800 },
    { week: 4, appointments: 35, completed: 30, cancelled: 5, revenue: 2800 },
  ];

  // Performance metrics
  const metrics = [
    { label: "Patient Satisfaction", value: "94%", change: "+2%", icon: "😊", color: "bg-emerald-500", trend: "up" },
    { label: "Avg. Wait Time", value: "12 min", change: "-2 min", icon: "⏱️", color: "bg-blue-500", trend: "down" },
    { label: "Follow-ups", value: "24", change: "+4", icon: "🔄", color: "bg-purple-500", trend: "up" },
    { label: "Revenue", value: "₱8,420", change: "+12%", icon: "💰", color: "bg-amber-500", trend: "up" },
  ];

  // Consultation timer
  useEffect(() => {
    const timer = setInterval(() => {
      setConsultationTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return 'bg-green-100 text-green-700 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getWeekTrend = (weekIndex) => {
    if (weekIndex === 0) return null;
    const current = weeks[weekIndex].appointments;
    const previous = weeks[weekIndex - 1].appointments;
    const trend = ((current - previous) / previous * 100).toFixed(1);
    return trend > 0 ? `+${trend}%` : `${trend}%`;
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Doctor Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back, Dr. Olaivar! Here's your practice overview.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0">
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Search patients, clinics..."
                className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              />
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50">
                <FilterIcon />
              </button>
              
              <div className="relative">
                <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 text-sm font-medium flex items-center">
                  This Month
                  <div className="ml-2 rotate-90">
                    <ChevronRightIcon />
                  </div>
                </button>
              </div>
              
              <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 text-sm font-medium flex items-center">
                <div className="mr-2">
                  <PlusIcon />
                </div>
                New
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${stat.color} rounded-2xl shadow-sm border border-gray-100 p-5 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 font-medium mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  {stat.sub && <p className="text-xs text-gray-500 mt-1">{stat.sub}</p>}
                  
                  <div className="flex items-center mt-3 space-x-2">
                    {stat.change && (
                      <span className={`text-xs font-medium px-2 py-1 rounded-full flex items-center ${
                        stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        <div className="mr-1">
                          {stat.trend === 'up' ? <TrendingUpIcon size={12} /> : <TrendingDownIcon size={12} />}
                        </div>
                        {stat.change}
                      </span>
                    )}
                    {stat.badge && (
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-indigo-100 text-indigo-700">
                        {stat.badge}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="p-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm group-hover:shadow-md transition-shadow">
                  {stat.icon}
                </div>
              </div>
              
              {stat.progress && (
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Rate</span>
                    <span className="font-semibold">{stat.progress}%</span>
                  </div>
                  <div className="w-full bg-white/50 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        stat.label === 'Completed' 
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                          : 'bg-gradient-to-r from-red-500 to-pink-500'
                      }`}
                      style={{ width: `${stat.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              {stat.details && (
                <p className="text-xs text-gray-500 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  {stat.details}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column - Chart & Metrics */}
          <div className="lg:col-span-2 space-y-6">
            {/* Chart */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Appointments Trend</h2>
                  <p className="text-gray-500 text-sm">Weekly overview with revenue impact</p>
                </div>
                
                <div className="flex items-center space-x-2 mt-3 md:mt-0">
                  <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    viewMode === 'overview' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}>
                    Overview
                  </button>
                  <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    viewMode === 'revenue' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}>
                    Revenue
                  </button>
                </div>
              </div>

              {/* Chart Visualization */}
              <div className="flex items-end justify-between h-64 mt-4 relative">
                {/* Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="border-t border-gray-100"></div>
                  ))}
                </div>
                
                {/* Bars */}
                {weeks.map((week, index) => {
                  const maxHeight = 180;
                  const completedHeight = (week.completed / 70) * maxHeight;
                  const cancelledHeight = (week.cancelled / 70) * maxHeight;
                  const trend = getWeekTrend(index);
                  
                  return (
                    <div 
                      key={index} 
                      className="flex flex-col items-center w-full relative group"
                      onMouseEnter={() => setActiveWeek(index)}
                    >
                      <div className="flex flex-col items-center w-16">
                        {/* Revenue indicator */}
                        <div className="text-xs text-gray-400 mb-2">
                          ${week.revenue}
                        </div>
                        
                        {/* Bars */}
                        <div className="flex items-end w-full space-x-1">
                          <div
                            className="w-full rounded-t-lg bg-gradient-to-t from-green-500 to-emerald-400 transition-all duration-300 group-hover:opacity-90"
                            style={{ height: `${completedHeight}px` }}
                            title={`Completed: ${week.completed}`}
                          ></div>
                          <div
                            className="w-full rounded-t-lg bg-gradient-to-t from-red-500 to-pink-400 transition-all duration-300 group-hover:opacity-90"
                            style={{ height: `${cancelledHeight}px` }}
                            title={`Cancelled: ${week.cancelled}`}
                          ></div>
                        </div>
                        
                        {/* Week label */}
                        <div className="mt-3 text-center">
                          <p className={`text-sm font-semibold ${
                            activeWeek === index ? 'text-blue-600' : 'text-gray-700'
                          }`}>
                            Week {week.week}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">{week.appointments} total</p>
                          
                          {trend && (
                            <span className={`text-xs mt-1 inline-block px-2 py-1 rounded-full ${
                              trend.startsWith('+') 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {trend}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex justify-center space-x-8 mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded bg-gradient-to-r from-green-500 to-emerald-500 mr-2"></div>
                  <span className="text-sm text-gray-600">Completed</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded bg-gradient-to-r from-red-500 to-pink-500 mr-2"></div>
                  <span className="text-sm text-gray-600">Cancelled</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded bg-gradient-to-r from-blue-500 to-cyan-500 mr-2"></div>
                  <span className="text-sm text-gray-600">Revenue Trend</span>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl p-6 text-white">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold">Performance Dashboard</h2>
                  <p className="text-gray-300 text-sm">Real-time practice analytics</p>
                </div>
                <div className="text-blue-400">
                  <ActivityIcon />
                </div>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((metric, index) => (
                  <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl">{metric.icon}</span>
                      <span className={`text-xs px-2 py-1 rounded-full flex items-center ${
                        metric.trend === 'up' 
                          ? 'bg-green-900/30 text-green-400 border border-green-800/50' 
                          : 'bg-blue-900/30 text-blue-400 border border-blue-800/50'
                      }`}>
                        <div className="mr-1">
                          {metric.trend === 'up' ? <TrendingUpIcon size={10} /> : <TrendingDownIcon size={10} />}
                        </div>
                        {metric.change}
                      </span>
                    </div>
                    <p className="text-2xl font-bold mb-1">{metric.value}</p>
                    <p className="text-sm text-gray-400">{metric.label}</p>
                  </div>
                ))}
              </div>
              
              {/* Live consultation timer */}
              <div className="mt-6 p-4 bg-gray-800/30 rounded-xl border border-gray-700/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-300">Current Consultation</p>
                    <p className="text-lg font-semibold">Patient: Maria Garcia</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-mono font-bold text-green-400">
                      {formatTime(consultationTime)}
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Duration</p>
                  </div>
                  <button className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-lg font-medium">
                    Complete
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Appointments */}
          <div className="space-y-6">
            {/* Upcoming Appointments */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Upcoming Appointments</h2>
                  <p className="text-gray-500 text-sm">Today & next 7 days</p>
                </div>
                <button className="text-blue-600 text-sm font-medium hover:text-blue-700 flex items-center">
                  View All <div className="ml-1"><ChevronRightIcon /></div>
                </button>
              </div>

              <div className="space-y-4">
                {appointments.map((apt) => (
                  <div 
                    key={apt.id}
                    className={`p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${
                      selectedAppointment === apt.id 
                        ? 'border-blue-300 bg-blue-50/50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedAppointment(apt.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 rounded-lg ${apt.avatarColor} flex items-center justify-center text-white font-semibold`}>
                        {getInitials(apt.patient)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900">{apt.patient}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(apt.status)}`}>
                            {apt.status}
                          </span>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <div className="mr-1"><CalendarIcon size={14} /></div>
                          {apt.date} • {apt.time}
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-500 mt-2">
                          <div className="mr-1"><BuildingIcon size={14} /></div>
                          {apt.clinic}
                          <span className="mx-2">•</span>
                          <span className="text-blue-600 font-medium">{apt.type}</span>
                        </div>
                        
                        <div className="flex items-center justify-between mt-3">
                          <button className="text-xs text-gray-500 hover:text-gray-700 flex items-center">
                            <div className="mr-1"><EyeIcon size={12} /></div>
                            Details
                          </button>
                          <button className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-medium rounded-lg transition-all duration-200">
                            Start
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <button className="w-full py-3 border-2 border-dashed border-gray-300 text-gray-600 hover:border-blue-400 hover:text-blue-600 rounded-xl font-medium transition-all duration-200 flex items-center justify-center group">
                  <div className="mr-2 group-hover:rotate-90 transition-transform">
                    <PlusIcon />
                  </div>
                  Schedule New Appointment
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-xl p-6 text-white">
              <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl transition-colors flex flex-col items-center justify-center">
                  <PlusIcon size={20} />
                  <span className="text-xs mt-2">New Patient</span>
                </button>
                <button className="p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl transition-colors flex flex-col items-center justify-center">
                  <DownloadIcon size={20} />
                  <span className="text-xs mt-2">Export Data</span>
                </button>
                <button className="p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl transition-colors flex flex-col items-center justify-center">
                  <CalendarIcon size={20} />
                  <span className="text-xs mt-2">Schedule</span>
                </button>
                <button className="p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl transition-colors flex flex-col items-center justify-center">
                  <CreditCardIcon size={20} />
                  <span className="text-xs mt-2">Billing</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Clinics Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Affiliated Clinics</h2>
                <p className="text-gray-500 text-sm">Manage your clinic network and performance</p>
              </div>
              
              <div className="flex items-center space-x-3 mt-4 md:mt-0">
                <button className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium text-sm transition-colors flex items-center">
                  <div className="mr-2"><FilterIcon /></div>
                  Filter
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-medium text-sm transition-colors flex items-center">
                  <div className="mr-2"><PlusIcon /></div>
                  Add Clinic
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm">Clinic</th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm">Location</th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm">Contact</th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm">Patients</th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm">Rating</th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm">Today</th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm">Status</th>
                  <th className="py-4 px-6 text-left font-semibold text-gray-700 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {clinics.map((clinic, index) => (
                  <tr 
                    key={index} 
                    className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mr-3">
                          <BuildingIcon />
                        </div>
                        <div>
                          <span className="font-semibold text-gray-900 block">{clinic.name}</span>
                          <span className="text-xs text-gray-500">ID: CLIN{1000 + index}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className="text-gray-400 mr-2"><MapPinIcon size={14} /></div>
                        <span className="text-gray-700">{clinic.address}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className="text-gray-400 mr-2"><PhoneIcon size={14} /></div>
                        <span className="text-gray-700">{clinic.contact}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className="text-gray-400 mr-2"><UsersIcon size={16} /></div>
                        <div>
                          <span className="font-semibold text-gray-900">{clinic.patients}</span>
                          <span className="text-xs text-gray-500 block">active</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className="flex items-center mr-2">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className={i < Math.floor(clinic.rating) ? "text-yellow-400" : "text-gray-300"}>
                              <StarIcon filled={i < Math.floor(clinic.rating)} />
                            </div>
                          ))}
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{clinic.rating}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                        {clinic.appointmentsToday} appointments
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-sm font-medium text-gray-700 capitalize">{clinic.status}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors">
                          <EyeIcon size={16} className="text-gray-600" />
                        </button>
                        <button className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors">
                          <DownloadIcon size={16} className="text-gray-600" />
                        </button>
                        <button className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors">
                          <MoreVerticalIcon size={16} className="text-gray-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row sm:items-center justify-between">
            <div className="text-sm text-gray-600 mb-2 sm:mb-0">
              Showing {clinics.length} clinics with <span className="font-semibold">167</span> total patients
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1.5 text-sm border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                Previous
              </button>
              <button className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                1
              </button>
              <button className="px-3 py-1.5 text-sm border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Footer Summary */}
        <div className="mt-8 p-6 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl shadow-xl text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm">Practice Summary</p>
              <p className="text-2xl font-bold mt-1">Total Revenue: <span className="text-green-400">₱42,580</span></p>
              <p className="text-gray-400 text-sm mt-2">Last updated: Today at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <button className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg font-medium transition-colors">
                View Reports
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-lg font-medium transition-colors">
                Export Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}