"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { QueryClient, QueryClientProvider } from 'react-query';

import axios from 'axios';

const queryClient = new QueryClient();

interface FormValues {
  id: any;
  firstName: string;
  lastName: string;
  subject: string;
}


const TeacherFormUpdate: React.FC = () => {
  const searchParams = useSearchParams();

  const router = useRouter();

  const idCatcher = searchParams.get("id")
  const [values, setValues] = useState({
    id: searchParams.get("id"),
    firstName: "",
    lastName: "",
    subject: ""
  })

  console.log(values)
  const handleSubmit = () => {
    axios.put(`https://crudcrud.com/api/352c3afb135a4ea7abe461f02981c8e1/teacher/${idCatcher}`,values)
    router.push('/');
  };

  useEffect(()=> {
    axios.get(`https://crudcrud.com/api/352c3afb135a4ea7abe461f02981c8e1/teacher/${idCatcher}`)
    .then(res => {
      setValues({...values, id: idCatcher, firstName: res.data.firstName, lastName: res.data.lastName, subject: res.data.subject})

    })
    .catch(err => console.log(err))
  // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [])


  return (
    <QueryClientProvider client={queryClient}>
    <div className='min-h-screen bg-gray-800 py-6 flex flex-col justify-center sm:py-12'>
      <div className='relative py-3 max-w-xl sm:mx-auto'>
        <div className='absolute inset-0 bg-indigo-400 shadow-lg transform -skew-y-5 -rotate-6 rounded-3xl'/>
        <div className="relative sm:max-w-xl sm:mx-auto text-white px-4 py-10 bg-gradient-to-r from-indigo-700 to-purple-500 shadow-lg sm:rounded-3xl sm:p-20">
          <div className='flex justify-center items-center h-12'>
            <h2 className="text-2xl font-bold mt-6 flex items-center justify-center absolute top-8">Teacher Form!</h2>
            <p className="text-gray-300 mb-4">
              Register a new Teacher.
            </p>
          </div>
          <Formik
            initialValues={{ id:'', firstName: '', lastName: '', subject: '' }}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="mb-4">
                <Field type="text" id="firstName" name="firstName" placeholder="First Name" className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  value={values.firstName} onChange={(e:any) => setValues({...values, firstName: e.target.value})}
                />
                <ErrorMessage name="firstName" component="div" className="text-gray-300" />
              </div>
              <div className="mb-4">
                <Field type="text" id="lastName" name="lastName" placeholder="Last Name" className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  value={values.lastName} onChange={(e:any) => setValues({...values, lastName: e.target.value})}
                />
                <ErrorMessage name="lastName" component="div" className="text-gray-300" />
              </div>
              <div className="mb-4">
                <Field type="text" id="subject" name="subject" placeholder="Subject" className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  value={values.subject} onChange={(e:any) => setValues({...values, subject: e.target.value})}
                />
                <ErrorMessage name="subject" component="div" className="text-gray-300" />
              </div>
              <div className='flex justify-between'>
                <button type="button" onClick={() => router.push('/')} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition duration-200 ease-in-out transform hover:scale-105">← Back</button>
                <button type="submit" className=" bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105">Submit →</button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
    </QueryClientProvider>
  );
};

export default TeacherFormUpdate;