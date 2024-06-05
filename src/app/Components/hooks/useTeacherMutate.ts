import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { TeacherData } from "@/app/Interfaces";


const postData = async (data: TeacherData) => {
    return await axios.post('https://crudcrud.com/api/867d6b911ca747e8bda2a6805c0c4a17/teacher', data)
  };

export function useTeacherMutate (){
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: postData,
        onSuccess: ()=>{
            queryClient.invalidateQueries(['teacher-data'])
        }
    })
    return mutate;
}