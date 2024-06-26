import { useQuery } from "react-query";
import axios from "axios";
import { StudentResponse } from "@/app/Interfaces";



const fetchData = async () => {   
    const response = await axios.get('https://crudcrud.com/api/baa5b0031d014e05b54e62ea7041dbf0/Student');
    return response;
};

console.log(fetchData)
export const useStudentData = () =>{
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['student-data'],
        retry: false,
    })

    return {
        ...query,
        data: query.data?.data
    }
}