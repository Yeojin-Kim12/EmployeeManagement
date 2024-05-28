import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import PayrollDetails from "./components/PayrollDetails";
import CorrectionRequest from "./components/CorrectionRequest";
import RequestList from "./components/RequestList";
import RequestManagement from "./components/RequestManagement";
import Login from "./components/Login";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

const App: React.FC = () => {
  const [user, loading] = useAuthState(auth);

  const sampleEmployee = {
    name: "김패캠",
    department: "개발부",
    position: "주임",
    hireDate: "2020-01-01",
  };

  const samplePayroll = [{ date: "2023-04-01", amount: 4000000 }];

  if (loading) {
    return <p>로딩 중...</p>;
  }

  return (
    <Router>
      <GlobalStyles />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <Navigate to={user ? "/payroll-details" : "/login"} replace />
          }
        />
        <Route
          path="/payroll-details"
          element={
            user ? (
              <PayrollDetails
                employee={sampleEmployee}
                payroll={samplePayroll}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/correction-request"
          element={
            user ? <CorrectionRequest /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/request-list"
          element={user ? <RequestList /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/request-management"
          element={
            user ? <RequestManagement /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
