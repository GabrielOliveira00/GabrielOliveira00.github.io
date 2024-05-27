"use client";

import Link from 'next/link';
import { useQuery } from 'react-query';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const fetchApiData = async () => {
  const response = await fetch('https://crudcrud.com/api/29957fd712f84e87a923e3aeaf8e8a15/student');
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};

const StudentList: React.FC = () =>  {  

  const { data, isLoading, isError } = useQuery('apiData', fetchApiData);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  const deletePost = async (firstName: string) => {
  };
  
  return (
    <QueryClientProvider client={queryClient}>
      <div className='relative py-3 max-w-xl min-w-[400px] sm:mx-auto'>
        <div className='absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-500 shadow-lg transform -skew-y-5 -rotate-6 rounded-3xl'/>
        <div className="text-white relative px-4 bg-indigo-400 shadow-lg sm:rounded-3xl min-h-[600px] justify-between">  
        <div>
          {data && (
            <div>
              <div className='flex'>
                {data.map((option: any) => (
                  <div className="relative flex justify-between" key={option.id}>
                    <div>
                      <Link href="/Components/summaryCard">
                        <h2 className="text-black font-semibold text-xl">{option.firstName}</h2>
                        <h2 className="text-black font-semibold text-xl">{option.lastName}</h2>
                      </Link>                      
                    </div>
                    <button onClick={() => deletePost(option.id)} className='flex'>Delete</button>
                  </div>       
                ))}
              </div>
              <div className="flex justify-center items-center">
                <Link href="/Components/studentForm" className="absolute bottom-10 shadow bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Register a Student
                </Link>
              </div>
            </div>
          )}      
          </div>
        </div>
        </div>
        
    </QueryClientProvider>    
  );
};

export default StudentList;