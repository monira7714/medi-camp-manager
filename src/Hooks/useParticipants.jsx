import { Spinner } from "@material-tailwind/react";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "./useAxiosSecure";

const useParticipants = () => {

    // const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic();

    const { data: participants, isPending, refetch } = useQuery({
        queryKey: ['participants'],
        queryFn: async() =>{
            const res = await axiosPublic.get('/joinCamp');
            return res.data
        }
    })

    if (isPending) {
        return <Spinner className="h-16 w-16 text-gray-900/50 text-center" />
    }

    return {participants, refetch}
};

export default useParticipants;