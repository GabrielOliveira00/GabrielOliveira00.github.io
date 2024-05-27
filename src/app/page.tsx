// import { NameList } from "./Components/namelist/page";
"use client"

import React from 'react';
import StudentList from './Components/studentList/page';
import TeacherList from './Components/teacherList/page';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();



export default function Home() {


  return (
    <div className='min-h-screen bg-gray-800 py-6 flex flex-col justify-center sm:py-12'>
      <QueryClientProvider client={queryClient}>
        <div className="flex justify-between w-full">
            <StudentList/>   
           <TeacherList/>   
        </div>
      </QueryClientProvider>
  </div>
  );
}
