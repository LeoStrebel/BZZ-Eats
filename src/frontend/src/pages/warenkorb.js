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
            </div>

        </>
    )
};

export default Warenkorb;