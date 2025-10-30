import React from 'react';
import { useTheme } from '../context/ThemeContext.jsx';

const HeroSection = () => {
    const { theme } = useTheme();

    return (
        <section className="flex items-center justify-center px-6 py-10">
            <div className="max-w-5xl mx-auto text-center">
                {/* Avatar với hiệu ứng */}
                <div className="mb-8 relative inline-block">
                    <div className="w-40 h-40 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 p-1 shadow-2xl">
                        <div className={`w-full h-full rounded-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} flex items-center justify-center overflow-hidden`}>
                            <img src={"/images/me.jpg"} alt={"avatar"}/>
                        </div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-green-500 w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                        <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
                    </div>
                </div>
                <h2 className={`text-2xl md:text-1xl text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300 mb-6 font-semibold`}>
                    Unity | Fullstack Game Developer
                </h2>

                {/* Mô tả */}
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-lg md:text-1xl leading-relaxed max-w-2xl mx-auto mb-8`}>
                    Fourth-year IT student at PTIT with <span className="text-purple-400 font-semibold">2+ years of Unity experience</span>.
                    Passionate about creating immersive gameplay experiences and solving technical challenges.
                    Aiming to become a <span className="text-cyan-400 font-semibold">Senior Fullstack Game Developer</span>.
                </p>

                {/* Stats */}
                <div className="flex justify-center gap-8 mb-2 flex-wrap">
                    <div className="text-center">
                        <div className="text-4xl font-bold text-purple-400">2+</div>
                        <div className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm`}>Years Experience</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-blue-400">10+</div>
                        <div className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm`}>Projects Completed</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;