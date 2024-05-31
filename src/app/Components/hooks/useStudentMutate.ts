import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { StudentData } from "@/app/Interfaces";


const postData = async (data: StudentData) => {
    return await axios.post('https://crudcrud.com/api/27dbaaa91a1346fa82a9390af4bf56eb/student', data)
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