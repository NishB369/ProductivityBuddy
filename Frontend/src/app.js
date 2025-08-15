import React from "react";
import ReactDOM from "react-dom/client";
import Workspace from "./Components/Workspaces/Workspace";
import WorkspaceDetail from "./Components/Workspaces/WorkspaceDetail";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import LandingPage from "./Pages/LandingPage";

const App = () => {
  return (
    <Router>
      <div className="h-[100%] w-[100%] bg-[#191919]">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/workspace" element={<Workspace />} />
          <Route path="/workspace/:id" element={<WorkspaceDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
