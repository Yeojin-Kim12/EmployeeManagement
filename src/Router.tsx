import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Calendar from "./pages/routes/Calendar";
import Header from "./components/Header";

const router = () => {
  const location = useLocation();
  return (
    <>
      {!["/login"].includes(location.pathname) ? <Header /> : null}
      <Routes>
        <Route path="/calendar" element={<Calendar />} />;
      </Routes>
    </>
  );
};

export default router;
