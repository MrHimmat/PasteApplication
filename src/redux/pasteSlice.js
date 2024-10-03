import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { createPaste } from "../services/operations/pasteAPI";
import { updatePaste } from "../services/operations/pasteAPI";
// import { Import } from "lucide-react";
import { deletePaste } from "../services/operations/pasteAPI";

const initialState = {
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null, // Directly retrieve token from localStorage
  pastes: JSON.parse(localStorage.getItem("pastes")) || [], // Initialize pastes as an empty array
};

const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    setPastes: (state, action) => {
      state.pastes = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setViewPastes(state, action) {
      state.pastes = action.payload; // Set the viewPastes array
    },
    addToPastes: (state, action) => {
      const paste = action.payload;
      // console.log("paste value ", paste.value);
      // Ensure state.pastes is an array before calling findIndex
      if (!Array.isArray(state.pastes)) {
        state.pastes = []; // Initialize pastes array if undefined
      }

      const index = state.pastes.findIndex((item) => item._id === paste._id);

      if (index >= 0) {
        // If the paste is already in the Pastes, do not add it again
        toast.error("Paste already exists ...!");
        return;
      }

      // Dispatch createPaste action to add it to MongoDB
      createPaste(paste.title, paste.content); // Pass the required data
    },

    updatePastes: (state, action) => {
      const paste = action.payload;

      const index = state.pastes.findIndex((item) => item._id === paste.id);

      if (index >= 0) {
        // If the course is found in the Pastes, update it
        state.pastes[index] = paste;

        // Update to localstorage
        updatePaste(paste.pasteId, paste.title, paste.content);
        // show toast
      }
    },

    removeFromPastes: (state, action) => {
      const pasteId = action.payload;

      const index = state.pastes.findIndex((item) => item._id === pasteId);
      if (index >= 0) {
        // If the course is found in the Pastes, remove it
        state.pastes.splice(index, 1);

        // Update to localstorage
        deletePaste(pasteId);
      }
    },
    resetPaste: (state) => {
      state.pastes = [];
      // Update to localstorage
      localStorage.removeItem("pastes");
    },
  },
});

export const {
  setPastes,
  addToPastes,
  setLoading,
  removeFromPastes,
  updatePastes,
} = pasteSlice.actions;

export default pasteSlice.reducer;
