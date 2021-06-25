import React from 'react'
import { StyledLink } from './StyledLink'

export default function CustomerListItem({customerData}) {
    return (
        <div>
            <h3>
                <StyledLink to={`/customers/${customerData._id}`}>
                    {customerData.name}
                </StyledLink>
            </h3>
        </div>
    )
}
