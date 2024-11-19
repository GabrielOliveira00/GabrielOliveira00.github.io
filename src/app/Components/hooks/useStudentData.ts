import { useQuery } from "react-query";
import axios from "axios";

const fetchData = async () => {   
    const response = await axios.get('http://localhost:3005/students');
    return response;
};

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