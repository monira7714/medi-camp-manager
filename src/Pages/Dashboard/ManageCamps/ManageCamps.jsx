import { Helmet } from "react-helmet-async";
import { Button, Card, Dialog, Input, Spinner, Typography } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const ManageCamps = () => {
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    const handleOpen = () => setOpen((cur) => !cur);

    const { user } = useAuth()
    const { data: addCamps, isPending, refetch } = useQuery({
        queryKey: ['addCamps'],
        queryFn: async () => {
            const res = await axiosSecure.get('/addCamp');
            return res.data
        }
    })
    if (isPending) {
        return <Spinner className="h-16 w-16 text-gray-900/50 text-center" />
    }
    refetch()

    const organizersCamp = addCamps?.filter(camp => camp.email === user.email)
    // console.log(organizersCamp);

    const onSubmit = (data) => {
        console.log(data);
        const campInfo = {
            name: data.camp,
            date_time: data.date_time,
            location: data.location,
            service: data.service,
            professionals: data.professionals,
            audience: data.audience,
            details: data.details,
            email: data.email,
            id: data.id
        }
        console.log(campInfo);
        axiosSecure.patch(`/update-camp/${campInfo._id}`, campInfo)
        .then(res=>{
            console.log(res.data)
            if(res.data.modifiedCount >= 0){
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `You have updated a camp successfully`,
                            showConfirmButton: false,
                            timer: 1500
                          });
                    }
        })
       
    }
   

    const handleDelete = _id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/delete-camp/${_id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    const TABLE_HEAD = ["Camp Name", "Scheduled Date and Time", "Venue Location", "Specialized Services Provided", "Healthcare Professionals in Attendance", "Target Audience", "Comprehensive Description", "Action"];

    return (
        <div>
            <Helmet>
                <title>Dashboard | Manage Camps</title>
            </Helmet>
            <Card className="h-full lg:w-full md:w-[460px] w-[200px] overflow-scroll">
                <table className="lg:w-[900px] table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {organizersCamp?.map(({ _id, name, date_time, location, service, professionals, audience, details, email }, index) => (
                            <tr key={name} className="even:bg-blue-gray-50/50">
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {name}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {date_time}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {location}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {service}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {professionals}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {audience}
                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {details.slice(0, 100)}...
                                    </Typography>
                                </td>
                                <td className="p-4 flex gap-2">
                                    <Button size="sm" onClick={handleOpen}>
                                        Update
                                    </Button>
                                    <Dialog size="xl" open={open} handler={handleOpen} className="bg-transparent shadow-none">
                                        <Card className="lg:mx-auto lg:w-full md:w-3/4 w-3/4 lg:h-[100vh] md:h-[400px]">
                                            <form onSubmit={handleSubmit(onSubmit)} className="lg:mt-8 mt-0 w-3/4 mx-auto">
                                                <div className="mb-1 flex flex-col lg:gap-3 gap-1">
                                                    <div className="flex flex-wrap gap-2">
                                                        <Input label="Camp Name" defaultValue={name} {...register("camp", { required: true })} />
                                                        <Input size="md" label="Date and Time" defaultValue={date_time} {...register("date_time", { required: true })} />
                                                    </div>
                                                    <Input size="lg" label="Location" defaultValue={location} {...register("location", { required: true })} />
                                                    <Input size="lg" label="Specialized Service Provided" defaultValue={service} {...register("service", { required: true })} />
                                                    <Input size="lg" label="Healthcare Professionals in Attendance" defaultValue={professionals} {...register("professionals", { required: true })} />
                                                    <Input size="lg" label="Target Audience" defaultValue={audience} {...register("audience", { required: true })} />
                                                    <Input size="lg" label="Descriptions" defaultValue={details} {...register("details", { required: true })} />
                                                    <Input size="lg" label="Organizer Email" defaultValue={email} {...register("email", { required: true })} />
                                                    <input className="hidden" size="lg" defaultValue={_id} {...register("id")} />
                                                </div>
                                                <Button onClick={handleOpen} className="lg:my-6 mt-2 text-xl" fullWidth>
                                                    <input type="submit" value="Update Camp" />
                                                </Button>
                                            </form>
                                        </Card>
                                    </Dialog>
                                    <Button size="sm" onClick={() => handleDelete(_id)}>
                                        delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </div>
    );
};

export default ManageCamps;