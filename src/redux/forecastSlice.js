import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch 5-day forecast
export const fetchForecast = createAsyncThunk(
  "forecast/fetchForecast",
  async (city, { rejectWithValue }) => {
    const API_KEY = "e2bdde13e1f38e7344bb79133a1658e3"; // replace with your actual key
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!res.ok) {
        // Handle HTTP errors
        return rejectWithValue("Failed to fetch forecast");
      }

      const data = await res.json();
      // Ensure `list` exists and is an array
      return Array.isArray(data.list) ? data.list : [];
    } catch (error) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

const forecastSlice = createSlice({
  name: "forecast",
  initialState: {
    forecast: [], // safe default
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchForecast.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchForecast.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.forecast = action.payload;
      })
      .addCase(fetchForecast.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
        state.forecast = []; // reset to safe empty array
      });
  },
});

export default forecastSlice.reducer;
