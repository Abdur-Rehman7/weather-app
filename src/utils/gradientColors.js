// utils/gradientColor.js
export const getGradientColors = (temp, isDay) => {
  if (isDay) {
    if (temp < 10) return ["#89CFF0", "#6FA8DC"]; // cold
    if (temp < 25) return ["#FFD580", "#FFA500"]; // warm
    return ["#FF7F7F", "#FF4C4C"]; // hot
  } else {
    return ["#0F2027", "#203A43", "#2C5364"]; // night
  }
};
