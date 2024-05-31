import { useQuery } from "react-query";
import axios from "axios";
import { TeacherResponse } from "@/app/Interfaces";



 const fetchData = async () => {   
    const response = await axios.get('https://crudcrud.com/api/27dbaaa91a1346fa82a9390af4bf56eb/teacher');
    console.log(response.data)
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