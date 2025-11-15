import React from "react";

const HowItWorks = () => {
  const steps = [
    {
      number: "1",
      title: "Create Your Account",
      description: "Sign up in just a few minutes",
    },
    {
      number: "2",
      title: "Select Subscription Plan",
      description: "Choose the perfect plan for your clinic",
    },
    {
      number: "3",
      title: "System Auto-Identifies Role",
      description: "Automatic role assignment for seamless access",
    },
    {
      number: "4",
      title: "Start Managing",
      description: "Begin managing your clinic efficiently",
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-600 dark:text-blue-400 mb-4">
          How FinalHealth Works
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          Simple steps to get your clinic management system up and running
        </p>

        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center relative z-10">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 border-4 border-white dark:border-gray-900">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
