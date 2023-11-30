import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import { AuthContext } from "../Provider/AuthProvider";

const PrivateRouter = ({children}) => {

    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return  <span className="loading loading-spinner loading-lg"></span>
    }
    if(user){
        return children
    }
    return <Navigate state={location.pathname} to='/login'></Navigate>
};

PrivateRouter.propTypes={
    children: PropTypes.node
}

export default PrivateRouter;