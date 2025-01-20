import React from 'react';
import Marquee from "react-fast-marquee";
import img1 from '../assets/immergency/provost.png';
import img2 from '../assets/immergency/fire.png';
import img3 from '../assets/immergency/register.png';
import img4 from '../assets/immergency/power.png';
import img5 from '../assets/immergency/water.png';
import img6 from '../assets/immergency/imergency.png';

const Immergency = () => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center my-5 md:px-6 mx-auto w-full overflow-x-hidden">
            <p className="bg-purple-200 text-black px-3 py-1 text-center mb-3 md:mb-0 text-sm md:text-base lg:text-lg lg:py-6">
                For immergency
            </p>
            <div className="flex-1 overflow-hidden">
                <Marquee gradient={false} speed={50}>
                    <img className="w-10 sm:w-12 md:w-16 lg:w-24 xl:w-32 mr-10 sm:mr-12 md:mr-16" src={img1} alt="provost" />
                    <img className="w-10 sm:w-12 md:w-16 lg:w-24 xl:w-32 mr-10 sm:mr-12 md:mr-16" src={img2} alt="fire" />
                    <img className="w-10 sm:w-12 md:w-16 lg:w-24 xl:w-32 mr-10 sm:mr-12 md:mr-16" src={img3} alt="register" />
                    <img className="w-10 sm:w-12 md:w-16 lg:w-24 xl:w-32 mr-10 sm:mr-12 md:mr-16" src={img4} alt="power" />
                    <img className="w-10 sm:w-12 md:w-16 lg:w-24 xl:w-32 mr-10 sm:mr-12 md:mr-16" src={img5} alt="water" />
                    <img className="w-10 sm:w-12 md:w-16 lg:w-24 xl:w-32 mr-10 sm:mr-12 md:mr-16" src={img6} alt="imergency" />
                </Marquee>
            </div>
        </div>
    );
};

export default Immergency;
