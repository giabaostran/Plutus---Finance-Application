import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import { useState } from "react";
import "../App.css";
import { ThemeContext } from "../hooks/ThemeContext";

function App() {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div id="body" data-theme={theme}>
        <Sidebar />
        <Main />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
