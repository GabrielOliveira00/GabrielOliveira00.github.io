import { useQuery } from "react-query";
import axios from "axios";
import { StudentFixture } from "../usersFixtures/user";



const fetchData = async () => {   
    const response = await axios.get('http://localhost:3005/students');
    console.log(response.data)
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