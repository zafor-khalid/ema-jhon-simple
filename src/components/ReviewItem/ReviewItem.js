import React from 'react';

const ReviewItem = (props) => {
    
    const {name, quantity, key, price} = props.product;
    const reviewItemStyle = {
        borderBottom:'1px solid red',
        margin:'100px',
        paddingBottom:'15px'
    }
    return (
        <div style={reviewItemStyle} className="review-item">
            <h3>{name}</h3>
            <h4>quantity:{quantity}</h4>
            <p> <small> ${price}</small></p>
            <button className="main-button"
            onClick={()=>props.removeProduct(key)}
            >Remove</button>
        </div>
    );
};

export default ReviewItem;