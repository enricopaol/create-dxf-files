import React from 'react';
import './InputBox.css';

const InputBox = (props) => {

    const handleChange = (e) => {
        props.callback(e);
    }

    const handleInputFocus = () => {
        if (props.callbackFocus) {
            props.callbackFocus()
        }
    }

    return (
        <input
            type={props.type}
            placeholder={props.placeholder}
            onChange={handleChange}
            onFocus={handleInputFocus}
            name={props.name}
            className={props.alert ? 'alert' : ''}
            value={props.value}
        />
    );
}

export default InputBox;