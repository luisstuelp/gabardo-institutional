
import { motion } from 'framer-motion';

// Reusing the visual structure of "PanelBattery" but for Truck Specs
export const PanelBattery = () => {
    // Mock data for a featured track (e.g. Scania R450)
    const specs = [
        { label: 'Potência (cv)', value: 450, max: 750, color: '#3b82f6' }, // Blue
        { label: 'Torque (Nm)', value: 2350, max: 3500, color: '#fbbf24' },  // Yellow/Orange
        { label: 'Economia', value: 92, max: 100, color: '#10b981' },        // Green
        { label: 'Conforto', value: 95, max: 100, color: '#ec4899' },        // Pink
    ];

    return (
        <div className="w-full space-y-8 bg-black/40 p-8 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-xl">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-2xl font-bold mb-2 text-white border-l-4 border-[#fbbf24] pl-4 font-montserrat drop-shadow-md">
                        Scania R450
                    </h3>
                    <p className="text-gray-200 text-sm pl-4 font-inter drop-shadow">Highline • 6x2 • 2023</p>
                </div>
                <div className="text-right">
                    <span className="text-[#fbbf24] font-bold text-xl font-montserrat drop-shadow-md">R$ 680.000</span>
                </div>
            </div>

            <div className="space-y-6">
                {specs.map((spec, index) => (
                    <div key={spec.label} className="relative">
                        <div className="flex justify-between mb-2 text-sm text-gray-200 font-inter font-medium drop-shadow-sm">
                            <span>{spec.label}</span>
                            <span>{spec.value}</span>
                        </div>

                        <div className="h-4 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(spec.value / spec.max) * 100}%` }}
                                transition={{
                                    duration: 1.2,
                                    delay: index * 0.2,
                                    ease: "easeOut"
                                }}
                                className="h-full rounded-full shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                                style={{ backgroundColor: spec.color }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 p-4 bg-white/5 rounded-lg border border-white/10">
                <p className="text-sm text-gray-200 font-inter leading-relaxed">
                    <span className="text-[#fbbf24] font-bold">Destaque:</span> Modelo equipado com pacote luxo e
                    <span className="text-white font-bold"> Retarder</span>. Revisado e com garantia.
                </p>
            </div>
        </div>
    );
};
