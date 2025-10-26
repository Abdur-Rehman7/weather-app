const API_KEY = "e2bdde13e1f38e7344bb79133a1658e3";

export const fetchWeatherByCity = async (city) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );
  return await res.json();
};

export const fetchForecast = createAsyncThunk(
  "forecast/fetchForecast",
  async (city) => {
    const API_KEY = "e2bdde13e1f38e7344bb79133a1658e3";
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();
    return data.list || []; 
  }
);
