import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./router";
import App from "./App.jsx";
import { AuthProvider } from "./auth/AuthProvider.jsx";
import { RouterProvider } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      {/* <App />*/}
    </AuthProvider>
  </StrictMode>,
);
