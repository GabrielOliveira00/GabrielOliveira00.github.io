import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { TeacherData } from "@/app/Interfaces";


const postData = async (data: TeacherData) => {
    return await axios.post('https://crudcrud.com/api/27dbaaa91a1346fa82a9390af4bf56eb/teacher', data)
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