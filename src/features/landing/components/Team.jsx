import React from "react";

const Team = () => {
  const teamMembers = [
    {
      name: "Carl Ivan Sampan",
      role: "Team Leader & Full Stack Developer",
      description:
        "Leading the development team with expertise in healthcare technology solutions and system architecture",
      gradient: "from-blue-500 to-blue-700",
      photo: "../../../../team/carl.jpg", // Updated path
    },
    {
      name: "Carl Joseph Orence",
      role: "Backend Developer",
      description:
        "Specializing in server-side development, database design, and API integration for healthcare systems",
      gradient: "from-blue-400 to-blue-600",
      photo: "../../../../team/carlj.jpg", // Updated path
    },
    {
      name: "Engr. Elvi Lito Ubas",
      role: "Project Advisor & Mentor",
      description:
        "Guiding the team with technical expertise and industry knowledge in software engineering principles",
      gradient: "from-purple-500 to-purple-700",
      photo: "../../../../team/teacher.jpg", // Updated path
    },
    {
      name: "Mariz Esparago",
      role: "Frontend Developer",
      description:
        "Creating intuitive user interfaces and ensuring seamless user experiences across all platforms",
      gradient: "from-blue-300 to-blue-500",
      photo: "../../../../team/mariz.jpg", // Updated path
    },
    {
      name: "Elena May Olaivar",
      role: "UI/UX Designer & QA Specialist",
      description:
        "Designing user-centric interfaces and ensuring product quality through comprehensive testing",
      gradient: "from-blue-200 to-blue-400",
      photo: "../../../../team/elena.jpg", // Updated path
    },
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-600 dark:text-blue-400 mb-4">
          Meet Our Team
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          The dedicated students and mentor behind FinalHealth, working together
          to revolutionize healthcare management through innovative technology
          solutions
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center group">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <img
                    src={member.photo} // Ensure path works with the public directory
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.style.display = "none"; // Handle missing image
                    }}
                  />
                  {/* Fallback Gradient */}
                  <div
                    className={`w-full h-full bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white font-semibold text-lg`}
                  >
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                </div>
                {/* Special border for teacher/mentor */}
                <div
                  className={`absolute inset-0 rounded-full border-2 border-transparent group-hover:border-blue-400 transition-all duration-300 ${
                    member.role.includes("Advisor")
                      ? "border-yellow-400 group-hover:border-yellow-500"
                      : ""
                  }`}
                ></div>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {member.name}
              </h3>
              <p
                className={`font-semibold mb-2 ${
                  member.role.includes("Advisor")
                    ? "text-yellow-600 dark:text-yellow-400"
                    : "text-blue-600 dark:text-blue-400"
                }`}
              >
                {member.role}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {member.description}
              </p>
            </div>
          ))}
        </div>

        {/* Team Description */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900 rounded-full">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-blue-700 dark:text-blue-300 font-medium">
              BSCS 501 - Software Engineering Project
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
