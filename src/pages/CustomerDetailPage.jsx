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
        const url = `http://localhost:3000/api/lists/${customerId}`
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
                                <td>{customer.title}</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Body: </td>
                                <td>{customer.body}</td>
                            </tr>
                            <tr>
                                <td>createdAt: </td>
                                <td>{customer.createdAt}</td>
                            </tr>
                            <tr>
                                <td>lastModifiedAt: </td>
                                <td>{customer.lastModifiedAt}</td>
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
