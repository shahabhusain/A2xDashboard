import React, { useState, useMemo } from 'react';
import { Search, Eye, Edit2, Trash2, Plus, ChevronLeft, ChevronRight, ArrowLeft, Send, Download, Printer } from 'lucide-react';

const PayrollBilling = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Stats');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Sample data based on the screenshot
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

  // Sample invoice details
  const invoiceDetails = {
    '#526534': {
      invoiceNumber: '3492',
      dateIssued: '25/08/2020',
      dateDue: '29/08/2020',
      issueDate: '25 Jan 2024',
      orderID: '#655214',
      shipmentID: '#655215',
      customer: {
        name: 'Kathryn Murphy',
        address: '4517 Washington Ave, USA',
        phone: '+1 543 2198'
      },
      company: {
        address: '4517 Washington Ave, Manchester, Kentucky 39495',
        email: 'random@gmail.com, +1 543 2198'
      },
      items: [
        { sl: '01', name: "Apple's Shoes", qty: 5, units: 'PC', unitPrice: '$200', price: '$1000.00' },
        { sl: '02', name: "Apple's Shoes", qty: 5, units: 'PC', unitPrice: '$200', price: '$1000.00' },
        { sl: '03', name: "Apple's Shoes", qty: 5, units: 'PC', unitPrice: '$200', price: '$1000.00' },
        { sl: '04', name: "Apple's Shoes", qty: 5, units: 'PC', unitPrice: '$200', price: '$1000.00' }
      ],
      salesBy: 'Jammal',
      subtotal: '$4000.00',
      discount: '$0.00',
      tax: '0.00',
      total: '$1690'
    }
  };

  // Filter and search logic
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

  // Pagination logic
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
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedRows(newSelected);
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getStatusColor = (status) => {
    return status === 'Paid' 
      ? 'bg-green-100 text-green-800 border-green-200' 
      : 'bg-orange-100 text-orange-800 border-orange-200';
  };

  const createNewInvoice = () => {
    alert('Create new invoice functionality would be implemented here');
  };

  const handleAction = (action, invoice) => {
    if (action === 'View') {
      setSelectedInvoice(invoice);
    } else {
      alert(`${action} action for invoice ${invoice}`);
    }
  };

  const handleInvoiceClick = (invoice) => {
    setSelectedInvoice(invoice);
  };

  const handleBackToList = () => {
    setSelectedInvoice(null);
  };

  const handleInvoiceAction = (action) => {
    alert(`${action} action for invoice ${selectedInvoice}`);
  };

  // Invoice Detail View
  if (selectedInvoice) {
    const details = invoiceDetails[selectedInvoice] || invoiceDetails['#526534'];
    
    return (
      <div className="">
        <div className="">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleBackToList}
                className="p-2 hover:bg-gray-100 rounded-md"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">Preview</h1>
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => handleInvoiceAction('Send Invoice')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Invoice</span>
              </button>
              <button 
                onClick={() => handleInvoiceAction('Download')}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
              <button 
                onClick={() => handleInvoiceAction('Edit')}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center space-x-2"
              >
                <Edit2 className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button 
                onClick={() => handleInvoiceAction('Print')}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center space-x-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print</span>
              </button>
            </div>
          </div>

          {/* Invoice Content */}
          <div className="p-8">
            <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-lg p-8">
              {/* Invoice Header */}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Invoice {details.invoiceNumber}</h2>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>Date Issued: {details.dateIssued}</p>
                    <p>Date Due: {details.dateDue}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-900 mb-2">Logo</div>
                  <div className="text-sm text-gray-600 max-w-xs">
                    <p>{details.company.address}</p>
                    <p>{details.company.email}</p>
                  </div>
                </div>
              </div>

              {/* Customer Details */}
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Issues For:</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Name: {details.customer.name}</p>
                    <p>Address: {details.customer.address}</p>
                    <p>Phone number: {details.customer.phone}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Issue Date: {details.issueDate}</p>
                    <p>Order ID: {details.orderID}</p>
                    <p>Shipment ID: {details.shipmentID}</p>
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <div className="mb-8">
                <table className="w-full border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">S.L</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">Items</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">Qty</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">Units</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">Unit Price</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {details.items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">{item.sl}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">{item.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">{item.qty}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">{item.units}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">{item.unitPrice}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Sales Information and Totals */}
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <p className="text-sm text-gray-600 mb-2"><span className="font-semibold">Sales By:</span> {details.salesBy}</p>
                  <p className="text-sm text-gray-600">Thanks for your business</p>
                </div>
                <div className="text-right">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="text-gray-900 font-semibold">{details.subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Discount:</span>
                      <span className="text-gray-900 font-semibold">{details.discount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax:</span>
                      <span className="text-gray-900 font-semibold">{details.tax}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-200">
                      <span className="text-gray-900 font-bold">Total:</span>
                      <span className="text-gray-900 font-bold">{details.total}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Thank You Message */}
              <div className="text-center py-8">
                <p className="text-gray-600">Thank you for your purchase!</p>
              </div>

              {/* Signature Section */}
              <div className="grid grid-cols-2 gap-8 pt-16">
                <div className="text-center">
                  <div className="border-t border-gray-400 pt-2">
                    <p className="text-sm text-gray-600">Signature of Customer</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="border-t border-gray-400 pt-2">
                    <p className="text-sm text-gray-600">Signature of Authorized</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                    <button 
                      onClick={() => handleInvoiceClick(item.invoice)}
                      className="text-blue-600 hover:text-blue-800 cursor-pointer text-sm font-medium hover:underline"
                    >
                      {item.invoice}
                    </button>
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

export default PayrollBilling;