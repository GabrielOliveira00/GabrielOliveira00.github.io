"use client";

import Link from 'next/link';
import { useQuery } from 'react-query';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const fetchApiData = async () => {
  const response = await fetch('https://crudcrud.com/api/ac7871a8422c4def9fc87e95136ddf40/student');
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
        <div className="bg-gradient-to-br from-red-500 to-rose-800 p-8 rounded-lg w-[300px] h-[600px]">  
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
              <div className="h-screen flex justify-center items-center">
                <Link href="/Components/studentForm" className="bg-gradient-to-r from-pearl to-blue-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Register a Student
                </Link>
              </div>
            </div>
          )}      
        </div>
        
    </QueryClientProvider>    
  );
};

export default StudentList;