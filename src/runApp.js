import { createMainSection } from "./createMainSection";
import { setupEventListners } from "./setupEventListners";
import "./runApp.css";

export function runApp(el) {
  createMainSection(el);
  setupEventListners();
}
