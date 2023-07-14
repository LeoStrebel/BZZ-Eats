import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../elements/navbar';
import List from '@mui/material/List/List';
import ListItem from '@mui/material/ListItem/ListItem';
import IconButton from '@mui/material/IconButton/IconButton';
import ListItemText from '@mui/material/ListItemText/ListItemText';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Box, Card } from '@mui/material';
import { removeItemById, decrementItem, incrementItem } from '../store/cartSlice';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Shop2Icon from '@mui/icons-material/Shop2';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from 'bootstrap';
import "../App.css";
import Loader from '../elements/loader';

const stripePromise = loadStripe('pk_test_51NObT1AVbesgGByCLurlCoUpCjuj1vN4EtTiyYmAx6GEY0Jj3mKN7IHWi940h4qu9y6GMVtIie0NjDZtBe8TBszW00iOgJbwWU');  // Replace 'pk_test_...' with your actual publishable key
const backendUrl = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_BACKEND_URL : process.env.REACT_APP_BACKEND_URL

const Warenkorb = () => {
    const [loading, setLoading] = React.useState(false);
    const cart = useSelector((state) => state.cart.cart)
    const dispatch = useDispatch()

    function deleteItem(index) {
        dispatch(removeItemById(index))
    }

    function decrementItemCall(index) {
        dispatch(decrementItem(index))
    }

    function incrementItemCall(index) {
        dispatch(incrementItem(index))
    }

    async function checkOutCall() {
        setLoading(true)
        let checkoutItems = [];

        console.log(cart)
        cart.forEach(item => {
            checkoutItems.push({
                name: item.item.menuname,
                price: item.item.price,
                quantity: item.amount
            });
        });

        console.log(JSON.stringify(checkoutItems))


        const response = await fetch(`${backendUrl}/api/create-checkout-session`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(checkoutItems)
        });
        const session = await response.json();

        // When the customer clicks on the button, redirect them to Checkout.
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({
            sessionId: session.id,
        });

        if (error) {
            console.warn('Error:', error);
        }
    }


    function mapItems(items) {
        console.log(items)
        return (
            <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
                {items.map((item, index) => (
                    <ListItem
                        key={index}
                        disableGutters
                        secondaryAction={
                            <IconButton aria-label="comment" onClick={() => deleteItem(item)}>
                                <DeleteOutlineOutlinedIcon color='error' ></DeleteOutlineOutlinedIcon>
                            </IconButton>
                        }
                    >
                        <ListItemText primary={`${item.item.menuname}`}>
                        </ListItemText>
                        <div>
                            <IconButton aria-label="comment" onClick={() => incrementItemCall(item)}>
                                <AddIcon ></AddIcon>
                            </IconButton>
                            {item.amount}
                            <IconButton aria-label="comment" onClick={() => decrementItemCall(item)}>
                                <RemoveIcon ></RemoveIcon>
                            </IconButton>
                        </div>
                    </ListItem>
                ))}
            </List>
        )
    }

    function renderButton(cart) {
        console.log(cart <= 0)
        if (cart.length >= 1    ) {
            return (
                <IconButton aria-label="Bezahlen" onClick={() => checkOutCall()}
                className='warenkorb-button'>
                Checkout
                <Shop2Icon sx={{ marginLeft: "7.5px" }}></Shop2Icon>
            </IconButton>
            )
        } else {
            return (
                <h3>
                Kein Essen im Warenkorb
                </h3>
            )
        }
    }

    return (
        <>
            <div>
                <Navbar />
                <Loader loading={loading}></Loader>
                <div style={{width: '100vw', justifyContent: 'center', alignItems: 'center'}}>
                    <div style={{width: '100vw', justifyContent: 'center', alignItems: 'center'}}>
                        {mapItems(cart)}
                    </div>
                    <Box
                        display="flex"
                        width={500} height={80}
                        alignItems="center"
                        justifyContent="center"
                    >
                        {renderButton(cart)}
                    </Box>
                </div>
            </div >

        </>
    )
};

export default Warenkorb;