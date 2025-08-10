import React, { useState, useEffect, useRef } from "react";
import {
  Tent,
  Shield,
  Coffee,
  Bed,
  Utensils,
  Car,
  Camera,
  Heart,
  Compass,
  Moon,
  Sun,
  Clock,
} from "lucide-react";
import { Helmet } from "react-helmet";

const CampingSection = ({ onInquireNow }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeActivity, setActiveActivity] = useState(0);
  const sectionRef = useRef(null);

  const campingActivities = [
    {
      id: 1,
      title: "Camp Setup & Welcome",
      subtitle: "Arrive at Your Wilderness Home",
      duration: "1 hour",
      time: "6:00 PM - 7:00 PM",
      difficulty: "Easy",
      maxGuests: 10,
      icon: <Tent className="w-5 h-5" />,
      description:
        "Arrive at your mobile camp nestled in the heart of Yala. Get settled into your luxury safari tent and enjoy welcome refreshments while our team briefs you on camp facilities.",
      highlights: [
        "Luxury safari tent assignment",
        "Camp orientation and safety briefing",
        "Welcome refreshments and towels",
      ],
      wildlife: ["🏕️ Camp Setup", "🍹 Refreshments", "🌿 Wilderness Views"],
    },
    {
      id: 2,
      title: "Bush Dinner Experience",
      subtitle: "Dining Under the Stars",
      duration: "2 hours",
      time: "7:00 PM - 9:00 PM",
      difficulty: "Easy",
      maxGuests: 10,
      icon: <Utensils className="w-5 h-5" />,
      description:
        "Enjoy a freshly prepared traditional Sri Lankan dinner around the campfire. Listen to the sounds of the jungle while sharing stories with fellow adventurers under a canopy of stars.",
      highlights: [
        "Traditional Sri Lankan cuisine",
        "Campfire dining atmosphere",
        "Nocturnal wildlife sounds",
      ],
      wildlife: ["🍽️ Local Cuisine", "🔥 Campfire", "🌌 Stargazing"],
    },
    {
      id: 3,
      title: "Night Sounds & Rest",
      subtitle: "Sleep in the Wild",
      duration: "8 hours",
      time: "9:00 PM - 5:00 AM",
      difficulty: "Easy",
      maxGuests: 10,
      icon: <Moon className="w-5 h-5" />,
      description:
        "Drift off to sleep in your comfortable safari tent as the jungle comes alive around you. Experience the authentic sounds of nocturnal wildlife in complete safety and comfort.",
      highlights: [
        "Comfortable bedding and linens",
        "24/7 security presence",
        "Authentic jungle atmosphere",
      ],
      wildlife: ["🦉 Night Birds", "🐆 Leopard Calls", "🌙 Night Sounds"],
    },
    {
      id: 4,
      title: "Dawn Wake-Up Call",
      subtitle: "Rise with the Wilderness",
      duration: "30 minutes",
      time: "5:00 AM - 5:30 AM",
      difficulty: "Easy",
      maxGuests: 10,
      icon: <Sun className="w-5 h-5" />,
      description:
        "Wake up naturally to the sounds of exotic birds and the gentle warmth of the rising sun. Enjoy fresh coffee or tea while preparing for your morning safari adventure.",
      highlights: [
        "Natural wake-up experience",
        "Fresh morning coffee/tea",
        "Bird watching from camp",
      ],
      wildlife: ["☕ Morning Coffee", "🐦 Dawn Birds", "🌅 Sunrise"],
    },
    {
      id: 5,
      title: "Camp Breakfast",
      subtitle: "Fuel for Adventure",
      duration: "45 minutes",
      time: "5:30 AM - 6:15 AM",
      difficulty: "Easy",
      maxGuests: 10,
      icon: <Coffee className="w-5 h-5" />,
      description:
        "Start your day with a hearty breakfast prepared fresh at camp. Enjoy local fruits, traditional dishes, and international options while planning your morning safari route.",
      highlights: [
        "Fresh local and international cuisine",
        "Nutritious start to the day",
        "Safari route planning",
      ],
      wildlife: ["🥭 Fresh Fruits", "🍳 Hot Breakfast", "📋 Safari Planning"],
    },
    {
      id: 6,
      title: "Camp Pack-Up",
      subtitle: "Leave Only Footprints",
      duration: "1 hour",
      time: "9:00 AM - 10:00 AM",
      difficulty: "Easy",
      maxGuests: 10,
      icon: <Shield className="w-5 h-5" />,
      description:
        "Watch our experienced team efficiently pack up the mobile camp, leaving no trace of our presence. Learn about our eco-friendly practices and sustainable camping philosophy.",
      highlights: [
        "Eco-friendly pack-up process",
        "Leave no trace principles",
        "Sustainable camping education",
      ],
      wildlife: ["♻️ Eco Practices", "🌱 Conservation", "👋 Farewell"],
    },
  ];

  const campingFeatures = [
    {
      icon: <Tent className="w-6 h-6" />,
      title: "Luxury Safari Tents",
      description:
        "Spacious, weather-resistant tents with comfortable bedding and proper ventilation",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "24/7 Security",
      description:
        "Professional guides and security personnel ensure your safety throughout the night",
    },
    {
      icon: <Coffee className="w-6 h-6" />,
      title: "Camp Facilities",
      description:
        "Clean washrooms, dining area, and comfortable common spaces for relaxation",
    },
  ];

  const amenities = [
    {
      icon: <Bed className="w-8 h-8" />,
      title: "Comfortable Bedding",
      desc: "Quality mattresses and linens",
    },
    {
      icon: <Utensils className="w-8 h-8" />,
      title: "All Meals Included",
      desc: "Breakfast, lunch, and dinner",
    },
    {
      icon: <Car className="w-8 h-8" />,
      title: "Transportation",
      desc: "Safari vehicle included",
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Photography Support",
      desc: "Equipment and guidance",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveActivity((prev) => (prev + 1) % campingActivities.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isVisible, campingActivities.length]);

  const activeActivityData = campingActivities[activeActivity];

  return (
    <section
      ref={sectionRef}
      className="py-12 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden"
    >
      <Helmet>
        <title>Camping Experience | Yala Mobile Camping and Safari</title>
        <meta
          name="description"
          content="Explore our unique Yala mobile camping experience. Enjoy luxury tents, authentic Sri Lankan cuisine, and immersive wildlife safaris in Yala National Park."
        />
        <meta
          name="keywords"
          content="yala mobile camping, yala safari, camping sri lanka, luxury tent, wildlife experience, sri lanka camping, yala national park"
        />
        <meta
          property="og:title"
          content="Camping Experience | Yala Mobile Camping and Safari"
        />
        <meta
          property="og:description"
          content="Discover the best mobile camping and safari experience in Yala National Park, Sri Lanka."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://yalamobilecamping.com/og-camping.webp"
        />
        <link rel="canonical" href="https://yalamobilecamping.com/camping" />
      </Helmet>

      {/* Background Elements - more subtle */}
      <div className="absolute inset-0 opacity-3 pointer-events-none">
        <div
          className={`absolute top-16 left-16 w-32 h-32 bg-amber-300 rounded-full blur-3xl transition-all duration-2000 ${
            isVisible ? "animate-float" : ""
          }`}
        ></div>
        <div
          className={`absolute bottom-16 right-16 w-36 h-36 bg-orange-300 rounded-full blur-3xl transition-all duration-2000 delay-500 ${
            isVisible ? "animate-float-reverse" : ""
          }`}
        ></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header - more compact */}
        <div className="text-center mb-10">
          <h2
            className={`text-3xl md:text-4xl font-serif italic text-amber-900 mb-4 leading-tight transform transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            Mobile Camping Activities
          </h2>
          <p
            className={`text-lg text-amber-700 max-w-2xl mx-auto font-light transform transition-all duration-1000 delay-300 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            Experience authentic wilderness living through our carefully planned
            camping activities
          </p>
          <div
            className={`w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-400 mx-auto mt-4 rounded-full transform transition-all duration-1000 delay-500 ${
              isVisible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
            }`}
          ></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start mb-10">
          {/* Activity List */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xl font-semibold text-amber-900 mb-4 font-sans">
              Your Camping Schedule
            </h3>
            {campingActivities.map((activity, index) => (
              <div
                key={activity.id}
                onClick={() => setActiveActivity(index)}
                className={`p-3 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-102 ${
                  activeActivity === index
                    ? "bg-white shadow-lg border-2 border-amber-300"
                    : "bg-white/70 hover:bg-white/90 border border-amber-100"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-lg ${
                      activeActivity === index
                        ? "bg-amber-100 text-amber-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-sm font-sans">
                      {activity.title}
                    </h4>
                    <p className="text-xs text-gray-600 font-light">
                      {activity.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Active Activity Details */}
          <div className="lg:col-span-3 bg-white/95 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl">
            <div className="relative h-48 bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-100 flex items-center justify-center">
              <div className="text-amber-600 opacity-20">
                {React.cloneElement(activeActivityData.icon, {
                  className: "w-24 h-24",
                })}
              </div>
              <div className="absolute bottom-3 left-3 text-amber-800 flex items-center text-sm bg-white/80 px-3 py-1 rounded-full">
                <Clock className="w-3 h-3 mr-1" />
                {activeActivityData.time}
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-semibold text-gray-900 font-sans">
                  {activeActivityData.title}
                </h3>
                <div className="text-amber-600">{activeActivityData.icon}</div>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed text-sm font-light">
                {activeActivityData.description}
              </p>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-amber-50 p-2 rounded-lg">
                  <div className="text-xs text-amber-600 font-medium">
                    Duration
                  </div>
                  <div className="font-semibold text-gray-900 text-sm">
                    {activeActivityData.duration}
                  </div>
                </div>
                <div className="bg-amber-50 p-2 rounded-lg">
                  <div className="text-xs text-amber-600 font-medium">
                    Difficulty
                  </div>
                  <div className="font-semibold text-gray-900 text-sm">
                    {activeActivityData.difficulty}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                  Activity Highlights
                </h4>
                <ul className="space-y-1 text-xs text-gray-600">
                  {activeActivityData.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start">
                      <span className="w-1.5 h-1.5 mt-1.5 bg-amber-400 rounded-full mr-2 flex-shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                  What to Expect
                </h4>
                <div className="flex flex-wrap gap-1">
                  {activeActivityData.wildlife.map((item, i) => (
                    <span
                      key={i}
                      className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The Essence of Safari Section - more compact */}
        <div
          className={`bg-white/90 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-xl mb-10 transform transition-all duration-1000 delay-600 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-amber-600 mr-3" />
              <h3 className="text-2xl font-semibold text-gray-900 font-sans">
                The Essence of Mobile Camping
              </h3>
            </div>
            <div className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
              <p className="text-sm font-light mb-3">
                There are many ways to experience the wilderness, but mobile
                camping offers the most authentic connection to nature. This
                traditional approach allows you to truly immerse yourself in the
                rhythms of the wild.
              </p>
              <p className="text-sm font-light mb-3">
                A mobile safari gets you in the thick of things, allowing you to
                experience Sri Lanka's wilderness much more intimately than
                staying in a hotel or lodge. Sleep under the stars, wake to bird
                songs, and feel the pulse of the jungle around you.
              </p>
              <div className="flex items-center justify-center mt-4">
                <Compass className="w-4 h-4 text-amber-600 mr-2" />
                <span className="font-medium text-amber-800 text-sm">
                  Experience the authentic camping spirit
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Camp Amenities - more compact */}
        <div
          className={`bg-white/90 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-xl mb-10 transform transition-all duration-1000 delay-1100 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h3 className="text-xl font-semibold text-center text-gray-900 mb-6 font-sans">
            Camp Amenities
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {amenities.map((amenity, index) => (
              <div key={index} className="text-center group">
                <div className="text-amber-600 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  {amenity.icon}
                </div>
                <h4 className="font-semibold text-gray-900 mb-1 text-sm font-sans">
                  {amenity.title}
                </h4>
                <p className="text-gray-600 text-xs font-light">
                  {amenity.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action - more compact */}
        <div
          className={`text-center transform transition-all duration-1000 delay-1300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg max-w-xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-3 font-sans">
              Ready for Your Camping Adventure?
            </h3>
            <p className="text-gray-600 mb-4 text-sm font-light">
              All camping activities are included with expert guides, quality
              equipment, and delicious meals provided throughout your stay.
            </p>
            <button
              onClick={onInquireNow}
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2 rounded-full font-medium hover:from-amber-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg text-sm"
            >
              Book Your Camping Experience
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,400;1,600&family=Inter:wght@300;400;500;600&display=swap");

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.01);
          }
        }

        @keyframes float-reverse {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(10px) scale(0.99);
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

        .font-sans {
          font-family: "Inter", sans-serif;
        }

        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </section>
  );
};

export default CampingSection;
