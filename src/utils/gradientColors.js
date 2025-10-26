const getGradientColors = (temp, condition, isDay) => {
  if (!isDay) return ["#0F2027", "#203A43", "#2C5364"]; // Night
  switch (condition) {
    case "Clear":
      return ["#FFD580", "#FFA500"];
    case "Clouds":
      return ["#D7D2CC", "#304352"];
    case "Rain":
      return ["#4e54c8", "#8f94fb"];
    case "Snow":
      return ["#E0EAFc", "#CFDEF3"];
    default:
      return ["#FFD580", "#FFA500"];
  }
};
