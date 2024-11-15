"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Student {
  id: string;
  name: string;
  email: string;
}

interface StudentClasses {
  classId: string;
  studentId: string;
}

interface Class {
  id: string;
  title: string;
  teacherId: string;
  students: Array<{
    classId: string;
    studentId: string;
  }>
}

interface StudentClassRelation {
  id: string;
  title: string;
  teacherId: string;
  students: Array<{
    assignedAt: string;
    assignedBy: string;
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
    testing();
  }, []);

  const testing = async () => {
    
    const classesList = await axios.get(`http://localhost:3005/classes`);
    
  }

  console.log(classes)

  useEffect(() => {
    const fetchEnrolledClasses = async () => {

      if (selectedStudentId) {
        try {
          const currentSelectedStudent = await axios.get(`http://localhost:3005/students/${selectedStudentId}`);
          const classesList = await axios.get(`http://localhost:3005/classes`);

          const enrolledClassesIds = classesList.data.map((relation: StudentClassRelation) => relation.students);
          // const teste = classes.filter(option => !currentSelectedStudent(option.id));

        console.log(students)
        console.log(currentSelectedStudent.data)
        console.log(classesList.data.filter((option: Class) => !selectedStudentId.includes(option.id)));
        } catch (error) {
          console.error('Erro ao buscar aulas do aluno:', error);
        }
      }
    };

    fetchEnrolledClasses();
  }, [selectedStudentId, classes]);

      /*
          const enrolled = classes.filter(option => enrolledClassesIds.includes(option.id));
          const notEnrolled = classes.filter(option => !enrolledClassesIds.includes(option.id));
          setEnrolledClasses(enrolled);
          setNotEnrolledClasses(notEnrolled);      
          */

  const handleJoinClass = async (classId: string) => {
    if (selectedStudentId) {
      try {
        await axios.post(`http://localhost:3005/classes/${classId}/join`, { selectedStudentId });
        setEnrolledClasses([...enrolledClasses, classes.find(option => option.id === classId)!]);
        setNotEnrolledClasses(notEnrolledClasses.filter(option => option.id !== classId));
      } catch (error) {
        console.error('Erro ao se juntar à aula:', error);
      }
      console.log(classId)
      console.log(selectedStudentId)
    }
  };

  const handleLeaveClass = async (classId: string) => {
    if (selectedStudentId) {
      try {
        await axios.post(`http://localhost:3005/classes/${selectedStudentId}/leave`, { classId });
        setNotEnrolledClasses([...notEnrolledClasses, classes.find(option => option.id === classId)!]);
        setEnrolledClasses(enrolledClasses.filter(option => option.id !== classId));
      } catch (error) {
        console.error('Erro ao sair da aula:', error);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 text-black bg-gray-300 shadow-lg rounded-lg">
      <label htmlFor="student-select" className="block text-lg font-medium text-gray-700 mb-2">Selecione um Aluno:</label>
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
                    onClick={() => handleLeaveClass(option.id)}
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
                    onClick={() => handleJoinClass(option.id)}
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