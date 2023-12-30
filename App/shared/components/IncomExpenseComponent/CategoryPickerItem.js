/* import React from 'react';
import axios from 'axios';


const CatPicker = ({ label, value, setSelected, data, errorMessage }) => {
    const handleChange = (selectedOption) => {
        setSelected(selectedOption.value);
    };

    return (
        
        <div>
            <label>{label}</label>
            <select value={value} onChange={handleChange}>
                {data.map((item, index) => (
                    <option key={index} value={item.value}>
                        {item.label}
                    </option>
                ))}
            </select>
            {errorMessage && <div>{errorMessage}</div>}
        </div>
        
    );
};

export default CatPicker; */