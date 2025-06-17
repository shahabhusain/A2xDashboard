import React from 'react'
import Header from '../util/Header'
import Table from '../Components/Client/Table'

const Client = () => {
  return (
    <div className=' bg-white m-6 py-4 border-[1px] border-[#D1D5DB] rounded-md'>
        <Header title="Client" />
        <Table />
    </div>
  )
}

export default Client