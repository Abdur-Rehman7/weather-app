import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather, fetchWeatherByCoords } from "../redux/weatherSlice";
import { fetchForecast } from "../redux/forecastSlice";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import FavoritesList from "../components/FavoritesList";
import ForecastList from "../components/ForecastList";
import ThemeToggle from "../components/ThemeToggle";
import Toast from "react-native-toast-message";
import { addFavorite, loadFavorites } from "../redux/favoritesSlice";
import * as Location from "expo-location";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const weather = useSelector((state) => state.weather.data);
  const forecast = useSelector((state) => state.forecast.forecast);
  const dark = useSelector((state) => state.theme.darkMode);
  const favorites = useSelector((state) => state.favorites.favorites);

  // 🔹 Default weather
  const defaultWeather = {
    name: "Lahore",
    main: { temp: 30 },
    weather: [{ description: "clear sky", icon: "01d" }],
  };

  const [city, setCity] = useState(defaultWeather.name);
  const [initialWeather, setInitialWeather] = useState(defaultWeather);
  const [detectingLocation, setDetectingLocation] = useState(false);

  // 🔹 Load favorites and detect location
  useEffect(() => {
    (async () => {
      dispatch(loadFavorites());

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Toast.show({
          type: "info",
          text1: "Location permission denied. Using Lahore.",
        });
        dispatch(fetchWeather(defaultWeather.name));
        dispatch(fetchForecast(defaultWeather.name));
        return;
      }

      try {
        setDetectingLocation(true); // Start detecting
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        // Fetch weather using coordinates
        dispatch(fetchWeatherByCoords({ latitude, longitude }))
          .unwrap()
          .then((data) => {
            if (data?.name) {
              setCity(data.name); // Update city input
              dispatch(fetchForecast(data.name));
            }
          })
          .catch(() => {
            Toast.show({ type: "error", text1: "Failed to fetch location weather" });
            dispatch(fetchWeather(defaultWeather.name));
            dispatch(fetchForecast(defaultWeather.name));
          })
          .finally(() => setDetectingLocation(false)); // Done detecting
      } catch (err) {
        console.error(err);
        dispatch(fetchWeather(defaultWeather.name));
        dispatch(fetchForecast(defaultWeather.name));
        setDetectingLocation(false);
      }
    })();
  }, [dispatch]);

  // 🔹 Handle manual search
  const handleSearch = () => {
    if (!city) return;
    dispatch(fetchWeather(city));
    dispatch(fetchForecast(city));
  };

  // 🔹 Save favorite
  const handleSave = () => {
    if (!favorites.includes(city)) {
      dispatch(addFavorite(city));
      Toast.show({ type: "success", text1: `${city} added to favorites` });
    } else {
      Toast.show({ type: "info", text1: `${city} is already a favorite` });
    }
  };

  // 🔹 Show detecting placeholder in card if location is being fetched
  const weatherToShow = detectingLocation
    ? { name: "Detecting your location...", main: { temp: "--" }, weather: [{ description: "" }] }
    : weather || initialWeather;

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: dark ? "#111" : "#f9f9f9" },
      ]}
    >
      <Text style={[styles.title, { color: dark ? "#fff" : "#000" }]}>
        🌤️ Weather App
      </Text>

      <ThemeToggle />

      <SearchBar city={city} setCity={setCity} onSearch={handleSearch} onSave={handleSave} />

      <WeatherCard weather={weatherToShow} />
      <ForecastList data={forecast} />
      <FavoritesList />

      <Toast position="top" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
