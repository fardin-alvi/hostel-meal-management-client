import React from 'react';
import { Tab } from '@headlessui/react';
import useMeals from '../../hooks/useMeals';
import MealCard from '../../component/MealCard';

const MealsCategory = () => {
    const [meals,isLoading] = useMeals();

    const breakfast = meals.filter(meal => meal.category === 'breakfast');
    const lunch = meals.filter(meal => meal.category === 'lunch');
    const dinner = meals.filter(meal => meal.category === 'dinner');



    return (
        <div className="flex w-full justify-center items-center pt-16 px-4">
            <div className="w-full max-w-7xl px-2">
                <Tab.Group>
                    <Tab.List className="flex justify-center gap-4">
                        <Tab className="border-gray-600 rounded-lg p-2">Breakfast</Tab>
                        <Tab className="border-gray-600 rounded-lg p-2">Lunch</Tab>
                        <Tab className="border-gray-600 rounded-lg p-2">Dinner</Tab>
                        <Tab className="border-gray-600 rounded-lg p-2">All Meals</Tab>
                    </Tab.List>
                    <Tab.Panels className="mt-10">
                        <Tab.Panel>
                            <div className="grid grid-cols-3 gap-2">
                                {breakfast.map(meal => (
                                    <MealCard key={meal.title} meal={meal} />
                                ))}
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="grid grid-cols-3 gap-2">
                                {lunch.map(meal => (
                                    <MealCard key={meal.title} meal={meal} />
                                ))}
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="grid grid-cols-3 gap-2">
                                {dinner.map(meal => (
                                    <MealCard key={meal.title} meal={meal} />
                                ))}
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="grid grid-cols-3 gap-2">
                                {meals.map(meal => (
                                    <MealCard key={meal.title} meal={meal} />
                                ))}
                            </div>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    );
};

export default MealsCategory;
