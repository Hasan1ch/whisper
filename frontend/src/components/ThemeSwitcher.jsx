import { useState, useEffect } from "react";

const ThemeSwitcher = () => {
  const themes = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
  ];

  const [currentTheme, setCurrentTheme] = useState(
    localStorage.getItem("theme") || "cupcake"
  );

  useEffect(() => {
    console.log("Setting theme:", currentTheme); // Debugging log
    document.documentElement.setAttribute("data-theme", currentTheme);
    localStorage.setItem("theme", currentTheme);
  }, [currentTheme]);

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-sm">
        Theme
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        {themes.map((theme) => (
          <li key={theme}>
            <button
              className={theme === currentTheme ? "active" : ""}
              onClick={() => setCurrentTheme(theme)}
            >
              {theme}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeSwitcher;
