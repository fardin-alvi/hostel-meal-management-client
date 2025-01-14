import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Mainpage from "../Main/Mainpage";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Mainpage />,
        children: [
            {
                path: '/',
                element:<Home/>
            },
            {
                path: 'register',
                element:<Register/>
            },
            {
                path: 'login',
                element:<Login/>
            }
        ]
    },
]);
export default router;