// Import React StrictMode to highlight potential problems in the application
import { StrictMode } from "react";
// Import createRoot from ReactDOM for rendering the app
import { createRoot } from "react-dom/client";
// Import global CSS styles
import "./index.css";
// Import the main App component
import App from "./App.jsx";
// Import BrowserRouter for handling routing
import { BrowserRouter } from "react-router-dom";

// Create a root element and render the app
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Wrap App with BrowserRouter to enable routing */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
