"use client";

import Link from 'next/link';
import { useQuery } from 'react-query';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const fetchApiData = async () => {
  const response = await fetch('https://crudcrud.com/api/29957fd712f84e87a923e3aeaf8e8a15/teacher');
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};

const TeacherList: React.FC = () =>  {  

  const { data, isLoading, isError } = useQuery('apiData', fetchApiData);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  const deletePost = async (firstName: string) => {
  };
  
  return (
    <QueryClientProvider client={queryClient}>  
      <div className='relative py-3 max-w-xl min-w-[400px] sm:mx-auto'>
        <div className='absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-500 shadow-lg transform -skew-y-5 -rotate-6 rounded-3xl'/>
        <div className="text-white relative px-4 bg-indigo-400 shadow-lg sm:rounded-3xl min-h-[600px] flex flex-col">   
          {data && (
            <div className='flex'>
              <div>
                {data.map((option: any) => (
                  <div className="relative flex justify-between shadow mb-4 appearance-none border rounded w-full py-1 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" key={option.id}>
                    <div className='flex items-center'>
                      <Link href="/Components/summaryCard">
                        <h2 className="text-black font-semibold">{option.firstName} {option.lastName}</h2>
                      </Link>                      
                    </div>
                    <button onClick={() => deletePost(option.id)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-full transition duration-200 ease-in-out transform hover:scale-[1.02]">Delete</button>
                  </div>       
                ))}
                </div>
              <div className="">
                <Link href="/Components/teacherForm" className="absolute bottom-10 shadow bg-indigo-600 hover:bg-indigo-700 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Register a Teacher
                </Link>
              </div>
            </div>
          )}      
        </div>
      </div>  
    </QueryClientProvider>    
  );
};

export default TeacherList;