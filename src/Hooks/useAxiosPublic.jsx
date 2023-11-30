import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://final-assignment-server-zeta.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;