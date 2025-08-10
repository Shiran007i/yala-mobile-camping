import React from 'react';

const TabNavigation = ({ activeTab, setActiveTab }) => {
  const scrollToTabsWithOffset = () => {
    setTimeout(() => {
      const element = document.getElementById("tab-navigation");
      if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - 80;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    scrollToTabsWithOffset();
  };

  return (
    <div id="tab-navigation" className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <nav className="flex justify-center space-x-8 py-4">
          <button
            onClick={() => handleTabClick("safaris")}
            className={`font-medium text-lg border-b-2 pb-2 transition-all duration-300 ${
              activeTab === "safaris"
                ? "text-amber-600 border-amber-600"
                : "text-gray-700 border-transparent hover:text-amber-600 hover:border-amber-600"
            }`}
          >
            Safaris
          </button>
          <button
            onClick={() => handleTabClick("camping")}
            className={`font-medium text-lg border-b-2 pb-2 transition-all duration-300 ${
              activeTab === "camping"
                ? "text-amber-600 border-amber-600"
                : "text-gray-700 border-transparent hover:text-amber-600 hover:border-amber-600"
            }`}
          >
            Camping
          </button>
          <button
            onClick={() => handleTabClick("about")}
            className={`font-medium text-lg border-b-2 pb-2 transition-all duration-300 ${
              activeTab === "about"
                ? "text-amber-600 border-amber-600"
                : "text-gray-700 border-transparent hover:text-amber-600 hover:border-amber-600"
            }`}
          >
            About Us
          </button>
        </nav>
      </div>
    </div>
  );
};

export default TabNavigation;