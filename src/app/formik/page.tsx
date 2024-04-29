"use client"

import { Form, Formik,Field, useFormik, ErrorMessage } from "formik";
import { useState } from "react";
import * as yup from "yup";

export default function Home() {

  const [data, setData] = useState({
    first_name:"",
    last_name: "",
    email: "",
    password: "",
  })

  const handleRequest = (formData: any ) =>{
    console.log("form Submitted",  formData)
  }

  const [currentStep, setCurrentSetep] = useState(0)

  const handleNextStep = (newData: any, last = false) => {
    setData(prev => ({...prev, ...newData}))

    if(last){
      handleRequest(newData)
    }
    setCurrentSetep(prev => prev + 1)
  }
  const handlePrevStep = (newData: any) => {
    setData(prev => ({...prev, ...newData}))
    setCurrentSetep(prev => prev - 1)
  }

  const steps = [
    <StepOne key="firstStep" next={handleNextStep} data={data}/> ,
    <StepTwo key="secondStep" next={handleNextStep} prev={handlePrevStep} data={data} />
  ]

  console.log("data", data)

  return (
    <div>{steps[currentStep]}</div>
  );
}

const stepOneSchema = yup.object({
  first_name: yup.string().required().label("First Name"),
  last_name: yup.string().required().label("Last Name")
})


const StepOne = (props?: any) => {

  const handleSubmit = (values:any) =>{
    props.next(values)
  }

  return(
    <Formik
    validationSchema={stepOneSchema}
      initialValues={props.data}
      onSubmit={handleSubmit}
    >
      {()=>(
        <Form>
          <p>First Name</p>
          <Field name="first_name"></Field>
          <ErrorMessage name="first_name" />
          <p>Last Name</p>
          <Field name="last_name"></Field>
          <ErrorMessage name="last_name" />
          <button type="submit">Next</button>
        </Form>
      )}
    </Formik>
  )
}

const stepTwoSchema = yup.object({
  email: yup.string().email().required().label("Email"),
  password: yup.string().required().label("Password")
})


const StepTwo = (props: any) => {

  const handleSubmit = (values:any) =>{
    props.next(values, true);
  }

  return(
    <Formik
      validationSchema={stepTwoSchema}
      initialValues={props.data}
      onSubmit={handleSubmit}
    >
      {({values})=>(
        <Form>
          <p>Email</p>
          <Field name="email"></Field>
          <ErrorMessage name="email" />
          <p>Password</p>
          <Field name="password"></Field>
          <ErrorMessage name="password" />
          <button type="button" onClick={() => props.prev(values)}>Back</button>
          <button type="submit">Next</button>
        </Form>
      )}
    </Formik>
  )
}

"use client"

import React, { FC, ChangeEvent, useState } from "react";
import { TodoTask } from "./TodoComponents/page";
import { ITask } from "./Interfaces";

const App: FC = () => {  
  const [task, setTask] = useState<string>("");
  const [deadline, setDealine] = useState<string>("");
  const [todoList, setTodoList] = useState<ITask[]>([]);



  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if(event.target.name === "task") {
        setTask(event.target.value);
      } else {
        setDealine(event.target.value);
      }    
  
  };

  const addTask = (): void => {
    const newTask = { taskName: task, deadline: deadline };
    if (newTask.taskName.length === 0 || newTask.deadline.length === 0){
      alert("Please, fill all fields!");
    } else {
    setTodoList([...todoList, newTask]);
    setTask("");
    setDealine("");
  }

  console.log(newTask.taskName)
  };

  const completeTask = (taskNameToDelete: string): void => {
    setTodoList(
      todoList.filter((task) => {
        return task.taskName != taskNameToDelete;
      })
    );
  };

  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Task..."
            name="task"
            value={task}
            onChange={handleChange}
          />
          <input
            type="date"
            value={deadline}
            name="deadline"
            onChange={handleChange}
          />
        </div>
        <button type="submit" onClick={addTask}>Add Task</button>
      </div>
      <div className="todoList">
        {todoList.map((task: ITask, key: number) => {
          return <TodoTask key={key} task={task} completeTask={completeTask} />;
        })}
      </div>
    </div>
  );
};

export default App;