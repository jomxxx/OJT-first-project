import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/Homepage";
import BillPayment from "./pages/features/BillPayment";
import Complaint from "./pages/features/Complaint";
import DisconnectionRequest from "./pages/features/DisconnectionRequest";
import NewApplication from "./pages/features/NewApplication";
import ReconnectionRequest from "./pages/features/ReconnectionRequest";
import UpdateDetails from "./pages/features/UpdateDetails";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/bill-payment" element={<BillPayment />} />
          <Route path="/complaint" element={<Complaint />} />
          <Route
            path="/disconnection-request"
            element={<DisconnectionRequest />}
          />
          <Route path="/new-application" element={<NewApplication />} />
          <Route
            path="/reconnection-request"
            element={<ReconnectionRequest />}
          />
          <Route path="/update-details" element={<UpdateDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
