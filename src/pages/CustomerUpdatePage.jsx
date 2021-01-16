import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import InputField from '../components/InputField'
import InputFieldVat from '../components/InputFieldVat'
import { CustomerListContext } from '../contexts/CustomerListContext'
import { StyledButton } from '../components/StyledButton'
import { StyledLink } from '../components/StyledLink'

export default function CustomerUpdatePage(props) {
    const { customerList, fetchCustomerList } = useContext(CustomerListContext)
    const customerId = props.match.params.id
    const [customer, setCustomer] = useState(
        customerList.find(obj => {
            return obj.id === Number(customerId)
    }))
    const [vatHints, setVatHints] = useState("Please enter a valid VAT number above.")
    const [disabled, setDisabled] = useState(true)
    const history = useHistory()

    function updateCustomer(e) {
        e.preventDefault()
        const url = `https://frebi.willandskill.eu/api/v1/customers/${customerId}/`
        const token = localStorage.getItem("WEBB20")
        fetch(url, {
            method: "PUT",
            body: JSON.stringify(customer),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(() => fetchCustomerList())
        .then(() => history.push("/home"))
        .catch(err => console.error(err))
    }

    return (
        <>
            <h1>Update Customer:</h1>
            {customer 
            ? (
                <form onSubmit={updateCustomer}>
                    <table className="table table-dark">
                        <tbody>
                            <InputField 
                                name="name" 
                                label="Customer Name"
                                setCustomer={setCustomer}
                                customer={customer}
                                value={customer.name} 
                            />
                            <InputField 
                                name="email" 
                                label="Customer Email"
                                setCustomer={setCustomer}
                                customer={customer}
                                value={customer.email}
                                type="email"
                            />
                            <InputField 
                                name="organisationNr" 
                                label="Organisation Number"
                                setCustomer={setCustomer}
                                customer={customer}
                                value={customer.organisationNr} 
                            />
                            <InputField 
                                name="paymentTerm" 
                                label="Payment Term"
                                setCustomer={setCustomer}
                                customer={customer}
                                value={customer.paymentTerm}
                                type="number"
                            />
                            <InputField 
                                name="phoneNumber" 
                                label="Phone Number"
                                setCustomer={setCustomer}
                                customer={customer}
                                value={customer.phoneNumber}
                                type="tel"
                            />
                            <InputField 
                                name="reference" 
                                label="Reference"
                                setCustomer={setCustomer}
                                customer={customer}
                                value={customer.reference}
                            />
                            <InputFieldVat
                                setCustomer={setCustomer}
                                customer={customer}
                                value={customer.vatNr}
                                vatHints={vatHints}
                                setVatHints={setVatHints}
                                setDisabled={setDisabled}
                            />
                            <InputField 
                                name="website" 
                                label="Website"
                                setCustomer={setCustomer}
                                customer={customer}
                                value={customer.website}
                                type="url"
                            />
                        </tbody>
                    </table>
                    <StyledButton type="submit" primary="true" disabled={disabled} >Update Customer</StyledButton>
                    <StyledLink to={`/customers/${customerId}/`}>Cancel</StyledLink>
                </form>
            )
            :
            (
                <p>Loading...</p>
            )}
        </>
    )
}
