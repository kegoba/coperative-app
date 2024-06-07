import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../services/userServices';
import { Link } from 'react-router-dom';

const ViewAllUsers = () => {
  const [filters, setFilters] = useState({ patientName: '' });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers()
      .then((response) => {
        if (response) {
          setUsers(response.data);
        } else {
          console.log('No user');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const filteredData = users.filter((user) =>
    user.name?.toLowerCase().includes(filters.patientName.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="mb-4">
        <input
          type="text"
          name="patientName"
          value={filters.patientName}
          onChange={handleInputChange}
          placeholder="Filter by patient name"
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
      </div>

      <div className="container">
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Users' Details</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  
                  <th className="py-2 px-4 border-b">Patient</th>
                  <th className="py-2 px-4 border-b">Email</th>
                  <th className="py-2 px-4 border-b">Phone</th>
                  <th className="py-2 px-4 border-b">Address</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((user, key) => (
                    <tr key={key}>
                     
                      <td className="py-2 px-4 border-b">{user.name}</td>
                      <td className="py-2 px-4 border-b">{user.email}</td>
                      <td className="py-2 px-4 border-b">{user.phone}</td>
                      <td className="py-2 px-4 border-b"> {user.address}</td>
                      <td className="py-2 px-4 border-b"><Link to={"/addconsultation/" + user._id}>Add</Link></td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-2 px-4 text-center border-b">
                      No consultations found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllUsers;
