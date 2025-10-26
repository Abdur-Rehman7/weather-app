import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export default function WeatherCard({ weather = null }) {
  const darkMode = useSelector((state) => state.theme.darkMode);

  if (!weather || !weather.main) {
    return <Text style={{ color: darkMode ? "#fff" : "#000" }}>No weather data</Text>;
  }

  return (
    <View style={[styles.card, { backgroundColor: darkMode ? "#222" : "#fff" }]}>
      <Text style={[styles.city, { color: darkMode ? "#fff" : "#333" }]}>{weather.name}</Text>
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
  },
  city: { fontSize: 24, fontWeight: "bold" },
  temp: { fontSize: 36, marginVertical: 5 },
  desc: { fontSize: 18, textTransform: "capitalize" },
});
