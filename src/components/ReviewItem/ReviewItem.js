import React from 'react';

const ReviewItem = (props) => {
    
    const {name, quantity} = props.product;
    const reviewItemStyle = {
        borderBottom:'1px solid red',
        margin:'100px',
        paddingBottom:'15px'
    }
    return (
        <div style={reviewItemStyle} className="review-item">
            <h3>{name}</h3>
            <h4>quantity:{quantity}</h4>
            <button className="main-button">Remove</button>
        </div>
    );
};

export default ReviewItem;