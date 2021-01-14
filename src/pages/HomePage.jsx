import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CustomerListContext } from '../contexts/CustomerListContext'
import { UserContext } from '../contexts/UserContext'
import CustomerListItem from '../components/CustomerListItem'

export default function HomePage() {
    const { customerList, setCustomerList } = useContext(CustomerListContext)
    const url = "https://frebi.willandskill.eu/api/v1/customers/"
    const token = localStorage.getItem("WEBB20")
    const { setUserData } = useContext(UserContext)

    useEffect(() => {
        fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => setCustomerList(data.results))
    }, [setCustomerList, token])

    useEffect( () => {
        if (localStorage.getItem("WEBB20") !== null) {
            const url = "https://frebi.willandskill.eu/api/v1/me/"
            const token = localStorage.getItem("WEBB20")
            fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setUserData(data)
            })
            .catch(err => console.error(err))
        }
    }, [setUserData])

    return (
        <div className="container text-center">
            <div className="row">
                <div className="col">
                    <h1>MIB Customer Data - Home</h1>
                    <h2>Customers:</h2>
                </div>
            </div>
            <div className="row">
                <div className="col">
                {customerList.map(item => {
                    return <CustomerListItem 
                        key={item.id} 
                        customerData={item} 
                    />
                })}
                </div>
            </div>
            <Link to="/customers/create" >Create New Customer</Link>
        </div>
    )
}
