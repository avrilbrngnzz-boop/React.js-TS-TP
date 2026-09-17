import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contextes/AuthContext";
import { FavorisProvider } from "./contextes/FavorisContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <FavorisProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FavorisProvider>
  </AuthProvider>
);
