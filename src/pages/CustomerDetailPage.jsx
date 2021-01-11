import React, { useContext, useEffect } from 'react'
import { CustomerListContext } from '../contexts/CustomerListContext'

export default function CustomerDetailPage(props) {
    const { customerList, setCustomerList } = useContext(CustomerListContext)
    const customerId = props.match.params.id
    const customer = customerList.find(obj => {
        return obj.id == customerId
    })

    useEffect(() => {
        console.log(customerList)
    }, [])

    return (
        <>
            <div>
                <h1>Customer Details</h1>
                <p>{customerId}</p>
            </div>
            {customer 
            ? (
                <div className="text-center">
                    <h1>{customer.name}</h1>
                    <table className="table table-dark">
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
                                <td>Website: {customer.website}</td>
                                <td>
                                    <a href={customer.website} target="_blank">{customer.website}</a>
                                </td>
                            </tr>
                        </tbody>
                        
                    </table>
                </div>
            )
            :
            (
                <p>Loading...</p>
            )}
        </>
    )
}
