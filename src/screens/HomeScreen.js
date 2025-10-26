import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  RefreshControl,
} from "react-native";
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
import { LinearGradient } from "expo-linear-gradient";

// Gradient utility
const getGradientColors = (temp, isDay) => {
  if (isDay) {
    if (temp < 15) return ["#89CFF0", "#6FA8DC"];
    if (temp < 25) return ["#FFD580", "#FFA500"];
    return ["#FF7F7F", "#FF4C4C"];
  } else {
    return ["#0F2027", "#203A43", "#2C5364"];
  }
};

export default function HomeScreen() {
  const dispatch = useDispatch();
  const weather = useSelector((state) => state.weather.data);
  const forecast = useSelector((state) => state.forecast.forecast);
  const forecastStatus = useSelector((state) => state.forecast.status);
  const dark = useSelector((state) => state.theme.darkMode);
  const favorites = useSelector((state) => state.favorites.favorites);

  const defaultWeather = {
    name: "Lahore",
    main: { temp: 30 },
    weather: [{ description: "clear sky", icon: "01d" }],
    timezone: 0,
  };

  const [city, setCity] = useState(defaultWeather.name);
  const [initialWeather, setInitialWeather] = useState(defaultWeather);
  const [detectingLocation, setDetectingLocation] = useState(false);
  const [gradientColors, setGradientColors] = useState(["#FFD580", "#FFA500"]);
  const [pakistanTime, setPakistanTime] = useState("");
  const [loading, setLoading] = useState(false);

  // Load favorites and detect location
  useEffect(() => {
    (async () => {
      dispatch(loadFavorites());

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Toast.show({ type: "info", text1: "Location permission denied. Using Lahore." });
        dispatch(fetchWeather(defaultWeather.name));
        dispatch(fetchForecast(defaultWeather.name));
        return;
      }

      try {
        setDetectingLocation(true);
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        dispatch(fetchWeatherByCoords({ latitude, longitude }))
          .unwrap()
          .then((data) => {
            if (data?.name) {
              setCity(data.name);
              dispatch(fetchForecast(data.name));
            }
          })
          .catch(() => {
            Toast.show({ type: "error", text1: "Failed to fetch location weather" });
            dispatch(fetchWeather(defaultWeather.name));
            dispatch(fetchForecast(defaultWeather.name));
          })
          .finally(() => setDetectingLocation(false));
      } catch (err) {
        console.error(err);
        dispatch(fetchWeather(defaultWeather.name));
        dispatch(fetchForecast(defaultWeather.name));
        setDetectingLocation(false);
      }
    })();
  }, [dispatch]);

  // Pakistan Standard Time (UTC+5)
  useEffect(() => {
    const updatePakistanTime = () => {
      const nowUTC = new Date().getTime();
      const pstOffset = 5 * 60 * 60 * 1000;
      const pstTime = new Date(nowUTC + pstOffset);
      const hours = pstTime.getUTCHours();
      const minutes = pstTime.getUTCMinutes();
      const seconds = pstTime.getUTCSeconds();
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedHour = hours % 12 || 12;
      const formattedMinute = minutes < 10 ? `0${minutes}` : minutes;
      const formattedSecond = seconds < 10 ? `0${seconds}` : seconds;

      setPakistanTime(`${formattedHour}:${formattedMinute}:${formattedSecond} ${ampm}`);
    };

    updatePakistanTime();
    const interval = setInterval(updatePakistanTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Pull-to-refresh handler
  const handleRefresh = async () => {
    setLoading(true);
    await dispatch(fetchWeather(city));
    await dispatch(fetchForecast(city));
    setLoading(false);
  };

  // Manual search (no spinner)
  const handleSearch = async () => {
    if (!city) return;
    await dispatch(fetchWeather(city));
    await dispatch(fetchForecast(city));
  };

  const handleSave = () => {
    if (!favorites.includes(city)) {
      dispatch(addFavorite(city));
      Toast.show({ type: "success", text1: `${city} added to favorites` });
    } else {
      Toast.show({ type: "info", text1: `${city} is already a favorite` });
    }
  };

  const weatherToShow = detectingLocation
    ? { name: "Detecting your location...", main: { temp: "--" }, weather: [{ description: "" }] }
    : weather || initialWeather;

  const showForecast = forecastStatus === "succeeded" && forecast && forecast.length > 0;

  return (
    <LinearGradient colors={gradientColors} style={{ flex: 1 }}>
      <StatusBar barStyle={dark ? "light-content" : "dark-content"} />
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
        }
      >
        {/* Pakistan Standard Time */}
        <Text style={[styles.time, { color: dark ? "#fff" : "#333", fontSize: 20 }]}>
          Pakistan Time: {pakistanTime}
        </Text>

        <Text style={[styles.title, { color: dark ? "#fff" : "#000" }]}>
          🌤️ Weather App
        </Text>

        <ThemeToggle />

        <SearchBar city={city} setCity={setCity} onSearch={handleSearch} onSave={handleSave} />

        {/* WeatherCard (card now calculates its own local time) */}
        <WeatherCard weather={weatherToShow} />

        {showForecast ? (
          <ForecastList data={forecast} timezone={weather?.timezone || 0} />
        ) : (
          !detectingLocation && (
            <Text style={{ color: dark ? "#fff" : "#000", marginTop: 10 }}>
              No forecast data available
            </Text>
          )
        )}

        <FavoritesList />

        <Toast position="top" />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 5,
  },
  time: {
    fontSize: 18,
    marginBottom: 10,
  },
});
