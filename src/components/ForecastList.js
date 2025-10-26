import React from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export default function ForecastList({ data = [] }) {
  const dark = useSelector((state) => state.theme.darkMode);

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <Text style={{ color: dark ? "#fff" : "#000", marginTop: 10 }}>
        No forecast data available
      </Text>
    );
  }

  // Filter to get one forecast per day (12:00 PM)
  const dailyForecast = data.filter(item => item.dt_txt.includes("12:00:00"));

  const renderItem = ({ item }) => (
    <View style={[styles.card, { backgroundColor: dark ? "rgba(50,50,50,0.8)" : "#fff" }]}>
      <Text style={{ color: dark ? "#fff" : "#000", fontWeight: "bold" }}>
        {item.dt_txt.split(" ")[0]}
      </Text>
      <Image
        source={{ uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png` }}
        style={{ width: 50, height: 50 }}
      />
      <Text style={{ color: dark ? "#fff" : "#000", fontSize: 16 }}>
        {Math.round(item.main.temp)}°C
      </Text>
      <Text style={{ color: dark ? "#ccc" : "#555", textTransform: "capitalize" }}>
        {item.weather[0].description}
      </Text>
    </View>
  );

  return (
    <FlatList
      data={dailyForecast}
      keyExtractor={(item) => item.dt.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={renderItem}
      contentContainerStyle={{ paddingVertical: 10 }}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    marginHorizontal: 5,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
    minWidth: 100,
  },
});
