"use client";

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/navigation'
import * as Yup from 'yup';
import useStudentSubmitData from '../studentSubmitData/useStudentSubmitData';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useQuery } from 'react-query';

const queryClient = new QueryClient();

const fetchApiData = async () => {
  const response = await fetch('https://crudcrud.com/api/ac7871a8422c4def9fc87e95136ddf40/teacher');
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
  const submitDataMutation = useStudentSubmitData();
  const router = useRouter();

  const { data, isLoading, isError } = useQuery('apiData', fetchApiData);
  
  if (isLoading) return <option>Loading...</option>;
  if (isError) return <option>Please Register a Teacher</option>;

  
  const handleSubmit = async (values: FormValues) => {
    try {
      await submitDataMutation.mutateAsync(values);
      router.push('/')
      console.log('Teacher data submitted successfully');
    } catch (error) {
      console.error('Error submitting teacher data:', error);
    }
  };
  return (
    <QueryClientProvider client={queryClient}>
    <div className='flex justify-center items-center w-full h-screen'>
      <div className="bg-gradient-to-b from-blue-500 to-blue-800 p-8 rounded-lg grid grid-cols-1 content-center">
        <h2 className="text-2xl font-bold mb-4 flex items-center justify-center">Student Form</h2>
        <Formik
          initialValues={{ firstName: '', lastName: '', subject: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-4">
              <label htmlFor="firstName" className="block text-white">First Name</label>
              <Field type="text" id="firstName" name="firstName" className="mt-1 p-2 block w-full rounded-md bg-white text-black" />
              <ErrorMessage name="firstName" component="div" className="text-red-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block text-white">Last Name</label>
              <Field type="text" id="lastName" name="lastName" className="mt-1 p-2 block w-full rounded-md bg-white text-black" />
              <ErrorMessage name="lastName" component="div" className="text-red-500" />
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
              <button type="button" onClick={() => router.push('/')} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full transition duration-200 ease-in-out transform hover:scale-105">Cancel</button>
              <button type="submit" className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105">Submit</button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
    </QueryClientProvider>
  );
};

export default StudentForm;