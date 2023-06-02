import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useState, useEffect } from "react";
import Navbar from "../elements/navbar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "react-router-dom";
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

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
        const clothesList = category.map((item, index) => {
            return (
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        height="140"
                        image="/static/images/cards/contemplative-reptile.jpg"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles, with over 6,000
                            species, ranging across all continents except Antarctica
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Share</Button>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            );
            return <div className="card-container">{clothesList}</div>;
        });

    };

  return (
    <>
      <div>
        <Navbar />
        <ImgMediaCard />
      </div>
    </>
  );
}