import { Navigate, useLocation } from "react-router-dom";
import { getRole, getToken } from "../../../config/api";

/** Sections an OTP-authenticated HR user may reach. */
const HR_ALLOWED = ["/admin/jobs", "/admin/applications"];

/**
 * Gate for every /admin route. A missing token bounces to login; an HR token
 * that lands on an admin-only screen is redirected to the hiring area rather
 * than being shown a page whose API calls would all come back 401.
 */
const ProtectedRoute = ({ children }) => {
    const location = useLocation();

    if (!getToken()) {
        return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
    }

    if (getRole() === "hr" && !HR_ALLOWED.includes(location.pathname)) {
        return <Navigate to="/admin/jobs" replace />;
    }

    return children;
};

export default ProtectedRoute;
