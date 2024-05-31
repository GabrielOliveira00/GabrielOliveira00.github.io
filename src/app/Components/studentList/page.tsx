"use client";

import Link from 'next/link';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useStudentData } from '../hooks/useStudentData';

const queryClient = new QueryClient();


const StudentList: React.FC = () =>  {  

  const {data, isLoading, isError} = useStudentData();

  console.log(data)

  const deletePost = async (firstName: string) => {
  };
  
  return (
    <QueryClientProvider client={queryClient}>
      <div className='relative py-3 max-w-xl min-w-[400px] sm:mx-auto'>
        <div className='absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-500 shadow-lg transform -skew-y-5 -rotate-6 rounded-3xl'/>
        <div className="text-white relative px-4 bg-indigo-400 shadow-lg sm:rounded-3xl min-h-[600px] justify-between">  
        <div>
          {!isLoading && <>
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
              </div>
            )}   
          </>}   
          <div className="flex justify-center items-center">
            <Link href="/Components/studentForm" className="absolute bottom-10 shadow bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Register a Student
            </Link>
          </div>
          </div>
          { isLoading && <span>Datas is being loaded</span>}
          { isError && <span>Error!</span>}
        </div>
        </div>
        
    </QueryClientProvider>    
  );
};

export default StudentList;