import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from './../../Hooks/useAxiosPublic';

const Register = () => {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const { registerUser, signInWithGoogle, updateUserProfile } = useAuth();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = data => {
        registerUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser, data);
                // navigate('/');
                updateUserProfile(data.name, data.photoURL)
                    .then(result => {
                        console.log(result, 'updated');
                        const userInfo = {
                            name: data.name,
                            email: data.email
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user added to the database')
                                    reset();
                                }
                            })
                        navigate('/')
                    })
                    .catch(error => {
                        console.log(error);
                        console.log('not updated and added to db');
                        // navigate(location?.state ? location.state : '/')
                    })

                Swal.fire({
                    icon: 'success',
                    title: 'Congratulations',
                    text: 'You have registered successfully',
                })

                // navigate('/')
            })
            .catch(error => {
                console.log(error);
                // console.log("coming from error");
                navigate('/');
                Swal.fire({
                    icon: 'error',
                    title: 'Oops.......',
                    text: error.message
                })
            })
    };

    const handleGoogle = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        navigate('/');
                    })
                Swal.fire({
                    icon: 'success',
                    title: 'Congratulations',
                    text: 'You have Logged in successfully',
                })
                navigate('/')

            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops.......',
                    text: error.message
                })
                navigate('/')
            })

    }


    return (
        <div className="my-8 flex flex-col items-center justify-center">
            <Helmet>
                <title>Medi Camp | Sign Up</title>
            </Helmet>
            <Card color="transparent" shadow={false}>
                <Typography className=" text-center" variant="h4" color="blue-gray">
                    Sign Up
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} className="my-8 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Your Name
                        </Typography>
                        <Input
                            size="lg"
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            {...register("name", { required: true })}
                        />
                        {
                            errors.name && <span className="text-red-600">Name is required</span>
                        }
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Your Photo URL
                        </Typography>
                        <Input
                            size="lg"
                            type="text"
                            name="photo"
                            placeholder="Photo URL"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            {...register("photoURL", { required: true })}
                        />
                        {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Your Email
                        </Typography>
                        <Input
                            size="lg"
                            type="text"
                            name="email"
                            placeholder="name@mail.com"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            {...register("email", { required: true })}
                        />
                        {errors.email && <span className="text-red-600">Email is required</span>}
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Password
                        </Typography>
                        <Input
                            type="password"
                            size="lg"
                            placeholder="********"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            {...register("password", {
                                required: true,
                                minLength: 6,
                                maxLength: 20,
                                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                            })}
                        />
                        {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                        {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                        {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                        {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>}
                        <button className="bg-black text-white py-3 rounded-lg"><input type="submit" value="Sign Up" /></button>
                    </div>
                </form>
                <Typography color="black" className="mt-8 mb-3 text-center font-normal text-lg">
                    Already have an account?{" "}
                    <Link to='/login'>
                        <a className="font-medium text-gray-900">
                            Sign In
                        </a>
                    </Link>
                </Typography>
                <h1 className="text-2xl font-bold text-center text-black">Or</h1>
                <Button onClick={handleGoogle}
                    size="lg"
                    variant="outlined"
                    color="blue-gray"
                    className="flex items-center gap-3 justify-center mt-4"
                >
                    <img src="https://docs.material-tailwind.com/icons/google.svg" alt="metamask" className="h-6 w-6" />
                    Continue with Google
                </Button>
            </Card>
        </div>
    );
};

export default Register;