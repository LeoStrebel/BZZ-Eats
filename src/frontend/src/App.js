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

const App = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/api/getRestaurants`, {
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
      <Router>
        <Routes>
          <Route key="main" path="/" element={<Home />} />
          <Route key="essen" path="/essen" element={<Essen />} />
          <Route key="support" path="/support" element={<Support />} />
          <Route key="warenkorb" path="/warenkorb" element={<Warenkorb />} />
          <Route key="abschluss" path="/abschluss" element={<Abschluss />} />
          <Route
            key="restaurants"
            path="/restaurants"
            element={<Restaurants />}
          />
          {setRoutes()}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
