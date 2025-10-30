import React from 'react';
import { useTheme } from '../context/ThemeContext.jsx';

const HeroSection = () => {
    const { theme } = useTheme();

    return (
        <section className="flex items-center justify-center px-4 sm:px-6 py-8 sm:py-10">
            <div className="max-w-5xl mx-auto text-center">
                {/* Avatar with effects - responsive sizing */}
                <div className="mb-6 sm:mb-8 relative inline-block">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 p-1 shadow-2xl">
                        <div className={`w-full h-full rounded-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} flex items-center justify-center overflow-hidden`}>
                            <img src={"/images/me.jpg"} alt={"avatar"} className="w-full h-full object-cover"/>
                        </div>
                    </div>
                    <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 bg-green-500 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg">
                        <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 bg-white rounded-full animate-pulse"></div>
                    </div>
                </div>

                {/* Title - responsive text */}
                <h2 className={`text-lg sm:text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300 mb-4 sm:mb-6 font-semibold px-4`}>
                    Unity | Fullstack Game Developer
                </h2>

                {/* Description - responsive text */}
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-6 sm:mb-8 px-4`}>
                    Fourth-year IT student at PTIT with <span className="text-purple-400 font-semibold">2+ years of Unity experience</span>.
                    Passionate about creating immersive gameplay experiences and solving technical challenges.
                    Aiming to become a <span className="text-cyan-400 font-semibold">Senior Fullstack Game Developer</span>.
                </p>

                {/* Stats - responsive layout */}
                <div className="flex justify-center gap-6 sm:gap-8 mb-2 flex-wrap px-4">
                    <div className="text-center">
                        <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-400">2+</div>
                        <div className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-xs sm:text-sm`}>Years Experience</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-400">10+</div>
                        <div className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-xs sm:text-sm`}>Projects Completed</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;