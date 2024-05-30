import { useQuery } from "react-query";
import axios, { AxiosResponse } from "axios";
import { TeacherResponse } from "@/app/Interfaces";

{/* @ts-expect-error async server Component */}

const fetchData = async (): AxiosResponse<TeacherResponse> => {    
    const response = await axios.get<TeacherResponse>('https://crudcrud.com/api/e262e8c327214729b48366c5f91988fb/teacher');
    return response;
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