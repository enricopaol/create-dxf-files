import React from "react";
import './Button.css';

const Button = (props) => {

    const handleCallback = (e) => {
        props.callback(e)
    }

    return(        
       <button onClick={handleCallback} style={props.style}>
           {props.text}
       </button>
    );
}

export default Button;