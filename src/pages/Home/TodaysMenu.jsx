import React from "react";
import useMeals from "../../hooks/useMeals";
import { Link } from "react-router-dom";

const TodaysMenu = () => {
    const [meals] = useMeals('', '', '', 1);

    const getRandomMeal = (category) => {
        const filteredMeals = meals.filter((meal) => meal.category === category);
        return filteredMeals.length > 0
            ? filteredMeals[Math.floor(Math.random() * filteredMeals.length)]
            : null;
    };

    const breakfast = getRandomMeal("breakfast");
    const lunch = getRandomMeal("lunch");
    const dinner = getRandomMeal("dinner");

    const meales = [
        { title: "Breakfast", meal: breakfast },
        { title: "Lunch", meal: lunch },
        { title: "Dinner", meal: dinner }
    ];

    return (
        <>
            <div className="flex justify-center my-8">
                <h2 className="font-medium text-2xl">Today's Menu</h2>
            </div>
            <div className="flex flex-col md:flex-row items-center md:px-4 justify-center gap-6">
                {meales.map(({ title, meal }, index) =>
                    meal ? (
                        <div
                            key={index}
                            className="relative w-96 h-80 rounded-lg overflow-hidden shadow-lg group"
                        >
                            <div className="absolute top-3 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-1 rounded-lg text-sm font-semibold">
                                {title}
                            </div>
                            <img
                                src={meal.image}
                                alt={meal.title}
                                className="w-full h-full object-cover transition duration-300 group-hover:brightness-50"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-60 text-white flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition duration-300 p-4 text-center">
                                <h2 className="text-lg font-bold">{meal.title}</h2>
                                <p className="text-sm mt-2">{meal.description}</p>
                                <Link to={`/meal/${meal._id}`} className="mt-3 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ) : null
                )}
            </div>
        </>
    );
};

export default TodaysMenu;
