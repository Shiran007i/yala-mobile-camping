// src/data/chatData.js
export const CHAT_CONFIG = {
  // Company Information
  companyName: "Yala Mobile Camping",
  whatsappNumber: "+94713991051",
  email: "info@yalamobilecamping.com",
  phone: "+94713991051",
  website: "https://yalamobilecamping.com",
  
  // Location Details
  location: {
    address: "Yala National Park entrance, Tissamaharama",
    coordinates: "6.3725°N, 81.5185°E",
    pickupAreas: [
      "Tissamaharama hotels",
      "Kataragama area", 
      "Kirinda beach hotels"
    ]
  },

  // Package Information
  packages: {
    mainPackage: {
      name: "Yala Mobile Camp",
      price: 950,
      currency: "USD",
      persons: 2,
      description: "Complete safari camping experience",
      includes: [
        "Full-board meals (breakfast, lunch, dinner)",
        "One night in luxury safari tent", 
        "Full-day guided safari",
        "Park entrance fees included",
        "Professional wildlife guide",
        "All camping equipment provided"
      ]
    },
    safariOptions: [
      {
        name: "Morning Safari",
        time: "6 AM - 12 PM",
        price: 75,
        currency: "USD"
      },
      {
        name: "Full Day Safari", 
        time: "6 AM - 6 PM",
        price: 120,
        currency: "USD"
      },
      {
        name: "Evening Safari",
        time: "2 PM - 6 PM", 
        price: 65,
        currency: "USD"
      }
    ]
  },

  // Wildlife Information
  wildlife: [
    "Sri Lankan Leopards (highest density globally!)",
    "Asian Elephants",
    "Sloth Bears", 
    "Water Buffalo",
    "200+ Bird Species",
    "Crocodiles and more!"
  ],

  // Quick Reply Buttons
  quickReplies: [
    "Safari packages",
    "Camping prices",
    "Available dates", 
    "Wildlife viewing",
    "Contact info"
  ],

  // Q&A Database - Add/Edit questions and answers here
  qaDatabase: [
    // Contact Information
    {
      keywords: ["contact", "phone", "call", "tel", "telephone", "number"],
      response: `📞 **Contact Information**:
• WhatsApp: ${"+94713991051"} (Instant response)
• Phone: ${"+94713991051"}
• Email: info@yalamobilecamping.com
• Available: 24/7 for bookings and support

💬 **Fastest Response**: Use WhatsApp for instant replies!`
    },
    
    // Location Information
    {
      keywords: ["location", "where", "address", "directions", "pickup"],
      response: `📍 **Location**: Yala National Park entrance, Tissamaharama

🚗 **Pickup Services Available**:
• Tissamaharama hotels
• Kataragama area
• Kirinda beach hotels

🗺️ **Coordinates**: 6.3725°N, 81.5185°E

We provide detailed directions and pickup coordination upon booking!`
    },

    // Safari Packages
    {
      keywords: ["safari", "package", "packages", "tours", "game drive"],
      response: `🦁 **Safari Packages Available**:

• **Morning Safari** (6 AM - 12 PM) - $75/person
• **Full Day Safari** (6 AM - 6 PM) - $120/person  
• **Evening Safari** (2 PM - 6 PM) - $65/person
• **Complete Package with Camping** - $950 for 2 persons

All include park fees, professional guide, and refreshments. 
The complete package includes camping, all meals, and full-day safari!`
    },

    // Pricing Information
    {
      keywords: ["price", "cost", "camping", "package", "rates"],
      response: `🏕️ **Exclusive Camping Package - $950 for 2 persons**

✨ **What's Included**:
• Full-board meals (breakfast, lunch, dinner)
• One night in luxury safari tent
• Full-day guided safari (6 AM - 6 PM)
• Park entrance fees
• Professional wildlife guide
• All camping equipment provided

This is an all-inclusive experience inside Yala National Park!`
    },

    // Availability & Booking
    {
      keywords: ["date", "dates", "available", "availability", "booking", "book", "reserve"],
      response: `📅 **Availability & Booking**:

🌟 **Current Status**: Taking bookings year-round
🦁 **Peak Season**: December-April (best wildlife viewing)
🌿 **Off Season**: May-November (fewer crowds, green landscapes)

⚡ **Quick Booking**: Use the 'Book Now' button
📱 **Instant Response**: Contact via WhatsApp

Would you like to check specific dates?`
    },

    // Wildlife Information  
    {
      keywords: ["wildlife", "animals", "leopard", "elephant", "birds", "bear"],
      response: `🐆 **Wildlife in Yala National Park**:

• **Sri Lankan Leopards** (highest density globally!)
• **Asian Elephants** 
• **Sloth Bears**
• **Water Buffalo**
• **200+ Bird Species**
• **Crocodiles** and much more!

📸 **Best Viewing Times**: Early morning & evening safaris
🎯 **Leopard Success Rate**: 85% sightings
🦅 **Bird Watching**: Year-round excellent opportunities

Ready for the adventure of a lifetime?`
    },

    // Weather Information
    {
      keywords: ["weather", "climate", "temperature", "rain", "season"],
      response: `🌤️ **Weather & Climate**:

🌡️ **Temperature**: 25-35°C year-round
💧 **Humidity**: 60-75%
🌧️ **Dry Season**: February-July (best for camping)
☔ **Wet Season**: October-January (occasional rain)

🦁 **Best Wildlife Viewing**: February-April
🌿 **Green Season**: May-September (lush landscapes)`
    },

    // What to Bring
    {
      keywords: ["bring", "pack", "equipment", "clothes", "items"],
      response: `🎒 **What to Bring**:

👕 **Clothing**:
• Light, neutral-colored clothing
• Long sleeves for evening
• Comfortable walking shoes
• Hat and sunglasses

📷 **Safari Essentials**:
• Camera with extra batteries
• Binoculars (if you have)
• Sunscreen and insect repellent
• Personal medications

✅ **We Provide**: All camping equipment, meals, safari vehicle, and professional guide!`
    },

    // Best Time to Visit
    {
      keywords: ["best time", "when to visit", "season", "month"],
      response: `📅 **Best Time to Visit Yala**:

🦁 **Peak Season (Dec-Apr)**:
• Highest leopard sightings
• Dry weather, perfect for camping
• Clear skies for photography

🌿 **Green Season (May-Sep)**:
• Lush landscapes
• Fewer tourists
• Great for bird watching

🌧️ **Transition (Oct-Nov)**:
• Park sometimes closed for maintenance
• Check availability before booking`
    },

    // Food & Meals
    {
      keywords: ["food", "meals", "vegetarian", "diet", "lunch", "dinner"],
      response: `🍽️ **Meals & Dining**:

✅ **Included in Package**:
• Breakfast, lunch, and dinner
• Fresh, local Sri Lankan cuisine
• Vegetarian options available
• Special dietary requirements accommodated

🌱 **Dietary Options**:
• Vegetarian meals
• Vegan options (on request)
• Spice levels adjusted to preference

Please inform us of any dietary restrictions when booking!`
    }
  ],

  // Default responses for unmatched queries
  defaultResponses: [
    "Thanks for your question! 😊 Our team will provide you with detailed information.",
    "Great question! Let me connect you with our expert team for the best answer.",
    "I'd love to help you with that specific question! Our team can provide detailed information."
  ]
};

// Function to search for matching responses
export const findResponse = (userMessage) => {
  const message = userMessage.toLowerCase().trim();
  
  // Search through Q&A database
  for (const qa of CHAT_CONFIG.qaDatabase) {
    const hasMatch = qa.keywords.some(keyword => 
      message.includes(keyword.toLowerCase())
    );
    
    if (hasMatch) {
      return qa.response;
    }
  }
  
  // Return random default response if no match found
  const randomIndex = Math.floor(Math.random() * CHAT_CONFIG.defaultResponses.length);
  return CHAT_CONFIG.defaultResponses[randomIndex];
};