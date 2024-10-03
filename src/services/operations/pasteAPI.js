import { toast } from "react-hot-toast";
import {
  setPastes,
  setLoading,
  addToPastes,
  updatePastes,
  removeFromPastes,
  // setPastes, // Assuming you have this action for setting pastes
} from "../../redux/pasteSlice"; // Assuming you have these in your slice

import { apiConnector } from "../apiconnector";
import { endpoints } from "../apis";

const {
  CREATE_PASTE_API,
  GETALL_PASTE_API,
  UPDATE_PASTE_API,
  REMOVE_PASTE_API,
} = endpoints;

// Action to create a new paste
export const createPaste = (title, content) => (dispatch, navigate) => {
  const toastId = toast.loading("Creating Paste...");
  dispatch(setLoading(true));

  // Send the POST request to create a new paste
  apiConnector("POST", CREATE_PASTE_API, { title, content })
    .then((response) => {
      console.log("CREATE PASTE RESPONSE:", response);

      // Check for success in the response
      if (!response?.data?.success) {
        throw new Error(response?.data?.message || "Failed to create paste.");
      }

      // Dispatch action to add paste to Redux state
      dispatch(addToPastes(response.data.paste));
      toast.success("Paste Created Successfully ...!");

      // Navigate after a successful paste creation
      // Assuming you're using `useNavigate` from 'react-router-dom' in the component
      return response; // Return response to use in the next then if needed
    })
    .then(() => {
      // Navigation should ideally happen here after the paste is created
      // Navigate to the pastes page
      navigate("/pastes");
    })
    .catch((error) => {
      console.error("CREATE PASTE ERROR:", error);
      toast.error(error.message || "Failed to Create Paste");
    })
    .finally(() => {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    });
};

// Action to fetch all pastes
export const fetchPastes = () => (dispatch) => {
  const toastId = toast.loading("Fetching Pastes...");
  dispatch(setLoading(true));

  apiConnector("GET", GETALL_PASTE_API)
    .then((response) => {
      console.log("FETCH PASTES RESPONSE:", response);

      // Check for success in the response
      if (!response || !response.data || !response.data.success) {
        throw new Error(response?.data?.message || "Failed to fetch pastes.");
      }

      // Dispatch action to store pastes in Redux state
      dispatch(setPastes(response.data.pastes));
      toast.success("Pastes Fetched Successfully ...!");
    })
    .catch((error) => {
      console.error("FETCH PASTES ERROR:", error);
      toast.error(error.message || "Failed to Fetch Pastes");
    })
    .finally(() => {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    });
};

// delete the paste from the database
export const deletePaste = (pasteId) => (dispatch) => {
  if (!pasteId) {
    console.error("No pasteId provided!");
    return; // Prevent further execution if pasteId is invalid
  }
  console.log("🚀 ~ deletePaste ~ pasteId:", pasteId);
  const toastId = toast.loading("Deleting Paste...");
  dispatch(setLoading(true));

  apiConnector("DELETE", `${REMOVE_PASTE_API}/${pasteId}`)
    .then((response) => {
      console.log("DELETE PASTE RESPONSE:", response);

      // Check for success in the response
      if (!response?.data?.success) {
        throw new Error(response?.data?.message || "Failed to delete paste.");
      }

      // Dispatch action to remove paste from Redux state
      dispatch(removeFromPastes(pasteId));

      // Update to localStorage or handle side effects here
      const pastes = JSON.parse(localStorage.getItem("pastes")) || [];
      const updatedPastes = pastes.filter((item) => item._id !== pasteId);
      localStorage.setItem("pastes", JSON.stringify(updatedPastes));

      toast.success("Paste Deleted Successfully ....!");
    })
    .catch((error) => {
      console.error("DELETE PASTE ERROR:", error);
      toast.error(error.message || "Failed to Delete Paste");
    })
    .finally(() => {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    });
};

// Action to update a paste
export const updatePaste = (pasteId, title, content) => (dispatch) => {
  console.log("🚀 ~ pasteId:", pasteId);
  const toastId = toast.loading("Updating Paste...");
  dispatch(setLoading(true));

  apiConnector("PUT", `${UPDATE_PASTE_API}/${pasteId}`, {
    pasteId,
    title,
    content,
  })
    .then((response) => {
      console.log("UPDATE PASTE RESPONSE:", response);

      // Check for success in the response
      if (!response || !response.data || !response.data.success) {
        throw new Error(response?.data?.message || "Failed to update paste.");
      }

      // Dispatch action to update paste in Redux state
      dispatch(updatePastes(response.data.paste));
      toast.success("Paste Updated Successfully ...!");
      // Navigate to pastes page after updating
    })
    .catch((error) => {
      console.error("UPDATE PASTE ERROR:", error);
      toast.error(error.message || "Failed to Update Paste");
    })
    .finally(() => {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    });
};
