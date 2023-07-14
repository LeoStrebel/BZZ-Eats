import React, { useEffect, useRef, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Navbar from "../elements/navbar";
import "../css/essen.css";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from 'react-redux'
import { addItem } from '../store/cartSlice'
import Loader from "../elements/loader";
import { useSnackbar } from 'notistack';
import { useCallback, Fragment } from 'react';

const Essen = () => {
  
  let currentURL = useRef("");
  const [menus, setMenus] = useState([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const cart = useSelector((state) => state.cart.cart)
  const dispatch = useDispatch()
  const backendUrl = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_BACKEND_URL : process.env.REACT_APP_BACKEND_URL
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  useEffect(() => {
    currentURL.current = window.location.pathname.split("/").pop();
  }, []);

  useEffect(() => {
    setLoading(true)
    fetch(`${backendUrl}/api/getMenus`, {
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
        setMenus(data);
      })
      .catch((error) => {
        console.error("Error fetching category:", error);
      });
  }, []);

  function addToCart(index) {
    enqueueSnackbar("Essen wurde dem Warenkorb hinzugefügt", { autoHideDuration: 2500, variant: "success"});
    dispatch(addItem(menus.find(item => item.id == index)))
  }

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
                <Button variant="outlined" onClick={() => addToCart(Number(item.id))}>Zum Warenkorb hinzufügen</Button>
              </div>
            </CardContent>
          </Card>
        );
      }
    });
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSuccess(false);
  };

  return (
    <>
      <Navbar />
      <Loader loading={loading}></Loader>
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
