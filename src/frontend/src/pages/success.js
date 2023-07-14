import React from 'react'
import Navbar from '../elements/navbar';
import SVG1 from '../img/coffee.svg';
import SVG2 from '../img/burger.svg';
import SVG3 from '../img/bag.svg';
import "../App.css";
import { useSelector, useDispatch } from 'react-redux';
import List from '@mui/material/List/List';
import ListItem from '@mui/material/ListItem/ListItem';
import IconButton from '@mui/material/IconButton/IconButton';
import ListItemText from '@mui/material/ListItemText/ListItemText';

function Success() {
    const cart = useSelector((state) => state.cart.cart)

    function mapItems(items) {
        console.log(items)
        return (
            <List sx={{textAlign: "center"}}>
                {items.map((item, index) => (
                    <ListItem
                        key={index}
                        disableGutters
                    >
                        <ListItemText primary={`${item.item.menuname}`}>
                        </ListItemText>
                    </ListItem>
                ))}
            </List>
        )
    }

    return (
        <>
            <div>
                <Navbar />
                <div style={{ height: "40vh", display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: "10vh"}}>
                    <img src={SVG1} alt="SVG 1" className="coffee" style={{ position: 'relative', width: '15vw', right: '-5vw' }} />
                    <img src={SVG2} alt="SVG 2" className="burger" style={{ position: 'relative', width: '15vw'}} />
                    <img src={SVG3} alt="SVG 3" className="bag" style={{ position: 'relative', left: '0vw', top: '-2.5vw', width: '20vw' }} />
                </div>
                <div>
                    <h1>
                        Dein Essen kommt in 30-45 Minuten
                    </h1>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {mapItems(cart)}
                    </div>
                </div>
                </div>

        </>
    )
};

export default Success;