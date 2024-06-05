import { Route, Routes, useLocation } from "react-router-dom";
import Calendar from "../pages/Calendar";
// import PayrollDetails from "../pages/PayrollDetails";
import CorrectionRequest from "../pages/CorrectionRequest";
import RequestList from "../pages/RequestList";
import RequestManagement from "../pages/RequestManagement";
import Header from "../components/Header";
import Profile from "../pages/Profile";
import Login from "../pages/Login";

const AppRouter = () => {
  const location = useLocation();
  return (
    <>
      {!["/login"].includes(location.pathname) ? <Header /> : null}
      <Routes>
        <Route path="/calendar" element={<Calendar />} />;
        {/* <Route path="/payroll-details" element={<PayrollDetails />} />; */}
        <Route path="/correction-request" element={<CorrectionRequest />} />;
        <Route path="/request-list" element={<RequestList />} />;
        <Route path="/request-management" element={<RequestManagement />} />;
        <Route path="/profile" element={<Profile />} />;
        <Route path="/login" element={<Login />} />;
      </Routes>
    </>
  );
};

export default AppRouter;

// import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { RootState } from '../redux/store';
// import Calendar from '../pages/Calendar';
// import CorrectionRequest from '../pages/CorrectionRequest';
// import RequestList from '../pages/RequestList';
// import RequestManagement from '../pages/RequestManagement';
// import Header from '../components/Header';
// import Profile from '../pages/Profile';
// import Login from '../pages/Login';

// const PrivateRoute = () => {
//   const user = useSelector((state: RootState) => state.auth.user);
//   console.log("PrivateRouteCheck!")
//   console.log(user)
//   return user ? <Outlet /> : <Navigate to="/login" />;
// };

// const ProtectedLoginRoute = () => {
//   const user = useSelector((state: RootState) => state.auth.user);
//   return user ? <Navigate to="/profile" /> : <Outlet />;
// };

// const AppRouter = () => {
//   return (
//     <Routes>
//       <Route element={<ProtectedLoginRoute />}>
//         <Route path="/login" element={<Login />} />
//       </Route>
//       <Route element={<PrivateRoute />}>
//         <Route path="/" element={<Header />}>
//           <Route path="calendar" element={<Calendar />} />
//           <Route path="correction-request" element={<CorrectionRequest />} />
//           <Route path="request-list" element={<RequestList />} />
//           <Route path="request-management" element={<RequestManagement />} />
//           <Route path="profile" element={<Profile />} />
//           <Route index element={<Navigate to="profile" />} />
//         </Route>
//       </Route>
//     </Routes>
//   );
// };

// export default AppRouter;

// src/components/AppRouter.tsx