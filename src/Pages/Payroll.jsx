import React from 'react'
import Header from '../util/Header'
import PayrollBilling from '../Components/PayrollBilling'

const Payroll = () => {
  return (
    <div className=' bg-white m-6 py-4 border-[1px] border-[#D1D5DB] rounded-md'>
        <PayrollBilling />
    </div>
  )
}

export default Payroll