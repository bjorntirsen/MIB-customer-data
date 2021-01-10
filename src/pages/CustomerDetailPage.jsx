import React from 'react'

export default function CustomerDetailPage(props) {
    const customerId = props.match.params.id

    return (
        <div>
            <h1>Customer Details</h1>
            <p>{customerId}</p>
        </div>
    )
}
