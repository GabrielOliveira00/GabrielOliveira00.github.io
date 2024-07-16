import { useQuery } from "react-query";
import axios from "axios";
import { TeacherResponse } from "@/app/Interfaces";



 const fetchData = async () => {   
    const response = await axios.get('https://crudcrud.com/api/352c3afb135a4ea7abe461f02981c8e1/teacher');
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