// client/src/pages/CustomerDetailPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function CustomerDetailPage() {
    const { id } = useParams();
    const [customer, setCustomer] = useState(null);
    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        // Fetch customer details
        axios.get(`http://localhost:5000/api/customers/${id}`)
            .then(response => {
                setCustomer(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching customer details:', error);
            });

        // Fetch addresses for this customer
        axios.get(`http://localhost:5000/api/customers/${id}/addresses`)
            .then(response => {
                setAddresses(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching addresses:', error);
            });
    }, [id]);

    if (!customer) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Customer Details</h1>
            <h3>{customer.first_name} {customer.last_name}</h3>
            <p>Phone: {customer.phone_number}</p>
            
            <h2>Addresses</h2>
            <ul>
                {addresses.length > 0 ? (
                    addresses.map(address => (
                        <li key={address.id}>
                            {address.address_details}, {address.city}, {address.state} - {address.pin_code}
                        </li>
                    ))
                ) : (
                    <p>No addresses found.</p>
                )}
            </ul>
        </div>
    );
}

export default CustomerDetailPage;
