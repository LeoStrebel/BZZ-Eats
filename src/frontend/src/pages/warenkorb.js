import React from 'react'
import Navbar from '../elements/navbar';
import { useSelector } from 'react-redux'

function Warenkorb() {
    const cart = useSelector((state) => state.cart.cart)

    return (
        <>
            <div>
                <Navbar />
                {cart}
            </div>

        </>
    )
};

export default Warenkorb;