"use client";

import React,{useEffect} from 'react';
import { useRouter } from 'next/navigation'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import useTeacherSubmitData from '../teacherSubmitData/useTeacherSubmitData';
import * as Yup from 'yup';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

interface FormValues {
  firstName: string;
  lastName: string;
  subject: string;
}

const validationSchema = Yup.object({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  subject: Yup.string().required('Subject is required')
});

const TeacherForm: React.FC = () => {
  const submitDataMutation = useTeacherSubmitData();
  const router = useRouter();
  
  const handleSubmit = async (values: FormValues) => {
    localStorage.setItem('formData', JSON.stringify(values));
    alert('Data saved to localStorage');
    sendDataToAPI(values);

    try {
      await submitDataMutation.mutateAsync(values);
      router.push('/')
      console.log('Teacher data submitted successfully');
    } catch (error) {
      console.error('Error submitting teacher data:', error);
    }
  };

  const sendDataToAPI = async (data: FormValues) => {
    try {
      const response = await fetch('https://crudcrud.com/api/29957fd712f84e87a923e3aeaf8e8a15/teacher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Success:', result);
      alert('Data sent to API successfully');
    } catch (error) {
      console.error('Error sending data to API:', error);
      alert('Failed to send data to API');
    }
  };

  useEffect(() => {
    const checkApiData = async () => {
      try {
        const response = await fetch('https://crudcrud.com/api/29957fd712f84e87a923e3aeaf8e8a15/teacher', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const apiData = await response.json();

        if (!apiData || apiData.length === 0) {
          const localData = localStorage.getItem('formData');
          if (localData) {
            const parsedData: FormValues = JSON.parse(localData);
            await sendDataToAPI(parsedData);
          }
        }
      } catch (error) {
        console.error('Error checking API data:', error);
      }
    };

    checkApiData();
  }, []);
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
                <Field type="text" id="subject" name="subject" placeholder="Subject" className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
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

export default TeacherForm;