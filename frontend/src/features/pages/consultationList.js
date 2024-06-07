import React, { useState, useEffect } from 'react';
import axios from 'axios';
import data from "./constation"
import {BASE_URL} from "../services/userServices"

const ConsultationList = () => {
  const [consultations, setConsultations] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const fetchConsultations = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get(BASE_URL+'/getalluserconsultation', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        
      });
      setConsultations(response.data.data);
      console.log(response.data.data)
    };
  
    //fetchConsultations(); 
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.patientName]: e.target.value,
    });
  };

  return (
    <div className='mt-20'>
      <div >
        <input name="date" type="date" onChange={handleFilterChange} />
        <input name="patientName" placeholder="Patient Name" onChange={handleFilterChange} />
        <input name="healthcareProvider" placeholder="Healthcare Provider" onChange={handleFilterChange} />
        <input name="consultationType" placeholder="Consultation Type" onChange={handleFilterChange} />
        <input name="medicalCondition" placeholder="Medical Condition" onChange={handleFilterChange} />
      </div>
      <ul>
        {consultations.map((consultation) => (
          <li key={consultation._id}>
           <p>  date {consultation.date} -patientname {consultation.patient.name} - type {consultation.type} </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConsultationList;
