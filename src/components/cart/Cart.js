import React from 'react';


const Cart = (props) => {
  const cart = props.cart;
  const total = cart.reduce((total, prd)=>total+prd.price * prd.quantity, 0)
  let shippingCost = 0;
  if(total > 35){
      shippingCost = 4.99;
  }
  else if(total > 0){
      shippingCost = 12.99;
  }
  const tax = (total + shippingCost)/10;
  const grandTotal = total + shippingCost + tax;
    return (
        <div>
            <h3>order summary</h3>
            <p>Item Orderd: {cart.length}</p>
            <p><small>Shipping Cost: {shippingCost}</small></p>
            <p><small>Tax: {tax}</small></p>
            <p>Total price: {grandTotal}</p>
            <br/>
            {
                props.children
            }
        </div>
    );
};

export default Cart;