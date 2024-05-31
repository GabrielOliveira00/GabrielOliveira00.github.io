"use client";

import Link from 'next/link';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useTeacherData } from '../hooks/useTeacherData';

const queryClient = new QueryClient();

const TeacherList: React.FC = () =>  {  

  const {data, isLoading, isError} = useTeacherData();

  console.log(data)

  const deletePost = async (firstName: string) => {
  };
  
  return (
    <QueryClientProvider client={queryClient}>  
      <div className='relative py-3 max-w-xl min-w-[400px] sm:mx-auto'>
        <div className='absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-500 shadow-lg transform -skew-y-5 -rotate-6 rounded-3xl'/>
        <div className="text-white relative px-4 bg-indigo-400 shadow-lg sm:rounded-3xl min-h-[600px] flex flex-col">   
        {!isLoading && <>
          {data && (
              <div className='flex'>
                <div>
                  {data.map((option: any) => (
                    <div className="relative flex justify-between shadow mb-4 appearance-none border rounded w-full py-1 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" key={option.id}>
                      <div className='flex items-center'>
                        <Link href="/Components/summaryCard">
                          <h2 className="text-black font-semibold">{option.firstName} {option.lastName}</h2>
                          <span>{option.subject}</span>
                        </Link>                      
                      </div>
                      <button onClick={() => deletePost(option.id)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-full transition duration-200 ease-in-out transform hover:scale-[1.02]">Delete</button>
                    </div>       
                  ))}
                </div>            
              </div>
            )}      
            <div className="">
              <Link href="/Components/teacherForm" className="absolute bottom-10 shadow bg-indigo-600 hover:bg-indigo-700 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Register a Teacher
              </Link>
            </div>
          </>}
          { isLoading && <span>Datas is being loaded</span>}
          { isError && <span>Error!</span>}
        </div>
      </div>  
    </QueryClientProvider>    
  );
};

export default TeacherList;