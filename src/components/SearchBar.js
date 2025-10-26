import React from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export default function SearchBar({ city, setCity, onSearch, onSave }) {
  const dark = useSelector((state) => state.theme.darkMode);

  return (
    <View style={[styles.card, { backgroundColor: dark ? "rgba(50,50,50,0.9)" : "rgba(255,255,255,0.9)" }]}>
      <TextInput
        style={[styles.input, { backgroundColor: dark ? "#333" : "#fff", color: dark ? "#fff" : "#000" }]}
        placeholder="Enter city"
        placeholderTextColor={dark ? "#ccc" : "#999"}
        value={city}
        onChangeText={setCity}
      />
      <Button title="Get Weather" onPress={onSearch} />
      <View style={{ marginTop: 10 }}>
        <Button title="⭐ Save as Favorite" onPress={onSave} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 20,
    width: "90%",
    elevation: 5,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
});
