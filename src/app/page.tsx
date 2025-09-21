"use client";

import { useState } from "react";
import { State, CountyData, StateData } from "../types";
import { floridaData } from "../data/florida";
import { texasData } from "../data/texas";
import { georgiaData } from "../data/georgia";

// Placeholder data - you'll replace this with real data later
const placeholderData: Record<Exclude<State, null>, StateData> = {
  FL: floridaData,
  TX: texasData,
  GA: georgiaData,
};

export default function Home() {
  const [selectedState, setSelectedState] = useState<State>(null);
  const [zipcode, setZipcode] = useState("");
  const [result, setResult] = useState<CountyData | null>(null);
  const [error, setError] = useState("");

  const handleStateSelect = (state: State) => {
    setSelectedState(state);
    setResult(null);
    setError("");
  };

  const handleZipcodeSearch = () => {
    if (!selectedState) {
      setError("Please select a state first");
      return;
    }

    if (!zipcode.trim()) {
      setError("Please enter a zipcode");
      return;
    }

    if (!/^\d{5}$/.test(zipcode.trim())) {
      setError("Please enter a valid 5-digit zipcode");
      return;
    }

    const stateData = selectedState ? placeholderData[selectedState] : null;

    if (!stateData) {
      setError("Please select a state first");
      return;
    }

    const county = stateData.zipcodeToCounty[zipcode.trim()];

    if (county) {
      const countyInfo = stateData.countyToUrl[county];
      const result: CountyData = {
        zipcode: zipcode.trim(),
        county,
        permitUrl: countyInfo.url,
        note: countyInfo.note,
        difficulty: countyInfo.difficulty,
        offlineOnly: countyInfo.offlineOnly,
      };
      setResult(result);
      setError("");
    } else {
      setError(
        `No permit information found for zipcode ${zipcode} in ${selectedState}`
      );
      setResult(null);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleZipcodeSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
              Permit Search
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Find permit information by selecting a state and entering your
              zipcode
            </p>
          </div>

          {/* State Selection */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
              Select Your State
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(["FL", "TX", "GA"] as const).map((state) => {
                const isDisabled = state === "TX" || state === "GA";
                return (
                  <button
                    key={state}
                    onClick={() => !isDisabled && handleStateSelect(state)}
                    disabled={isDisabled}
                    className={`p-6 rounded-xl border-2 transition-all duration-200 transform relative ${
                      isDisabled
                        ? "border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                        : selectedState === state
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 hover:scale-105"
                        : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-300 dark:hover:border-blue-500 hover:scale-105"
                    }`}
                  >
                    <div className="text-3xl font-bold mb-2">{state}</div>
                    <div className="text-sm opacity-75">
                      {state === "FL" && "Florida"}
                      {state === "TX" && "Texas"}
                      {state === "GA" && "Georgia"}
                    </div>
                    {isDisabled && (
                      <div className="absolute top-2 right-2">
                        <span className="px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400 text-xs font-medium rounded-full">
                          Coming Soon
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Zipcode Input */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
              Enter Your Zipcode
            </h2>
            <div className="max-w-md mx-auto">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter 5-digit zipcode"
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  maxLength={5}
                />
                <button
                  onClick={handleZipcodeSearch}
                  disabled={!selectedState || !zipcode.trim()}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Results */}
          {(result || error) && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
                  <div className="flex items-center">
                    <div className="text-red-600 dark:text-red-400 font-medium">
                      {error}
                    </div>
                  </div>
                </div>
              )}

              {result && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                    Permit Information Found
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        State:
                      </span>
                      <span className="ml-2 text-gray-800 dark:text-white">
                        {selectedState}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        Zipcode:
                      </span>
                      <span className="ml-2 text-gray-800 dark:text-white">
                        {result.zipcode}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        County:
                      </span>
                      <span className="ml-2 text-gray-800 dark:text-white">
                        {result.county}
                      </span>
                    </div>
                    {result.note && (
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                          Note:
                        </span>
                        <span className="ml-2 text-gray-800 dark:text-white">
                          {result.note}
                        </span>
                      </div>
                    )}

                    {/* Difficulty and Status Indicators */}
                    <div className="flex flex-wrap gap-3 pt-2">
                      {result.difficulty && (
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
                            Difficulty:
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              result.difficulty === "easy"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                : result.difficulty === "medium"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                                : result.difficulty === "hard"
                                ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                            }`}
                          >
                            {result.difficulty.charAt(0).toUpperCase() +
                              result.difficulty.slice(1)}
                          </span>
                        </div>
                      )}

                      {result.offlineOnly && (
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
                            Status:
                          </span>
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 flex items-center">
                            <svg
                              className="w-3 h-3 mr-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                                clipRule="evenodd"
                              />
                              <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                            </svg>
                            Offline Only
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="pt-4">
                      <a
                        href={result.permitUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                      >
                        Visit Permit Website
                        <svg
                          className="ml-2 w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
