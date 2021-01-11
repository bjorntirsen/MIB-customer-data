import React, { useContext, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { CustomerListContext } from '../contexts/CustomerListContext'

export default function CustomerCreatePage(props) {
    const { customerList } = useContext(CustomerListContext)
    const customerId = props.match.params.id
    const [customer, setCustomer] = useState(
        customerList.find(obj => {
            return obj.id == customerId
    }))
    const history = useHistory()

    function renderField(name, label, type) {
        return (
            <tr>
                <td>{label}</td>
                <td>
                    <input 
                        type={type || "text"} 
                        name={name}
                        value={customer[name]}
                        onChange={handleOnChange}
                    />
                </td>
            </tr>
        )
    }

    function handleOnChange(e) {
        const name = e.target.name
        const value = e.target.value
        const newObj = {...customer, [name]: value}
        setCustomer(newObj)
    }

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
                                {renderField("name", "Customer Name")}
                                {renderField("email", "Customer Email", "email")}
                                {renderField("organisationNr", "Organisation Number")}
                                {renderField("paymentTerm", "Payment Term", "number")}
                                {renderField("phoneNumber", "Phone Number", "tel")}
                                {renderField("reference", "Reference")}
                                {renderField("vatNr", "Vat Number")}
                                {renderField("website", "Website", "url")}
                            </tbody>
                        </table>
                        <button type="submit">Update Customer</button>
                        <Link to={`/customers/${customerId}/`}>Cancel</Link>
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
