import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../elements/navbar';
import List from '@mui/material/List/List';
import ListItem from '@mui/material/ListItem/ListItem';
import IconButton from '@mui/material/IconButton/IconButton';
import ListItemText from '@mui/material/ListItemText/ListItemText';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Card } from '@mui/material';
import { removeItemById, decrementItem,incrementItem  } from '../store/cartSlice';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Shop2Icon from '@mui/icons-material/Shop2';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51NObT1AVbesgGByCLurlCoUpCjuj1vN4EtTiyYmAx6GEY0Jj3mKN7IHWi940h4qu9y6GMVtIie0NjDZtBe8TBszW00iOgJbwWU');  // Replace 'pk_test_...' with your actual publishable key
const backendUrl = process.env.NODE_ENV === 'development' ? process.env.DEV_REACT_APP_BACKEND_URL : process.env.REACT_APP_BACKEND_URL

const Warenkorb = () => {
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

    return (
        <>
            <div>
                <Navbar />
                <div>
                    {mapItems(cart)}
                </div>
                <IconButton aria-label="Bezahlen" onClick={() => checkOutCall()}>
                                <Shop2Icon ></Shop2Icon>
                </IconButton>
            </div>

        </>
    )
};

export default Warenkorb;