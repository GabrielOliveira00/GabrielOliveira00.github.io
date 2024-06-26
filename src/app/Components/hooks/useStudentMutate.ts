import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { StudentData } from "@/app/Interfaces";


const postData = async (data: StudentData) => {
    return await axios.post('https://crudcrud.com/api/baa5b0031d014e05b54e62ea7041dbf0/student', data)
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