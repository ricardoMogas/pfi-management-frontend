import React from 'react';
import Style from '../src/css/Switch.module.css';

const Switch = ({ isChecked, setIsChecked }) => {
    const handleChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <label className={Style.switch}>
            <input type="checkbox" checked={isChecked} onChange={handleChange} />
            <span className={Style.slider}></span>
        </label>
    );
};

export default Switch;
