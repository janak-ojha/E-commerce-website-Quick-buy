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
import Profile from "./utils/navbar/profile";
import MyOrders from "./utils/navbar/MrOrders";
import Logout from "./utils/navbar/Logout";
import MiniDrawer from "./components/Seller/DashBoard";
import CartHome from "./utils/Cart/CartHome";
import PerticularProduct from "./pages/Products/PerticularProduct";


function App() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <Router>
        {/* for seller */}
      {currentUser?.role === "Seller" && (
        <>
          <MiniDrawer />
        </>
      )}
     {/* for customer  */}
     {!currentUser?.email && (
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
      )}  

      {currentUser?.role === "Customer" && ( 
        <>
        <NavBar/>
      <Routes>
      <Route path="/" element={<FirstPage/>}/>
      <Route path="/logincustomer" element={<LoginAs role={"Customer"}/>}/>
      <Route path="/loginseller" element={<LoginAs role={"Seller"}/>}/>
      <Route path="/registercustomer" element={<Signup role={"Customer"}/>}/>
      <Route path="/registerseller" element={<Signup role={"Seller"}/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/Myorders" element={<MyOrders/>}/>
      <Route path="/logout" element={<Logout/>}/>
      <Route path="/opencart" element={<CartHome/>}/>
      <Route
            path="/particularproduct/:encodedImage/:productId"
            element={<PerticularProduct/>}
          />
      <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      </>
       )} 
      


    
    </Router>

  );
}

export default App;
