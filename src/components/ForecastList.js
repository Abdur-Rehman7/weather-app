import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export default function ForecastList({ data = [], timezone = 0, currentTime }) {
  const dark = useSelector((state) => state.theme.darkMode);

  if (!Array.isArray(data) || data.length === 0) {
    return <Text style={{ color: dark ? "#fff" : "#000", marginTop: 10 }}>No forecast data available</Text>;
  }

  const formatLocalTime = (dt) => {
    const localTime = new Date((dt + timezone) * 1000);

    // Time
    const hours = localTime.getUTCHours();
    const minutes = localTime.getUTCMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHour = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    // Date
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dayName = days[localTime.getUTCDay()];
    const monthName = months[localTime.getUTCMonth()];
    const date = localTime.getUTCDate();

    return {
      time: `${formattedHour}:${formattedMinutes} ${ampm}`,
      date: `${dayName}, ${monthName} ${date}`
    };
  };

  const renderItem = ({ item }) => {
    const { time, date } = formatLocalTime(item.dt);
    const isDay = item.weather[0].icon.includes("d");

    return (
      <View style={[styles.card, { backgroundColor: dark ? "rgba(50,50,50,0.8)" : "#fff" }]}>
        <Text style={{ color: dark ? "#ccc" : "#555", fontSize: 12, marginBottom: 2 }}>{date}</Text>
        <Text style={{ color: dark ? "#fff" : "#000", fontWeight: "bold" }}>
          {time} {isDay ? "☀️" : "🌙"}
        </Text>
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
      extraData={currentTime} // passed from parent
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
