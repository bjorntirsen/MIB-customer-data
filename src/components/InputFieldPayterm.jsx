import React, { useEffect } from 'react'

export default function InputFieldPayterm({setCustomer, customer}) {
    useEffect(() => {
        if (!customer.paymentTerm || customer.paymentTerm === 0) {
            const newObj = {...customer, paymentTerm: 1}
            setCustomer(newObj)
        }
    }, [customer.paymentTerm, customer, setCustomer])

    function handleOnChange(e) {
        const name = e.target.name
        const value = e.target.value
        const newObj = {...customer, [name]: value}
        setCustomer(newObj)
    }
    
    return (
        <tr>
            <td>Payment Term</td>
            <td>
                <input 
                    type="number"
                    min="1"
                    step="1"
                    name="paymentTerm" 
                    value={customer.paymentTerm}
                    onChange={handleOnChange}
                />
            </td>
        </tr>
    )
}
