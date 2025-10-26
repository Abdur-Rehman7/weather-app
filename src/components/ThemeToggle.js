import React from "react";
import { View, Switch, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../redux/themeSlice";

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  const handleToggle = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: darkMode ? "#fff" : "#000" }]}>
        Dark Mode
      </Text>
      <Switch
        value={darkMode}
        onValueChange={handleToggle}
        trackColor={{ false: "#ccc", true: "#555" }}
        thumbColor={darkMode ? "#fff" : "#f4f3f4"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginVertical: 10,
    width: "90%",
  },
  label: {
    fontSize: 18,
    marginRight: 10,
  },
});
