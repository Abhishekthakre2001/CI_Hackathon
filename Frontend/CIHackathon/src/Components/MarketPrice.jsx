import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaMoneyBillWave, FaCalendarAlt } from "react-icons/fa";

function MarketPrice() {
  const [marketData, setMarketData] = useState([]);
  const [language, setLanguage] = useState("en"); // Default language is English

  useEffect(() => {
    fetch(
      "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json"
    )
      .then((response) => response.json())
      .then((data) => setMarketData(data.records || []))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const translations = {
    en: {
      title: "🌾 Todays Market Prices",
      market: "Market:",
      district: "District:",
      state: "State:",
      variety: "Variety:",
      grade: "Grade:",
      arrivalDate: "Arrival Date:",
      minPrice: "Min Price:",
      maxPrice: "Max Price:",
      modalPrice: "Modal Price:",
    },
    hi: { // Hindi translations
      title: "आज के बाजार भाव 🌾",
      market: "बाजार:",
      district: "जिला:",
      state: "राज्य:",
      variety: "किस्म:",
      grade: "ग्रेड:",
      arrivalDate: "आगमन तिथि:",
      minPrice: "न्यूनतम मूल्य:",
      maxPrice: "अधिकतम मूल्य:",
      modalPrice: "औसत मूल्य:",
    },
  };

  return (
    <div className="p-6 bg-gradient-to-r from-green-200 to-blue-300 min-h-screen">
      <div className="flex justify-end mb-4"> {/* Language toggle */}
        <button
          className={`px-4 py-2 rounded-md ${language === "en" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => setLanguage("en")}
        >
          English
        </button>
        <button
          className={`px-4 py-2 rounded-md ml-2 ${language === "hi" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => setLanguage("hi")}
        >
          हिंदी
        </button>
      </div>

      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
        {translations[language].title}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {marketData.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-lg transform transition duration-300 hover:scale-105 border-l-8 border-green-500"
          >
            <h2 className="text-2xl font-bold text-blue-700 flex items-center gap-2">
              🌿 {item.commodity}
            </h2>
            <div className="bg-gray-100 p-2 rounded-lg mb-2">
              <p className="text-gray-700 flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-500" />{" "}
                <strong>{translations[language].market}</strong> {item.market}
              </p>
              <p className="text-gray-700">
                <strong>{translations[language].district}</strong> {item.district}
              </p>
              <p className="text-gray-700">
                <strong>{translations[language].state}</strong> {item.state}
              </p>
            </div>
            <p className="text-gray-700">
              <strong>{translations[language].variety}</strong> {item.variety}
            </p>
            <p className="text-gray-700">
              <strong>{translations[language].grade}</strong> {item.grade}
            </p>
            <p className="text-gray-700 flex items-center gap-2">
              <FaCalendarAlt className="text-blue-500" />{" "}
              <strong>{translations[language].arrivalDate}</strong> {item.arrival_date}
            </p>
            <div className="flex flex-col xl:flex-row justify-between items-center mt-4">
              <p className="text-green-600 font-bold flex items-center gap-2">
                <FaMoneyBillWave className="text-green-700" />{" "}
                <strong>{translations[language].minPrice}</strong> ₹{item.min_price}
              </p>
              <p className="text-red-600 font-bold flex items-center gap-2">
                <FaMoneyBillWave className="text-red-700" />{" "}
                <strong>{translations[language].maxPrice}</strong> ₹{item.max_price}
              </p>
            </div>
            <p className="text-gray-900 font-bold flex items-center gap-2 mt-2">
              <FaMoneyBillWave className="text-gray-700" />{" "}
              <strong>{translations[language].modalPrice}</strong> ₹{item.modal_price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MarketPrice;