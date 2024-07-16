"use client";

import React from 'react';
import { useRouter } from 'next/navigation'
import { useQuery } from 'react-query';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();


const fetchApiData = async () => {
    const response = await fetch('https://crudcrud.com/api/352c3afb135a4ea7abe461f02981c8e1/teacher');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  };

export default function TeacherSummaryCard ()  {
    const router = useRouter();

    const { data, isLoading, isError } = useQuery('apiData', fetchApiData);
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching data</div>;

    console.log(data)


    return(
        <QueryClientProvider client={queryClient}>
        <div className=''>
            <div className=" bg-yellow-600 border border-pink-500 shadow-lg rounded-lg p-4">
                <h2 className="text-pink-900 font-bold text-lg">Teacher Card</h2>
                {data.map((option:any) => (
                <div key="">
                    <p>First Name: {option.firstName}</p>
                    <p>Last Name: {option.lastName}</p>
                    <p>Teacher ID: {option.teacherId}</p>
                    <p>ID: {option._id}</p>
                </div>
                ))}
                <div className='flex justify-between'>
                    <button type="button" onClick={() => router.push('/')} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full transition duration-200 ease-in-out transform hover:scale-105">Cancel</button>
                    <button type="button" className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105">Edit</button>
                </div>      
            </div>
        </div>
        </QueryClientProvider>
    )
}