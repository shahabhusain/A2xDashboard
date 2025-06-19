import React from 'react'
import Header from '../util/Header'
import Table from '../Components/Caregiver/Table'

const Caregiver = () => {
  return (
    <div className=' bg-white m-6 py-4 border-[1px] border-[#D1D5DB] rounded-md'>
        <Header title="Caregiver" />
        <Table />
    </div>
  )
}

export default Caregiver