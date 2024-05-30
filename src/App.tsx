import React from "react";
import GlobalStyles from "./GlobalStyles";
import PayrollDetails from "./components/PayrollDetails";

// import Login from "./components/Login";
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
    <>
      <GlobalStyles />
      <PayrollDetails employee={sampleEmployee} payroll={samplePayroll} />
    </>
  );
};

export default App;
