import React, { useState } from "react";
import Layout from "../../components/Layout";

export default function Dashboard() {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showAllAppointments, setShowAllAppointments] = useState(false);
  const [activeTab, setActiveTab] = useState("clinics");

  // Clean Icons in blue
  const BuildingIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  );

  const UsersIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  );

  const CreditCardIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
      <line x1="1" y1="10" x2="23" y2="10"></line>
    </svg>
  );

  const CalendarIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  );

  const ClockIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  );

  const ChevronIcon = ({ direction = "right" }) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" 
      className={`transform ${direction === "down" ? "rotate-90" : ""}`}>
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  );

  const CheckIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );

  // Stats - Blue and white design
  const stats = [
    { 
      label: "Clinics", 
      value: 4,
      icon: <BuildingIcon />,
      change: "+1 this month",
      color: "border-blue-200"
    },
    { 
      label: "Doctors", 
      value: 12,
      icon: <UsersIcon />,
      change: "+2 recently",
      color: "border-blue-200"
    },
    { 
      label: "Subscription", 
      value: "Pro Plan",
      sub: "45 days left",
      icon: <CreditCardIcon />,
      color: "border-purple-200",
      badge: "Active"
    },
    { 
      label: "Appointments", 
      value: 16,
      icon: <CalendarIcon />,
      change: "Next 3 days",
      color: "border-blue-200"
    },
  ];

  // Appointments - Blue and white design
  const appointments = [
    {
      id: 1,
      time: "10:00 AM",
      patient: "Carl Orence",
      type: "Follow-up",
      clinic: "Happy Clinic",
      status: "confirmed",
      date: "Today",
      duration: "45 min"
    },
    {
      id: 2,
      time: "2:30 PM",
      patient: "Mariz Esparago",
      type: "New Patient",
      clinic: "City Care Clinic",
      status: "confirmed",
      date: "Today",
      duration: "60 min"
    },
    {
      id: 3,
      time: "11:00 AM",
      patient: "Elena Hilario",
      type: "Consultation",
      clinic: "Wellness Hub",
      status: "pending",
      date: "Tomorrow",
      duration: "30 min"
    },
    {
      id: 4,
      time: "9:00 AM",
      patient: "Ivan Sampan",
      type: "Check-up",
      clinic: "Happy Clinic",
      status: "confirmed",
      date: "Nov 1",
      duration: "45 min"
    },
  ];

  // Show only 2 appointments initially
  const visibleAppointments = showAllAppointments ? appointments : appointments.slice(0, 2);

  // Clinics and Doctors Data
  const clinics = [
    { 
      name: "Happy Clinic", 
      doctors: 3,
      patients: 42,
      status: "active"
    },
    {
      name: "City Care Clinic",
      doctors: 2,
      patients: 38,
      status: "active"
    },
    {
      name: "Wellness Hub",
      doctors: 4,
      patients: 56,
      status: "active"
    },
    {
      name: "Metro Health Center",
      doctors: 3,
      patients: 31,
      status: "active"
    }
  ];

  const doctors = [
    {
      name: "Dr. Maria Santos",
      specialization: "Cardiology",
      clinic: "Happy Clinic",
      patients: 28,
      status: "active"
    },
    {
      name: "Dr. James Wilson",
      specialization: "Pediatrics",
      clinic: "City Care Clinic",
      patients: 32,
      status: "active"
    },
    {
      name: "Dr. Sarah Chen",
      specialization: "Dermatology",
      clinic: "Wellness Hub",
      patients: 45,
      status: "on leave"
    },
    {
      name: "Dr. Robert Kim",
      specialization: "Orthopedics",
      clinic: "Metro Health Center",
      patients: 37,
      status: "active"
    }
  ];

  const subscription = {
    plan: "Pro Plan",
    status: "active",
    price: "₱8,999/month",
    renewal: "Jan 15, 2025",
    usage: {
      clinics: { used: 4, total: 10 },
      doctors: { used: 12, total: 20 },
      progress: 60
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return 'bg-blue-50 text-blue-700';
      case 'pending': return 'bg-blue-50 text-blue-700';
      case 'active': return 'bg-blue-50 text-blue-700';
      case 'on leave': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const renderContent = () => {
    if (activeTab === "clinics") {
      return clinics.map((clinic, index) => (
        <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors duration-200">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mr-3">
              <BuildingIcon className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{clinic.name}</h3>
              <div className="flex items-center mt-1">
                <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-xs text-gray-600">{clinic.status}</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-center p-2 bg-blue-50 rounded">
              <div className="font-semibold text-blue-700">{clinic.doctors}</div>
              <div className="text-xs text-gray-600">Doctors</div>
            </div>
            <div className="text-center p-2 bg-blue-50 rounded">
              <div className="font-semibold text-blue-700">{clinic.patients}</div>
              <div className="text-xs text-gray-600">Patients</div>
            </div>
          </div>
        </div>
      ));
    } else {
      return doctors.map((doctor, index) => (
        <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors duration-200">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mr-3">
              <span className="font-semibold text-blue-700">
                {getInitials(doctor.name)}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(doctor.status)}`}>
                {doctor.status}
              </span>
            </div>
          </div>
          <div className="text-sm space-y-1">
            <div className="text-gray-600">{doctor.specialization}</div>
            <div className="text-gray-500">{doctor.clinic}</div>
            <div className="text-blue-700 font-medium">{doctor.patients} patients</div>
          </div>
        </div>
      ));
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Practice overview at a glance</p>
        </div>

        {/* Stats Grid - Blue and white */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`bg-white border ${stat.color} rounded-lg p-4 shadow-sm hover:shadow transition-shadow duration-200`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <div className="mt-2">
                    {stat.sub && <p className="text-xs text-gray-500">{stat.sub}</p>}
                    {stat.change && (
                      <div className="flex items-center">
                        <span className="text-xs text-blue-600">
                          {stat.change}
                        </span>
                        {stat.badge && (
                          <span className="ml-2 text-xs px-2 py-1 rounded bg-purple-50 text-purple-700">
                            {stat.badge}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-2 rounded bg-blue-50">
                  <div className="text-blue-600">
                    {stat.icon}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Appointments Section - Blue and white */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Upcoming Appointments</h2>
                <p className="text-gray-500 text-sm">Today's schedule</p>
              </div>
              <button 
                className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                onClick={() => setShowAllAppointments(!showAllAppointments)}
              >
                {showAllAppointments ? "Show Less" : `View All (${appointments.length})`}
                <ChevronIcon direction={showAllAppointments ? "up" : "down"} className="ml-1" />
              </button>
            </div>

            <div className="space-y-3">
              {visibleAppointments.map((apt) => (
                <div 
                  key={apt.id}
                  className={`p-4 border rounded-lg ${selectedAppointment === apt.id ? 'border-blue-400 bg-blue-50' : 'border-gray-200 hover:border-blue-300'} cursor-pointer transition-colors duration-200`}
                  onClick={() => setSelectedAppointment(apt.id)}
                >
                  <div className="flex items-start">
                    <div className="mr-4 min-w-[70px]">
                      <div className="text-sm font-semibold text-blue-700 bg-blue-50 px-2 py-1 rounded text-center">
                        {apt.time}
                      </div>
                      <div className="text-xs text-gray-500 mt-1 text-center">{apt.date}</div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">{apt.patient}</h3>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(apt.status)}`}>
                          {apt.status}
                        </span>
                      </div>
                      
                      <div className="mt-2 flex items-center space-x-3 text-sm">
                        <span className="text-blue-600 flex items-center">
                          <CalendarIcon className="w-3 h-3 mr-1" />
                          {apt.type}
                        </span>
                        <span className="text-gray-500 flex items-center">
                          <ClockIcon className="mr-1" />
                          {apt.duration}
                        </span>
                      </div>
                      
                      <div className="mt-2 text-sm text-gray-600">
                        {apt.clinic}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Collapsed State Indicator */}
              {!showAllAppointments && appointments.length > 2 && (
                <div className="text-center text-sm text-blue-600 pt-2">
                  +{appointments.length - 2} more appointments
                </div>
              )}
            </div>
          </div>

          {/* Subscription Card - Purple accents */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Subscription</h2>
                <p className="text-gray-500 text-sm">Current plan & usage</p>
              </div>
              <div className="p-2 rounded bg-purple-50">
                <CreditCardIcon className="text-purple-600" />
              </div>
            </div>

            {/* Plan Info */}
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <CheckIcon className="text-purple-600 mr-2" />
                <span className="font-semibold text-gray-900">{subscription.plan}</span>
                <span className="ml-3 text-sm text-purple-600">● Active</span>
              </div>
            </div>

            {/* Usage Progress */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Plan Usage</span>
                <span>{subscription.usage.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full rounded-full bg-purple-600"
                  style={{ width: `${subscription.usage.progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Renews: {subscription.renewal}</span>
                <span>{subscription.price}</span>
              </div>
            </div>

            {/* Usage Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors duration-200">
                <div className="text-lg font-semibold text-blue-700 mb-1">{subscription.usage.clinics.used}/{subscription.usage.clinics.total}</div>
                <div className="text-sm text-gray-600">Clinics</div>
              </div>
              <div className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors duration-200">
                <div className="text-lg font-semibold text-blue-700 mb-1">{subscription.usage.doctors.used}/{subscription.usage.doctors.total}</div>
                <div className="text-sm text-gray-600">Doctors</div>
              </div>
            </div>

            <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
              Manage Subscription
            </button>
          </div>
        </div>

        {/* Clinics & Doctors Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Network</h2>
              <p className="text-gray-500 text-sm">Clinics and medical team</p>
            </div>
            
            {/* Toggle Buttons */}
            <div className="flex bg-blue-50 rounded p-1">
              <button
                onClick={() => setActiveTab("clinics")}
                className={`px-4 py-1.5 rounded text-sm font-medium transition-colors duration-200 ${
                  activeTab === "clinics"
                    ? "bg-white text-blue-700 shadow-sm"
                    : "text-gray-600 hover:text-blue-700"
                }`}
              >
                Clinics ({clinics.length})
              </button>
              <button
                onClick={() => setActiveTab("doctors")}
                className={`px-4 py-1.5 rounded text-sm font-medium transition-colors duration-200 ${
                  activeTab === "doctors"
                    ? "bg-white text-blue-700 shadow-sm"
                    : "text-gray-600 hover:text-blue-700"
                }`}
              >
                Doctors ({doctors.length})
              </button>
            </div>
          </div>

          {/* Dynamic Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {renderContent()}
          </div>

          {/* Add Button */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <button className="w-full py-2 border border-dashed border-blue-300 text-blue-600 hover:border-blue-400 hover:text-blue-800 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add {activeTab === "clinics" ? "New Clinic" : "New Doctor"}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}