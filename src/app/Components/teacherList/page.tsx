"use client";

import Link from 'next/link';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useTeacherData } from '../hooks/useTeacherData';
import { DataTeste } from '../hooks/mock';
import Pagination from '../hooks/pagination';
import Modal from '../modalDelete/modal';
import { useState, useMemo } from 'react';

const queryClient = new QueryClient();

let PageSize = 3;

const TeacherList = () =>  {  
  const [open, setOpen] = useState(false)
  const {data, isLoading, isError} = useTeacherData();

  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return DataTeste.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  console.log(data)
   
  return (
    <QueryClientProvider client={queryClient}>  
      <div className='relative py-3 max-w-xl min-w-[400px] sm:mx-auto'>
        <div className='absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-500 shadow-lg transform -skew-y-5 -rotate-6 rounded-3xl'/>
        <div className="text-white relative px-4 bg-indigo-400 shadow-lg sm:rounded-3xl min-h-[600px] flex flex-col">   
        {!isLoading && <>
          {data && (
              <div className='flex'>
                <div className='w-full'>
                  {data.map((option: any) => (
                    <div key={option.id} className='flex flex-col justify-center items-center'> <h1 className='text-xl text-black font-bold mt-4'>Teacher List</h1>  <div className="relative flex items-center justify-between shadow-lg mt-4 mb-4 appearance-none border rounded w-full py-1 px-3 bg-indigo-200 text-indigo-700 leading-tight focus:outline-none focus:shadow-outline">
                      <div className='flex items-center w-full'>
                        <Link href="/Components/teacherSummaryCard" className='w-full'>
                          <h2 className="text-black font-semibold">{option.firstName} {option.lastName}</h2>
                          <span className="text-black text-md">{option.subject}</span>
                      </Link>                      
                     </div>
                     <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-[5px] px-[5px] ml-3 transition rounded-full duration-200 ease-in-out transform text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16">
                          <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
                        </svg>
                     </button>
                      <button onClick={() => setOpen(true)} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-[1px] px-[7px] ml-3 transition rounded-full duration-200 ease-in-out transform text-sm">x</button>
                    </div>  
                  </div>  
                  ))}
                  <Pagination
                    className="w-full"
                    currentPage={currentPage}
                    totalCount={DataTeste.length}
                    pageSize={PageSize}
                    onPageChange={(page: any) => setCurrentPage(page)}
                  />      
                </div>  
                <Modal open={open} onClose={() => setOpen(false)}>
                  <div className="text-center w-56">
                    <span className="mx-auto text-red-500" >
                      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15" viewBox="0 0 50 50" className='mx-auto' fill='red'>
                        <path d="M 21 0 C 19.355469 0 18 1.355469 18 3 L 18 5 L 10.1875 5 C 10.0625 4.976563 9.9375 4.976563 9.8125 5 L 8 5 C 7.96875 5 7.9375 5 7.90625 5 C 7.355469 5.027344 6.925781 5.496094 6.953125 6.046875 C 6.980469 6.597656 7.449219 7.027344 8 7 L 9.09375 7 L 12.6875 47.5 C 12.8125 48.898438 14.003906 50 15.40625 50 L 34.59375 50 C 35.996094 50 37.1875 48.898438 37.3125 47.5 L 40.90625 7 L 42 7 C 42.359375 7.003906 42.695313 6.816406 42.878906 6.503906 C 43.058594 6.191406 43.058594 5.808594 42.878906 5.496094 C 42.695313 5.183594 42.359375 4.996094 42 5 L 32 5 L 32 3 C 32 1.355469 30.644531 0 29 0 Z M 21 2 L 29 2 C 29.5625 2 30 2.4375 30 3 L 30 5 L 20 5 L 20 3 C 20 2.4375 20.4375 2 21 2 Z M 11.09375 7 L 38.90625 7 L 35.3125 47.34375 C 35.28125 47.691406 34.910156 48 34.59375 48 L 15.40625 48 C 15.089844 48 14.71875 47.691406 14.6875 47.34375 Z M 18.90625 9.96875 C 18.863281 9.976563 18.820313 9.988281 18.78125 10 C 18.316406 10.105469 17.988281 10.523438 18 11 L 18 44 C 17.996094 44.359375 18.183594 44.695313 18.496094 44.878906 C 18.808594 45.058594 19.191406 45.058594 19.503906 44.878906 C 19.816406 44.695313 20.003906 44.359375 20 44 L 20 11 C 20.011719 10.710938 19.894531 10.433594 19.6875 10.238281 C 19.476563 10.039063 19.191406 9.941406 18.90625 9.96875 Z M 24.90625 9.96875 C 24.863281 9.976563 24.820313 9.988281 24.78125 10 C 24.316406 10.105469 23.988281 10.523438 24 11 L 24 44 C 23.996094 44.359375 24.183594 44.695313 24.496094 44.878906 C 24.808594 45.058594 25.191406 45.058594 25.503906 44.878906 C 25.816406 44.695313 26.003906 44.359375 26 44 L 26 11 C 26.011719 10.710938 25.894531 10.433594 25.6875 10.238281 C 25.476563 10.039063 25.191406 9.941406 24.90625 9.96875 Z M 30.90625 9.96875 C 30.863281 9.976563 30.820313 9.988281 30.78125 10 C 30.316406 10.105469 29.988281 10.523438 30 11 L 30 44 C 29.996094 44.359375 30.183594 44.695313 30.496094 44.878906 C 30.808594 45.058594 31.191406 45.058594 31.503906 44.878906 C 31.816406 44.695313 32.003906 44.359375 32 44 L 32 11 C 32.011719 10.710938 31.894531 10.433594 31.6875 10.238281 C 31.476563 10.039063 31.191406 9.941406 30.90625 9.96875 Z"></path>
                      </svg>
                    </span>
                    <div className="mx-auto my-4 w-48">
                      <h3 className="text-lg font-black text-gray-800">Confirm Delete</h3>
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this item?
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <button className="btn bg-red-600 hover:bg-red-700 rounded-md w-full">Delete</button>
                      <button
                        className="btn bg-gray-600 hover:bg-gray-700 rounded-md w-full"
                        onClick={() => setOpen(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </Modal>         
              </div>
            )}</>}
           <div className="flex justify-center items-center">
            <Link href="/Components/teacherForm" className="absolute bottom-10 shadow bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Register a Teacher
            </Link>
          </div>
          { isLoading && <span>Datas is being loaded</span>}
          { isError && <span>Error!</span>}
        </div>
      </div>  
    </QueryClientProvider>    
  );
};

export default TeacherList;