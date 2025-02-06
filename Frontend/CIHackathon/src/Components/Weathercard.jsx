import { WiCloudy } from "react-icons/wi";
import logo from "../assets/images/logo.png";
import React, { useState, useEffect } from "react";

function WeatherCard() {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = "375e2053062a4e54b89154226242701";

  useEffect(() => {
    const getCityAndForecast = async () => {
      setLoading(true);
      setError(null);

      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;
        const reverseGeocodingUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

        const geocodingResponse = await fetch(reverseGeocodingUrl);
        const geocodingData = await geocodingResponse.json();
        const city =
          geocodingData.address.state_district ||
          geocodingData.address.city ||
          geocodingData.address.town ||
          geocodingData.address.village;

        if (!city) {
          throw new Error("Could not determine city from location.");
        }

        const forecastApiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&aqi=yes`;
        const forecastResponse = await fetch(forecastApiUrl);
        const forecastData = await forecastResponse.json();

        setForecast(forecastData.forecast.forecastday);
        console.log("3-Day Forecast:", forecastData.forecast.forecastday);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching forecast:", err);
      } finally {
        setLoading(false);
      }
    };

    getCityAndForecast();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="flex flex-wrap justify-center gap-6 p-8 bg-gradient-to-r from-green-200 to-blue-300">
        {forecast.map((day) => (
          <div
            key={day.date}
            className="relative  rounded-2xl p-6 w-80 flex flex-col justify-between shadow-lg transition-all duration-300 ease-in-out hover:scale-[1.05]"
          >
            {/* City & Date */}
            <h2 className="text-lg font-semibold">
              {day.location?.name || forecast[0]?.location?.name}
            </h2>
            <p className="text-sm opacity-80">{day.date}</p>

            {/* Weather Icon (Right-Aligned like in Reference) */}
            <div className="absolute top-4 right-4 bg-white/20 p-2 rounded-full">
              <img
                src={"https:" + day.day.condition.icon}
                alt="Weather"
                className="w-10 h-10"
              />
            </div>

            {/* Temperature & Condition */}
            <h1 className="text-4xl font-bold mt-4">{day.day.avgtemp_c}°C</h1>
            <p className="text-md opacity-90">{day.day.condition.text}</p>

            {/* High & Low Temperature */}
            <div className="flex justify-between mt-2 text-sm opacity-80">
              <span>H: {day.day.maxtemp_c}°C</span>
              <span>L: {day.day.mintemp_c}°C</span>
            </div>

            {/* Additional Weather Info */}
            <div className="mt-4 text-sm opacity-80">
              <div className="flex justify-between">
                <span>🌬 Wind:</span>
                <span>{day.day.maxwind_kph} km/h</span>
              </div>
              <div className="flex justify-between">
                <span>💧 Humidity:</span>
                <span>{day.day.avghumidity}%</span>
              </div>
              <div className="flex justify-between">
                <span>👀 Visibility:</span>
                <span>{day.day.avgvis_km} km</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default WeatherCard;