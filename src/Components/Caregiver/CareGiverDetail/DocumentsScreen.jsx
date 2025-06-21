import React, { useState } from 'react';
import { Upload, FileText } from 'lucide-react';

export default function DocumentsScreen() {
  const [showExpired, setShowExpired] = useState(false);
  const [expiresDate, setExpiresDate] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [documents, setDocuments] = useState([]);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file size (100MB = 100 * 1024 * 1024 bytes)
      if (file.size > 100 * 1024 * 1024) {
        alert('File size exceeds 100MB limit');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      const newDocument = {
        id: Date.now(),
        name: selectedFile.name,
        size: (selectedFile.size / 1024).toFixed(2) + ' KB',
        date: new Date().toLocaleDateString(),
        expires: expiresDate || 'No expiration',
        file: selectedFile
      };
      setDocuments([...documents, newDocument]);
      setSelectedFile(null);
      setExpiresDate('');
      // Reset file input
      document.getElementById('file-input').value = '';
    }
  };

  const handleDelete = (id) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className=" mt-5 p-6 bg-white">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-medium text-gray-900 mb-6">Documents</h1>
        
        {/* Upload Section */}
        <div className="flex items-start space-x-4 mb-4">
          <div className="flex items-center space-x-3">
            <label
              htmlFor="file-input"
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded cursor-pointer flex items-center space-x-2"
            >
              <FileText className="w-4 h-4" />
              <span>Browse</span>
            </label>
            <input
              id="file-input"
              type="file"
              onChange={handleFileSelect}
              className="hidden"
              accept="*/*"
            />
            <span className="text-sm text-gray-600">
              Maximum allowed file size is 100.00MB
            </span>
          </div>
        </div>

        {/* Selected File Display */}
        {selectedFile && (
          <div className="mb-4 p-3 bg-gray-50 rounded border">
            <p className="text-sm text-gray-700">
              Selected: <span className="font-medium">{selectedFile.name}</span>
              <span className="text-gray-500 ml-2">({formatFileSize(selectedFile.size)})</span>
            </p>
          </div>
        )}

        {/* Expires Input and Upload Button */}
        <div className="flex items-end space-x-3 mb-6">
          <div className="flex-1 max-w-xs">
            <label htmlFor="expires" className="block text-sm text-blue-600 mb-1">
              Expires (optional)
            </label>
            <input
              id="expires"
              type="date"
              value={expiresDate}
              onChange={(e) => setExpiresDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            onClick={handleUpload}
            disabled={!selectedFile}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-2 rounded-md flex items-center space-x-2"
          >
            <Upload className="w-4 h-4" />
            <span>Upload</span>
          </button>
        </div>

        {/* Show Expired Checkbox */}
        <div className="flex justify-end mb-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showExpired}
              onChange={(e) => setShowExpired(e.target.checked)}
              className="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">Show expired</span>
          </label>
        </div>
      </div>

      {/* Documents Table */}
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <table className="w-full">
          <thead className="bg-gray-600 text-white">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium">File</th>
              <th className="px-6 py-4 text-left text-sm font-medium">Size</th>
              <th className="px-6 py-4 text-left text-sm font-medium">Date</th>
              <th className="px-6 py-4 text-left text-sm font-medium">Expires</th>
              <th className="px-6 py-4 text-left text-sm font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {documents.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                  No Documents
                </td>
              </tr>
            ) : (
              documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-gray-500" />
                      <span>{doc.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{doc.size}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{doc.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{doc.expires}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          // Create download link
                          const url = URL.createObjectURL(doc.file);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = doc.name;
                          document.body.appendChild(a);
                          a.click();
                          document.body.removeChild(a);
                          URL.revokeObjectURL(url);
                        }}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Download
                      </button>
                      <span className="text-gray-300">|</span>
                      <button
                        onClick={() => handleDelete(doc.id)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}