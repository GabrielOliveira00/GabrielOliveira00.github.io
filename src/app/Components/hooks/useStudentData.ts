import { useQuery } from "react-query";
import axios from "axios";
import { StudentResponse } from "@/app/Interfaces";



const fetchData = async () => {   
    const response = await axios.get('https://crudcrud.com/api/867d6b911ca747e8bda2a6805c0c4a17/Student');
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