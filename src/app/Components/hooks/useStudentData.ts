import { useQuery } from "react-query";
import axios from "axios";
import { StudentResponse } from "@/app/Interfaces";



const fetchData = async () => {   
    const response = await axios.get('https://crudcrud.com/api/27dbaaa91a1346fa82a9390af4bf56eb/Student');
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