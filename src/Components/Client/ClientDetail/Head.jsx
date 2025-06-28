import React, { useState, useEffect } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import Profile from './Profile'
import Schedules from './Schedules'
import CareNotes from './CareNotes'
import PriorityNotes from './PriorityNotes'
import ContactForm from './ContactForm'
import HealthcareCalendar from './HealthcareCalendar'
import ClientBillingPage from './ClientBillingPage'
import DocumentsManager from './DocumentsManager'
import HealthcareInformation from './HealthcareInformation'
import HealthcareInformations from './HealthcareInformations'
import ClientAttributes from './ClientAttributes'
import CustomFields from './CustomFields'
import EnhancedCustomFields from './EnhancedCustomFields'
import { useSearchParams } from 'react-router-dom';
import { axiosPublic } from '../../../lib/axious';
const Head = () => {
  const [open, setOpen] = useState(1);
  const [clientData, setClientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const tenantId = searchParams.get('tenant_id');
  const clientId = searchParams.get('client_id');

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        setLoading(true);
        const response = await axiosPublic.get(`/clients/get-client-by-id`, {
          params: {
            tenant_id: tenantId,
            client_id: clientId
          },
        });
        setClientData(response.data?.data)
        console.log('API Response:', response); // Debug log
      } catch (error) {
        console.error('Error fetching client data:', error);
        setError(error.message);
      }
    };
    fetchClientData();
  }, [tenantId, clientId]);

  if (!clientData) return <div>loading ...</div>;
  return (
    <div>
      <div className='bg-[#545454] px-3 py-6 border-[1px] border-[#E5E5E5] rounded-md flex flex-col gap-2'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-[24px] font-[600] text-white'>Client: {clientData?.residentialAddress?.name}</h1>
            <p className='text-[14px] font-[400] text-white'>3942 Persimmon Dr, Apt 103, Fairfax, VA, 22031-4169</p>
          </div>
          <div className='flex items-center gap-2 bg-white py-2 px-6 rounded-md border-[1px] border-[#D1D5DB]'>
            <IoSearchOutline size={20} className='text-[#111827]' />
            <input
              type="text"
              placeholder='search client'
              className='focus:text-[#111827] focus:text-[15px] focus:font-[500] placeholder:text-[#111827] focus:outline-none'
            />
          </div>
        </div>

        <div className='flex flex-wrap items-center gap-3 mt-4'>
          {[1,2,3,4,5,6,7,8,9,10,11,12,13].map(num => (
            <button
              key={num}
              onClick={() => setOpen(num)}
              className={`text-[12px] font-[500] py-1 px-3 rounded-full ${open === num ? "bg-[#487FFF] text-white" : "bg-[#F3F4F9] text-[#4B5563]"}`}
            >
              {[
                "Profile", "Calendar", "Schedules", "Care Notes", "Notes", "Resp . Parties",
                "Billing", "Documents", "Health Care", "ADLS", "Attributes", "Custom Fields", "Note List"
              ][num - 1]}
            </button>
          ))}
        </div>
      </div>

      {open === 1 ? <Profile clientData={clientData} /> :
       open === 2 ? <HealthcareCalendar /> :
       open === 3 ? <Schedules /> :
       open === 4 ? <CareNotes /> :
       open === 5 ? <PriorityNotes /> :
       open === 6 ? <ContactForm /> :
       open === 7 ? <ClientBillingPage /> :
       open === 8 ? <DocumentsManager /> :
       open === 9 ? <HealthcareInformation /> :
       open === 10 ? <HealthcareInformations /> :
       open === 11 ? <ClientAttributes /> :
       open === 12 ? <CustomFields /> :
       open === 13 ? <EnhancedCustomFields /> : null}
    </div>
  );
};

export default Head;
