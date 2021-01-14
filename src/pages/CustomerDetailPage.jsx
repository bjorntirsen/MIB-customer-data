import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { CustomerListContext } from '../contexts/CustomerListContext'
import { StyledButton } from '../components/StyledButton'
import { StyledLink } from '../components/StyledLink'

export default function CustomerDetailPage(props) {
    const { customerList } = useContext(CustomerListContext)
    const customerId = props.match.params.id
    const customer = customerList.find(obj => {
        return obj.id == customerId
    })
    const history = useHistory()

    function deleteCustomer() {
        const url = `https://frebi.willandskill.eu/api/v1/customers/${customerId}/`
        const token = localStorage.getItem("WEBB20")
        fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(() => history.push("/home"))
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <h1 className="mx-auto">Customer Details:</h1>
                </div>
                <div className="row">
                    <div className="col">
                        {customer 
                        ? (
                            <div className="text-center">
                                <table className="table table-dark">
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
                                <StyledLink to={`/customers/${customerId}/edit/`} primary>Edit Customer</StyledLink>
                                <StyledButton onClick={deleteCustomer}>Delete Customer</StyledButton>
                                <StyledLink to={"/home"}>Back to List</StyledLink>
                            </div>
                        )
                        :
                        (
                            <p>Loading...</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
