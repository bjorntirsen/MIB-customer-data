import React from 'react'

export default function InputField({name, label, setCustomer, customer, value, type}) {
    function handleOnChange(e) {
        const name = e.target.name
        const value = e.target.value
        const newObj = {...customer, [name]: value}
        setCustomer(newObj)
    }
    
    return (
        <tr>
            <td>{label}</td>
            <td>
                <input 
                    type={type || "text"} 
                    name={name}
                    value={value || ""}
                    onChange={handleOnChange}
                />
            </td>
        </tr>
    )
}
