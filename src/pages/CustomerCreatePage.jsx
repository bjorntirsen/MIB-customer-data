import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import InputField from '../components/InputField'
import InputFieldVat from '../components/InputFieldVat'
import { CustomerListContext } from '../contexts/CustomerListContext'
import { StyledButton } from '../components/StyledButton'
import { StyledLink } from '../components/StyledLink'
import InputFieldPayterm from '../components/InputFieldPayterm'

export default function CustomerCreatePage() {
    const { fetchCustomerList } = useContext(CustomerListContext)
    const [customerData, setCustomerData] = useState({})
    const [vatHints, setVatHints] = useState("")
    const [disabled, setDisabled] = useState(true)
    const history = useHistory()

    useEffect(() => {
        if (vatHints === "") setDisabled(false)
        else setDisabled(true)
    }, [vatHints])

    function createCustomer(e) {
        e.preventDefault()
        const url = "https://mib-api.herokuapp.com/api/v1/customers/"
        const token = localStorage.getItem("MIB")
        fetch(url, {
            method: "POST",
            body: JSON.stringify(customerData),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(() => fetchCustomerList())
        .then(() => history.push("/customers"))
        .catch(err => console.error(err))
    }

    return (
        <>
            <h1>Create Customer:</h1>
            <form onSubmit={createCustomer}>
                <table className="table table-dark table-max-width">
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
                        <InputFieldPayterm 
                            setCustomer={setCustomerData}
                            customer={customerData}
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
                        <InputFieldVat
                            setCustomer={setCustomerData}
                            customer={customerData}
                            value={customerData.vatNr}
                            vatHints={vatHints}
                            setVatHints={setVatHints}
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
                <StyledButton type="submit" primary="true" disabled={disabled} >Create Customer</StyledButton>
                <StyledLink to={"/customers"}>Cancel</StyledLink>
            </form>
        </>
    )
}
