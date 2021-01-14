import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import InputField from '../components/InputField'

export default function CustomerCreatePage(props) {
    const [customerData, setCustomerData] = useState({})
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
                            />
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
                    <button type="submit">Create Customer</button>
                    <Link to={"/home"}>Cancel</Link>
                </form>
            </div>
        </>
    )
}
