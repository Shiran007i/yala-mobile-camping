import React, { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Compass,
  Tent,
  Moon,
  Sun,
  CheckCircle,
  Clock,
} from "lucide-react";
import { Helmet } from "react-helmet";

// For demo purposes - replace with your actual import.meta.glob in your project
const activityImages = import.meta.glob(
  "/src/assets/images/activities/*.{jpg,jpeg,png,webp}",
  {
    eager: true,
    import: "default",
  }
);

// Mock images for artifact demo - replace with your actual imageMap in your project
// const imageMap = {
//   'pickup.webp': 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&h=250&fit=crop',
//   'full-day-safari.webp': 'https://images.unsplash.com/photo-1549366021-9f761d040a94?w=400&h=250&fit=crop',
//   'nocturnal-dinner.webp': 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=250&fit=crop',
//   'morning-safari.webp': 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=400&h=250&fit=crop',
//   'conclude.webp': 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&h=250&fit=crop',
// };

// In your actual project, uncomment the above and use this instead:
const imageMap = {};
Object.entries(activityImages).forEach(([path, module]) => {
  const fileName = path.split("/").pop();
  if (fileName) imageMap[fileName.toLowerCase()] = module;
});

const SafariActivitiesSection = ({ onInquireNow }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeActivity, setActiveActivity] = useState(0);
  const sectionRef = useRef(null);

  const activities = [
    {
      id: 1,
      title: "Pickup at Yala Entrance",
      subtitle: "Welcome to the Wild",
      duration: "30 minutes",
      time: "from 6:00 AM",
      difficulty: "Easy",
      maxGuests: 10,
      icon: <MapPin className="w-5 h-5" />,
      description:
        "Your adventure begins as we greet you at the Yala National Park entrance. Get a quick briefing and settle into our custom safari vehicle.",
      highlights: [
        "Meet & greet with your guide",
        "Safety briefing and gear check",
        "First look at Yala's landscapes",
      ],
      wildlife: ["📍 Orientation", "🚙 Safari Vehicle", "🌿 Park Scenery"],
      image: imageMap["pickup.webp"] || "",
    },
    {
      id: 2,
      title: "Full-Day Safari Drive",
      subtitle: "Explore Until Sunset",
      duration: "depends on pickup time",
      time: "Pick up time - Till 6:00 PM",
      difficulty: "Easy",
      maxGuests: 10,
      icon: <Compass className="w-5 h-5" />,
      description:
        "Spend the afternoon tracking elephants, leopards, and other wildlife through open plains and forest patches as your expert guide leads you deeper into Yala.",
      highlights: [
        "Leopard & elephant sightings",
        "Professional guide insights",
        "Sunset over the savanna",
      ],
      wildlife: ["🐘 Elephants", "🐆 Leopards", "🦉 Birds"],
      image: imageMap["full-day-safari.webp"] || "",
    },
    {
      id: 3,
      title: "Camp Arrival",
      subtitle: "Settle into the Wild",
      duration: "1 hour",
      time: "6:00 PM - 7:00 PM",
      difficulty: "Easy",
      maxGuests: 10,
      icon: <Tent className="w-5 h-5" />,
      description:
        "As the sun sets, arrive at our serene campsite located deep inside the park. Unwind with refreshments and a briefing on your overnight stay.",
      highlights: [
        "Comfortable mobile tent setup",
        "Toilets & wash stations",
        "Safe & secure campsite",
      ],
      wildlife: ["🏕️ Camping Setup", "🪵 Campfire", "🚿 Facilities"],
      image: imageMap["nocturnal-dinner.webp"] || "",
    },
    {
      id: 4,
      title: "Dinner & Night Sounds",
      subtitle: "Wilderness After Dark",
      duration: "2 hours",
      time: "7:00 PM - 9:00 PM",
      difficulty: "Easy",
      maxGuests: 10,
      icon: <Moon className="w-5 h-5" />,
      description:
        "Enjoy a freshly prepared dinner under the stars as the jungle comes alive. Hear the distant roar of leopards and calls of owls.",
      highlights: [
        "Delicious bush dinner",
        "Nocturnal wildlife sounds",
        "Stargazing from your tent",
      ],
      wildlife: ["🌌 Stars", "🦉 Night Birds", "🐆 Leopard Calls"],
      image: imageMap["nocturnal-dinner.webp"] || "",
    },
    {
      id: 5,
      title: "Early Morning Safari",
      subtitle: "Golden Hour Wildlife",
      duration: "4 hours",
      time: "5:00 AM - 9:00 AM",
      difficulty: "Easy",
      maxGuests: 10,
      icon: <Sun className="w-5 h-5" />,
      description:
        "Wake up before dawn and head out for a sunrise game drive. This is the best time to spot active predators and rare birds in the soft golden light.",
      highlights: [
        "Cool morning temperatures",
        "Great for photography",
        "Most active wildlife window",
      ],
      wildlife: ["🦅 Eagles", "🐆 Leopards", "🦌 Deer"],
      image: imageMap["morning-safari.webp"] || "",
    },
    {
      id: 6,
      title: "Safari Concludes",
      subtitle: "Wrap Up & Goodbyes",
      duration: "30 minutes",
      time: "9:00 AM",
      difficulty: "Easy",
      maxGuests: 10,
      icon: <CheckCircle className="w-5 h-5" />,
      description:
        "Return to the park entrance with your camera full of memories and a heart full of wonder. Say farewell to Yala with one last look at its untouched beauty.",
      highlights: [
        "Final wildlife sightings",
        "Group photo at exit",
        "Smooth checkout",
      ],
      wildlife: ["📷 Memories", "🌿 Final Views", "👋 Goodbyes"],
      image: imageMap["conclude.webp"] || "",
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
        setActiveActivity((prev) => (prev + 1) % activities.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isVisible, activities.length]);

  const activeActivityData = activities[activeActivity];

  return (
    <section
      ref={sectionRef}
      className="py-12 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden"
    >
      <Helmet>
        <title>Yala Safari Activities | Yala Mobile Camping and Safari</title>
        <meta
          name="description"
          content="Discover all the safari activities offered by Yala Mobile Camping and Safari, including game drives, bird watching, nocturnal safaris, and more in Yala National Park."
        />
        <meta
          name="keywords"
          content="yala safari activities, yala mobile camping, sri lanka safari, wildlife tours, bird watching, nocturnal safari, yala national park"
        />
        <meta
          property="og:title"
          content="Yala Safari Activities | Yala Mobile Camping and Safari"
        />
        <meta
          property="og:description"
          content="Explore the best safari activities in Yala National Park with Yala Mobile Camping and Safari."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://yalamobilecamping.com/og-activities.webp"
        />
        <link rel="canonical" href="https://yalamobilecamping.com/activities" />
      </Helmet>

      {/* Decorative background elements - more subtle */}
      <div className="absolute inset-0 opacity-3 pointer-events-none">
        <div className="absolute top-16 left-16 w-32 h-32 bg-amber-300 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-16 right-16 w-36 h-36 bg-orange-300 rounded-full blur-3xl animate-float-reverse"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-yellow-200 rounded-full blur-3xl animate-float"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header - more compact */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-serif italic text-amber-900 mb-4 leading-tight">
            Safari Adventures & Activities
          </h2>
          <p className="text-lg text-amber-700 max-w-2xl mx-auto font-light">
            Immerse yourself in Yala's wilderness through expertly guided
            experiences
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-400 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Activity List - more compact */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xl font-semibold text-amber-900 mb-4 font-sans">
              Choose Your Adventure
            </h3>
            {activities.map((activity, index) => (
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

          {/* Active Activity Details - more compact */}
          <div className="lg:col-span-3 bg-white/95 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl">
            <div className="relative h-48 overflow-hidden">
              <img
                src={activeActivityData.image}
                alt={activeActivityData.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute bottom-3 left-3 text-white flex items-center text-sm bg-black/40 px-3 py-1 rounded-full">
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
                  Experience Highlights
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
                  Wildlife to Spot
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

        {/* CTA - more compact */}
        <div className="text-center mt-10">
          <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-lg max-w-xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-3 font-sans">
              Ready for Your Safari Adventure?
            </h3>
            <p className="text-gray-600 mb-4 text-sm font-light">
              All activities are included in your mobile camping experience with
              expert guides and quality equipment provided.
            </p>
            <button
              onClick={onInquireNow}
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2 rounded-full font-medium hover:from-amber-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg text-sm"
            >
              Book Your Adventure
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

export default SafariActivitiesSection;
