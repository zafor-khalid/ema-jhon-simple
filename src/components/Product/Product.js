import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const Product = (props) => {
    console.log(props);
    const { img, name, seller, price, stock } = props.product;
    
    return (
        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>
            <div className="product-name">
                <h4>{name}</h4>
                <br />
                <p><small>by:{seller}</small></p>
                <p>${price}</p>
                <p><small>only {stock} left in stock. Order soon</small></p>
                <button className="main-button"
                onClick={()=>props.handelAddProduct(props.product)}
                ><FontAwesomeIcon icon={faShoppingCart}/> Add to cart</button>
            </div>

        </div>
    );
};

export default Product;