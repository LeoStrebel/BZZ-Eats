import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Essen from "./pages/essen";
import Support from "./pages/support";
import Warenkorb from "./pages/warenkorb";
import Abschluss from "./pages/abschluss";
import {Restaurants} from "./pages/restaurants";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/essen" element={<Essen />} />
          <Route path="/support" element={<Support />} />
          <Route path="/warenkorb" element={<Warenkorb />} />
          <Route path="/abschluss" element={<Abschluss />} />
            <Route path="/restaurants" element={<Restaurants />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
