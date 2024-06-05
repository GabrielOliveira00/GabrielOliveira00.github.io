import { useQuery } from "react-query";
import axios from "axios";
import { TeacherResponse } from "@/app/Interfaces";



 const fetchData = async () => {   
    const response = await axios.get('https://crudcrud.com/api/867d6b911ca747e8bda2a6805c0c4a17/teacher');
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