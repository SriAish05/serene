import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Initialize theme before app render to avoid FOUC
const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
document.documentElement.classList.toggle('dark', isDark);
if (!savedTheme) {
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

createRoot(document.getElementById("root")!).render(<App />);
