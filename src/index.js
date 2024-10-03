import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <div className="min-h-screen w-screen bg-slate-900 overflow-hidden">
      <App />
      <Toaster position="top-right" />
    </div>
  </Provider>
);
