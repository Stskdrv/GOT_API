import React from 'react';
import img from './error.jpg';

const ErrorMessage = () => {
    return (
        <>
            <img style={{ width: "500px"}} src={img} ></img>
            <span>Something goes wrong :(</span>
        </>
    )
    
}
export default ErrorMessage;