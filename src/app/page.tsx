// import { NameList } from "./Components/namelist/page";
"use client"

import React from 'react';
import StudentList from './Components/studentList/page';
import TeacherList from './Components/teacherList/page';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();



export default function Home() {


  return (
    <div className='flex justify-center items-center'>
      <QueryClientProvider client={queryClient}>
        <div className="flex">
          <div className='mr-40'>
            <StudentList/>
          </div>
          <div>
           <TeacherList/>
          </div>
        </div>
      </QueryClientProvider>
  </div>
  );
}
