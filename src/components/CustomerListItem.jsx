import React from 'react'
import { Link } from 'react-router-dom'

export default function CustomerListItem({customerData}) {
    return (
        <div>
            <h3>
                <Link to={`/customers/${customerData.id}`}>
                    {customerData.name}
                </Link>
            </h3>
        </div>
    )
}
