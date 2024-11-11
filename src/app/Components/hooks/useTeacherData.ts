import { useQuery } from "react-query";
import axios from "axios";
import { TeacherResponse } from "@/app/Interfaces";



 const fetchData = async () => {   
    const response = await axios.get('http://localhost:3005/teachers');
    return response
};

export const useTeacherData = () =>{
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['teacher-data'],
        retry: false,
    })

    return {
        ...query,
        data: query.data?.data
    }
}