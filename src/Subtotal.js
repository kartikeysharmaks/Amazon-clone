import React from 'react';
import './Subtotal.css';
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from './reducer';
import {useNavigate} from 'react-router-dom';

const Subtotal = () => {
  const [{ basket }] = useStateValue();
  const Navigate = useNavigate();
  console.log(basket);
  return (
    <div className='sub-total'>
        <CurrencyFormat
        renderText={(value) => (
            <>
            <p className='sub-total-text'>
            Subtotal({basket.length} items) : <strong>{value}</strong>
            </p>
            <small className='subtotal-gift'>
                <input type="checkbox"/>
                <span>This order contains a gift</span>
            </small>
            </>
        )}
        decimalScale={2}
        value={getBasketTotal
        (basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₹"}
        />
        <button className='sub-total-button' onClick={e=> Navigate('/payment')}>Proceed to checkout</button>
    </div>
    
  );
};

export default Subtotal;