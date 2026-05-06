import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import CandidateDashboard
from "./pages/CandidateDashboard";
function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={
            <Login />
          }
        />

        <Route
          path="/register"
          element={
            <Register />
          }
        />

        <Route
          path="/dashboard"
          element={
            <Dashboard />
          }
        />

        <Route
          path="/jobs"
          element={
            <Jobs />
          }
        />

        <Route
  path="/candidate-dashboard"
  element={
    <CandidateDashboard />
  }
/>

      </Routes>

    </BrowserRouter>

  );

}

export default App;