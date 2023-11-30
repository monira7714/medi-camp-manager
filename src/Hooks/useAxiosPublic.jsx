import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://final-assignment-server-idtdwf279-moniras-projects.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;