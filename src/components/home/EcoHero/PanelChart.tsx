
import { motion, animate } from 'framer-motion';
import { useEffect, useState } from 'react';

const AnimatedCounter = ({ value, suffix = "" }: { value: number, suffix?: string }) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        const controls = animate(0, value, {
            duration: 2,
            onUpdate: (latest) => setDisplayValue(Math.floor(latest)),
            ease: "easeOut"
        });
        return controls.stop;
    }, [value]);

    return <span>{displayValue}{suffix}</span>;
};

export const PanelChart = () => {
    // Data representing financing stats
    const chartData = [
        { label: 'Aprovação', value: 95, suffix: '%', color: '#10b981' }, // High approval rate
        { label: 'Entrada', value: 20, suffix: '%', color: '#3b82f6' },   // Low down payment
        { label: 'Taxas', value: 1, suffix: '%', color: '#fbbf24' },      // Low rates (simulated 1.x%)
        { label: 'Satisfação', value: 98, suffix: '%', color: '#ec4899' }, // High satisfaction
    ];

    return (
        <div className="w-full bg-black/40 p-8 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-xl flex flex-col justify-between h-[400px]">
            <div className="mb-6">
                <h3 className="text-2xl font-bold text-white border-l-4 border-[#3b82f6] pl-4 font-montserrat drop-shadow-md">
                    Facilidades
                </h3>
                <p className="text-sm text-gray-200 ml-5 mt-1 font-inter drop-shadow">As melhores condições do mercado</p>
            </div>

            <div className="flex-1 flex items-end justify-between gap-4 px-4 pb-4">
                {chartData.map((data, index) => (
                    <div key={data.label} className="flex flex-col items-center w-full group">
                        {/* Percentage Label */}
                        <motion.div
                            className="mb-2 text-xl font-bold text-white font-montserrat drop-shadow-md"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + index * 0.2 }}
                        >
                            <AnimatedCounter value={data.value} suffix={data.suffix} />
                        </motion.div>

                        {/* Bar */}
                        <motion.div
                            className="w-full rounded-t-lg relative overflow-hidden backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                            style={{ backgroundColor: data.color }}
                            initial={{ height: 0 }}
                            animate={{ height: `${data.label === 'Taxas' ? 30 : data.value}%` }} // Adjusted visual height for "Taxas" so it's not invisible
                            transition={{
                                duration: 1.5,
                                delay: index * 0.2,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                        >
                            {/* Shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                            <div className="absolute inset-0 bg-white/10" />
                        </motion.div>

                        {/* Label */}
                        <span className="mt-3 text-xs md:text-sm font-medium text-gray-200 tracking-wider font-inter drop-shadow-sm">
                            {data.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
