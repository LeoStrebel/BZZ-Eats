import React, { useEffect, useRef, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Navbar from "../elements/navbar";
import "../css/essen.css";
import Button from "@mui/material/Button";

const Essen = () => {
  let currentURL = useRef("");
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    currentURL.current = window.location.pathname.split("/").pop();
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8080/api/getMenus`, {
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
        setMenus(data);
      })
      .catch((error) => {
        console.error("Error fetching category:", error);
      });
  }, []);

  function CreateMenus() {
    return menus.map((item, index) => {
      if (item.restaurantid === Number(currentURL.current)) {
        return (
          <Card sx={{ maxWidth: 345 }} key={index} className="card">
            <CardContent className="card-content">
              <Typography gutterBottom variant="h5" component="div">
                {item.menuname}
              </Typography>
              <Typography gutterBottom component="div">
                {item.menudescription}
              </Typography>
              <Typography gutterBottom component="div">
                {item.price} CHF
              </Typography>
              <div className="button-container">
                <Button variant="outlined">Zum Warenkorb hinzufügen</Button>
              </div>
            </CardContent>
          </Card>
        );
      }
    });
  }

  return (
    <>
      <Navbar />
      <div className="container" style={{ display: "flex", flexWrap: "wrap" }}>
        <div
          className="row"
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          {CreateMenus()}
        </div>
      </div>
    </>
  );
};

export default Essen;
