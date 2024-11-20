/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { QueryClient, QueryClientProvider } from 'react-query'
import axios from 'axios';

const queryClient = new QueryClient();

interface FormData {
  id: number;
  name: string;
  email: string;
  avatar: string;  
}

interface Student {
  id: string;
  name: string;
  email: string;
  classes: Array<{
    classId: string;
    studentId: string;
  }>;
  teachersCount: number;
}

interface Class {
  id: string;
  title: string;
  teacherId: string;
  students: Array<{
    classId: string;
    studentId: string;
  }>;
}

export default function SummaryCard ()  {
  const params = useParams(); 
  const router = useRouter();
  const { id } = params;
  const [formData, setFormData] = useState<FormData | null>(null)
  const [enrolledClasses, setEnrolledStudents] = useState<Student[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);

  useEffect(() => {
    if (id) {
      const fetchItem = async () => {
        try {
          const response = await axios.get<FormData>(`http://localhost:3005/teachers/${id}`);
          setFormData(response.data);
        } catch (error) {
          console.error('Error fetching item:', error);
        }
      };
      fetchItem();
    }
  }, [id]);

  useEffect(() => {
    const fetchStudentsAndClasses = async () => {
      try {
        const [studentsRes, classesRes] = await Promise.all([
          axios.get('http://localhost:3005/students'),
          axios.get('http://localhost:3005/classes')
        ]);
        setStudents(studentsRes.data);
        setClasses(classesRes.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };
    fetchStudentsAndClasses();
  }, []);

  useEffect(() => {
    const fetchProfessorClassesAndStudents = async () => {
      try {
        const selectedTeacherId = formData?.id; 

        const professorClasses = classes.filter(
          (classItem) => Number(classItem.teacherId) === Number(selectedTeacherId)
        );
  
        const studentIdsInClasses = professorClasses
          .flatMap((classItem) => classItem.students.map((student) => student.studentId));
  
        const studentsInClasses = students.filter((student) =>
          studentIdsInClasses.includes(student.id)
        );
  
        setEnrolledStudents(studentsInClasses);
      } catch (error) {
        console.error('Erro ao buscar alunos das aulas do professor:', error);
        setEnrolledStudents([]);
      }
    };
  
    fetchProfessorClassesAndStudents();
  }, [formData, classes, students]);

    return(
      <QueryClientProvider client={queryClient}>
        <div className='min-h-screen bg-gray-800 flex flex-col justify-center'>
          <div className='relative sm:mx-auto inset-0 bg-gradient-to-r from-indigo-700 to-purple-500 shadow-lg rounded-t-3xl w-[350px]'>            
            <div className='flex flex-col rounded w-full'>
              <img src={formData?.avatar} className='pb-2 w-full h-[220px] rounded-t-3xl'></img>
              <div className='h-[180px] flex flex-col justify-center mx-4 items-start text-lg'>
                  <p className=''>Full Name: {formData?.name} </p>
                  <p className='py-2'>Student ID: {formData?.id}</p>
                  <p>Email: {formData?.email} </p>        
              </div>
              <div className=' border-b-2 w-full'></div>
              <div className="w-full h-[200px] relative flex flex-col items-center justify-between shadow-lg mt-4 mb-4 appearance-none rounded">
                <h3 className="text-xl font-semibold mb-4 mx-4 flex justify-center ">Aulas Inscrito:</h3>
                {enrolledClasses.length > 0 ? (
                  enrolledClasses.map(option => (
                    <div key={option.id} className="flex justify-between items-center w-full mx-4 my-1 py-1 px-3 shadow-md bg-indigo-200 text-indigo-700 leading-tight focus:outline-none focus:shadow-outline">
                      <span className="text-gray-700">{option.name}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">Nenhuma inscrição encontrada.</p>
                )}
              </div>
              <div className='flex justify-between w-full py-2 px-4'>
                  <Link href={`/Components/studentEdit/${formData?.id}`} className="bg-green-600 opacity-80 hover:bg-green-700 text-white font-semibold px-[10px] py-[6px] flex items-center text-center justify-center transition rounded-md duration-200 ease-in-out transform">
                    Edit
                  </Link>
                  <button type="button" onClick={() => router.push('/')} className="bg-red-500 hover:bg-red-600 text-white font-semibold px-[10px] py-[6px] flex items-center text-center justify-center transition rounded-md duration-200 ease-in-out transform">Back</button>
                </div>
            </div>      
          </div>      
        </div>
      </QueryClientProvider>
    )
}