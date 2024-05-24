// import { NameList } from "./Components/namelist/page";
"use client"

import React from 'react';
import { NameList } from './Components/namelist/page';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();



export default function Home() {


  return (
    <div className='flex justify-center items-center'>
      <QueryClientProvider client={queryClient}>
        <NameList/>
      </QueryClientProvider>
  </div>
  );
}
