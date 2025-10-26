import React from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

export default function CityInput({ city, setCity, onSearch, onSave, dark }) {
  return (
    <View style={[styles.card, { backgroundColor: dark ? "#333" : "rgba(255,255,255,0.9)" }]}>
      <TextInput
        style={[styles.input, { backgroundColor: dark ? "#555" : "#fff", color: dark ? "#fff" : "#000" }]}
        placeholder="Enter city"
        placeholderTextColor={dark ? "#ccc" : "#888"}
        value={city}
        onChangeText={setCity}
        returnKeyType="search"
        onSubmitEditing={onSearch}
      />
      <Button title="Get Weather" onPress={onSearch} color={dark ? "#FFA500" : "#007AFF"} />
      <View style={{ marginTop: 10 }}>
        <Button title="⭐ Save as Favorite" onPress={onSave} color={dark ? "#FFD700" : "#FF9500"} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 20,
    width: "90%",
    marginBottom: 20,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
});
