// useSubmitStudentData.ts

import { useMutation, MutationOptions } from 'react-query'; // Import from TanStack Query

interface FormValues {
  firstName: string;
  lastName: string;
  subject: string;
}


interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    firstName: string;
    lastName: string;
    subject: string;
  };
}

const submitStudentData = async (formData: FormValues): Promise<ApiResponse> => {
  const response = await fetch('https://crudcrud.com/api/62fdd35608174a3483d71faadf817211/unicorns', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error('Failed to submit student data');
  }

  return response.json();
};

const useSubmitStudentData = (options?: MutationOptions<ApiResponse, Error, FormValues, unknown>) => {
  return useMutation(submitStudentData, options);
};

export default useSubmitStudentData;
