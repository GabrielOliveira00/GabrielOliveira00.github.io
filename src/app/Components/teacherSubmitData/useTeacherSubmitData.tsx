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
    const response = await fetch('https://crudcrud.com/api/ac7871a8422c4def9fc87e95136ddf40/teacher', {
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
