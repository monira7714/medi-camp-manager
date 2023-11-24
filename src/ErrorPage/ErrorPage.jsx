import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="">
            <Link to='/'>
                <img className="w-full h-1/3" src="https://colorlib.com/wp/wp-content/uploads/sites/2/404-error-page-templates.jpg.webp" alt="" />
            </Link>
        </div>
    );
};

export default ErrorPage;