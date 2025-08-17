import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  AlertCircle,
  Loader2,
  Mail,
  ArrowLeft,
  Heart,
} from "lucide-react";
import { Helmet } from "react-helmet";

const Unsubscribe = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Get email from URL parameters without React Router
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get("email");
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam));
    }
  }, []);

  const handleUnsubscribe = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setStatus("error");
      setMessage("Please enter your email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setStatus("error");
      setMessage("Please enter a valid email address");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter/unsubscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          timestamp: new Date().toISOString(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("success");
        setMessage("You have been successfully unsubscribed from our newsletter.");
      } else {
        setStatus("error");
        setMessage(data.message || "Failed to unsubscribe. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Something went wrong. Please try again later.");
      console.error("Unsubscribe error:", error);
    }
  };

  const goHome = () => {
    // Clear the hash and go to main page
    window.location.hash = "";
    window.location.href = "/";
  };

  return (
    <>
      <Helmet>
        <title>Unsubscribe | Yala Mobile Camping Newsletter</title>
        <meta
          name="description"
          content="Unsubscribe from Yala Mobile Camping newsletter. We're sorry to see you go!"
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <Mail className="h-8 w-8 text-red-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Newsletter Unsubscribe
            </h1>
            <p className="text-gray-600">
              We're sorry to see you go! You can unsubscribe from our newsletter below.
            </p>
          </div>

          <div className="bg-white py-8 px-6 shadow-lg rounded-lg">
            {status === "success" ? (
              <div className="text-center space-y-4">
                <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Successfully Unsubscribed
                </h2>
                <p className="text-gray-600">{message}</p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
                  <p className="text-sm text-yellow-800">
                    <strong>Changed your mind?</strong> You can always subscribe again 
                    from our website footer or contact us directly.
                  </p>
                </div>
                <button
                  onClick={goHome}
                  className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Homepage
                </button>
              </div>
            ) : (
              <form onSubmit={handleUnsubscribe} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    disabled={status === "loading"}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors ${
                      status === "error" ? "border-red-500" : "border-gray-300"
                    } ${status === "loading" ? "opacity-50 cursor-not-allowed" : ""}`}
                    required
                  />
                </div>

                {message && status === "error" && (
                  <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm">{message}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className={`w-full flex items-center justify-center px-4 py-3 font-medium rounded-lg transition-colors ${
                    status === "loading"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700"
                  } text-white`}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Unsubscribing...
                    </>
                  ) : (
                    "Unsubscribe from Newsletter"
                  )}
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={goHome}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    ← Back to Homepage
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Why are you leaving section */}
          {status !== "success" && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Why are you leaving? 🤔
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Too many emails? We only send 1-2 per month</p>
                <p>• Content not relevant? Let us know what you'd like to see</p>
                <p>• Want to stay connected? Follow us on social media instead</p>
              </div>
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Contact us:</strong> info@yalamobilecamping.com
                </p>
              </div>
            </div>
          )}

          <div className="text-center">
            <p className="flex items-center justify-center text-sm text-gray-500">
              <span>Made with</span>
              <Heart className="h-3 w-3 mx-1 text-red-500 fill-current" />
              <span>in Sri Lanka</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Unsubscribe;