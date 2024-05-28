import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Calendar from "./pages/Calendar";
import Header from "./components/Header";

function App() {
  const location = useLocation();
  return (
    <div>
      {!["/login"].includes(location.pathname) ? <Header /> : null}
      <Routes>
        <Route path="/calendar" element={<Calendar />}></Route>
      </Routes>
    </div>
  );
}

export default App;
