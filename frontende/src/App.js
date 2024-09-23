import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import FirstPage from "./pages/Home/FirstPage";
import NavBar from "./components/NavBar";
import './App.css';
import LoginAs from "./pages/form/LoginAs";
import Signup from "./pages/form/Signup";
import { useSelector } from "react-redux";
import DashBoard from "./components/Seller/DashBoard";

function App() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <Router>
       {/* for seller */}
       {/* {currentUser?.role === "Seller" && (
        <>
          <DashBoard/>
        </>
      )} */}
     {/* for customer  */}
     {/* {currentUser?.role === "Customer" && (  
      <>
    <NavBar/>
      <Routes>
      <Route path="/" element={<FirstPage/>}/>
      <Route path="/logincustomer" element={<LoginAs role={"Customer"}/>}/>
      <Route path="/loginseller" element={<LoginAs role={"Seller"}/>}/>
      <Route path="/registercustomer" element={<Signup role={"Customer"}/>}/>
      <Route path="/registerseller" element={<Signup role={"Seller"}/>}/>
      </Routes>
      </>
      )}   */}
      {/* {!currentUser?.email && (<> */}
        <NavBar/>
      <Routes>
      <Route path="/" element={<FirstPage/>}/>
      <Route path="/logincustomer" element={<LoginAs role={"Customer"}/>}/>
      <Route path="/loginseller" element={<LoginAs role={"Seller"}/>}/>
      <Route path="/registercustomer" element={<Signup role={"Customer"}/>}/>
      <Route path="/registerseller" element={<Signup role={"Seller"}/>}/>
      </Routes>
      {/* </>
        )} */}
    </Router>

  );
}

export default App;
