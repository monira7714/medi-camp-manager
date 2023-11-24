import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="my-20 flex flex-col items-center justify-center">
            <Helmet>
                <title>Medi Camp | Login</title>
            </Helmet>
            <Card color="transparent" shadow={false}>
                <Typography className=" text-center" variant="h4" color="blue-gray">
                    Sign In
                </Typography>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Your Email
                        </Typography>
                        <Input
                            size="lg"
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
                            size="lg"
                            placeholder="********"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                    </div>
                    <Button className="mt-6" fullWidth>
                        sign in
                    </Button>
                    <Typography color="gray" className="mt-4 text-center font-normal">
                        New Here?{" "}
                        <Link to='/register'>
                            <a className="btn btn-link font-medium text-gray-900">
                                Sign Up
                            </a>
                        </Link>
                    </Typography>
                </form>
                <h1 className="text-2xl font-bold text-center">Or</h1>
                <Button
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