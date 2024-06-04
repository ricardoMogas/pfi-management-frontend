import React, { useState } from 'react';
import Style from '../src/css/Switch.module.css';

const Switch = ({ isChecked, setIsChecked }) => {

    return (
        <label class={Style.switch}>
            <input type="checkbox" checked={isChecked} onClick={() => setIsChecked(!isChecked)} />
            <span class={Style.slider}></span>
        </label>
    );
};

export default Switch;