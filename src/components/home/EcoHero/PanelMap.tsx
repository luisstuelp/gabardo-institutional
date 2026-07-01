
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const PanelMap = () => {
    const [isFilled, setIsFilled] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsFilled(true);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="w-full h-96 flex flex-col items-center justify-center bg-black/40 p-8 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-6 left-6 z-10 text-shadow-sm">
                <h3 className="text-2xl font-bold text-white border-l-4 border-[#fbbf24] pl-4 font-montserrat drop-shadow-md">
                    Atendimento Nacional
                </h3>
                <p className="text-sm text-gray-200 ml-5 mt-1 font-inter drop-shadow">Entregamos em todo o Brasil</p>
            </div>

            <div className="relative w-full h-full flex items-center justify-center mt-8">
                {/* Simplified Brazil Map Shape */}
                <svg
                    viewBox="0 0 100 100"
                    className="w-64 h-64 md:w-80 md:h-80 drop-shadow-2xl"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Approximate Brazil Outline */}
                    <motion.path
                        d="M30,20 L50,15 L70,25 L85,40 L80,60 L60,85 L40,80 L25,50 L20,30 Z"
                        transform="scale(1.1) translate(-5, -5)"
                        stroke="white"
                        strokeWidth="1"
                        initial={{ pathLength: 0, fill: "rgba(18, 45, 84, 0)" }} // #122d54 transparent
                        animate={{
                            pathLength: 1,
                            fill: isFilled ? "rgba(251, 191, 36, 0.8)" : "rgba(18, 45, 84, 0)" // Fills with Yellow #fbbf24 (semi-transparent)
                        }}
                        transition={{
                            pathLength: { duration: 1.5, ease: "easeInOut" },
                            fill: { duration: 0.8, ease: "easeOut" }
                        }}
                    />
                    {/* Decorative Grid Lines */}
                    <motion.path
                        d="M10,10 L90,10 M10,90 L90,90 M10,10 L10,90 M90,10 L90,90"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="0.5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    />
                </svg>

                {/* Animated Beacon Pin - Centered roughly in Brazil */}
                <motion.div
                    className="absolute top-[45%] left-[50%] w-4 h-4 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1.8, type: "spring" }}
                >
                    <div className="absolute inset-0 bg-[#fbbf24] rounded-full animate-ping opacity-75"></div>
                </motion.div>

                {/* Additional Beacons for multiple locations */}
                <motion.div
                    className="absolute top-[60%] left-[65%] w-3 h-3 bg-white/80 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 2.0, type: "spring" }}
                />
                <motion.div
                    className="absolute top-[35%] left-[45%] w-3 h-3 bg-white/80 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 2.2, type: "spring" }}
                />
            </div>
        </div>
    );
};
