import {Routes, Route} from 'react-router-dom'
import './App.css';
import Login from './features/pages/login'
import AddOfficer from './features/pages/register'
import  Navbar from './features/pages/navbar'
import  Footer from './features/pages/footer'
import UserConsultations from './features/pages/userConsultation'
import FilterAllConsulations from "./features/pages/filterAllConsultation"



const sampleData = [
  {
    id: 1,
    date: '2024-05-01',
    patientName: 'John Doe',
    healthcareProvider: 'Dr. Smith',
    consultationType: 'Routine Check-up',
    medicalCondition: 'Hypertension'
  },
  {
    id: 2,
    date: '2024-05-02',
    patientName: 'Jane Doe',
    healthcareProvider: 'Dr. Brown',
    consultationType: 'Emergency',
    medicalCondition: 'Diabetes'
  },
  // Add more sample data as needed
];

function App() {
  return (
    <div className="App">
      <div>
      </div>
      <div className='mb-5 '>
      <Navbar/>
      </div>
 
    
      <div className='mt-10'>
        <Footer/>
      </div>

    </div>
  );
}

export default App;
