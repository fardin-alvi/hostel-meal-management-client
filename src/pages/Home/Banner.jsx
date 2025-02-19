import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import img1 from '../../assets/banner/1.jpg';
import img2 from '../../assets/banner/2.jpg';
import img3 from '../../assets/banner/3.jpg';
import img4 from '../../assets/banner/4.jpg';

const AutoplaySlider = withAutoplay(AwesomeSlider);

const Banner = () => {
    const slides = [
        {
            image: img1,
            title: 'Streamline Your Hostel Operations',
            description: 'Our system simplifies the management of bookings, payments, and guest services, ensuring smooth operations every day.',
        },
        {
            image: img2,
            title: 'Empower Your Hostel with Smart Solutions',
            description: 'Manage reservations, room assignments, and billing effortlessly, all in one place, with our intuitive hostel management tool.',
        },
        {
            image: img3,
            title: 'Enhance the Guest Experience',
            description: "Offer a seamless stay for your guests while keeping track of your hostel's performance and operations with our advanced features."
        },
        {
            image: img4,
            title: 'Manage Your Hostel Like a Pro',
            description: 'Take control of every aspect of your hostel with our all-in-one management system—easy, efficient, and effective.',
        },
    ];

    return (
        <div className="relative md:px-6">
            <AutoplaySlider
                play={true}
                cancelOnInteraction={false} 
                interval={2000} 
                bullets={false} 
                style={{ height: '430px' }} 
                cssModule={{
                    'awssld__controls': { display: 'none' },
                }}
            >
                {slides.map((slide, index) => (
                    <div key={index} data-src={slide.image}>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black bg-opacity-30">
                            <h1 className="text-4xl font-bold mb-4">{slide.title}</h1>
                            <p className="text-lg mb-6">{slide.description}</p>
                            <div className="flex items-center bg-white rounded-lg overflow-hidden shadow-md w-3/4 max-w-md">
                                <input
                                    type="text"
                                    placeholder="Search your need..."
                                    className="w-full py-2 px-4 focus:outline-none text-gray-700"
                                />
                                <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 font-semibold">
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </AutoplaySlider>
        </div>
    );
};

export default Banner;