/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();
interface FormData {
  id: number;
  name: string;
  email: string;
}

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),  
});

const StudentFormUpdate = () => {   
  const params = useParams(); 
  const router = useRouter();
  const { id } = params;
  const [formData, setFormData] = useState<FormData | null>(null)
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      const fetchItem = async () => {
        try {
          const response = await axios.get<FormData>(`http://localhost:3005/students/${id}`);
          setFormData(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching item:', error);
          setLoading(false);
        }
      };
      fetchItem();
    }
  }, [id]);

  const handleSubmit = async (values: FormData) => {
    try {
      await axios.patch(`http://localhost:3005/students/${id}`, values); 
      router.push('/');
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  if (loading || !formData) {
    return <div>Loading...</div>;
  }

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
            initialValues={formData}
            validationSchema={validationSchema} 
            onSubmit={handleSubmit}            
          >
            {({ isSubmitting }) => (
              <Form>
                <div>
                  <Field type="text" name="name" placeholder="Full Name" className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                  <ErrorMessage name="name" component="div" />
                </div>
                <div>
                  <Field type="email" name="email" placeholder="Email" className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                  <ErrorMessage name="email" component="div" />
                </div>
                <div className='flex justify-between'>
                  <button type="button" onClick={() => router.push('/')} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition duration-200 ease-in-out transform hover:scale-105">← Back</button>
                   <button type="submit" className=" bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105" disabled={isSubmitting}>
                    {isSubmitting ? 'Updating...' : 'Update'}
                  </button>                  
               </div>               
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
    </QueryClientProvider>
  );
};

export default StudentFormUpdate;