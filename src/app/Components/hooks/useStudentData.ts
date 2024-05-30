import { useQuery } from "react-query";
import axios, { AxiosResponse } from "axios";
import { StudentResponse } from "@/app/Interfaces";

{/* @ts-expect-error async server Component */}

const fetchData = async (): AxiosResponse<StudentResponse> => {    
    const response = await axios.get<StudentResponse>('https://crudcrud.com/api/e262e8c327214729b48366c5f91988fb/Student');
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