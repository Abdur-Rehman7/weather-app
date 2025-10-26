import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = "e2bdde13e1f38e7344bb79133a1658e3";

// Fetch weather by city name
export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (city) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    return res.json();
  }
);

// Fetch weather by coordinates
export const fetchWeatherByCoords = createAsyncThunk(
  "weather/fetchWeatherByCoords",
  async ({ latitude, longitude }) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    return res.json();
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: { data: null, status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => { state.status = "loading"; })
      .addCase(fetchWeather.fulfilled, (state, action) => { state.status = "succeeded"; state.data = action.payload; })
      .addCase(fetchWeather.rejected, (state, action) => { state.status = "failed"; state.error = action.error.message; })

      .addCase(fetchWeatherByCoords.pending, (state) => { state.status = "loading"; })
      .addCase(fetchWeatherByCoords.fulfilled, (state, action) => { state.status = "succeeded"; state.data = action.payload; })
      .addCase(fetchWeatherByCoords.rejected, (state, action) => { state.status = "failed"; state.error = action.error.message; });
  },
});

export default weatherSlice.reducer;
