


import { Link, useRouteError } from "react-router-dom";
// import Wrapper from "../assets/wrappers/ErrorPage";
// import img from "./not-found.svg";

const ErrorPage = () => {
    const error = useRouteError();

    // Handling 404 error separately
    if (error.status === 404) {
        return (
            <div className="text-center py-10 px-4">
                {/* <img src={img} alt="notfound" className="mx-auto mb-4" /> */}
                <h3 className="text-xl font-semibold">Ohh, Page Not Found</h3>
                <p className="text-gray-500 mb-4">We can't seem to find the page you are looking for.</p>
                <Link to="/" className="text-blue-600 hover:underline">
                    Back to Home
                </Link>
            </div>
        );
    }

    // Handling other errors
    return (
        <div className="text-center py-10 px-4">
            <h3 className="text-xl font-semibold">Something Went Wrong</h3>
            <p className="text-gray-500 mb-4">Please try again later or contact support.</p>
            <Link to="/" className="text-blue-600 hover:underline">
                Back to Home
            </Link>
        </div>
    );
};

export default ErrorPage;
