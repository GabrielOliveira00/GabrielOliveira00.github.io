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
        <div className='justify-center items-center flex flex-row z-40'>
          <Link href={`/Components/relationshipCompnent`} className="bg-green-600 hover:bg-green-700 text-white font-semibold py-[5px] px-[5px] ml-3 transition rounded-full duration-200 ease-in-out transform text-sm">
            RelationShip
          </Link>
          <Link href={`/Components/createClassForm`} className="bg-green-600 hover:bg-green-700 text-white font-semibold py-[5px] px-[5px] ml-3 transition rounded-full duration-200 ease-in-out transform text-sm">
            createClassForm
          </Link>
        </div>
        <div className="flex justify-between w-full">
          <StudentList/>   
          <TeacherList/>   
        </div>
      </QueryClientProvider>
  </div>
  );
}
