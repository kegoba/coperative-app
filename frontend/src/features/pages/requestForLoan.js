import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createConsultation, getSingleUser } from '../services/userServices';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { inputValidation } from '../services/validationService';

const RequestForLoan = () => {
  const navigate = useNavigate();
  const [patientName, setPatientName] = useState('');
  const [date, setDate] = useState('');
  const [consultationType, setConsultationType] = useState('');
  const [medicalCondition, setMedicalCondition] = useState('');
  const [healthcareProvider, setHealthcareProvider] = useState('');
  const [notes, setNotes] = useState('');
  const [userId, setUserId] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getSingleUser(id);
        if (response) {
          setPatientName(response.name);
        } else {
          console.log('No data');
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(userId)
    const getUserDetails = JSON.parse(localStorage.getItem('user'));

    if (!inputValidation(patientName) || !inputValidation(date) || !inputValidation(healthcareProvider) ||
        !inputValidation(consultationType) || !inputValidation(medicalCondition) || !inputValidation(notes)) {
      NotificationManager.error('All values must be more than four characters', 'Invalid Input');
      return;
    }

    const data = { patientName, date, healthcareProvider, consultationType, medicalCondition, notes, officerId: id };
    console.log(data);

    try {
      const resp = await createConsultation(data);
      if (resp.status === 200) {
        navigate('/');
      } else {
        NotificationManager.error('Could not save');
      }
    } catch (err) {
      console.error(err);
      NotificationManager.error('An error occurred');
    }

    setPatientName('');
    setDate('');
    setHealthcareProvider('');
    setConsultationType('');
    setMedicalCondition('');
    setNotes('');
  };

  return (
    <>
      <div className="w-full max-w-sm md:mx-[450px] mt-20 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="space-y-6">
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">SignUp in to our platform</h5>
          <div>
            <input placeholder="Patient Name" value={patientName} onChange={e => setPatientName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
          </div>
          <div>
            <input placeholder="Type" value={consultationType} onChange={e => setConsultationType(e.target.value)} name="type" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
          </div>
          <div>
            <input placeholder="Medical Condition" value={medicalCondition} onChange={e => setMedicalCondition(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
          </div>
          <div>
            <input placeholder="Healthcare Provider" value={healthcareProvider} onChange={e => setHealthcareProvider(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
          </div>
          <div>
            <textarea placeholder="Notes" value={notes} onChange={e => setNotes(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
          </div>
          <div>
            <input type="date" placeholder="Date" value={date} onChange={e => setDate(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
          </div>
          <button onClick={handleSubmit} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Book Consultation</button>
        </div>
        <NotificationContainer />
      </div>
    </>
  );
};

export default RequestForLoan;
