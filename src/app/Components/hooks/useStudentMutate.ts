import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { StudentData } from "@/app/Interfaces";


const postData = async (data: StudentData) => {
    return await axios.post('http://localhost:3005/students', data)
  };

export function useStudentData (){
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: postData,
        onSuccess: ()=>{
            queryClient.invalidateQueries(['student-data'])
        }
    })
    return mutate;
}