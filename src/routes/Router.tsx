import { Route, Routes, useLocation } from "react-router-dom";
import Calendar from "../pages/Calendar";
import PayrollDetails from "../pages/PayrollDetails";
import CorrectionRequest from "../pages/CorrectionRequest";
import RequestList from "../pages/RequestList";
import RequestManagement from "../pages/RequestManagement";
import Header from "../components/Header";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const AppRouter = () => {
  const location = useLocation();
  return (
    <>
      {!["/login"].includes(location.pathname) ? <Header /> : null}
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/calendar"
          element={
            <PrivateRoute>
              <Calendar />
            </PrivateRoute>
          }
        />
        <Route
          path="/payroll-details"
          element={
            <PrivateRoute>
              <PayrollDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/correction-request"
          element={
            <PrivateRoute>
              <CorrectionRequest />
            </PrivateRoute>
          }
        />
        <Route
          path="/request-list"
          element={
            <PrivateRoute>
              <RequestList />
            </PrivateRoute>
          }
        />
        <Route
          path="/request-management"
          element={
            <PrivateRoute>
              <RequestManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default AppRouter;
