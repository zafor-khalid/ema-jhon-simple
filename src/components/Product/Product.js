import React from 'react';

const Product = (props) => {
   console.log(props);
    return (
        <div>
            
            <h4>{props.product.name}</h4>
        </div>
    );
};

export default Product;