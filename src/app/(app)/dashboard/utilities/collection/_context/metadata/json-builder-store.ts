import { create } from "zustand";
import { JsonValue } from "@/types";

interface JsonStore {
  jsonBuilder: { [key: string]: JsonValue };
  setJsonBuilder: (newJson: { [key: string]: JsonValue }) => void;
  addField: (path: string[]) => void;
  updateField: (path: string[], value: JsonValue) => void;
  removeField: (path: string[]) => void;
}

export const useJsonStore = create<JsonStore>((set) => ({
  jsonBuilder: {},
  setJsonBuilder: (newJson) => set({ jsonBuilder: newJson }),
  addField: (path) =>
    set((state) => {
      const newJson = { ...state.jsonBuilder };
      let current = newJson;
      for (const key of path) {
        if (typeof current[key] === "object" && current[key] !== null) {
          current = current[key] as { [key: string]: JsonValue };
        }
      }
      if (Array.isArray(current)) {
        current.push("");
      } else {
        current[`newField${Object.keys(current).length}`] = "";
      }
      return { jsonBuilder: newJson };
    }),

  updateField: (path, value) =>
    set((state) => {
      const newJson = { ...state.jsonBuilder };
      let current = newJson;
      for (let i = 0; i < path.length - 1; i++) {
        if (typeof current[path[i]] === "object" && current[path[i]] !== null) {
          current = current[path[i]] as { [key: string]: JsonValue };
        }
      }
      current[path[path.length - 1]] = value;
      return { jsonBuilder: newJson };
    }),
  removeField: (path) =>
    set((state) => {
      const newJson = { ...state.jsonBuilder };
      let current = newJson;
      for (let i = 0; i < path.length - 1; i++) {
        if (typeof current[path[i]] === "object" && current[path[i]] !== null) {
          current = current[path[i]] as { [key: string]: JsonValue };
        }
      }
      if (Array.isArray(current)) {
        current.splice(Number(path[path.length - 1]), 1);
      } else {
        delete current[path[path.length - 1]];
      }
      return { jsonBuilder: newJson };
    }),
}));
