import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { CustomerListContext } from '../contexts/CustomerListContext'
import { StyledButton } from '../components/StyledButton'
import { StyledLink } from '../components/StyledLink'

export default function CustomerDetailPage(props) {
    const { customerList, fetchCustomerList } = useContext(CustomerListContext)
    const token = localStorage.getItem("MIB")
    const customerId = props.match.params.id
    const [customer, setCustomer] = useState(null)
    const history = useHistory()

    useEffect(() => {
        if (!customerList && token) {
            fetchCustomerList()
        }
    }, [customerList, fetchCustomerList, token])

    useEffect(() => {
        if (customerList) {
            const customerData = customerList.find(obj => {
                return obj._id === customerId
            })
            setCustomer(customerData)
        }
    }, [customerList, customerId, customer])

    function deleteCustomer() {
        const url = `https://mib-api.herokuapp.com/api/v1/customers/${customerId}/`
        fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(() => fetchCustomerList())
        .then(() => history.push("/customers"))
        .catch(err => console.error(err))
    }

    return (
        <>
        
            <h1>Customer Details:</h1>
            {customer ? (
                <>
                    <table className="table table-dark table-max-width">
                        <thead>
                            <tr>
                                <td>Name: </td>
                                <td>{customer.name}</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Org. nr: </td>
                                <td>{customer.organisationNr}</td>
                            </tr>
                            <tr>
                                <td>Payterm: </td>
                                <td>{customer.paymentTerm}</td>
                            </tr>
                            <tr>
                                <td>Phone: </td>
                                <td>{customer.phoneNumber}</td>
                            </tr>
                            <tr>
                                <td>Ref: </td>
                                <td>{customer.reference}</td>
                            </tr>
                            <tr>
                                <td>VAT: </td>
                                <td>{customer.vatNr}</td>
                            </tr>
                            <tr>
                                <td>Email: </td>
                                <td><a href={`mailto:${customer.email}`}>{customer.email}</a></td>
                            </tr>
                            <tr>
                                <td>Website: </td>
                                <td>
                                    <a href={customer.website} target="_blank" rel="noreferrer">{customer.website}</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <StyledLink to={`/customers/${customerId}/edit/`} primary="true">Edit Customer</StyledLink>
                    <StyledButton onClick={deleteCustomer}>Delete Customer</StyledButton>
                    <StyledLink to={"/customers"}>Back to List</StyledLink>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </>
    )
}
