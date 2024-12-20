import React from "react";

import Chat from "./components/Chat/Chat";
import Join from "./components/Join/Join";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        {/*  path="/" exact component={Join} */}
        <Route path="/" Component={Join} />
        <Route path="/chat" Component={Chat} />
      </Routes>
    </Router>
  );
};

export default App;
