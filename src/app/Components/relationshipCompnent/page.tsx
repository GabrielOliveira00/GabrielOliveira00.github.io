"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

const StudentTeacherRelationship: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [enrolledClasses, setEnrolledClasses] = useState<Class[]>([]);
  const [notEnrolledClasses, setNotEnrolledClasses] = useState<Class[]>([]);
  const [message, setMessage] = useState<string>('');

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
    const fetchEnrolledClasses = () => {
      if (selectedStudentId) {
        const studentId = Number(selectedStudentId);
  
        const enrolled = classes.filter((classItem) =>
          classItem.students.some((student) => Number(student.studentId) === studentId)
        );
  
        const notEnrolled = classes.filter((classItem) =>
          !classItem.students.some((student) => Number(student.studentId) === studentId)
        );
  
        setEnrolledClasses(enrolled);
        setNotEnrolledClasses(notEnrolled);

      } else {
        
        setEnrolledClasses([]);
        setNotEnrolledClasses([]);
      }
    };
  
    fetchEnrolledClasses();
  }, [selectedStudentId, classes]);
  

  console.log(students)
  console.log(classes)
  const handleJoinClass = async (studentId: string, classId: string) => {
    const selectedStudent = students.filter(student => studentId.includes(student.id));
    const selectedClass = classes.find((classItem) => classItem.id === classId);

    console.log(selectedStudent)
    console.log(selectedClass)

    if (!selectedStudent || !selectedClass) {
      setMessage('Invalid student or class selection.');
      return;
    }
  
    if (selectedClass.students.length >= 4) {
      setMessage('This class already has the maximum of 4 students.');
      return;
    }
  
    const teacherId = selectedClass.teacherId;
    const teacherStudentsCount = classes
      .filter((classItem) => classItem.teacherId === teacherId)
      .reduce((count, classItem) => count + classItem.students.length, 0);
  
    if (teacherStudentsCount >= 4) {
      setMessage('This teacher already has the maximum of 4 students.');
      return;
    }

    const StudentsCount = students
      .filter((studentList) => studentList.id === selectedStudent[0].id)
      .reduce((count, studentList) => count + studentList.classes.length, 0);
  

    if (StudentsCount >= 4) {
      setMessage('This student already has the maximum of 4 students.');
      return;
    }
    console.log(StudentsCount)
  
    try {
      await axios.post(`http://localhost:3005/classes/${classId}/join`, {
        id: studentId, 
      });
  
      setMessage('Student joined the class successfully!');  
      setEnrolledClasses((prev) => [...prev, selectedClass]);
      setNotEnrolledClasses((prev) =>
        prev.filter((classItem) => classItem.id !== classId)
      );
 
    } catch (error) {
      setMessage('Error joining the student to the class.');
      console.error('Join error:', error);
    }
  };
  
  const handleLeaveClass = async (studentId: string, classId: string) => {
    const selectedStudent = students.filter(student => studentId.includes(student.id));
    const selectedClass = classes.find((classItem) => classItem.id === classId);
  
    console.log('Selected Class:', selectedClass);
    console.log('Selected Student:', selectedStudent);
  
    if (!selectedStudent || !selectedClass) {
      setMessage('Invalid student or class selection.');
      return;
    }
  
    try {
      await axios.post(`http://localhost:3005/classes/${classId}/leave`, {
        id: studentId, 
      });
  
      setMessage('Student removed from the class successfully!');
  
      setEnrolledClasses((prev) =>
        prev.filter((classItem) => classItem.id !== classId)
      );
  
      setNotEnrolledClasses((prev) => [...prev, selectedClass]);
    } catch (error) {
      setMessage('Error removing the student from the class.');
      console.error('Leave error:', error);
    }
  };
  

  return (
    <div className="max-w-3xl mx-auto p-6 text-black bg-gray-300 shadow-lg rounded-lg">
      <label htmlFor="student-select" className="block text-lg font-medium text-gray-700 mb-2">Selecione um Aluno:</label>
      {message && <p className="mb-4 text-green-500">{message}</p>}
      <select
        id="student-select"
        className="w-full px-4 py-2 mb-6 border border-gray-300 text-black rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        onChange={(e) => setSelectedStudentId(e.target.value)}
        value={selectedStudentId || ''}
      >
        <option value="">-- Selecione um Aluno --</option>
        {students.map(student => (
          <option key={student.id} value={student.id}>{student.name}</option>
        ))}
      </select>

      {selectedStudentId && (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Aulas em que o aluno está inscrito:</h3>
            {enrolledClasses.length > 0 ? (
              enrolledClasses.map(option => (
                <div key={option.id} className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">{option.title}</span>
                  <button
                    onClick={() => handleLeaveClass(selectedStudentId, option.id)}
                    className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition"
                  >
                    Sair
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Nenhuma inscrição encontrada.</p>
            )}
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Aulas disponíveis para o aluno:</h3>
            {notEnrolledClasses.length > 0 ? (
              notEnrolledClasses.map(option => (
                <div key={option.id} className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">{option.title}</span>
                  <button
                    onClick={() => handleJoinClass(selectedStudentId, option.id)}
                    className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 transition"
                  >
                    Juntar-se
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Nenhuma aula disponível para inscrição.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentTeacherRelationship;