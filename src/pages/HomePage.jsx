import React, { useContext, useEffect } from 'react'
import { CustomerListContext } from '../contexts/CustomerListContext'
import { UserContext } from '../contexts/UserContext'
import CustomerListItem from '../components/CustomerListItem'
import { StyledLink } from '../components/StyledLink'

export default function HomePage() {
    const { customerList, fetchCustomerList } = useContext(CustomerListContext)
    const { setUserData } = useContext(UserContext)

    useEffect(() => {
        if (!customerList) {
            fetchCustomerList()
        }
    }, [customerList, fetchCustomerList])

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
            {customerList &&
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
            }
            <StyledLink to="/customers/create" primary="true">Create New Customer</StyledLink>
        </div>
    )
}
