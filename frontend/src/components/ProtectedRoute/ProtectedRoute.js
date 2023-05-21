import { Navigate } from "react-router-dom";

// HOC ProtectedRoute — этим компонентом защитите роут /,
// чтобы на него не смогли перейти неавторизованные пользователи

const ProtectedRouteElement = ({ element: Component, ...props }) => {
  return props.loggedIn ? <Component {...props} /> : <Navigate to="/sign-up" />;
};

export default ProtectedRouteElement;
