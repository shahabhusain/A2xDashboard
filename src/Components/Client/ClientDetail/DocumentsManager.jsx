import React, { useState, useRef } from 'react';
import { FiUpload, FiTrash2, FiDownload } from 'react-icons/fi';

const DocumentsManager = () => {
  const [files, setFiles] = useState([]);
  const [isExpress, setIsExpress] = useState(false);
  const fileInputRef = useRef(null);
  const maxFileSize = 100; // MB

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files).map(file => ({
      id: Date.now() + Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      date: new Date().toLocaleDateString(),
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(), // 30 days from now
      file: file
    }));
    
    setFiles([...files, ...newFiles]);
  };

  const handleUpload = () => {
    if (files.length === 0) return;
    
    // Here you would typically upload to a server
    console.log('Uploading files:', files);
    console.log('Express mode:', isExpress);
    
    // Simulate upload success
    alert(`${files.length} file(s) uploaded successfully!`);
    setFiles([]);
  };

  const handleDelete = (id) => {
    setFiles(files.filter(file => file.id !== id));
  };

  const handleDownload = (file) => {
    // In a real app, this would download from server
    const url = URL.createObjectURL(file.file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="bg-white p-6 rounded-md mt-4 shadow-md ">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Documents</h1>
      
      <div className="space-y-6">
        {/* Browse Section */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-gray-700">Browse</h2>
            <button 
              onClick={triggerFileInput}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Select Files
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              className="hidden"
            />
          </div>
          <p className="text-sm text-gray-500">Maximum allowed file size is {maxFileSize}.00MB</p>
          
          {files.length > 0 && (
            <div className="mt-4 space-y-2">
              {files.map(file => (
                <div key={file.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-700 truncate max-w-xs">{file.name}</span>
                  <span className="text-xs text-gray-500">{file.size}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Express Upload Section */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h2 className="font-semibold text-gray-700">Express (optional)</h2>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isExpress}
                  onChange={() => setIsExpress(!isExpress)}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <button
              onClick={handleUpload}
              disabled={files.length === 0}
              className={`px-4 py-2 rounded-md flex items-center space-x-2 ${files.length === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'} text-white transition-colors`}
            >
              <FiUpload className="inline" />
              <span>Upload</span>
            </button>
          </div>
          {isExpress && (
            <p className="mt-2 text-sm text-blue-600">Express mode enabled - faster uploads with higher priority</p>
          )}
        </div>
        
        {/* Files Table */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expires</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {files.length > 0 ? (
                files.map(file => (
                  <tr key={file.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 truncate max-w-xs">{file.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.size}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.expires}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-3">
                        <button 
                          onClick={() => handleDownload(file)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Download"
                        >
                          <FiDownload />
                        </button>
                        <button 
                          onClick={() => handleDelete(file.id)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">No Documents</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DocumentsManager;