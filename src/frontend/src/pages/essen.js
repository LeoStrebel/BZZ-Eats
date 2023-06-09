import React, { useEffect, useRef, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";

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
          <div className="col-sm-6 col-md-4 col-xl-3">
            <Card sx={{ maxWidth: 345 }} key={index}>
              <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image="/static/images/cards/contemplative-reptile.jpg"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.menuname}
                </Typography>
              </CardContent>
            </Card>
          </div>
        );
      }
    });
  }

  return (
    <>
      <div className="container">
        <div className="row">{CreateMenus()}</div>
      </div>
    </>
  );
};

export default Essen;
