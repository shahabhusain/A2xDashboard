import React, { useState } from 'react';
import { Award, Calendar, Plus, FileText } from 'lucide-react';

const CertificateEvaluations = () => {
    const [certifications, setCertifications] = useState([
        {
            id: 1,
            name: '',
            expDate: '',
            reminder: '7 Days',
            notes: ''
        },
        {
            id: 2,
            name: '',
            expDate: '',
            reminder: '7 Days',
            notes: ''
        }
    ]);

    const [evaluations, setEvaluations] = useState([
        {
            id: 1,
            name: '',
            expDate: '',
            reminder: '7 Days',
            notes: ''
        },
        {
            id: 2,
            name: '',
            expDate: '',
            reminder: '7 Days',
            notes: ''
        }
    ]);

    const handleCertificationChange = (id, field, value) => {
        setCertifications(prev => prev.map(cert => 
            cert.id === id ? { ...cert, [field]: value } : cert
        ));
    };

    const handleEvaluationChange = (id, field, value) => {
      setEvaluations(prev => prev.map(evaluationItem => 
    evaluationItem.id === id ? { ...evaluationItem, [field]: value } : evaluationItem
));
    };

    const addCertification = () => {
        const newId = Math.max(...certifications.map(c => c.id)) + 1;
        setCertifications(prev => [...prev, {
            id: newId,
            name: '',
            expDate: '',
            reminder: '7 Days',
            notes: ''
        }]);
    };

    const addEvaluation = () => {
        const newId = Math.max(...evaluations.map(e => e.id)) + 1;
        setEvaluations(prev => [...prev, {
            id: newId,
            name: '',
            expDate: '',
            reminder: '7 Days',
            notes: ''
        }]);
    };

    const reminderOptions = [
        '7 Days',
        '14 Days',
        '30 Days',
        '60 Days',
        '90 Days'
    ];

    const certificateOptions = [
        'Select a Certificate...',
        'CPR Certification',
        'First Aid Certification',
        'CNA License',
        'Home Health Aide Certification',
        'Medication Administration',
        'Background Check',
        'TB Test',
        'Physical Exam'
    ];

    const evaluationOptions = [
        'Select an Evaluation...',
        'Annual Performance Review',
        'Skills Assessment',
        'Competency Evaluation',
        'Training Completion',
        'Safety Assessment',
        'Quality Review'
    ];

    return (
        <div className=" mt-4">
                       <div className="px-6 rounded-lg shadow-sm bg-white py-4 border-b border-gray-200">
                    <h1 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                        Certificate & Evaluations
                    </h1>
                </div>
            <div className="">
                <div className="  mt-4 space-y-8">
                    {/* Certifications Section */}
                    <div className="bg-white rounded-lg p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">

                            Certifications
                        </h2>
                        
                        <div className="space-y-4">
                            {certifications.map((cert) => (
                                <div key={cert.id} className="grid grid-cols-12 gap-4 items-center">
                                    <div className="col-span-2">
                                        <label className="text-sm font-medium text-gray-600">Name</label>
                                    </div>
                                    <div className="col-span-3">
                                        <select
                                            value={cert.name}
                                            onChange={(e) => handleCertificationChange(cert.id, 'name', e.target.value)}
                                            className="w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                        >
                                            {certificateOptions.map((option, index) => (
                                                <option key={index} value={option === 'Select a Certificate...' ? '' : option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-span-2">
                                        <label className="text-sm font-medium text-gray-600">Exp. Date</label>
                                        <input
                                            type="date"
                                            value={cert.expDate}
                                            onChange={(e) => handleCertificationChange(cert.id, 'expDate', e.target.value)}
                                            className="w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm mt-1"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="text-sm font-medium text-gray-600">Reminder</label>
                                        <select
                                            value={cert.reminder}
                                            onChange={(e) => handleCertificationChange(cert.id, 'reminder', e.target.value)}
                                            className="w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm mt-1"
                                        >
                                            {reminderOptions.map((option) => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-span-3">
                                        <label className="text-sm font-medium text-gray-600">Notes</label>
                                        <input
                                            type="text"
                                            value={cert.notes}
                                            onChange={(e) => handleCertificationChange(cert.id, 'notes', e.target.value)}
                                            className="w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm mt-1"
                                            placeholder="Add notes..."
                                        />
                                    </div>
                                </div>
                            ))}
                            
                            <button
                                onClick={addCertification}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2 text-sm"
                            >
                                <Plus className="w-4 h-4" />
                                Add another certificate
                            </button>
                        </div>
                    </div>

                    {/* Evaluations Section */}
                    <div className="bg-white rounded-lg p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                            Evaluations
                        </h2>
                        
                        <div className="space-y-4">
                            {evaluations.map((evaluation) => (
                                <div key={evaluation.id} className="grid grid-cols-12 gap-4 items-center">
                                    <div className="col-span-2">
                                        <label className="text-sm font-medium text-gray-600">Name</label>
                                    </div>
                                    <div className="col-span-3">
                                        <select
                                            value={evaluation.name}
                                            onChange={(e) => handleEvaluationChange(evaluation.id, 'name', e.target.value)}
                                            className="w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                        >
                                            {evaluationOptions.map((option, index) => (
                                                <option key={index} value={option === 'Select an Evaluation...' ? '' : option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-span-2">
                                        <label className="text-sm font-medium text-gray-600">Exp. Date</label>
                                        <input
                                            type="date"
                                            value={evaluation.expDate}
                                            onChange={(e) => handleEvaluationChange(evaluation.id, 'expDate', e.target.value)}
                                            className="w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm mt-1"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="text-sm font-medium text-gray-600">Reminder</label>
                                        <select
                                            value={evaluation.reminder}
                                            onChange={(e) => handleEvaluationChange(evaluation.id, 'reminder', e.target.value)}
                                            className="w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm mt-1"
                                        >
                                            {reminderOptions.map((option) => (
                                                <option key={option} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-span-3">
                                        <label className="text-sm font-medium text-gray-600">Notes</label>
                                        <input
                                            type="text"
                                            value={evaluation.notes}
                                            onChange={(e) => handleEvaluationChange(evaluation.id, 'notes', e.target.value)}
                                            className="w-full py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm mt-1"
                                            placeholder="Add notes..."
                                        />
                                    </div>
                                </div>
                            ))}
                            
                            <button
                                onClick={addEvaluation}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2 text-sm"
                            >
                                <Plus className="w-4 h-4" />
                                Add another evaluation
                            </button>
                        </div>
                    </div>

                    {/* Care Plan Signatures Section */}
                    <div className="bg-white rounded-lg p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-6">Care Plan Signatures</h2>
                        
                        <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
                            <div className="text-gray-500">
                                <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                                <p className="text-lg">No signatures stored (or no care plans found)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CertificateEvaluations;