import React from 'react';

const Features = () => {
  const features = [
    {
      icon: '📅',
      title: 'Appointment Management',
      description: 'Schedule, view, and manage patient appointments with an intuitive calendar system'
    },
    {
      icon: '📋',
      title: 'Patient Records & History',
      description: 'Access and update patient medical records, prescriptions, and test results securely'
    },
    {
      icon: '📊',
      title: 'Clinic Dashboard',
      description: 'Overview of operations, schedules, and statistics at a glance'
    },
    {
      icon: '📝',
      title: 'Medical Notes & Prescriptions',
      description: 'Create comprehensive notes and generate prescriptions efficiently'
    },
    {
      icon: '👤',
      title: 'Doctor-Secretary Access',
      description: 'Seamless collaboration between doctors and staff for efficient management'
    },
    {
      icon: '📈',
      title: 'Reports & Analytics',
      description: 'Generate appointment, patient visits and activity summaries to inform decisions'
    }
  ];

  return (
    <section id="features" className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-600 dark:text-blue-400 mb-4">
          All the Tools You Need in One Platform
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          Comprehensive features designed specifically for healthcare providers and clinic management
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg border-l-4 border-blue-500 hover:transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;