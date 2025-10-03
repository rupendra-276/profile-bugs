// utils/localStorage.js

export const saveState = (state) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("socialAppState", JSON.stringify(state));
  }
};

export const loadState = () => {
  if (typeof window !== "undefined") {
    const state = localStorage.getItem("socialAppState");
    return state ? JSON.parse(state) : undefined;
  }
  return undefined;
};
