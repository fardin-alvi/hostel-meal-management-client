import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Mainpage from "../Main/Mainpage";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home/Home";
import Mealdetials from "../component/Mealdetials";
import Meals from "../pages/Meals";
import UpcomingMeals from "../pages/UpcomingMeals";
import Privateroute from "./Privateroute";
import CheckOut from "../pages/CheckOut";
import Payment from "../component/Payment";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Mainpage />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: 'register',
                element: <Register />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'meal/:id',
                element: <Mealdetials />,
                loader: ({ params }) => fetch(`http://localhost:5000/meal/${params.id}`)
            },
            {
                path: 'meals',
                element: <Meals />
            },
            {
                path: '/upcoming',
                element: <UpcomingMeals />
            },
            {
                path: '/checkout/:id',
                element: <Privateroute>
                    <Payment />
                </Privateroute>,
                loader: ({ params }) => fetch(`http://localhost:5000/package/${params.id}`)
                // element: <Privateroute>
                //     <Payment />
                // </Privateroute>
            }
        ]
    },
]);
export default router;