"use client";

import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';

type Student = {
  id: string;
  name: string;
  email:string;
  teachersCount: number;
};

interface Teacher {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

type Class = {
  id: string;
  teacherId: string;
  title: string;
  teacher: Teacher;  
  studentsCount: number;
};

const StudentTeacherRelationship: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [message, setMessage] = useState<string>('');



  useEffect(() => {
    axios.get('http://localhost:3005/students')
      .then((response) => setStudents(response.data))
      .catch((error) => console.error('Error fetching students:', error));

    axios.get('http://localhost:3005/classes')
      .then((response) => setClasses(response.data))
      .catch((error) => console.error('Error fetching classes:', error));
   
  }, []);

  const handleJoin = async (studentId: string, classTitle: string) => {
    const selectedStudent = students.find((student) => student.name === studentId);
    const selectedClass = classes.find((classItem) => classItem.title === classTitle);

    console.log(selectedClass);
    console.log(selectedStudent);

    if (!selectedStudent || !selectedClass) {
      setMessage('Invalid student or class selection.');
      return;
    }
    
    if (selectedStudent.teachersCount >= 4) {
      setMessage('This student already has the maximum of 4 teachers.');
      return;
    }

    if (selectedClass.studentsCount >= 4) {
      setMessage('This class/teacher already has the maximum of 4 students.');
      return;
    }

    try {
      await axios.post(`http://localhost:3005/classes/${classTitle}/join`, {
        name: studentId

      });
      setMessage('Student joined the class successfully!');
    } catch (error) {
      setMessage('Error joining the student to the class.');
      console.error('Join error:', error);
    }
  };

  const handleChange = (studentId: string, classTitle: string) =>{
    const selectedStudent = students.find((option) => option.id === studentId);
    const selectedClass = classes.find((option) => option.teacherId === classTitle);
    console.log(studentId)
    console.log(classTitle)
    console.log(selectedStudent)
    console.log(selectedClass)

  }

  const handleLeave = async (studentId: string, classTitle: string) => {
    try {
      await axios.post(`http://localhost:3005/classes/${classTitle}/leave`, {
        id: studentId,
      });
      setMessage('Student left the class successfully!');
    } catch (error) {
      setMessage('Error removing the student from the class.');
      console.error('Leave error:', error);
    }
  };

  console.log(students)
  console.log(classes)

  return (
    <div className="p-4"> 
      <h1 className="text-2xl mb-4">Test Student-Teacher Relationship</h1>
      {message && <p className="mb-4 text-green-500">{message}</p>}
      <Formik
        initialValues={{ studentId: '', teacherId: '' }}
        onSubmit={(values, { resetForm }) => {
          if (values.studentId && values.teacherId) {
            handleChange(values.studentId, values.teacherId);
          }
          resetForm();
        }}
      >
        {({ values }) => (
          <Form className="mb-4 text-black">
            <div className="mb-2">
              <label className="block mb-1">Select Student:</label>
              <Field as="select" name="studentId" className="border p-2 rounded w-full">
                <option value="">Select a student</option>
                {students.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name} - {option.teachersCount} / 4 teachers
                  </option>
                ))}
              </Field>
            </div>
            <div className="mb-4">
              <label className="block mb-1">Select Class (and Teacher):</label>
              <Field as="select" name="teacherId" className="border p-2 rounded w-full">
                <option value="">Select a class</option>
                {classes.map((option) => (
                  <option key={option.teacherId} value={option.teacherId}>
                    {option.title} - Taught by {option.teacher.name} - {option.studentsCount} / 4 students
                  </option>
                ))}
              </Field>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              disabled={!values.studentId || !values.teacherId}
            >
              Join Class
            </button>
          </Form>
        )}
        
      </Formik>
      <Formik
        initialValues={{ studentId: '', teacherId: '' }}
        onSubmit={(values, { resetForm }) => {
          if (values.studentId && values.teacherId) {
            handleLeave(values.studentId, values.teacherId);
          }
          resetForm();
        }}
      >
        {({ values }) => (
          <Form className='text-black'>
            <div className="mb-2">
              <label className="block mb-1">Select Student:</label>
              <Field as="select" name="studentId" className="border p-2 rounded w-full">
                <option value="">Select a student</option>
                {students.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </Field>
            </div>
            <div className="mb-4">
              <label className="block mb-1">Select Class (and Teacher):</label>
              <Field as="select" name="teacherId" className="border p-2 rounded w-full">
                <option value="">Select a class</option>
                {classes.map((option) => (
                  <option key={option.teacherId} value={option.title}>
                    {option.title} - Taught by {option.teacher.name} - {option.studentsCount} / 4 students
                  </option>
                ))}
              </Field>
            </div>
            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded"
              disabled={!values.studentId || !values.teacherId}
            >
              Leave Class
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default StudentTeacherRelationship;