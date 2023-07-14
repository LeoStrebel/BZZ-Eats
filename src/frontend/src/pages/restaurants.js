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
import Navbar from "../elements/navbar";
import Rating from "@mui/material/Rating";
import "../css/restaurant.css";
import image from "../img/1.png";
import Loader from "../elements/loader";

export function Restaurants() {
  const [loading, setLoading] = React.useState(false);
  const [category, setCategory] = useState([]);
  const backendUrl = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_BACKEND_URL : process.env.REACT_APP_BACKEND_URL

  useEffect(() => {
    setLoading(true);
    fetch(`${backendUrl}/api/getRestaurants`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setLoading(false)
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
                image={image}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  id="restaurantName"
                >
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <Rating name="read-only" value={item.score} readOnly />
                </Typography>
              </CardContent>
              <CardActions className="cardActions">
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
      <Navbar />
      <Loader loading={loading}></Loader>
      <div className="container">
        <div className="row">
          {ImgMediaCard()}
        </div>
      </div>
    </>
  );
}
