import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export default function WeatherCard({ weather = null }) {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [localTime, setLocalTime] = useState("");

  if (!weather || !weather.main) {
    return <Text style={{ color: darkMode ? "#fff" : "#000" }}>No weather data</Text>;
  }

  // 🔹 Update local time every second
  useEffect(() => {
    const updateTime = () => {
      const nowUTC = Date.now();
      const cityTimeMs = nowUTC + weather.timezone * 1000; // timezone in seconds
      const cityDate = new Date(cityTimeMs);
      let hours = cityDate.getUTCHours();
      const minutes = cityDate.getUTCMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      setLocalTime(`${hours}:${formattedMinutes} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [weather]);

  const isDay = weather?.weather[0]?.icon?.includes("d");

  return (
    <View style={[styles.card, { backgroundColor: darkMode ? "#222" : "#fff" }]}>
      <Text style={[styles.city, { color: darkMode ? "#fff" : "#333" }]}>{weather.name}</Text>
      <Text style={[styles.localTime, { color: darkMode ? "#ccc" : "#555" }]}>
        {localTime} {isDay ? "☀️" : "🌙"}
      </Text>
      <Image
        source={{
          uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
        }}
        style={{ width: 100, height: 100 }}
      />
      <Text style={[styles.temp, { color: darkMode ? "#fff" : "#111" }]}>
        {weather.main.temp} °C
      </Text>
      <Text style={[styles.desc, { color: darkMode ? "#ccc" : "#555" }]}>
        {weather.weather[0].description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 10,
    alignItems: "center",
    elevation: 5,
    minWidth: 200,
  },
  city: { fontSize: 24, fontWeight: "bold" },
  localTime: { fontSize: 16, marginBottom: 5 },
  temp: { fontSize: 36, marginVertical: 5 },
  desc: { fontSize: 18, textTransform: "capitalize" },
});
