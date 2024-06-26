import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { TeacherData } from "@/app/Interfaces";


const postData = async (data: TeacherData) => {
    return await axios.post('https://crudcrud.com/api/baa5b0031d014e05b54e62ea7041dbf0/teacher', data)
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