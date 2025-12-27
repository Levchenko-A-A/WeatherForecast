import { createMainSection } from "./createMainSection";
import { setupEventListners } from "./setupEventListeners";
import "./runApp.css";

export function runApp(el) {
  const element = createMainSection(el);
  setupEventListners(element);
}
