import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Bars } from "react-loader-spinner";

const AdminOverview = () => {
    const axiosSecure = useAxiosSecure()
    const { data: stat , isLoading } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats')
            return res.data
        }
    })
    if (isLoading) {
        return <div className="flex justify-center items-center">
            <Bars
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>;
    }
    const user = stat.totalUsers
    const meals = stat.totalMeals 
    const requestMeal = stat.totalMealRequests

    const data = [
        { name: "Jan", cost: 150 },
        { name: "Feb", cost: 300 },
        { name: "Mar", cost: 100 },
        { name: "Apr", cost: 200 },
        { name: "May", cost: 300 },
        { name: "Jun", cost: 250 },
        { name: "Jul", cost: 245 },
        { name: "Aug", cost: 290 },
        { name: "Sep", cost: 350 },
        { name: "Oct", cost: 300 },
        { name: "Nov", cost: 200 },
        { name: "Dec", cost: 50 },
    ];

    const stats = [
        {
            title: "Total Users",
            count: user,
            icon: "👥"
        },
        {
            title: "Total Meals",
            count: meals,
            icon: "🍽️",
        },
        {
            title: "Total Requested Meal",
            count: requestMeal,
            icon: "📋",
        },
    ];

    return (
        <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 min-h-screen">
            {/* Title */}
            <h2 className="text-2xl font-bold mb-4">AdminOverview</h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {stats.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-lg shadow-md flex flex-col items-start"
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">{item.icon}</span>
                            <h4 className="text-lg font-semibold">{item.title}</h4>
                        </div>
                        <p className="text-3xl font-bold mt-2 text-center">{item.count}</p>
                    </div>
                ))}
            </div>

            {/* Chart Section */}
            <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Average Shipping Cost</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="cost" stroke="#00A86B" strokeWidth={2} dot={{ r: 5 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AdminOverview;



            