import React from "react";

const Journey = () => {
  const milestones = [
    {
      year: "2020",
      title: "Founded",
      description:
        "FinalHealth was established to revolutionize healthcare management",
      side: "left",
    },
    {
      year: "2021",
      title: "First Clinic Partner",
      description: "Onboarded our first healthcare provider",
      side: "right",
    },
    {
      year: "2022",
      title: "Platform Launch",
      description: "Released our comprehensive clinic management platform",
      side: "left",
    },
    {
      year: "2023",
      title: "100+ Partners",
      description: "Reached milestone of 100 healthcare providers",
      side: "right",
      featured: true,
    },
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-600 dark:text-blue-400 mb-12">
          Our Journey
        </h2>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 to-teal-500"></div>

          {milestones.map((milestone, index) => (
            <div
              key={index}
              className={`flex items-center mb-16 ${
                milestone.side === "left" ? "flex-row" : "flex-row-reverse"
              }`}
            >
              {/* Content */}
              <div
                className={`flex-1 ${
                  milestone.side === "left" ? "pr-8 text-right" : "pl-8"
                }`}
              >
                <h3
                  className={`text-2xl font-bold mb-2 ${
                    milestone.featured
                      ? "text-teal-600 dark:text-teal-400"
                      : "text-blue-600 dark:text-blue-400"
                  }`}
                >
                  {milestone.year}
                </h3>
                <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  {milestone.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {milestone.description}
                </p>
              </div>

              {/* Dot */}
              <div
                className={`w-6 h-6 rounded-full border-4 border-white dark:border-gray-800 z-10 ${
                  milestone.featured ? "bg-teal-500" : "bg-blue-600"
                }`}
              ></div>

              {/* Spacer */}
              <div className="flex-1"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Journey;
