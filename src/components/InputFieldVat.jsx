import React, { useEffect } from 'react'

export default function InputFieldVat({setCustomer, customer, value, vatHints, setVatHints, setDisabled}) {

    useEffect(() => {
        if (!value) {
            setVatHints("Please enter a valid VAT number above.")
        }
        else validateVat(value)
    }, [value, setVatHints])

    function handleOnChange(e) {
        const name = e.target.name
        const value = e.target.value
        const newObj = {...customer, [name]: value}
        setCustomer(newObj)
        validateVat(value)
    }

    function validateVat(fieldValue) {
        var hints = ""
        const hint1 = 'A vat number must start with the capital letters "SE". '
        const hint2 = 'It must be 12 digits long. '
        const hint3 = 'The last 10 digits must be numbers. '
        const firstTwo = fieldValue.substring(0, 2)
        const correctFirstTwo = "SE"
        if (firstTwo !== correctFirstTwo) hints = hints.concat(hint1)
        if (fieldValue.length !== 12) hints = hints.concat(hint2)
        if (/^\d+$/.test(fieldValue.substring(2)) === false) hints = hints.concat(hint3)
        setVatHints(hints)
        if (hints === "") setDisabled(false)
        if (hints !== "") setDisabled(true)
    }
    
    return (
        <>
            <tr>
                <td>Vat Number</td>
                <td>
                    <input 
                        type={"text"} 
                        name="vatNr" 
                        value={value || ""}
                        onChange={handleOnChange}
                    />
                </td>
            </tr>
            {(vatHints !== "") &&
                <tr className="bg-warning"><td colSpan="2">{vatHints}</td></tr>
            }
        </>
    )
}
