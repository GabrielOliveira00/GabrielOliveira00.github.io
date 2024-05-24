"use client";

import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/navigation'
import * as Yup from 'yup';
import axios from 'axios';
import { v4 as uuid } from "uuid";
import useSubmitData from '../subData/useSubmitData';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();


const getId = uuid().slice(0, 8);

interface Teacher {
  firstName: '',
  lastName: '',
  subject: '',
}

const validationSchema = Yup.object({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
});

const StudentForm: React.FC = () => {

  const router = useRouter();
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  console.log(teachers)
  useEffect(() => {

    axios.get<Teacher[]>('https://crudcrud.com/api/8463840201af4f68b17be3be5f81af40/teachers')
      .then(response => {
        setTeachers(response.data);
      })
      .catch(error => {
        console.error('Error fetching teachers:', error);
      });
  }, []);

  const submitDataMutation = useSubmitData();

  const handleSubmit = async (values: Teacher) => {
    try {
      await submitDataMutation.mutateAsync(values);
      console.log('Student data submitted successfully');
    } catch (error) {
      console.error('Error submitting student data:', error);
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
                {teachers.map(teacher => (
                  <option key={getId} className='text-black'>{teacher.firstName} {teacher.lastName} </option>
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