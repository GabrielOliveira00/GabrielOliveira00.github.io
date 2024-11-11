/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { QueryClient, QueryClientProvider } from 'react-query';
import Modal from '../../modalDelete/modal';
import axios from 'axios';
import { uniqueID } from '../../hooks/uniqueID';

const queryClient = new QueryClient();

interface FormData {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

export default function SummaryCard ()  {
  const params = useParams(); 
  const router = useRouter();
  const { id } = params;
  const [formData, setFormData] = useState<FormData | null>(null)
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(true);

  useEffect(() => {

    if (id) {
      const fetchItem = async () => {
        try {
          const response = await axios.get<FormData>(`http://localhost:3005/students/${id}`);
          setFormData(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching item:', error);
          setLoading(false);
        }
      };
      fetchItem();
    }
  }, [id]);

  console.log(formData)

    return(
      <QueryClientProvider client={queryClient}>
        <div className='min-h-screen bg-gray-800 flex flex-col justify-center'>
          <div className='relative sm:mx-auto bg-indigo-400 shadow-lg rounded-3xl w-[350px]'>            
            <div className="">
              <div className='flex items-center justify-between flex-col rounded w-full'>
                <img src={formData?.avatar} className='pb-2 w-full h-[220px] rounded-t-3xl'></img>
                <div className='h-[180px] flex flex-col justify-center items-start'>
                    <p>Full Name: {formData?.name} </p>
                    <p className='py-2'>Student ID: {formData?.id}</p>
                    <p>Email: {formData?.email} </p>        
                <div className='flex justify-between w-full pt-4'>
                  <Link href={`/Components/studentEdit/${formData?.id}`} className="bg-green-600 opacity-80 hover:bg-green-700 text-white font-semibold px-[10px] py-[6px] flex items-center text-center justify-center transition rounded-md duration-200 ease-in-out transform text-sm">
                    Edit
                  </Link>
                  <button type="button" onClick={() => router.push('/')} className="bg-red-500 hover:bg-red-600 text-white font-semibold px-[10px] py-[6px] flex items-center text-center justify-center transition rounded-md duration-200 ease-in-out transform text-sm">Back</button>
                </div>
                </div>
              </div>      
            </div>
          </div>
        </div>
      </QueryClientProvider>
    )
}