import React, { useState, useEffect, useRef } from "react";
import {
  Award,
  Users,
  Shield,
  Heart,
  Star,
  Camera,
  TreePine,
} from "lucide-react";
import { Helmet } from "react-helmet";
import camp3Img from "/src//assets/images/about/camp3.webp";
import aboutUsImg from "/src/assets/images/about/aboutus.webp";

const AboutUsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const teamInfo = {
    image: aboutUsImg,
    title: "Our Dedicated Team",
    description: "Our team consists of dedicated, well-trained, and highly experienced professionals who are passionate about Yala's wildlife and committed to providing exceptional camping experiences. Each member brings years of expertise in wildlife conservation, sustainable tourism, and guest safety to ensure your adventure is both memorable and meaningful."
  };

  const achievements = [
    
    {
      icon: <Users className="w-8 h-8" />,
      title: "5000+ Happy Guests",
      description: "Successful camping experiences delivered",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Zero Incidents",
      description: "Perfect safety record since establishment",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Community Impact",
      description: "Supporting 50+ local families through tourism",
    },
  ];

  return (
    <section ref={sectionRef} id="about-us" className="relative py-16 bg-white">
      <Helmet>
        <title>About Us | Yala Mobile Camping and Safari</title>
        <meta
          name="description"
          content="Discover the story and team behind Yala Mobile Camping and Safari, Sri Lanka's leading mobile safari and eco-camping experience in Yala National Park. Learn about our wildlife experts, conservation efforts, and guest-first philosophy."
        />
        <meta
          name="keywords"
          content="about yala mobile camping, yala safari, sri lanka safari team, eco-tourism, wildlife experts, conservation, sustainable travel, yala national park, mobile camping sri lanka"
        />
        <meta
          property="og:title"
          content="About Us | Yala Mobile Camping and Safari"
        />
        <meta
          property="og:description"
          content="Meet the team behind Yala Mobile Camping and Safari, Sri Lanka's top mobile safari and eco-camping experience in Yala National Park."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://yalamobilecamping.com/og-image.webp"
        />
        <link rel="canonical" href="https://yalamobilecamping.com/about" />
      </Helmet>
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div
          className={`absolute top-10 left-10 w-24 h-24 sm:w-32 sm:h-32 bg-emerald-300 rounded-full blur-3xl transition-all duration-2000 ${
            isVisible ? "animate-float" : ""
          }`}
        ></div>
        <div
          className={`absolute bottom-20 right-20 w-28 h-28 sm:w-40 sm:h-40 bg-teal-300 rounded-full blur-3xl transition-all duration-2000 delay-500 ${
            isVisible ? "animate-float-reverse" : ""
          }`}
        ></div>
      </div>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif italic text-emerald-900 mb-4 sm:mb-6 leading-tight transform transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            About Yala Mobile Camping
          </h2>
          <p
            className={`text-lg sm:text-xl md:text-2xl text-emerald-700 max-w-3xl mx-auto font-light transform transition-all duration-1000 delay-300 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            Pioneering sustainable wildlife tourism in Sri Lanka since 2018
          </p>
          <div
            className={`w-24 sm:w-32 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mt-4 sm:mt-6 rounded-full transform transition-all duration-1000 delay-500 ${
              isVisible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
            }`}
          ></div>
        </div>
        {/* Our Story */}
        <div
          className={`bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-12 shadow-xl mb-10 sm:mb-16 transform transition-all duration-1000 delay-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                Our Story
              </h3>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
                Born from a passion for Sri Lanka's incredible biodiversity,
                Yala Mobile Camping was founded to offer authentic wilderness experiences
                while supporting conservation efforts and local communities.
              </p>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
                We believe that responsible tourism can be a powerful force for
                conservation. Every guest who joins us contributes directly to
                wildlife protection and community development in the areas we
                operate.
              </p>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="flex items-center">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                  <span className="ml-2 text-gray-600 text-xs sm:text-base">
                    4.9/5 Guest Rating
                  </span>
                </div>
              </div>
            </div>
            <div className="relative mt-8 lg:mt-0">
              <img
                src={camp3Img}
                alt="Yala National Park Safari"
                className="w-full h-56 sm:h-72 md:h-96 object-cover rounded-xl sm:rounded-2xl shadow-lg"
              />
              <div className="absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 bg-emerald-600 text-white p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-lg sm:text-2xl font-bold">6+</div>
                  <div className="text-xs sm:text-sm">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Achievements */}
        <div
          className={`mb-10 sm:mb-16 transform transition-all duration-1000 delay-900 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
            Our Achievements
          </h3>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-md p-4 sm:p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition-all duration-300"
              >
                <div className="text-emerald-600 mb-2 sm:mb-4 flex justify-center">
                  {achievement.icon}
                </div>
                <h4 className="font-bold text-gray-900 mb-1 sm:mb-2 text-base sm:text-lg">
                  {achievement.title}
                </h4>
                <p className="text-gray-600 text-xs sm:text-sm">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* Team */}
        <div
          className={`mb-10 sm:mb-16 transform transition-all duration-1000 delay-1100 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
            {teamInfo.title}
          </h3>
          <div className="bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl overflow-hidden shadow-xl max-w-4xl mx-auto">
            <img
              src={teamInfo.image}
              alt="Our Team at Yala Mobile Camping"
              className="w-full h-48 sm:h-64 md:h-80 object-cover"
            />
            <div className="p-6 sm:p-8 md:p-10">
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed text-center">
                {teamInfo.description}
              </p>
            </div>
          </div>
        </div>
        {/* Our Mission */}
        <div
          className={`bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-12 text-center transform transition-all duration-1000 delay-1300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
            Our Mission
          </h3>
          <p className="text-base sm:text-xl leading-relaxed max-w-4xl mx-auto mb-6 sm:mb-8">
            To provide transformative wildlife experiences that inspire
            conservation action, support local communities, and create lasting
            memories while maintaining the highest standards of safety and
            sustainability.
          </p>
          <div className="flex flex-wrap justify-center space-x-4 sm:space-x-8">
            <div className="text-center mb-2 sm:mb-0">
              <TreePine className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2" />
              <div className="font-semibold text-xs sm:text-base">
                Conservation
              </div>
            </div>
            <div className="text-center mb-2 sm:mb-0">
              <Users className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2" />
              <div className="font-semibold text-xs sm:text-base">
                Community
              </div>
            </div>
            <div className="text-center">
              <Camera className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2" />
              <div className="font-semibold text-xs sm:text-base">
                Experience
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-15px) scale(1.02);
          }
        }
        @keyframes float-reverse {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(15px) scale(0.98);
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-reverse {
          animation: float-reverse 4s ease-in-out infinite;
        }
        .font-serif {
          font-family: "Playfair Display", serif;
        }
      `}</style>
    </section>
  );
};

export default AboutUsSection;
