import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";

// Import the chat data configuration
// You'll need to create this file: src/data/chatData.js



const CHAT_CONFIG = {
  companyName: "Yala Mobile Camping",
  whatsappNumber: "+94713585926",
  email: "info@yalamobilecamping.com",
  phone: "+94713585926",

  quickReplies: [
    "Safari packages",
    "Camping prices",
    "Available dates",
    "Wildlife viewing",
    "Contact info",
  ],

  qaDatabase: [
    {
      keywords: ["contact", "phone", "call", "tel", "telephone", "number"],
      response: `📞 **Contact Information**:
• WhatsApp: +94713585926 (Instant response)
• Phone: +94713585926
• Email: info@yalamobilecamping.com
• Available: 24/7 for bookings and support

💬 **Fastest Response**: Use WhatsApp for instant replies!`,
    },

    // Company name and basic info
    {
      keywords: [
        "company",
        "name",
        "business",
        "who are you",
        "about",
        "what is",
        "tell me about",
      ],
      response: `🏕️ **About Yala Mobile Camping**:

• **Company**: Yala Mobile Camping
• **Specialty**: Exclusive safari camping experiences
• **Location**: Yala National Park, Sri Lanka
• **Experience**: Professional wildlife guides & luxury camping

🦁 **What we offer**:
• Mobile camping inside the park
• Expert-guided safaris
• All-inclusive packages
• Authentic wilderness experiences

Ready to explore the wild side of Sri Lanka? 🐆`,
    },

    // FIXED: Added transportation keywords
    {
      keywords: [
        "transport",
        "transportation",
        "pickup",
        "transfer",
        "taxi",
        "car",
        "vehicle",
        "ride",
      ],
      response: `🚗 **Transportation Services**:

✅ **Free Pickup Included**:
• Tissamaharama hotels
• Kataragama area hotels  
• Kirinda beach hotels

🚐 **What We Provide**:
• Air-conditioned safari vehicle
• Professional driver/guide
• Pickup and drop-off service
• All transportation during safari

📍 **Coverage Area**: Within 15km radius of Yala entrance
💰 **Cost**: Included in package price!

Just let us know your hotel/location when booking!`,
    },

    {
      keywords: ["location", "where", "address", "directions"],
      response: `📍 **Location**: Yala National Park entrance, Tissamaharama

🚗 **Pickup Services Available**:
• Tissamaharama hotels
• Kataragama area
• Kirinda beach hotels

🗺️ **Coordinates**: 6.3725°N, 81.5185°E`,
    },

    {
      keywords: ["safari", "package", "packages", "tours", "game drive"],
      response: `🦁 **Safari Packages Available**:

• **Morning Safari** (6 AM - 12 PM) - $75/person
• **Full Day Safari** (6 AM - 6 PM) - $120/person  
• **Evening Safari** (2 PM - 6 PM) - $65/person
• **Complete Package with Camping** - $950 for 2 persons

All include park fees, professional guide, and refreshments!`,
    },

    {
      keywords: ["price", "cost", "camping", "rates"],
      response: `🏕️ **Exclusive Camping Package - $950 for 2 persons**

✨ **What's Included**:
• Full-board meals (breakfast, lunch, dinner)
• One night in luxury safari tent
• Full-day guided safari (6 AM - 6 PM)
• Park entrance fees
• Professional wildlife guide
• All camping equipment provided`,
    },

    {
      keywords: [
        "date",
        "dates",
        "available",
        "availability",
        "booking",
        "book",
        "reserve",
      ],
      response: `📅 **Availability & Booking**:

🌟 **Current Status**: Taking bookings year-round
🦁 **Peak Season**: December-April (best wildlife viewing)

⚡ **Quick Booking**: Use the 'Book Now' button
📱 **Instant Response**: Contact via WhatsApp`,
    },

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
🎯 **Leopard Success Rate**: 85% sightings`,
    },

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

Please inform us of any dietary restrictions when booking!`,
    },
  ],

  defaultResponses: [
    "Thanks for your question! 😊 Our team will provide you with detailed information.",
    "Great question! Let me connect you with our expert team for the best answer.",
    "I'd love to help you with that specific question! Our team can provide detailed information.",
  ],
};

// Function to search for matching responses
const findResponse = (userMessage) => {
  const message = userMessage.toLowerCase().trim();

  // Search through Q&A database
  for (const qa of CHAT_CONFIG.qaDatabase) {
    const hasMatch = qa.keywords.some((keyword) =>
      message.includes(keyword.toLowerCase())
    );

    if (hasMatch) {
      return qa.response;
    }
  }

  // Return random default response if no match found
  const randomIndex = Math.floor(
    Math.random() * CHAT_CONFIG.defaultResponses.length
  );
  return CHAT_CONFIG.defaultResponses[randomIndex];
};

const FloatingChatSystem = ({ onBookNow, onWhatsAppContact }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `Hi! Welcome to ${CHAT_CONFIG.companyName} 🏕️ How can I help you plan your adventure?`,
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [pendingQuestion, setPendingQuestion] = useState(""); // FIXED: Track pending question
  const messagesEndRef = useRef(null);


  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (messageText = inputMessage) => {
    if (!messageText.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: messageText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Get response from data file
    setTimeout(() => {
      const botResponse = findResponse(messageText);
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: botResponse,
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);

      // Check if it's a default response (meaning no match found)
      const isDefaultResponse = CHAT_CONFIG.defaultResponses.some(
        (defaultResp) =>
          botResponse.includes(defaultResp) || defaultResp.includes(botResponse)
      );

      if (isDefaultResponse) {
        // FIXED: Store the pending question
        setPendingQuestion(messageText);

        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: prev.length + 1,
              text:
                '💬 **For immediate assistance**, click WhatsApp below to send your question directly to our team!\n\nYour question: "' +
                messageText +
                '"',
              sender: "bot",
              timestamp: new Date(),
            },
          ]);
        }, 2000);
      } else {
        // FIXED: Clear pending question if we found an answer
        setPendingQuestion("");
      }
    }, 1500);
  };

  // FIXED: Updated WhatsApp function to properly handle custom messages
  const openWhatsApp = (customMessage = null) => {
    if (onWhatsAppContact) {
      onWhatsAppContact();
    } else {
      let message;

      // Debug: Log what we're working with
      console.log("Pending question:", pendingQuestion);
      console.log("Custom message:", customMessage);

      // Use the pending question if available, otherwise use customMessage
      const questionToSend = pendingQuestion || customMessage;

      if (questionToSend && questionToSend.trim()) {
        message =
          encodeURIComponent(`Hi! I have a question about Yala Mobile Camping:

"${questionToSend}"

Can you help me with this?`);

        // Clear the pending question after sending
        setPendingQuestion("");
      } else {
        message = encodeURIComponent(
          "Hi! I'm interested in Yala Mobile Camping. Can you help me with booking information?"
        );
      }

      window.open(
        `https://wa.me/${CHAT_CONFIG.whatsappNumber.replace(
          "+",
          ""
        )}?text=${message}`,
        "_blank"
      );
    }
  };

//   const WhatsAppWidget = () => {
//   useEffect(() => {
//     // Check if the script is already added
//     if (!document.getElementById('elfsight-platform')) {
//       const script = document.createElement('script');
//       script.src = 'https://elfsightcdn.com/platform.js';
//       script.async = true;
//       script.id = 'elfsight-platform';
//       document.body.appendChild(script);
//     }
//   }, []);

//   return (
//     <div>
//       {/* Elfsight WhatsApp Chat Widget */}
//       <div
//         className="elfsight-app-9746b739-f9ae-4670-981f-6bf0ead1b6be"
//         data-elfsight-app-lazy
//       ></div>
//     </div>
//   );
// };

  return (
    <div className="fixed bottom-6 right-6 z-50">
     {/* <div className="fixed bottom-6 right-6 z-50">
  <WhatsAppWidget />
</div> */}
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <MessageCircle size={20} />
                
              </div>
              <div>
                <h3 className="font-semibold">{CHAT_CONFIG.companyName}</h3>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                  <p className="text-sm opacity-90">Online now</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] px-4 py-3 rounded-2xl shadow-sm ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-green-500 to-green-600 text-white rounded-br-md"
                      : "bg-white text-gray-800 rounded-bl-md border border-gray-100"
                  }`}
                >
                  <p className="text-sm whitespace-pre-line leading-relaxed">
                    {message.text}
                  </p>
                  <p className="text-xs mt-2 opacity-70">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md shadow-sm border border-gray-100">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className="px-4 py-2 bg-white border-t border-gray-100">
            <div className="flex flex-wrap gap-2">
              {CHAT_CONFIG.quickReplies.map((reply) => (
                <button
                  key={reply}
                  onClick={() => handleSendMessage(reply)}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-full transition-colors border border-gray-200 hover:border-gray-300"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex space-x-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm bg-gray-50"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim()}
                className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                <Send size={16} />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-2">
            <button
              onClick={() => openWhatsApp()} // FIXED: Simplified call
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-colors text-sm font-medium shadow-sm"
            >
              <MessageCircle size={16} />
              <span>WhatsApp</span>
            </button>
            {onBookNow && (
              <button
                onClick={onBookNow}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-colors text-sm font-medium shadow-sm"
              >
                <span>Book Now</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Floating Action Buttons - Only show when chat is closed */}
      {!isOpen && (
        <div className="flex flex-col space-y-3">
          {/* WhatsApp Button */}
          <button
            onClick={() => openWhatsApp()}
            className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group"
            title="Chat on WhatsApp"
          >
            <MessageCircle size={24} />
            <span className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-black text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              WhatsApp
            </span>
          </button>

          {/* Chat Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group"
            title="Open chat"
          >
            <MessageCircle size={24} />
            <span className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-black text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Live Chat
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default FloatingChatSystem;
