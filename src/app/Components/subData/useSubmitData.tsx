// useSubmitData.ts

import { useMutation } from 'react-query';

interface FormValues {
  firstName: string;
  lastName: string;
  subject: string;
}

interface ApiResponse {
    success: boolean;
    message: string;
    // You can include additional fields if needed
  }

const submitData = async (formData: FormValues): Promise<ApiResponse> => {
    const response = await fetch('https://crudcrud.com/api/ac7871a8422c4def9fc87e95136ddf40/teste', {
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
    
const useSubmitData = () => {
  return useMutation(submitData);
};

export default useSubmitData;
