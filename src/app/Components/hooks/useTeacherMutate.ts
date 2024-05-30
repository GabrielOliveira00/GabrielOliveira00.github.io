import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { TeacherData } from "@/app/Interfaces";


const postData = async (data: TeacherData) => {
    return await axios.post('https://crudcrud.com/api/e262e8c327214729b48366c5f91988fb/teacher', data)
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