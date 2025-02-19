import {
    createBrowserRouter
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
import DashBoard from "../pages/Dashboard/DashBoard";
import Myprofile from "../UserDashBoard/Myprofile";
import Mealrequested from "../UserDashBoard/Mealrequested";
import Myreview from "../UserDashBoard/Myreview";
import PaymentHistory from "../UserDashBoard/PaymentHistory";
import AdminProfile from "../AdminDashBoard/AdminProfile";
import ManageUsers from "../AdminDashBoard/ManageUsers";
import Addmeals from "../AdminDashBoard/Addmeals";
import Allmeals from "../AdminDashBoard/Allmeals";
import Allreview from "../AdminDashBoard/Allreview";
import Servemeal from "../AdminDashBoard/Servemeal";
import UpcomingMeal from "../AdminDashBoard/UpcomingMeal";
import UpcomingMealDetails from "../component/UpcomingMealDeails";
import Adminroute from "./Adminroute";

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
                element: <UpcomingMeals />,
            },
            {
                path: '/upcoming/meal/details/:id',
                element: <UpcomingMealDetails />,
                loader: ({ params }) => fetch(`http://localhost:5000/upcoming/meal/details/${params.id}`)
            },
            {
                path: 'checkout/:id',
                element: <Privateroute>
                    <Payment />
                </Privateroute>,
                loader: ({ params }) => fetch(`http://localhost:5000/package/${params.id}`)
            },
        ]
    },
    {
        path: '/dashboard',
        element: <Privateroute> <DashBoard /></Privateroute>,
        children: [
            {
                path: 'myprofile',
                element: <Myprofile />
            },
            {
                path: 'mealrequest',
                element: <Mealrequested />
            },
            {
                path: 'myreview',
                element: <Myreview />
            },
            {
                path: 'payment-history',
                element: <PaymentHistory />
            },

            // admin routes

            {
                path: 'adminprofile',
                element: <AdminProfile />
            },
            {
                path: 'manageuser',
                element: <Adminroute><ManageUsers /></Adminroute>
            },
            {
                path: 'addmeal',
                element: <Adminroute><Addmeals /></Adminroute>
            },
            {
                path: 'allmeals',
                element: <Adminroute><Allmeals /></Adminroute>
            },
            {
                path: 'allreview',
                element: <Allreview />
            },
            {
                path: 'servemeal',
                element: <Adminroute><Servemeal /></Adminroute>
            },
            {
                path: 'upcomingmeal',
                element: <Adminroute><UpcomingMeal /></Adminroute>
            }




        ]
    }
]);
export default router;