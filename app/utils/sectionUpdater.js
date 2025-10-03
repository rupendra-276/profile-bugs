// utils/sectionUpdater.js
import { v4 as uuid } from "uuid";

export const updateSectionHelper = (state, { section, action, id, data }) => {
  if (!state.currentUser) return state;

  const validSections = ["education", "experience", "certifications"];
  if (!validSections.includes(section)) {
    console.warn(`Invalid section: ${section}`);
    return state;
  }

  let items = [...(state.currentUser[section] || [])];

  switch (action) {
    case "add":
      items.push({ id: uuid(), ...data });
      break;

    case "update":
      items = items.map((item) =>
        item.id === id ? { ...item, ...data } : item
      );
      break;

    case "delete":
      items = items.filter((item) => item.id !== id);
      break;

    default:
      console.warn(`Unknown action: ${action}`);
      return state;
  }

  const updatedUser = { ...state.currentUser, [section]: items };

  return {
    ...state,
    currentUser: updatedUser,
    users: state.users.map((u) => (u.id === updatedUser.id ? updatedUser : u)),
  };
};
