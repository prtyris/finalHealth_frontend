import React from "react";

const Values = () => {
  const values = [
    {
      icon: "❤️",
      title: "Patient-Centered",
      description:
        "Everything we do is focused on improving patient care and outcomes.",
      gradient: "from-red-100 to-red-200 dark:from-red-900 dark:to-red-800",
    },
    {
      icon: "💡",
      title: "Innovation",
      description:
        "We continuously evolve our platform to meet changing healthcare needs.",
      gradient:
        "from-orange-100 to-orange-200 dark:from-orange-900 dark:to-orange-800",
    },
    {
      icon: "🤝",
      title: "Partnership",
      description:
        "We work closely with healthcare providers to understand their challenges.",
      gradient:
        "from-yellow-100 to-yellow-200 dark:from-yellow-900 dark:to-yellow-800",
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-600 dark:text-blue-400 mb-12">
          Our Values
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {values.map((value, index) => (
            <div key={index} className="text-center p-8">
              <div
                className={`w-24 h-24 ${value.gradient} rounded-full flex items-center justify-center text-3xl mx-auto mb-6`}
              >
                {value.icon}
              </div>
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                {value.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Values;
