
import Login from './login'
import Register from './register'
import Home from './home'
import RequestForLoan from "./requestForLoan"
import ViewAllUsers from "./usersList"
import {  Route, Routes } from 'react-router-dom'
import LoanCaculators from "./loanCaculator"

const PageRouter = ()=>{

    return(
    <Routes>
        <Route  path="/" element={<Home/>} />
        <Route  path="/login" element={<Login/>} />
        <Route  path="/register" element={<Register/>} /> 
        <Route  path="/loanrequest" element={<RequestForLoan/>} />
        <Route  path="/userslist" element={<ViewAllUsers/>} />
        <Route  path="/calculator" element={<LoanCaculators/>} />
    </Routes>
    )
}



export default PageRouter