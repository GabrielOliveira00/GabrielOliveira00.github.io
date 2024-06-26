import { useQuery } from "react-query";
import axios from "axios";
import { TeacherResponse } from "@/app/Interfaces";



 const fetchData = async () => {   
    const response = await axios.get('https://crudcrud.com/api/baa5b0031d014e05b54e62ea7041dbf0/teacher');
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