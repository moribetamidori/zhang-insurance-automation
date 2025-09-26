"use client";

import { useState } from "react";

interface PropertyQuickSearchProps {
  className?: string;
}

export default function PropertyQuickSearch({
  className = "",
}: PropertyQuickSearchProps) {
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const performSearch = (platform: "zillow" | "redfin") => {
    const trimmedAddress = address.trim();
    setError(""); // Clear any previous error messages

    // Check if the input is empty
    if (trimmedAddress === "") {
      setError("Please enter a property address.");
      return;
    }

    // Encode the address to make it safe for use in a URL
    const encodedAddress = encodeURIComponent(trimmedAddress);
    let searchUrl: string;

    // Construct the correct URL based on the platform chosen
    if (platform === "zillow") {
      searchUrl = `https://www.zillow.com/homes/${encodedAddress}`;
    } else if (platform === "redfin") {
      searchUrl = `https://www.redfin.com/stingray/do/search?search-input=${encodedAddress}`;
    } else {
      return;
    }

    // Open the constructed URL in a new browser tab
    window.open(searchUrl, "_blank");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      performSearch("zillow");
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl shadow-xl p-8 border border-blue-200 dark:border-blue-800">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
            <svg
              className="h-8 w-8 text-blue-600 dark:text-blue-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5-1.5-.545M3 7.5l3 1.5M3 7.5l-1.5.545M4.5 12l-3 1.5m15-3l3-1.5m-15 3l-1.5.5"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Quick Property Lookup
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Search any address on real estate platforms
          </p>
        </div>

        <div className="mt-8">
          <label htmlFor="propertyAddress" className="sr-only">
            Property Address
          </label>
          <input
            type="text"
            id="propertyAddress"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onKeyDown={handleKeyPress}
            className="block w-full rounded-md border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            placeholder="e.g., 1600 Amphitheatre Pkwy, Mountain View, CA"
          />

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Zillow Button */}
            <button
              onClick={() => performSearch("zillow")}
              className="group flex w-full justify-center items-center gap-3 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:bg-blue-700 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-200 transform hover:scale-105"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 256 256"
                fill="white"
                className="group-hover:scale-110 transition-transform duration-200"
              >
                <path d="M208,80H160a16,16,0,0,0-16,16v56h40a8,8,0,0,1,0,16H144v40a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V128a16,16,0,0,1,16-16H96a16,16,0,0,0,16-16V40a16,16,0,0,1,16-16h72a16,16,0,0,1,16,16Zm-80,32a16,16,0,0,0-16-16H56V208h72V152H88a8,8,0,0,1,0-16h40Z" />
              </svg>
              Search Zillow
            </button>

            {/* Redfin Button */}
            <button
              onClick={() => performSearch("redfin")}
              className="group flex w-full justify-center items-center gap-3 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:bg-red-700 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition-all duration-200 transform hover:scale-105"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="white"
                viewBox="0 0 256 256"
                className="group-hover:scale-110 transition-transform duration-200"
              >
                <path d="M213.39,183.1,144,228.1a15.81,15.81,0,0,1-16,0l-69.39-45a16,16,0,0,1-8.61-14V86.9a16,16,0,0,1,8.61-14l69.39-45a15.81,15.81,0,0,1,16,0l69.39,45a16,16,0,0,1,8.61,14v82.2A16,16,0,0,1,213.39,183.1Z" />
              </svg>
              Search Redfin
            </button>
          </div>
        </div>
      </div>
      {error && (
        <p className="mt-3 text-center text-sm text-red-600 font-medium">
          {error}
        </p>
      )}
    </div>
  );
}
