import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import FirstPage from "./pages/Home/FirstPage";
import NavBar from "./components/NavBar";
import './App.css';

function App() {
  return (
    <Router>
    <NavBar/>
      <Routes>
      <Route path="/" element={<FirstPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
