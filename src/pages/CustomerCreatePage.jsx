import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import InputField from '../components/InputField'
import { StyledButton } from '../components/StyledButton'
import { StyledLink } from '../components/StyledLink'

export default function CustomerCreatePage(props) {
    const [customerData, setCustomerData] = useState({})
    const [vatHints, setVatHints] = useState("")
    const history = useHistory()

    function createCustomer(e) {
        e.preventDefault()
        const url = "https://frebi.willandskill.eu/api/v1/customers/"
        const token = localStorage.getItem("WEBB20")
        fetch(url, {
            method: "POST",
            body: JSON.stringify(customerData),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(() => history.push("/home"))
    }

    function validateVatNr(e) {
        const name = e.target.name
        const value = e.target.value
        const hints = ""
        const hint1 = 'A vat number must start with the letters "SE". '
        const hint2 = 'A vat number must be 12 digits long. '
        const hint3 = 'The last 10 digits must be numbers. '
        const firstTwo = value.substring(0, 2)
        const correctFirstTwo = "se"
        const newObj = {...customerData, [name]: value}
        setCustomerData(newObj)
        if (firstTwo.toLowerCase() !== correctFirstTwo.toLowerCase()) hints.concat(hint1)
        else if (value.length !== 12) hints.concat(hint2)
        else if (/^\d+$/.test(value.substring(2)) === false) hints.concat(hint3)
        setVatHints(hints)
    }

    return (
        <>
            <div className="text-center">
                <h1>Create Customer:</h1>
            </div>
            <div className="text-center">
                <form onSubmit={createCustomer}>
                    <table className="table table-dark">
                        <tbody>
                            <InputField 
                                name="name" 
                                label="Customer Name"
                                setCustomer={setCustomerData}
                                customer={customerData}
                                value={customerData.name}
                            />
                            <InputField 
                                name="email" 
                                label="Customer Email"
                                setCustomer={setCustomerData}
                                customer={customerData}
                                value={customerData.email}
                                type="email"
                            />
                            <InputField 
                                name="organisationNr" 
                                label="Organisation Number"
                                setCustomer={setCustomerData}
                                customer={customerData}
                                value={customerData.organisationNr}
                            />
                            <InputField 
                                name="paymentTerm" 
                                label="Payment Term"
                                setCustomer={setCustomerData}
                                customer={customerData}
                                value={customerData.paymentTerm}
                                type="number"
                            />
                            <InputField 
                                name="phoneNumber" 
                                label="Phone Number"
                                setCustomer={setCustomerData}
                                customer={customerData}
                                value={customerData.phoneNumber}
                                type="tel"
                            />
                            <InputField 
                                name="reference" 
                                label="Reference"
                                setCustomer={setCustomerData}
                                customer={customerData}
                                value={customerData.reference}
                            />
                            <InputField 
                                name="vatNr" 
                                label="Vat Number"
                                setCustomer={setCustomerData}
                                customer={customerData}
                                value={customerData.vatNr}
                                onChange={validateVatNr}
                            />
                            {(vatHints !== "") &&
                                <tr>{vatHints}</tr>
                            }
                            <InputField 
                                name="website" 
                                label="Website"
                                setCustomer={setCustomerData}
                                customer={customerData}
                                value={customerData.website}
                                type="url"
                            />
                        </tbody>
                    </table>
                    <StyledButton type="submit" primary>Create Customer</StyledButton>
                    <StyledLink to={"/home"}>Cancel</StyledLink>
                </form>
            </div>
        </>
    )
}
