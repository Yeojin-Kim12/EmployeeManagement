import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Calendar from "./pages/routes/Calendar";
import PayrollDetails from "./pages/routes/PayrollDetails";
import CorrectionRequest from "./pages/routes/CorrectionRequest";
import RequestList from "./pages/routes/RequestList";
import RequestManagement from "./pages/routes/RequestManagement";
import Header from "./components/Header";

const router = () => {
  const location = useLocation();
  return (
    <>
      {!["/login"].includes(location.pathname) ? <Header /> : null}
      <Routes>
        <Route path="/calendar" element={<Calendar />} />;
        <Route path="/payroll-details" element={<PayrollDetails />} />;
        <Route path="/correction-request" element={<CorrectionRequest />} />;
        <Route path="/request-list" element={<RequestList />} />;
        <Route path="/request-management" element={<RequestManagement />} />;
      </Routes>
    </>
  );
};

export default router;
