"use client";

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/navigation'
import * as Yup from 'yup';
import { useTeacherMutate } from '../hooks/useStudentMutate';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useQuery } from 'react-query';

const queryClient = new QueryClient();

const fetchApiData = async () => {
  const response = await fetch('https://crudcrud.com/api/27dbaaa91a1346fa82a9390af4bf56eb/teacher');
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};
interface FormValues {
  firstName: string;
  lastName: string;
  subject: string;
}

const validationSchema = Yup.object({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
});

const StudentForm: React.FC = () => {
  const {mutate, isSuccess} = useTeacherMutate();
  const router = useRouter();

  const { data, isLoading, isError } = useQuery('apiData', fetchApiData);
  
  if (isLoading) return <option>Loading...</option>;
  if (isError) return <option>Please Register a Teacher</option>;
  
  const handleSubmit = (data: FormValues) => {
    localStorage.setItem('formData', JSON.stringify(data));
    mutate(data);
    isSuccess? true: router.push('/');
  };
  return (
    <QueryClientProvider client={queryClient}>
    <div className='min-h-screen bg-gray-800 py-6 flex flex-col justify-center sm:py-12'>
      <div className='relative py-3 max-w-xl sm:mx-auto'>
        <div className='absolute inset-0 bg-indigo-400 shadow-lg transform -skew-y-5 -rotate-6 rounded-3xl'/>
        <div className="relative sm:max-w-xl sm:mx-auto text-white px-4 py-10 bg-gradient-to-r from-indigo-700 to-purple-500 shadow-lg sm:rounded-3xl sm:p-20">
          <div className='flex justify-center items-center h-12'>
            <h2 className="text-2xl font-bold mt-6 flex items-center justify-center absolute top-8">Student Form!</h2>
            <p className="text-gray-300 mb-4">
              Register a new Student.
            </p>
          </div>
          <Formik
            initialValues={{ firstName: '', lastName: '', subject: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div className="mb-4">
                <Field type="text" id="firstName" name="firstName" placeholder="First Name" className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                <ErrorMessage name="firstName" component="div" className="text-gray-300" />
              </div>
              <div className="mb-4">
                <Field type="text" id="lastName" name="lastName" placeholder="Last Name" className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                <ErrorMessage name="lastName" component="div" className="text-gray-300" />
              </div>
            <div className="mb-4">
              <label htmlFor="teacherId" className="block text-white">Teacher</label>
              <Field as="select" id="teacherId" name="teacherId" className="mt-1 p-2 block w-full rounded-md bg-white text-black">
                <option value="">Select a teacher</option>
                {data.map((option: any) => (
                  <option key={option.id} className='text-black'>{option.firstName} {option.lastName} </option>
                ))}
              </Field>
              <ErrorMessage name="teacherId" component="div" className="text-red-500" />
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

export default StudentForm;