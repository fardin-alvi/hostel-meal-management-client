import React, { useEffect, useState } from 'react';
import { Tab } from '@headlessui/react';
import useMeals from '../../hooks/useMeals';
import MealCard from '../../component/MealCard';
import { Bars } from 'react-loader-spinner';
import { useQueryClient } from '@tanstack/react-query';


const MealsCategory = () => {
    const [category, setCategory] = useState('');
    const [meals, isLoading, hasNextPage, refetch] = useMeals('', category, '', 1);

    const queryClient = useQueryClient()

    useEffect(() => {
        queryClient.invalidateQueries({
            queryKey: ['meals', "", category, "", 1],
        })
        refetch();
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
        <div className="flex flex-col w-full justify-center items-center pt-16 md:px-4">
            <h2 className='text-2xl font-medium pb-6'>Meals by Category</h2>
            <div className="w-full max-w-7xl px-2">
                <Tab.Group>
                    <Tab.List className="flex justify-center gap-4">
                        <Tab className={({ selected }) =>
                            `p-2 ${selected ? 'text-purple-400 text-lg' : 'text-black'
                            }`
                        }>
                            Breakfast
                        </Tab>
                        <Tab className={({ selected }) =>
                            `p-2 ${selected ? 'text-purple-400 text-lg' : 'text-black'
                            }`
                        }>
                            Lunch
                        </Tab>
                        <Tab className={({ selected }) =>
                            `p-2 ${selected ? 'text-purple-400 text-lg' : 'text-black'
                            }`
                        }>
                            Dinner
                        </Tab>
                        <Tab className={({ selected }) =>
                            `p-2 ${selected ? 'text-purple-400 text-lg' : 'text-black'
                            }`
                        }>
                            All Meals
                        </Tab>
                    </Tab.List>
                    <Tab.Panels className="mt-10">
                        <Tab.Panel>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                                {breakfast.map(meal => (
                                    <MealCard key={meal.title} meal={meal} />
                                ))}
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                                {lunch.map(meal => (
                                    <MealCard key={meal.title} meal={meal} />
                                ))}
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                                {dinner.map(meal => (
                                    <MealCard key={meal.title} meal={meal} />
                                ))}
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
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
