import React, { useState, useEffect } from 'react';
import { getAllConsultation } from '../services/userServices';
import {Link}  from "react-router-dom"

const FilterAllConsultations = () => {
  const [consultations, setConsultations] = useState([]);
  const [filters, setFilters] = useState({
    date: '',
    patientName: '',
    healthcareProvider: '',
    consultationType: '',
    medicalCondition: '',
  });

  useEffect(() => {
    getAllConsultation()
      .then((datas) => {
        if (datas) {
          setConsultations(datas.data);
        } else {
          console.log('No data');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredData = consultations.filter((item) => {
    return (
      item.date.includes(filters.date) &&
      (item.officerId?.name?.toLowerCase().includes(filters.patientName.toLowerCase()) || '') &&
      item.healthcareProvider.toLowerCase().includes(filters.healthcareProvider.toLowerCase()) &&
      item.consultationType.toLowerCase().includes(filters.consultationType.toLowerCase()) &&
      item.medicalCondition.toLowerCase().includes(filters.medicalCondition.toLowerCase())
    );
  });

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleInputChange}
          placeholder="Filter by date"
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="patientName"
          value={filters.patientName}
          onChange={handleInputChange}
          placeholder="Filter by patient name"
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="healthcareProvider"
          value={filters.healthcareProvider}
          onChange={handleInputChange}
          placeholder="Filter by healthcare provider"
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="consultationType"
          value={filters.consultationType}
          onChange={handleInputChange}
          placeholder="Filter by consultation type"
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="medicalCondition"
          value={filters.medicalCondition}
          onChange={handleInputChange}
          placeholder="Filter by medical condition"
          className="p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="container">
        <h2 className="text-xl font-bold mb-4">Officer's Consultations</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Patient</th>
                <th className="py-2 px-4 border-b">Healthcare Provider</th>
                <th className="py-2 px-4 border-b">Consultation Type</th>
                <th className="py-2 px-4 border-b">Medical Condition</th>
                
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((consultation, key) => (
                  <tr key={key}>
                    <td className="py-2 px-4 border-b">
                      {new Date(consultation.date).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {consultation.officerId?.name || 'N/A'}
                    </td>
                    <td className="py-2 px-4 border-b">{consultation.healthcareProvider}</td>
                    <td className="py-2 px-4 border-b">{consultation.consultationType}</td>
                    <td className="py-2 px-4 border-b">{consultation.medicalCondition}</td>
                    
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-2 px-4 text-center border-b">
                    You don't have any consultations
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FilterAllConsultations;
