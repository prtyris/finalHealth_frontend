import React from "react";

const Team = () => {
  const teamMembers = [
    {
      name: "Dr. Carl Ivan Sampan",
      role: "Chief Medical Officer",
      description:
        "Leading our medical team with 15+ years of healthcare experience",
      gradient: "from-blue-500 to-blue-700",
      photo: "/images/team/carl.jpg",
    },
    {
      name: "Carl  Joseph Orence",
      role: "Technical Director",
      description:
        "Software engineer specializing in healthcare technology solutions",
      gradient: "from-blue-400 to-blue-600",
      photo: "/images/team/carlj.jpg",
    },
    {
      name: "Mariz Esparago",
      role: "Product Manager",
      description:
        "Ensuring our platform meets the needs of healthcare providers",
      gradient: "from-blue-300 to-blue-500",
      photo: "/images/team/mariz.jpg",
    },
    {
      name: "Michael Tan",
      role: "Customer Success Lead",
      description: "Dedicated to providing exceptional support to our clients",
      gradient: "from-blue-200 to-blue-400",
      photo: "/images/team/elena.png",
    },
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-600 dark:text-blue-400 mb-4">
          Meet Our Team
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          The dedicated professionals behind FinalHealth, working together to
          revolutionize healthcare management
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center group">
              <div className="relative w-32 h-32 mx-auto mb-6">
                {/* Photo Container */}
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      // Fallback if image fails to load
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  {/* Fallback Gradient */}
                  <div
                    className={`w-full h-full bg-gradient-to-br ${member.gradient} hidden items-center justify-center text-white font-semibold`}
                  >
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                </div>
                {/* Hover Effect Ring */}
                <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-blue-400 transition-all duration-300"></div>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {member.name}
              </h3>
              <p className="font-semibold text-blue-600 dark:text-blue-400 mb-2">
                {member.role}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
