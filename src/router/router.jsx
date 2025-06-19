import React from 'react'
import {createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom'
import Layout from '../Layout/Layout'
import Dashboard from '../Pages/Dashboard'
import Client from '../Pages/Client'
import Caregiver from '../Pages/Caregiver'
import Scheduling from '../Pages/Scheduling'
import Marketing from '../Pages/Marketing'
import Communities from '../Pages/Communities'
import Calls from '../Pages/Calls'
import Alerts from '../Pages/Alerts'
import Messaging from '../Pages/Messaging'
import Payroll from '../Pages/Payroll'
import Claims from '../Pages/Claims'
import Help from '../Pages/Help'
import Telephony from '../Pages/Telephony'
import ClientForm from '../Pages/ClientForm'
import Layout1 from '../Layout/Layout1'
import Login from '../Pages/Auth/Login'
import ForgetPassword from '../Pages/Auth/ForgetPassword'
import Otp from '../Pages/Auth/Otp'
import ResetPassword from '../Pages/Auth/ResetPassword'
import CareGiverDetailForm from '../Pages/CareGiverDetailForm'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path='client' element={<Client />} />
        <Route path='caregiver' element={<Caregiver />} />
        <Route path='scheduling' element={<Scheduling />} />
        <Route path='marketing' element={<Marketing />} />
        <Route path='communities' element={<Communities />} />
        <Route path='calls' element={<Calls />} />
        <Route path='alerts' element={<Alerts />} />
        <Route path='messaging' element={<Messaging />} />
        <Route path='telephony' element={<Telephony />} />
        <Route path='payroll' element={<Payroll />} />
        <Route path='claims' element={<Claims />} />
        <Route path='help' element={<Help />} />
        <Route path='clientform' element={<ClientForm />} />
        <Route path='caregiverform' element={<CareGiverDetailForm />} />
      </Route>

      <Route path='/auth' element={<Layout1 />}>
        <Route path='login' element={<Login />} />
        <Route path='forgot' element={<ForgetPassword />} />
        <Route path='otp' element={<Otp />} />
        <Route path='resetpassword' element={<ResetPassword />} />
      </Route>
    </>
  )
)
