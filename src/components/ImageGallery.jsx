import React, { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Helmet } from "react-helmet";

// Dynamically import safari and camping images using Vite's glob import
const safariImageModules = import.meta.glob(
  "../assets/images/safari/*.{jpg,jpeg,png,webp}",
  { eager: true }
);
const campingImageModules = import.meta.glob(
  "../assets/images/camping/*.{jpg,jpeg,png,webp}",
  { eager: true }
);

// Convert module objects to usable arrays
const safariImages = Object.values(safariImageModules).map((mod) => ({
  url: mod.default,
  title: "Safari Image",
  description: "Experience the wild",
}));

const campingImages = Object.values(campingImageModules).map((mod) => ({
  url: mod.default,
  title: "Camping Image",
  description: "Mobile camping in the wilderness",
}));

// Utility to shuffle array
const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());

const ImageGallery = ({ activeTab = "safaris" }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Determine which image set to show
  const getGalleryImages = () => {
    if (activeTab === "camping") {
      return shuffle(campingImages);
    } else {
      return shuffle(safariImages);
    }
  };

  const galleryImages = getGalleryImages();

  const scrollLeft = () => {
    const container = document.getElementById("gallery-container");
    container.scrollBy({ left: -260, behavior: "smooth" });
  };

  const scrollRight = () => {
    const container = document.getElementById("gallery-container");
    container.scrollBy({ left: 260, behavior: "smooth" });
  };

  const openLightbox = (image) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <Helmet>
        <title>
          Yala Mobile Camping Gallery | Yala Mobile Camping and Safari
        </title>
        <meta
          name="description"
          content="View our gallery of Yala Mobile Camping and Safari. See photos of our luxury tents, wildlife, and guest experiences in Yala National Park, Sri Lanka."
        />
        <meta
          name="keywords"
          content="yala mobile camping gallery, yala safari photos, sri lanka camping images, yala national park pictures, wildlife photography"
        />
        <meta
          property="og:title"
          content="Yala Mobile Camping Gallery | Yala Mobile Camping and Safari"
        />
        <meta
          property="og:description"
          content="Browse the photo gallery of Yala Mobile Camping and Safari in Yala National Park, Sri Lanka."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://yalamobilecamping.com/og-gallery.webp"
        />
        <link rel="canonical" href="https://yalamobilecamping.com/gallery" />
      </Helmet>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Navigation Buttons */}
            <button
              onClick={scrollLeft}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white hover:bg-gray-50 text-emerald-600 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              onClick={scrollRight}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white hover:bg-gray-50 text-emerald-600 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Gallery */}
            <div
              id="gallery-container"
              className="flex overflow-x-auto scrollbar-hide gap-4 pb-2 snap-x snap-mandatory px-12"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className="flex-none w-48 h-36 relative rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer snap-start group"
                  onClick={() => openLightbox(image)}
                >
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/400x300?text=Image+Not+Found";
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Gradient Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="h-8 w-8" />
            </button>
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/600x400?text=Image+Not+Found";
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;
