import React from "react";
import ReactDOM from "react-dom/client";
import Trial from "./Components/Trial";

const App = () => {
  return (
    <div>
      {/* <h1 className="text-3xl underline font-bold">Hello World!</h1> */}
      <Trial />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
