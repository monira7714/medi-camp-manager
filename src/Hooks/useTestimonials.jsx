import { Spinner } from "@material-tailwind/react";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useTestimonials = () => {const axiosPublic = useAxiosPublic();

    const { data: reviews, isPending, refetch} = useQuery({
        queryKey: ['reviews'],
        queryFn: async() => {
            const res = await axiosPublic.get('/reviews');
            return res.data;
        }
    })
    if (isPending) {
        return <Spinner className="h-16 w-16 text-gray-900/50 text-center" />
    }

    return {reviews, refetch}
};

export default useTestimonials;