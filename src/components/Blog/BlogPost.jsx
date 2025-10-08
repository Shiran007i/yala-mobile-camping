// src/components/Blog/BlogPost.jsx
import React from "react";
import { ChevronRight, Calendar, User, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

import camp3 from "../../assets/images/camp3.webp";

const BlogPost = () => {
  const navigate = useNavigate();

  const handleBackToMain = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <button
              onClick={handleBackToMain}
              className="flex items-center text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
            >
              <ChevronRight className="h-4 w-4 mr-1 rotate-180" />
              Back to Yala Camping
            </button>
            <div className="flex items-center space-x-4">
              <Share2 className="h-5 w-5 text-gray-600" />
            </div>
          </div>
        </div>
      </header>

      {/* Blog Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Blog Header */}
        <header className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
            <Calendar className="h-4 w-4" />
            <time dateTime="2025-08-21">August 21, 2025</time>
            <span>•</span>
            <User className="h-4 w-4" />
            <span>Yala Mobile Camping</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            Revolutionary Mobile Camping Inside Yala National Park: A New Era of
            Wildlife Adventure
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed">
            Experience Sri Lanka's wilderness like never before with authentic
            mobile camping deep in the heart of Yala's untamed jungle
          </p>
        </header>

        {/* Featured Image */}
        <div className="mb-8">
          <img
            src={camp3}
            alt="Mobile camping setup in Yala National Park"
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Blog Content */}
        <div className="prose prose-lg max-w-none space-y-12">
          <section>
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                The Dawn of True Wilderness Camping in Yala
              </h2>
              <div className="w-24 h-1 bg-emerald-500"></div>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              While Yala National Park is globally recognized as{" "}
              <strong>
                "one of the world's best places to spot leopards,"
              </strong>{" "}
              most visitors only scratch the surface of this
              979-square-kilometer wilderness during day trips. At Yala Mobile
              Camping, we've revolutionized how adventurers experience Sri
              Lanka's most iconic national park by pioneering authentic mobile
              camping experiences deep inside the park's pristine wilderness
              areas.
            </p>
          </section>

          <section>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                What Makes Mobile Camping Revolutionary?
              </h2>
              <div className="w-24 h-1 bg-emerald-500"></div>
            </div>

            <div className="mb-10">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Beyond Traditional Safari Lodges
              </h3>

              <p className="text-lg text-gray-700 leading-relaxed mb-10">
                Unlike conventional safari lodges positioned outside park
                boundaries, mobile camping places you directly in the heart of
                the action. While "campsite accommodation is available inside
                the park" with specific restrictions, our mobile camping concept
                takes this further by establishing temporary, eco-friendly camps
                in remote areas where wildlife naturally congregates.
              </p>
            </div>

            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-8 rounded-2xl my-12 border border-emerald-100">
              <h4 className="text-xl font-bold text-emerald-900 mb-6">
                The Mobile Camping Difference:
              </h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <strong className="text-emerald-800 block">
                        Deep Wilderness Access
                      </strong>
                      <p className="text-emerald-700 text-sm">
                        Camp in areas where vehicles rarely venture
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <strong className="text-emerald-800 block">
                        Authentic Wildlife Encounters
                      </strong>
                      <p className="text-emerald-700 text-sm">
                        Wake up to leopard calls, elephant trumpeting, and the
                        full symphony of jungle sounds
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <strong className="text-emerald-800 block">
                        Zero Environmental Impact
                      </strong>
                      <p className="text-emerald-700 text-sm">
                        Our mobile setup leaves no trace, preserving Yala's
                        pristine ecosystem
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <strong className="text-emerald-800 block">
                        Exclusive Locations
                      </strong>
                      <p className="text-emerald-700 text-sm">
                        Access to secluded spots away from crowded tourist areas
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Inside Yala's Most Pristine Wilderness
              </h3>

              <p className="text-lg text-gray-700 leading-relaxed mb-12">
                Our mobile camps are strategically positioned in Yala's remote
                zones, where the density of wildlife is highest and human
                interference is minimal. These aren't permanent structures but
                carefully planned temporary setups that move with animal
                migration patterns and seasonal changes.
              </p>
            </div>
          </section>

          <section>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                The Yala Mobile Camping Experience
              </h2>
              <div className="w-24 h-1 bg-emerald-500"></div>
            </div>

            <div className="mb-10">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                A Night in the Wild
              </h3>

              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Imagine falling asleep to the distant roar of a leopard calling
                to its mate, then waking at dawn as elephants pass mere meters
                from your tent. This isn't a fantasy – it's the reality of
                mobile camping inside Yala.
              </p>
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-8 rounded-2xl my-12 border border-amber-100">
              <h4 className="text-xl font-bold text-amber-900 mb-6">
                Your Mobile Camping Adventure Includes:
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0"></div>
                    <span className="text-amber-800 font-medium">
                      Professional camp setup
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0"></div>
                    <span className="text-amber-800 font-medium">
                      Weather-resistant safari tents
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0"></div>
                    <span className="text-amber-800 font-medium">
                      Authentic bush meals
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0"></div>
                    <span className="text-amber-800 font-medium">
                      Expert local guides
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0"></div>
                    <span className="text-amber-800 font-medium">
                      Comprehensive safety protocols
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0"></div>
                    <span className="text-amber-800 font-medium">
                      Emergency communication systems
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                The Science Behind Mobile Camping Success
              </h2>
              <div className="w-24 h-1 bg-emerald-500"></div>
            </div>

            <div className="mb-10">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Wildlife Behavior Insights
              </h3>

              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Years of research and field experience have taught us that
                animals behave differently in areas with minimal human presence.
                Our mobile camps access these untouched zones, resulting in:
              </p>

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-start space-x-4">
                    <div className="bg-emerald-100 p-2 rounded-lg">
                      <div className="w-4 h-4 bg-emerald-500 rounded"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        85% Leopard Sighting Success Rate
                      </h4>
                      <p className="text-gray-600">
                        Significantly higher than day safari averages
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-start space-x-4">
                    <div className="bg-emerald-100 p-2 rounded-lg">
                      <div className="w-4 h-4 bg-emerald-500 rounded"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Natural Behavior Observation
                      </h4>
                      <p className="text-gray-600">
                        Animals acting without tourism pressure
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-start space-x-4">
                    <div className="bg-emerald-100 p-2 rounded-lg">
                      <div className="w-4 h-4 bg-emerald-500 rounded"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Rare Species Encounters
                      </h4>
                      <p className="text-gray-600">
                        Sloth bears, fishing cats, and other elusive species
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-start space-x-4">
                    <div className="bg-emerald-100 p-2 rounded-lg">
                      <div className="w-4 h-4 bg-emerald-500 rounded"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Extended Viewing Opportunities
                      </h4>
                      <p className="text-gray-600">
                        24-hour wildlife activity observation
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                Planning Your Mobile Camping Adventure
              </h2>
              <div className="w-24 h-1 bg-emerald-500"></div>
            </div>

            <div className="mb-10">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Best Times for Mobile Camping
              </h3>

              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                The optimal mobile camping experience varies with Yala's
                seasons:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 my-12">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100">
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-blue-900 mb-2">
                    Dry Season
                  </h4>
                  <p className="text-blue-700 font-medium">(February - July)</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-blue-800">
                      Highest wildlife density around water sources
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-blue-800">
                      Excellent leopard viewing opportunities
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-blue-800">
                      Clear weather for comfortable camping
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-blue-800">
                      Prime photography conditions
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-100">
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-green-900 mb-2">
                    Wet Season
                  </h4>
                  <p className="text-green-700 font-medium">
                    (August - January)
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-green-800">
                      Lush landscapes and active breeding season
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-green-800">
                      Fewer crowds and more authentic experience
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-green-800">
                      Migrant bird species arrive in large numbers
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-green-800">
                      Challenging but rewarding for enthusiasts
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                Safety and Sustainability
              </h2>
              <div className="w-24 h-1 bg-emerald-500"></div>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-12">
              Mobile camping in leopard territory requires comprehensive safety
              measures and environmental responsibility. Every aspect of our
              operation supports wildlife conservation and community
              development.
            </p>
          </section>

          <section>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                The Future of Wildlife Tourism in Sri Lanka
              </h2>
              <div className="w-24 h-1 bg-emerald-500"></div>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-12">
              Mobile camping represents a paradigm shift in how we experience
              wildlife. Rather than observing animals from air-conditioned
              lodges, mobile camping offers authentic immersion in their natural
              habitat.
            </p>
          </section>

          <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-12 rounded-3xl my-16 text-center">
            <h3 className="text-3xl font-bold mb-6">
              Ready to Experience the Wild?
            </h3>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Mobile camping in Yala National Park isn't for everyone – it's for
              those who seek authentic adventure over comfortable convenience.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="https://wa.me/94716335000"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-500 hover:bg-emerald-400 text-white px-10 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Book Now via WhatsApp
              </a>
              <button
                onClick={handleBackToMain}
                className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white px-10 py-4 rounded-full font-semibold transition-all duration-300"
              >
                Back to Yala Camping
              </button>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
              Mobile Camping Yala
            </span>
            <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
              Yala National Park
            </span>
            <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
              Sri Lanka Safari
            </span>
            <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
              Wildlife Camping
            </span>
            <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
              Leopard Spotting
            </span>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
