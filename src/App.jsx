import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import MiniDrawer from "./component/MiniDrawer";
import Login from "./Screens/Login";
import "@coreui/coreui/dist/css/coreui.min.css";

function App() {
  const Token = localStorage.getItem("NBAdminToken");

  const dispatch = useDispatch();
  useEffect(() => {
  }, [dispatch]);
  return (
    <>
      <Router>
        {Token ? (
          <MiniDrawer />
        ) : (
          <Routes>
            <Route path="*" element={<Login />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        )}
      </Router>
    </>
  );
}

export default App;
