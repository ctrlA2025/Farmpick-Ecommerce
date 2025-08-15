import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./About.css";

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });

    const counters = document.querySelectorAll(".counter");
    const speed = 200;

    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;
        const increment = Math.ceil(target / speed);
        if (count < target) {
          counter.innerText = count + increment;
          setTimeout(updateCount, 10);
        } else {
          counter.innerText = target + "+";
        }
      };

      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            updateCount();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.6 });

      observer.observe(counter);
    });
  }, []);

  return (
    <div className="about-us-page">
      {/* Flying Leaves */}
      <div className="leaves">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="leaf"></div>
        ))}
      </div>

      {/* Header */}
      <header className="glass-header" data-aos="fade-down">
        <h1>About Farmpick</h1>
        <p>Freshness Delivered. Trust Cultivated.</p>
        <h3>மருந்தென வேண்டாவாம் யாக்கைக்கு அருந்தியது அற்றது போற்றி உணின்.</h3>
      </header>

      {/* Main Section */}
      <section className="about-section">
        <h2 data-aos="fade-up">Who We Are</h2>
        <p data-aos="fade-up">
          At <strong>Farmpick</strong>, we connect farmers directly with consumers, ensuring you get farm-fresh, high-quality products and farmers get fair pay.
        </p>

        <h2 data-aos="fade-up">Our Mission</h2>
        <p data-aos="fade-up">
          We envision a transparent food chain by eliminating middlemen, providing healthier food and better returns to farmers.
        </p>

        <h2 data-aos="fade-up">Why Choose Farmpick?</h2>
        <div className="features">
          {[
            "🌱 Farm-to-Door Freshness",
            "📦 Bulk & Retail Friendly",
            "🛒 Easy Ordering Experience",
            "🚚 Fast, Scheduled Deliveries",
            "🧑‍🌾 Direct from Trusted Sources"
          ].map((item, idx) => (
            <div key={idx} className="feature" data-aos="zoom-in">
              {item}
            </div>
          ))}
        </div>

        <h2 data-aos="fade-up">Our Impact</h2>
        <div className="stats-section">
          {[
            { target: 1800, label: "Orders Delivered" },
            { target: 150, label: "Direct Customers" },
            { target: 225, label: "Land Acres" },
            { target: 50, label: "Fresh Vegetables" }
          ].map((stat, idx) => (
            <div key={idx} className="stat-card" data-aos="zoom-in">
              <h3 className="counter" data-target={stat.target}>0</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="team-section">
          <h2 data-aos="fade-up">Meet Our Team</h2>
          <div className="team-members">
            {[
              {
                name: "Rahul",
                role: "Founder & Operations Head",
                desc: "Leads farm-to-shelf logistics with unmatched efficiency.",
                img: "/images/Rahul.png"
              },
              {
                name: "Dharani",
                role: "Founder & Marketing Lead",
                desc: "Ensures Farmpick stays connected with both businesses and households.",
                img: "/images/Dharani.png"
              }
            ].map((member, idx) => (
              <div key={idx} className="member-card" data-aos="fade-up">
                <img src={member.img} alt={member.name} className="profile-img" />
                <h3>{member.name}</h3>
                <p><strong>{member.role}</strong></p>
                <p>{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass-footer">
        <p>&copy; 2025 Farmpick. All copyrights reserved by AjithKumar S.</p>
      </footer>
    </div>
  );
};

export default About;
