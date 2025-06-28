import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoChevronBackSharp, IoChevronForwardSharp } from "react-icons/io5";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import icon1 from '../../assets/icon1.png';
import icon2 from '../../assets/icon2.png';
import icon3 from '../../assets/icon3.png';
import { axiosPublic } from '../../lib/axious';
import { getAllClient } from '../../Api/mainApi';
import { useGetCurrentUser } from '../../Api/authApi';

const Table = () => {
      const user = useGetCurrentUser();
    const data = getAllClient()
    const rowsPerPage = 15;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const visibleRows = data.slice(startIndex, startIndex + rowsPerPage);
  
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="mt-4">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-gray-300 text-sm">
          <thead>
            <tr className="bg-[#545454] text-white">
              <th className="p-2">ID</th>
              <th className="p-2">Name</th>
              <th className="p-2">Status</th>
              <th className="p-2">Administrator</th>
              <th className="p-2">Gender</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Email</th>
              <th className="p-2">Community</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row, index) => (
              <tr key={row.id} className="text-center hover:bg-gray-100">
                <td className="p-2 hover:text-blue-500">{index + 1}</td>
              <Link className='hover:text-blue-500' to={`/clientform?tenant_id=${user?.tenantId}&client_id=${row._id}`}>
  {row?.residentialAddress?.name}
</Link>
                <td className="p-2">{row.careInfo.status}</td>
                <td className="p-2">{row.careInfo.administrator}</td>
                <td className="p-2">{row.gender}</td>
                <td className="p-2">{row.contact.phone_mobile}</td>
                <td className="p-2">{row.contact.email}</td>
                <td className="p-2">{row.residentialAddress.community}</td>
                <td className="p-2 flex items-center gap-2 justify-center">
                  <Link to={`/clientform?tenant_id=${user?.tenantId}&client_id=${row._id}`} className="bg-[#487FFF2E] p-2 rounded-full">
                    <img className="w-[16px]" src={icon2} alt="" />
                  </Link>
                  <button className="bg-[#45B3692E] p-2 rounded-full">
                    <img className="w-[16px]" src={icon1} alt="" />
                  </button>
                  <button className="bg-[#F866242E] p-2 rounded-full">
                    <img className="w-[16px]" src={icon3} alt="" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4 px-2">
        <p className="text-sm text-gray-500">
          Showing {startIndex + 1} to {Math.min(startIndex + rowsPerPage, data.length)} of {data.length} entries
        </p>

        <div className="flex items-center space-x-1">
          <button
            onClick={() => handlePageChange(1)}
            className="p-2 rounded hover:bg-gray-200 text-gray-600"
            disabled={currentPage === 1}
          >
            <BsChevronDoubleLeft />
          </button>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="p-2 rounded hover:bg-gray-200 text-gray-600"
            disabled={currentPage === 1}
          >
            <IoChevronBackSharp />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 5).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 rounded ${
                page === currentPage ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="p-2 rounded hover:bg-gray-200 text-gray-600"
            disabled={currentPage === totalPages}
          >
            <IoChevronForwardSharp />
          </button>
          <button
            onClick={() => handlePageChange(totalPages)}
            className="p-2 rounded hover:bg-gray-200 text-gray-600"
            disabled={currentPage === totalPages}
          >
            <BsChevronDoubleRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
