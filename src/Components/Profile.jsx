import React, { useState, useMemo } from 'react';
import { Search, Eye, Edit2, Trash2, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Stats');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState(new Set());

  const invoiceData = [
    { id: 1, invoice: '#526534', name: 'Kathryn Murphy', issuedDate: '25 Jan 2024', amount: '$200.00', status: 'Paid' },
    { id: 2, invoice: '#696589', name: 'Annette Black', issuedDate: '25 Jan 2024', amount: '$200.00', status: 'Paid' },
    { id: 3, invoice: '#256584', name: 'Ronald Richards', issuedDate: '10 Feb 2024', amount: '$200.00', status: 'Paid' },
    { id: 4, invoice: '#526587', name: 'Eleanor Pena', issuedDate: '10 Feb 2024', amount: '$150.00', status: 'Paid' },
    { id: 5, invoice: '#105986', name: 'Leslie Alexander', issuedDate: '15 March 2024', amount: '$150.00', status: 'Pending' },
    { id: 6, invoice: '#526589', name: 'Albert Flores', issuedDate: '15 March 2024', amount: '$150.00', status: 'Paid' },
    { id: 7, invoice: '#526520', name: 'Jacob Jones', issuedDate: '27 April 2024', amount: '$250.00', status: 'Paid' },
    { id: 8, invoice: '#256584', name: 'Jerome Bell', issuedDate: '27 April 2024', amount: '$250.00', status: 'Pending' },
    { id: 9, invoice: '#200257', name: 'Marvin McKinney', issuedDate: '30 April 2024', amount: '$250.00', status: 'Paid' },
    { id: 10, invoice: '#526525', name: 'Cameron Williamson', issuedDate: '30 April 2024', amount: '$250.00', status: 'Paid' },
    { id: 11, invoice: '#526534', name: 'Jane Cooper', issuedDate: '15 May 2024', amount: '$180.00', status: 'Paid' },
    { id: 12, invoice: '#696589', name: 'Robert Fox', issuedDate: '20 May 2024', amount: '$300.00', status: 'Pending' },
  ];

  const filteredData = useMemo(() => {
    let filtered = invoiceData;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.invoice.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'Stats' && statusFilter !== 'All') {
      filtered = filtered.filter(item => item.status === statusFilter);
    }

    return filtered;
  }, [searchTerm, statusFilter]);

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + entriesPerPage);

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedRows(new Set(paginatedData.map(item => item.id)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleSelectRow = (id, checked) => {
    const newSelected = new Set(selectedRows);
    checked ? newSelected.add(id) : newSelected.delete(id);
    setSelectedRows(newSelected);
  };

  const getInitials = (name) => name.split(' ').map(n => n[0]).join('').toUpperCase();

  const getStatusColor = (status) =>
    status === 'Paid'
      ? 'bg-green-100 text-green-800 border-green-200'
      : 'bg-orange-100 text-orange-800 border-orange-200';

  // Optional: define this if needed
  const handleAction = (actionType, invoiceId) => {
    console.log(actionType, invoiceId);
  };

  // Optional: define this if needed
  const createNewInvoice = () => {
    console.log("Create new invoice clicked");
  };

  // Main List View
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900">Payroll/Billing</h1>
        </div>

        {/* Controls */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Show</span>
              <select 
                value={entriesPerPage}
                onChange={(e) => {
                  setEntriesPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border border-gray-300 rounded px-2 py-1 text-sm"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm w-64"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 text-sm"
            >
              <option value="Stats">Stats</option>
              <option value="All">All</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
            </select>

            <button 
              onClick={createNewInvoice}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Create Invoice</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={paginatedData.length > 0 && paginatedData.every(item => selectedRows.has(item.id))}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.L</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issued Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedData.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedRows.has(item.id)}
                      onChange={(e) => handleSelectRow(item.id, e.target.checked)}
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {String(startIndex + index + 1).padStart(2, '0')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to="/roles/rolesdetail" 
                      className="text-blue-600 hover:text-blue-800 cursor-pointer text-sm font-medium hover:underline"
                    >
                      {item.invoice}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium text-gray-600 mr-3">
                        {getInitials(item.name)}
                      </div>
                      <span className="text-sm text-gray-900">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.issuedDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-md border ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleAction('View', item.invoice)}
                        className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleAction('Edit', item.invoice)}
                        className="p-1 text-green-600 hover:text-green-800 hover:bg-green-50 rounded"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleAction('Delete', item.invoice)}
                        className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(startIndex + entriesPerPage, filteredData.length)} of {filteredData.length} entries
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-1 rounded text-sm ${
                    currentPage === pageNum
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`p-2 rounded ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;