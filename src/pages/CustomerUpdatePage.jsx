import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import InputField from '../components/InputField'
import InputFieldVat from '../components/InputFieldVat'
import { CustomerListContext } from '../contexts/CustomerListContext'
import { StyledButton } from '../components/StyledButton'
import { StyledLink } from '../components/StyledLink'
import InputFieldPayterm from '../components/InputFieldPayterm'

export default function CustomerUpdatePage(props) {
    const { customerList, fetchCustomerList } = useContext(CustomerListContext)
    const token = localStorage.getItem("MIB")
    const customerId = props.match.params.id
    const [customer, setCustomer] = useState(null)
    const [vatHints, setVatHints] = useState("")
    const [disabled, setDisabled] = useState(true)
    const history = useHistory()

    useEffect(() => {
        if (!customerList && token) {
            fetchCustomerList()
        }
    }, [customerList, fetchCustomerList, token])

    useEffect(() => {
        if (vatHints === "") setDisabled(false)
        else setDisabled(true)
    }, [vatHints])

    useEffect(() => {
        if (customerList) {
            const customerData = customerList.find(obj => {
                return obj._id === customerId
            })
            setCustomer(customerData)
        }
    }, [customerList, customerId])

    function updateCustomer(e) {
        e.preventDefault()
        const url = `https://mib-api.herokuapp.com/api/v1/customers/${customerId}/`
        const token = localStorage.getItem("MIB")
        fetch(url, {
            method: "PATCH",
            body: JSON.stringify(customer),
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
            <h1>Update Customer:</h1>
            {customer 
            ? (
                <form onSubmit={updateCustomer}>
                    <table className="table table-dark table-max-width">
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
                            <InputFieldPayterm 
                                setCustomer={setCustomer}
                                customer={customer}
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
