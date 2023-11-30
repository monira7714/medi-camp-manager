import { useForm } from "react-hook-form";
import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddCamp = () => {
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = async (data) => {
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            const campInfo = {
                name: data.camp,
                img: res.data.data.display_url,
                date_time: data.date_time,
                location: data.location,
                service: data.service,
                professionals: data.professionals,
                audience: data.audience,
                fee: data.fee,
                details: data.details,
                email: data.emai
            }
            console.log(campInfo);
            const campRes = await axiosSecure.post('/addCamp', campInfo);
            if (campRes.data.insertedId) {
                console.log('Camp added to the database')
                reset();
                Swal.fire({
                    icon: 'success',
                    title: 'Congratulations',
                    text: 'You have added a camp successfully',
                })
            }
           
        }
    }




return (
    <div>
        <Helmet>
            <title>Dashboard | Add Camp</title>
        </Helmet>
        <Card color="transparent" shadow={false}>
            <Typography className="text-center" variant="h2" color="blue-gray"> Add A Camp</Typography>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 mb-2 w-2/3 mx-auto">
                <div className="mb-1 flex flex-col gap-6">
                    <Input size="lg" label="Camp Name" {...register("camp", { required: true })} />
                    <Input size="lg" label="Image URL" {...register("image", { required: true })} type="file"/>
                    <Input size="lg" label="Camp Fee" {...register("fee", { required: true })} />
                    <Input size="lg" label="Date and Time" {...register("date_time", { required: true })} />
                    <Input size="lg" label="Location" {...register("location", { required: true })} />
                    <Input size="lg" label="Specialized Service Provided" {...register("service", { required: true })} />
                    <Input size="lg" label="Healthcare Professionals in Attendance" {...register("professionals", { required: true })} />
                    <Input size="lg" label="Target Audience" {...register("audience", { required: true })} />
                    <Input size="lg" label="Descriptions" {...register("details", { required: true })} />
                    <Input size="lg" label="Organizer Email" {...register("email", { required: true })} />
                </div>
                <Button className="my-6 text-xl" fullWidth>
                    <input type="submit" value="Add Camp" />
                </Button>
            </form>
        </Card>
    </div>
);
};

export default AddCamp;