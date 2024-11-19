"use client";

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import { QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';

const queryClient = new QueryClient();

type FormValues = {
  name: string;
  email: string;
  avatar: string;
};

const validationSchema = Yup.object({
  name: Yup.string().required('Full Name is required'),
  email: Yup.string().email().required('Email is required'),
  avatar: Yup.string().required('Email is required'),
});

const TeacherForm: React.FC = () => {
  const router = useRouter();

  const handleSubmit = (data: FormValues) => {
    localStorage.setItem('formData', JSON.stringify(data));
    axios.post('http://localhost:3005/teachers', {
      name: data.name,
      email: data.email,
      avatar: data.avatar,
    });
    router.push('/');
    console.log(data);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-800 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-indigo-400 shadow-lg transform -skew-y-5 -rotate-6 rounded-3xl" />
          <div className="relative sm:max-w-xl sm:mx-auto text-white px-4 py-10 bg-gradient-to-r from-indigo-700 to-purple-500 shadow-lg sm:rounded-3xl sm:p-20">
            <div className="flex justify-center items-center h-12">
              <h2 className="text-2xl font-bold mt-6 flex items-center justify-center absolute top-8">
                Teacher Form!
              </h2>
              <p className="text-gray-300 mb-4">Register a new Teacher.</p>
            </div>
            <Formik
              initialValues={{ name: '', email: '', avatar: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form>
                  <div className="mb-4">
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Full name"
                      className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-gray-300"
                    />
                  </div>
                  <div className="mb-4">
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      placeholder="E-mail"
                      className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-gray-300"
                    />
                  </div>
                  <div className="mb-4">
                    <Field
                      type="text"
                      id="avatar"
                      name="avatar"
                      placeholder="Avatar URL"
                      className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <ErrorMessage
                      name="avatar"
                      component="div"
                      className="text-gray-300"
                    />
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => router.push('/')}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition duration-200 ease-in-out transform hover:scale-105"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                    >
                      Submit →
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

export default TeacherForm;
