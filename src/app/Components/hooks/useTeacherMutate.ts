import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { TeacherData } from "@/app/Interfaces";


const postData = async (data: TeacherData) => {
    return await axios.post('http://localhost:3005/teachers', data)
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