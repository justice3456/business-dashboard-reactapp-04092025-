//imports
// import Chart from "./dashboard.components/Chart";
// import LeftMenu from "./dashboard.components/LeftMenu";
// import MediumCard from "./dashboard.components/MediumCard";
// import ProgressCircle from "./dashboard.components/ProgressCircle";
// import LoginForm from "./login.component/LoginForm";
// import RegisterForm from "./register.component/RegisterForm";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NoPage from "./pages/NoPage";

import { BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Customers from "./pages/Customers";
import Sales from "./pages/Sales";
import Inventory from "./pages/Inventory";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element = {<Login/>} />
          <Route path="/Home" element={<Home/>} />
          <Route path="/Register" element={<Register/>} />
          <Route path="/Login" element={<Login/>} />
          <Route path="/Customers" element={<Customers/>}/>
          <Route path="/Sales" element={<Sales/>}/>
          <Route path="/Inventory" element={<Inventory/>}/>
          <Route path="*" element={<NoPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
