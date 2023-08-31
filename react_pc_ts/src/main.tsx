import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { BrowserRouter as Router } from "react-router-dom";
import { StoreProvider } from "@/store";

function BASE() {
  return (
    <React.StrictMode>
      <StoreProvider>
        <Router>
            <App />
        </Router>
      </StoreProvider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<BASE />);
