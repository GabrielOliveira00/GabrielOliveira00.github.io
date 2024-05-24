"use client";

import React from 'react';
import { useRouter } from 'next/navigation'
import { useQuery } from 'react-query';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();


const fetchApiData = async () => {
    const response = await fetch('https://crudcrud.com/api/62fdd35608174a3483d71faadf817211/unicorns');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  };

export default function SummaryCard ()  {
    const router = useRouter();

    const { data, isLoading, isError } = useQuery('apiData', fetchApiData);
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching data</div>;


    return(
        <QueryClientProvider client={queryClient}>
        <div className='grid grid-cols-1 content-center justify-center h-screen'>
            <div className=" bg-yellow-600 border border-pink-500 shadow-lg rounded-lg p-4 w-[300px] grid grid-cols-1 content-center justify-center">
                <h2 className="text-pink-900 font-bold text-lg">Floating Card</h2>
                <div>
                    <p>First Name: {data.firstname}</p>
                    <p>Last Name: {data.lastname}</p>
                    <p>Teacher ID: {data.teacherId}</p>
                    <p>ID: {data.id}</p>
                </div>
                <div className='flex justify-between'>
                    <button type="button" onClick={() => router.push('/')} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full transition duration-200 ease-in-out transform hover:scale-105">Cancel</button>
                    <button type="button" className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105">Edit</button>
                </div>      
            </div>
        </div>
        </QueryClientProvider>
    )
}