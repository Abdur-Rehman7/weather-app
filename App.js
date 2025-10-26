import React from "react";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import HomeScreen from "./src/screens/HomeScreen";
import "./src/i18n/i18n"; // 👈 must be imported before any screen renders



export default function App() {
  return (
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  );
}
