"use client";

import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';


interface Todo {
  id: string;
  taskName: string;
  startDate: string;
  endDate: string;
  student: string;
  teacher: string;
}

const TodoList: React.FC = () => {
  const initialValues: Todo = {
    id: '',
    taskName: '',
    startDate: '',
    endDate: '',
    student: '',
    teacher: ''
  };

  const [todos, setTodos] = useState<Todo[]>([]);
  const [students, setStudents] = useState<string[]>([]);
  const [teachers, setTeachers] = useState<string[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
    
      try {
        const response = await axios.get('https://crudcrud.com/api/66296ec1752c4379a50f13dee9cc1d53/todos');
        
        setTodos(response.data);
        console.log(todos)
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    const fetchStudentsAndTeachers = async () => {
      try {
        const studentsResponse = await axios.get('https://crudcrud.com/api/66296ec1752c4379a50f13dee9cc1d53/students');
        const teachersResponse = await axios.get('https://crudcrud.com/api/66296ec1752c4379a50f13dee9cc1d53/teacher');
        setStudents(studentsResponse.data);
        setTeachers(teachersResponse.data);
      } catch (error) {
        console.error('Error fetching students and teachers:', error);
      }
    };

    fetchTodos();
    fetchStudentsAndTeachers();
  }, []);

  const validationSchema = Yup.object().shape({
    taskName: Yup.string().required('Task name is required'),
    startDate: Yup.date().required('Start date is required'),
    endDate: Yup.date()
      .required('End date is required')
      .min(Yup.ref('startDate'), 'End date must be after start date'),
    student: Yup.string().required('Assigned student is required'),
    teacher: Yup.string().required('Assigned teacher is required')
  });

  const onSubmit = async (values: Todo, { resetForm }: any) => {
    try {
      
      const response = await axios.post('https://crudcrud.com/api/66296ec1752c4379a50f13dee9cc1d53/todos', values);
      const responseTeacher = await axios.post('https://crudcrud.com/api/66296ec1752c4379a50f13dee9cc1d53/teacher', values);
      setTodos([...todos, response.data]);
      setTeachers([...todos, responseTeacher.data])
      resetForm();

    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://crudcrud.com/api/66296ec1752c4379a50f13dee9cc1d53/todos/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="container">
      <div className="hud"></div>
      <div className="content">
        <h1>Todo Task List</h1>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          {({ errors, touched }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="taskName">Task Name:</label>
                <Field type="text" id="taskName" name="taskName" />
                <ErrorMessage name="taskName" component="div" className="error" />
              </div>
              <div className="form-group">
                <label htmlFor="startDate">Start Date:</label>
                <Field type="date" id="startDate" name="startDate" />
                <ErrorMessage name="startDate" component="div" className="error" />
              </div>
              <div className="form-group">
                <label htmlFor="endDate">End Date:</label>
                <Field type="date" id="endDate" name="endDate" />
                <ErrorMessage name="endDate" component="div" className="error" />
              </div>
              <div className="form-group">
                <label htmlFor="student">Assigned Student:</label>
                <Field as="select" id="student" name="student">
                  <option value="">Select Student</option>
                  <option value="monda">Monda</option>
                  <option value="mondinha">Mondinha</option>
                </Field>
                <ErrorMessage name="student" component="div" className="error" />
              </div>
              <div className="form-group">
                <label htmlFor="teacher">Assigned Teacher:</label>
                <Field as="select" id="teacher" name="teacher">
                  <option value="">Select Teacher</option>
                  <option value="poohzao">Poohzao</option>
                  <option value="pooh">Pooh</option>
         
                </Field>
                <ErrorMessage name="teacher" component="div" className="error" />
              </div>
              <button type="submit" className='custom-button'>Add Task</button>
            </Form>
          )}
        </Formik>
        <div className="todo-list">
          <h2>Todo Tasks</h2>
          {todos.map(todo => (
            <div key={todo.id} className="todo-item">
              <div>
                <strong>Task:</strong> {todo.taskName}
              </div>
              <div>
                <strong>Start Date:</strong> {todo.startDate}
              </div>
              <div>
                <strong>End Date:</strong> {todo.endDate}
              </div>
              <div>
                <strong>Student:</strong> {todo.student}
              </div>
              <div>
                <strong>Teacher:</strong> {todo.teacher}
              </div>
              <button onClick={() => handleDelete(todo.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList;