import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { StudentData } from "@/app/Interfaces";


const postData = async (data: StudentData) => {
    return await axios.post('https://crudcrud.com/api/352c3afb135a4ea7abe461f02981c8e1/student', data)
  };

export function useTeacherMutate (){
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: postData,
        onSuccess: ()=>{
            queryClient.invalidateQueries(['student-data'])
        }
    })
    return mutate;
}