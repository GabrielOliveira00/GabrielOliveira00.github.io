// import { NameList } from "./Components/namelist/page";
"use client"

import React from 'react';
import Link from 'next/link';
import StudentList from './Components/studentList/page';
import TeacherList from './Components/teacherList/page';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export default function Home() {
  return (
    <div className='min-h-screen bg-gray-800 py-6 flex flex-col justify-center sm:py-12'>
      <QueryClientProvider client={queryClient}>
        <header className='absolute top-0 bg-gradient-to-r from-indigo-700 to-purple-500 w-full h-[70px]'>
          <div className='justify-around items-center flex flex-row z-40'>
            <Link href={`/Components/relationshipCompnent`} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-[8px] mt-3 rounded focus:outline-none focus:shadow-outline border border-indigo-500">
              Relate Student Teacher
            </Link>
            <Link href={`/Components/createClassForm`} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-[8px] mt-3 rounded focus:outline-none focus:shadow-outline border border-indigo-500">
              Create Class
            </Link>
          </div>
        </header>
        <div className="flex justify-between w-full">
          <StudentList/>   
          <TeacherList/>   
        </div>
      </QueryClientProvider>
  </div>
  );
}
