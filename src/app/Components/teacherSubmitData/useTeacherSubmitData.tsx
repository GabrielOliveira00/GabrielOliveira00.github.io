// useSubmitData.ts

import { useMutation } from 'react-query';

interface TeacherFormValues {
  firstName: string;
  lastName: string;
  subject: string;
}

interface TeacherApiResponse {
    success: boolean;
    message: string;
    // You can include additional fields if needed
  }

const teacherSubmitData = async (formData: TeacherFormValues): Promise<TeacherApiResponse> => {
    const response = await fetch('https://crudcrud.com/api/29957fd712f84e87a923e3aeaf8e8a15/teacher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
    
      if (!response.ok) {
        throw new Error('Failed to submit data');
      }
    
      return response.json();
    };
    
const useTeacherSubmitData = () => {
  return useMutation(teacherSubmitData);
};

export default useTeacherSubmitData;
