import React, { useContext, useEffect } from 'react'
import { CustomerListContext } from '../contexts/CustomerListContext'
import CustomerListItem from '../components/CustomerListItem'

export default function HomePage() {
    const { customerList, setCustomerList } = useContext(CustomerListContext)

    useEffect(() => {
        getCustomerList()
    }, [])

    function getCustomerList() {
        const url = "https://frebi.willandskill.eu/api/v1/customers/"
        const token = localStorage.getItem("WEBB20")
        fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => setCustomerList(data.results))
    }

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
            
        </div>
    )
}
