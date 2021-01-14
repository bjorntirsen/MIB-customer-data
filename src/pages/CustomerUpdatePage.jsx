import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import InputField from '../components/InputField'
import { CustomerListContext } from '../contexts/CustomerListContext'
import { StyledButton } from '../components/StyledButton'
import { StyledLink } from '../components/StyledLink'

export default function CustomerUpdatePage(props) {
    const { customerList } = useContext(CustomerListContext)
    const customerId = props.match.params.id
    const [customer, setCustomer] = useState(
        customerList.find(obj => {
            return obj.id == customerId
    }))
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
        .then(() => history.push("/home"))
    }

    return (
        <>
            <div className="text-center">
                <h1>Update Customer:</h1>
            </div>
            {customer 
            ? (
                <div className="text-center">
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
                                <InputField 
                                    name="vatNr" 
                                    label="Vat Number"
                                    setCustomer={setCustomer}
                                    customer={customer}
                                    value={customer.vatNr}
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
                        <StyledButton type="submit" primary>Update Customer</StyledButton>
                        <StyledLink to={`/customers/${customerId}/`}>Cancel</StyledLink>
                    </form>
                </div>
            )
            :
            (
                <p>Loading...</p>
            )}
        </>
    )
}
