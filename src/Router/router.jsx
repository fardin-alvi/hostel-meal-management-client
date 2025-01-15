import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Mainpage from "../Main/Mainpage";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home/Home";
import Mealdetials from "../component/Mealdetials";

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
            },
            {
                path: '/meal/:id',
                element: <Mealdetials />,
                loader: ({ params }) => fetch(`http://localhost:5000/meal/${params.id}`)
            }
        ]
    },
]);
export default router;