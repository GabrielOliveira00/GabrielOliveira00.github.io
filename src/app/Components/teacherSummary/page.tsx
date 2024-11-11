"use client";

import Link from 'next/link';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useTeacherData } from '../hooks/useTeacherData';
import Modal from '../modalDelete/modal';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const queryClient = new QueryClient();


const TeacherSummary = () =>  {  
  const router = useRouter();
  const [open, setOpen] = useState(false)
  const {data, isLoading, isError} = useTeacherData();

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
                    <div className='relative h-[600px] justify-center' key={option._id}>    
                      <div>
                        <div className='inset-0 my-4 bg-gradient-to-r from-indigo-700 to-purple-500 shadow-lg rounded-sm'>
                          <ol>
                            <li className='py-1 ml-4'>Student Name</li>
                            <li className='py-1 ml-4'>Subject</li>
                          </ol>
                        </div>  
                        <div className='inset-0 my-4 bg-gradient-to-r from-indigo-700 to-purple-500 shadow-lg rounded-sm'>
                          <ol>
                            <li className='py-1 ml-4'>1º - First Teacher</li>
                            <li className='py-1 ml-4'>2º - Second Teacher</li>
                            <li className='py-1 ml-4'>3º - Third Teacher</li>
                            <li className='py-1 ml-4'>4º - Fourth Teacher</li>
                          </ol>
                        </div>  
                      </div>
                      <div className='absolute bottom-6 w-full flex justify-between'>
                          <button type="button" onClick={() => setOpen(true)} className="bg-red-600 hover:bg-red-700 flex items-center text-white font-bold h-8 px-2 rounded-md transition duration-200 ease-in-out transform hover:scale-105">
                            Delete
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-trash ml-2" viewBox="0 0 16 16">
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                            </svg>
                          </button>
                          <button type="button" onClick={() => router.push('/Components/teacherForm')} className=" bg-indigo-600 hover:bg-indigo-700 flex items-center text-white font-bold h-8 px-2 rounded-md transition duration-300 ease-in-out transform hover:scale-105">
                            Edit
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-pencil ml-2" viewBox="0 0 16 16">
                              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                            </svg>
                          </button>
                        </div>  
                    </div>
                  ))}
   
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
    
          { isLoading && <span>Datas is being loaded</span>}
          { isError && <span>Error</span>}
        </div>
      </div>  
    </QueryClientProvider>    
  );
};

export default TeacherSummary;