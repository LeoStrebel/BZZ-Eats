import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "react-router-dom";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import "../css/restaurant.css";

export function Restaurants() {
  const [category, setCategory] = useState([]);

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
        setCategory(data);
      })
      .catch((error) => {
        console.error("Error fetching category:", error);
        // Hier könnte eine Benachrichtigung oder ein erneuter Versuch erfolgen
      });
  }, []);

  function ImgMediaCard() {
    return category.map((item, index) => {
      return (
        <div className="col-sm-6 col-md-4 col-xl-3 mt-5" key={item.id}>
          <Link to={`/restaurants/${item.id}`} key={index}>
            <Card sx={{ maxWidth: 345 }} className="card">
              <CardMedia
                component="img"
                alt="No Image"
                height="140"
                image={`../img/${item.id}.png`}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Link>
        </div>
      );
    });
  }

  return (
    <>
      <div className="container">
        <div className="row">{ImgMediaCard()}</div>
      </div>
    </>
  );
}
