// useSubmitData.ts

import { useMutation } from 'react-query';

interface StudentFormValues {
  firstName: string;
  lastName: string;
  subject: string;
}

interface StudentApiResponse {
    success: boolean;
    message: string;
    // You can include additional fields if needed
  }

const studentSubmitData = async (formData: StudentFormValues): Promise<StudentApiResponse> => {
    const response = await fetch('https://crudcrud.com/api/29957fd712f84e87a923e3aeaf8e8a15/student', {
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
    
const useStudentSubmitData = () => {
  return useMutation(studentSubmitData);
};

export default useStudentSubmitData;
