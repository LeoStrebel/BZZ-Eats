import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/home";
import Essen from "./pages/essen";
import Support from "./pages/support";
import Warenkorb from "./pages/warenkorb";
import Abschluss from "./pages/abschluss";
import { Restaurants } from "./pages/restaurants";
import Success from "./pages/success";
import Cancel from "./pages/cancel";

const App = () => {
  const [restaurants, setRestaurants] = useState([]);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    fetch(`${backendUrl}/api/getRestaurants`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setRestaurants(data);
      })
      .catch((error) => {
        console.error("Error fetching category:", error);
      });
  }, []);

  const setRoutes = () =>
    restaurants.map((category, index) => {
      return (
        <Route
          key={category.id}
          path={`/restaurants/${category.id}`}
          element={<Essen />}
        />
      );
    });

  return (
    <div className="App">
      {backendUrl}
      <Router>
        <Routes>
          <Route key="main" path="/" element={<Home />} />
          <Route key="essen" path="/essen" element={<Essen />} />
          <Route key="support" path="/support" element={<Support />} />
          <Route key="success" path="/success" element={<Success />} />
          <Route key="cancel" path="/cancel" element={<Cancel />} />
          <Route key="warenkorb" path="/warenkorb" element={<Warenkorb />} />
          <Route key="abschluss" path="/abschluss" element={<Abschluss />} />
          <Route key="restaurants" path="/restaurants" element={<Restaurants />}/>
          <Route key="warenkorb" path="/warenkorb" element={<Warenkorb />} />
          {setRoutes()}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
