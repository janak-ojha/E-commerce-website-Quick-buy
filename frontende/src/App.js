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

function App() {
  return (
    <Router>
    <NavBar/>
      <Routes>
      <Route path="/" element={<FirstPage/>}/>
      <Route path="/loginCustomer" element={<LoginAs role={"Customer"}/>}/>
      <Route path="/loginSeller" element={<LoginAs role={"Seller"}/>}/>
      <Route path="/registerCustomer" element={<Signup role={"Customer"}/>}/>
      <Route path="/registerSeller" element={<Signup role={"Seller"}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
