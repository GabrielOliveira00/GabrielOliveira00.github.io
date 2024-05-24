"use client";

import React from 'react';
import { useRouter } from 'next/navigation'
import { v4 as uuid } from "uuid";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import useSubmitData from '../subData/useSubmitData';
import * as Yup from 'yup';

const getId = uuid().slice(0, 8);

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
  const submitDataMutation = useSubmitData();
  const router = useRouter();
  
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
    <div className='flex justify-center items-center w-full h-screen'>
      <div className="bg-gradient-to-br from-pink-500 to-rose-800 p-8 rounded-lg w-[300px] grid grid-cols-1 content-center">
        <h2 className="text-2xl font-bold mb-4 flex items-center justify-center">Teacher Form</h2>
        <Formik
          initialValues={{ firstName: '', lastName: '', subject: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-4">
              <label htmlFor="firstName" className="block text-gray-700">First Name</label>
              <Field type="text" id="firstName" name="firstName" className="mt-1 p-2 block w-full rounded-md border-gray-300 text-black" />
              <ErrorMessage name="firstName" component="div" className="text-red-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block text-gray-700">Last Name</label>
              <Field type="text" id="lastName" name="lastName" className="mt-1 p-2 block w-full rounded-md border-gray-300 text-black" />
              <ErrorMessage name="lastName" component="div" className="text-red-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="subject" className="block text-gray-700">Subject</label>
              <Field type="text" id="subject" name="subject" className="mt-1 p-2 block w-full rounded-md border-gray-300 text-black" />
              <ErrorMessage name="subject" component="div" className="text-red-500" />
            </div>
            <div className='flex justify-between'>
              <button type="button" onClick={() => router.push('/')} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full transition duration-200 ease-in-out transform hover:scale-105">Cancel</button>
              <button type="submit" className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105">Submit</button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default TeacherForm;