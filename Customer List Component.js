// client/src/pages/CustomerListPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function CustomerListPage() {
    const [customers, setCustomers] = useState([]);
    const [search, setSearch] = useState('');

    const fetchCustomers = () => {
        axios.get(`http://localhost:5000/api/customers?search=${search}`)
            .then(response => {
                setCustomers(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching customers:', error);
            });
    };

    useEffect(() => {
        fetchCustomers();
    }, [search]); // Re-fetch customers when the search term changes

    return (
        <div>
            <h1>Customers</h1>
            <input
                type="text"
                placeholder="Search by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <Link to="/customers/new">
                <button>Add New Customer</button>
            </Link>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone Number</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(customer => (
                        <tr key={customer.id}>
                            <td>{customer.first_name}</td>
                            <td>{customer.last_name}</td>
                            <td>{customer.phone_number}</td>
                            <td>
                                <Link to={`/customers/${customer.id}`}>View Details</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CustomerListPage;
