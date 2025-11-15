import React from "react";

const About = () => {
  const features = [
    {
      icon: "📋",
      title: "Clinic Management",
      description:
        "Streamline your clinic operations with our comprehensive management tools",
    },
    {
      icon: "👥",
      title: "Patient Care",
      description:
        "Enhance patient experience with seamless appointment scheduling and record management",
    },
    {
      icon: "📊",
      title: "Analytics",
      description:
        "Make data-driven decisions with comprehensive reporting and analytics",
    },
  ];

  const missions = [
    {
      icon: "🎯",
      title: "Our Mission",
      description:
        "To provide healthcare providers with comprehensive, user-friendly tools that streamline operations, enhance patient care, and enable data-driven decisions for better health outcomes.",
      gradient: "from-blue-600 to-blue-800",
    },
    {
      icon: "👁️",
      title: "Our Vision",
      description:
        "To be the leading healthcare management platform that connects clinics, patients, and healthcare professionals in a seamless digital ecosystem across the Philippines.",
      gradient: "from-teal-500 to-teal-700",
    },
  ];

  return (
    <section id="about" className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-600 dark:text-blue-400 mb-4">
          About FinalHealth
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-4xl mx-auto mb-12">
          FinalHealth is a comprehensive healthcare management platform designed
          to streamline clinic operations, enhance patient care, and improve
          overall healthcare delivery.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg text-center border-l-4 border-blue-500"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {missions.map((mission, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg text-center"
            >
              <div
                className={`w-20 h-20 bg-gradient-to-br ${mission.gradient} rounded-full flex items-center justify-center text-2xl text-white mx-auto mb-6`}
              >
                {mission.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                {mission.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {mission.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
