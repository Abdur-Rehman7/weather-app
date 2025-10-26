import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { removeFavorite } from "../redux/favoritesSlice";
import { fetchWeather } from "../redux/weatherSlice"; // assuming you have this thunk

export default function FavoritesList() {
  const favorites = useSelector((state) => state.favorites.favorites);
  const dark = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();

  if (!favorites || favorites.length === 0) {
    return <Text style={{ color: dark ? "#fff" : "#000", marginTop: 10 }}>No favorites yet</Text>;
  }

  return (
    <View style={styles.container}>
      {favorites.map((fav, index) => (
        <View key={index} style={styles.row}>
          <TouchableOpacity
            onPress={() => dispatch(fetchWeather(fav))}
            style={{ flex: 1 }}
          >
            <Text style={[styles.text, { color: dark ? "#fff" : "#000" }]}>{fav}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => dispatch(removeFavorite(fav))}
            style={styles.deleteBtn}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>🗑️</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%", marginTop: 10 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    backgroundColor: "rgba(255,255,255,0.8)",
    padding: 8,
    borderRadius: 10,
  },
  text: { fontSize: 18 },
  deleteBtn: {
    backgroundColor: "#ff4d4d",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 5,
  },
});
