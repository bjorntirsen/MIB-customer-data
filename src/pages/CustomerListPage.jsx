import React, { useContext, useEffect } from 'react';
import { CustomerListContext } from '../contexts/CustomerListContext';
import CustomerListItem from '../components/CustomerListItem';
import { StyledLink } from '../components/StyledLink';

export default function CustomerListPage() {
  const { customerList, fetchCustomerList } = useContext(CustomerListContext);

  useEffect(() => {
    fetchCustomerList();
  }, []);

  return (
    <>
      <h1>List of Customers:</h1>
      {customerList !== null ? (
        <div>
          {customerList.map((item) => {
            return <CustomerListItem key={item._id} customerData={item} />;
          })}
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <StyledLink to="/customers/create" primary="true">
        Create New Customer
      </StyledLink>
    </>
  );
}
