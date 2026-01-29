import React from "react";

const About = () => {
  const features = [
    {
      iconClass: "fas fa-clinic-medical",
      title: "Clinic Management",
      description: "Streamline your clinic operations with our comprehensive management tools, reducing administrative burden and increasing efficiency.",
    },
    {
      iconClass: "fas fa-user-injured",
      title: "Patient Care",
      description: "Enhance patient experience with seamless appointment scheduling, secure record management, and improved communication channels.",
    },
    {
      iconClass: "fas fa-chart-line",
      title: "Analytics & Reporting",
      description: "Make informed, data-driven decisions with comprehensive reporting and real-time analytics tailored to your clinic's needs.",
    },
  ];

  const missions = [
    {
      iconClass: "fas fa-bullseye",
      title: "Our Mission",
      description: "To provide healthcare providers with comprehensive, user-friendly tools that streamline operations, enhance patient care, and enable data-driven decisions for better health outcomes.",
      gradient: "from-blue-600 to-blue-800",
      cardClass: "mission-card",
    },
    {
      iconClass: "fas fa-eye",
      title: "Our Vision",
      description: "To be the leading healthcare management platform that connects clinics, patients, and healthcare professionals in a seamless digital ecosystem across the Philippines.",
      gradient: "from-purple-600 to-purple-800",
      cardClass: "vision-card",
    },
  ];

  return (
    <section id="about" style={styles.aboutSection}>
      <div style={styles.aboutContainer}>
        {/* Header */}
        <div style={styles.aboutHeader}>
          <h1 style={styles.aboutTitle}>About FinalHealth</h1>
          <p style={styles.aboutDescription}>
            FinalHealth is a comprehensive healthcare management platform designed to streamline clinic operations, 
            enhance patient care, and improve overall healthcare delivery across the Philippines.
          </p>
        </div>

        {/* Mission & Vision */}
        <div style={styles.missionVisionContainer}>
          {missions.map((mission, index) => (
            <div 
              key={index} 
              style={{
                ...styles.missionVisionCard,
                borderTop: mission.cardClass === "mission-card" ? "5px solid #3b82f6" : "5px solid #8b5cf6"
              }}
              className={mission.cardClass}
            >
              <div style={{
                ...styles.cardIcon,
                backgroundColor: mission.cardClass === "mission-card" ? "#dbeafe" : "#f3e8ff",
                color: mission.cardClass === "mission-card" ? "#3b82f6" : "#8b5cf6"
              }}>
                <i className={mission.iconClass}></i>
              </div>
              <h3 style={styles.cardTitle}>{mission.title}</h3>
              <p style={styles.cardDescription}>{mission.description}</p>
            </div>
          ))}
        </div>

        {/* Features */}
        <h2 style={styles.featuresTitle}>Our Core Services</h2>
        
        <div style={styles.featuresContainer}>
          {features.map((feature, index) => (
            <div key={index} style={styles.featureCard}>
              <div style={styles.featureIcon}>
                <i className={feature.iconClass}></i>
              </div>
              <h4 style={styles.featureCardTitle}>{feature.title}</h4>
              <p style={styles.featureCardDescription}>{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Tagline */}
        <div style={styles.taglineContainer}>
          <h3 style={styles.taglineTitle}>Transforming Healthcare Delivery</h3>
          <p style={styles.taglineDescription}>
            FinalHealth bridges the gap between healthcare providers and patients through innovative technology, 
            creating a more efficient and accessible healthcare system for everyone.
          </p>
        </div>
      </div>

      <style jsx>{`
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
        
        .mission-card:hover, .vision-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        }
        
        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </section>
  );
};

const styles = {
  aboutSection: {
    backgroundColor: "#f8fafc",
    color: "#334155",
    lineHeight: 1.6,
    padding: "20px",
    width: "100%",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  aboutContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "30px"
  },
  aboutHeader: {
    textAlign: "center",
    marginBottom: "50px",
    position: "relative"
  },
  aboutTitle: {
    fontSize: "2.8rem",
    color: "#1e40af",
    marginBottom: "15px",
    position: "relative",
    display: "inline-block"
  },
  aboutDescription: {
    fontSize: "1.2rem",
    maxWidth: "800px",
    margin: "25px auto 0",
    color: "#475569"
  },
  missionVisionContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "30px",
    marginBottom: "60px"
  },
  missionVisionCard: {
    flex: 1,
    minWidth: "300px",
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "30px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)",
    position: "relative",
    overflow: "hidden",
    transition: "transform 0.3s ease, box-shadow 0.3s ease"
  },
  cardIcon: {
    fontSize: "2.5rem",
    marginBottom: "20px",
    display: "inline-block",
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  cardTitle: {
    fontSize: "1.5rem",
    marginBottom: "15px",
    color: "#1e293b"
  },
  cardDescription: {
    color: "#475569"
  },
  featuresTitle: {
    textAlign: "center",
    fontSize: "2rem",
    color: "#1e40af",
    marginBottom: "40px",
    position: "relative"
  },
  featuresContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "30px",
    marginBottom: "50px"
  },
  featureCard: {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "30px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.05)",
    transition: "all 0.3s ease",
    position: "relative",
    overflow: "hidden"
  },
  featureIcon: {
    fontSize: "2.2rem",
    color: "#3b82f6",
    marginBottom: "20px",
    width: "60px",
    height: "60px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#dbeafe"
  },
  featureCardTitle: {
    fontSize: "1.4rem",
    color: "#1e293b",
    marginBottom: "15px"
  },
  featureCardDescription: {
    color: "#475569"
  },
  taglineContainer: {
    background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
    borderRadius: "20px",
    padding: "40px",
    textAlign: "center",
    color: "white",
    marginTop: "30px",
    boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)"
  },
  taglineTitle: {
    fontSize: "1.8rem",
    marginBottom: "15px"
  },
  taglineDescription: {
    fontSize: "1.1rem",
    maxWidth: "700px",
    margin: "0 auto",
    opacity: 0.9
  }
};

export default About;