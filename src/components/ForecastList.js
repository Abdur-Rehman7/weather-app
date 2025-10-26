import React from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import { useSelector } from "react-redux";

export default function ForecastList({ data = [], timezone = 0 }) {
  const dark = useSelector((state) => state.theme.darkMode);

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <Text style={{ color: dark ? "#fff" : "#000", marginTop: 10 }}>
        No forecast data available
      </Text>
    );
  }

  const renderItem = ({ item }) => {
    // Convert timestamp + timezone to local time
    const dt = new Date((item.dt + timezone) * 1000);
    const hours = dt.getUTCHours();
    const minutes = dt.getUTCMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHour = hours % 12 || 12;
    const timeString = `${formattedHour}:${minutes < 10 ? "0" : ""}${minutes} ${ampm}`;

    return (
      <View style={[styles.card, { backgroundColor: dark ? "#222" : "#fff" }]}>
        <Text style={{ color: dark ? "#fff" : "#000", fontWeight: "bold" }}>
          {timeString}
        </Text>
        <Image
          source={{
            uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
          }}
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
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
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
    minWidth: 80,
  },
});
