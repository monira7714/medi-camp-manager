import { Helmet } from "react-helmet-async";
import { Button, Card, Spinner, Typography } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
const ManageCamps = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth()
    const { data: addCamps, isPending,refetch } = useQuery({
        queryKey: ['addCamps'],
        queryFn: async () => {
            const res = await axiosSecure.get('/addCamp');
            return res.data
        }
    })
    if (isPending) {
        return <Spinner className="h-16 w-16 text-gray-900/50 text-center" />
    }

    const organizersCamp = addCamps?.filter(camp => camp.email === user.email)
    console.log(organizersCamp);

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
            <Card className="h-full w-full overflow-scroll">
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
                        {organizersCamp?.map(({ _id, name, date_time, location, service, professionals, audience, details }, index) => (
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
                                    <Button size="sm" onClick={()=>handleUpdate(_id)}>
                                        Update
                                    </Button>
                                    <Button size="sm" onClick={()=>handleDelete(_id)}>
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