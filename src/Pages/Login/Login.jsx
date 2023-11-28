import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPublic = useAxiosPublic()
    const { signInWithGoogle, logIn } = useAuth();

    const handleLogin = e => {
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        logIn(email, password)
            .then(result => {
                console.log(result.user);
                Swal.fire({
                    icon: 'success',
                    title: 'Congratulations',
                    text: 'You have logged in successfully',
                })
                navigate(location?.state ? location.state : '/')
            })
    }

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
                navigate(location?.state ? location.state : '/')
            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops.......',
                    text: error.message
                })
            })

    }

    return (
        <div className="my-20 flex flex-col items-center justify-center">
            <Helmet>
                <title>Medi Camp | Login</title>
            </Helmet>
            <Card color="transparent" shadow={false}>
                <Typography className=" text-center" variant="h4" color="blue-gray">
                    Sign In
                </Typography>
                <form onSubmit={handleLogin} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Your Email
                        </Typography>
                        <Input
                            size="lg"
                            name='email'
                            placeholder="name@mail.com"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Password
                        </Typography>
                        <Input
                            type="password"
                            name='password'
                            size="lg"
                            placeholder="********"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                        <input className="bg-black text-white py-3 rounded-lg" type="submit" value="Sign In" />
                    </div>
                </form>
                <Typography color="gray" className="mt-8 text-center font-normal">
                    New Here?{" "}
                    <Link to='/register'>
                        <a className="btn btn-link font-medium text-gray-900">
                            Sign Up
                        </a>
                    </Link>
                </Typography>
                <h1 className="text-2xl font-bold text-center">Or</h1>
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

export default Login;