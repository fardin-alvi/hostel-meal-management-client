import React, { useEffect, useState } from 'react';
import { Tab } from '@headlessui/react';
import useMeals from '../../hooks/useMeals';
import MealCard from '../../component/MealCard';
import { Bars } from 'react-loader-spinner';


const MealsCategory = () => {
    const [category, setCategory] = useState('');
    const [meals, isLoading,refetch] = useMeals('', category, '',1);

    useEffect(() => {
    }, [category,refetch])

    const breakfast = meals.filter(meal => meal.category === 'breakfast');
    const lunch = meals.filter(meal => meal.category === 'lunch');
    const dinner = meals.filter(meal => meal.category === 'dinner');

    if (isLoading) {
        return <div className='flex items-center justify-center'>
            <Bars
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    }

    return (
        <div className="flex w-full justify-center items-center pt-16 px-4">
            <div className="w-full max-w-7xl px-2">
                <Tab.Group>
                    <Tab.List className="flex justify-center gap-4">
                        <Tab onClick={() => setCategory('breakfast')} className="border-gray-600 rounded-lg p-2">
                            Breakfast
                        </Tab>
                        <Tab onClick={() => setCategory('lunch')} className="border-gray-600 rounded-lg p-2">
                            Lunch
                        </Tab>
                        <Tab onClick={() => setCategory('dinner')} className="border-gray-600 rounded-lg p-2">
                            Dinner
                        </Tab>
                        <Tab onClick={() => setCategory('')} className="border-gray-600 rounded-lg p-2">
                            All Meals
                        </Tab>
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
