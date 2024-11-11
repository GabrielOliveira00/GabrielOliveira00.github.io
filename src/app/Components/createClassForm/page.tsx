"use client"
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';

type Teacher = {
  id: number;
  name: string;
};

const CreateClassForm: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    axios.get('http://localhost:3005/teachers')
      .then(response => setTeachers(response.data))
      .catch(error => console.error('Error fetching teachers:', error));
  }, []);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    teacherId: Yup.number().required('Please select a teacher').min(1, 'Select a valid teacher'),
    published: Yup.boolean(),
  });

  const handleSubmit = async (values: { title: string; teacherId: number}) => {
    try {
      const response = await axios.post('http://localhost:3005/classes/', {
        title: values.title,
        teacherId: values.teacherId,

      });
      setMessage('Class created successfully!');
    } catch (error) {
      console.error('Error creating class:', error);
      setMessage('Error creating class');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white text-black shadow-md rounded-md">
      <h1 className="text-2xl font-semibold mb-4">Create a New Class</h1>

      {message && <p className="mb-4 text-green-500">{message}</p>}

      <Formik
        initialValues={{ title: '', teacherId: 0 }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <div className="mb-4">
              <label className="block mb-1">Class Title:</label>
              <Field
                type="text"
                name="title"
                placeholder="Enter class title"
                className="border p-2 rounded w-full"
              />
              <ErrorMessage name="title" component="div" className="text-red-500" />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Select Teacher:</label>
              <Field
                as="select"
                name="teacherId"
                className="border p-2 rounded w-full"
                value={values.teacherId}
                onChange={(e:any) => setFieldValue('teacherId', Number(e.target.value))}
              >
                <option value={0}>Select a teacher</option>
                {teachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="teacherId" component="div" className="text-red-500" />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              disabled={values.teacherId === 0}
            >
              Create Class
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateClassForm;
