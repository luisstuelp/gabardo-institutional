import { motion } from 'motion/react';
import { useHeader } from '@/contextos/Header';

export default function EstacionamentoInternoCam() {

    const { darkMode } = useHeader();

    return (
        <>
            <motion.div
                animate={{
                    backgroundColor: darkMode ? '#181818' : '#fff',
                }}
                className='grid grid-cols-2 pt-14'
            >
                <iframe
                    src={`http://10.1.3.132:8888/dvr1_cam4`}
                    className="pointer-events-none aspect-[8/5.5] bg-black"
                    allow="autoplay; fullscreen"
                />
                <iframe
                    src={`http://10.1.3.132:8888/dvr1_cam3`}
                    className="pointer-events-none aspect-[8/5.5] bg-black"
                    allow="autoplay; fullscreen"
                />
            </motion.div>
            <motion.div
                animate={{
                    backgroundColor: darkMode ? '#181818' : '#fff',
                }}
                className='grid grid-cols-2'
            >

                <iframe
                    src={`http://10.1.3.132:8888/dvr2_cam14`}
                    className="pointer-events-none aspect-[8/5.5] bg-black"
                    allow="autoplay; fullscreen; autoplay"
                />

                <iframe
                    src={`http://10.1.3.132:8888/dvr2_cam15`}
                    className="pointer-events-none aspect-[8/5.5] bg-black"
                    allow="autoplay; fullscreen"
                />
            </motion.div>
            <motion.div
                animate={{
                    backgroundColor: darkMode ? '#181818' : '#fff',
                }}
                className='grid grid-cols-3'
            >
                <iframe
                    src={`http://10.1.3.132:8888/dvr1_cam2`}
                    className="pointer-events-none aspect-[8/5.5] bg-black"
                    allow="autoplay; fullscreen"
                />


                <iframe
                    src={`http://10.1.3.132:8888/dvr3_cam5`}
                    className="pointer-events-none aspect-[8/5.5] bg-black"
                    allow="autoplay; fullscreen"
                />

                <iframe
                    src={`http://10.1.3.132:8888/dvr1_cam13`}
                    className="pointer-events-none aspect-[8/5.5] bg-black"
                    allow="autoplay; fullscreen"
                />
                <iframe
                    src={`http://10.1.3.132:8888/dvr6_cam9`}
                    className="pointer-events-none aspect-[8/5.5] bg-black"
                    allow="autoplay; fullscreen"
                />
                                <iframe
                    src={`http://10.1.3.132:8888/dvr6_cam10`}
                    className="pointer-events-none aspect-[8/5.5] bg-black"
                    allow="autoplay; fullscreen"
                />
            </motion.div>
        </>
    );
}