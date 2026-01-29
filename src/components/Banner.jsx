import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Baby, Calendar, ArrowRight } from 'lucide-react';

export const Banner = () => {
    const [hoverSide, setHoverSide] = useState(null);

    return (
        <section className="relative h-[500px] w-full overflow-hidden bg-white">
            <div className="flex h-full w-full flex-col md:flex-row">

                {/* Sol Panel: Okul Turu */}
                <motion.div
                    animate={{ width: hoverSide === 'left' ? '60%' : hoverSide === 'right' ? '40%' : '50%' }}
                    onMouseEnter={() => setHoverSide('left')}
                    onMouseLeave={() => setHoverSide(null)}
                    className="relative flex h-full items-center justify-center overflow-hidden bg-[#FFB6C1] transition-all duration-500 ease-in-out"
                >
                    <div className="relative z-10 p-12 text-center text-white">
                        <Baby size={64} className="mx-auto mb-6 opacity-80" />
                        <h2 className="mb-4 text-4xl font-extrabold uppercase tracking-tight">Okulumuzu Gezin</h2>
                        <p className="mb-8 text-lg font-medium opacity-90">
                            Eğitim ortamımızı ve sınıflarımızı yerinde görün.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="flex items-center gap-2 rounded-full bg-white px-8 py-3 font-bold text-[#FFB6C1] shadow-lg"
                        >
                            Randevu Al <Calendar size={20} />
                        </motion.button>
                    </div>
                    {/* Arka plan dekoru */}
                    <div className="absolute -bottom-10 -left-10 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
                </motion.div>

                {/* Sağ Panel: Hemen Kayıt */}
                <motion.div
                    animate={{ width: hoverSide === 'right' ? '60%' : hoverSide === 'left' ? '40%' : '50%' }}
                    onMouseEnter={() => setHoverSide('right')}
                    onMouseLeave={() => setHoverSide(null)}
                    className="relative flex h-full items-center justify-center overflow-hidden bg-[#87CEFA] transition-all duration-500 ease-in-out"
                >
                    <div className="relative z-10 p-12 text-center text-white">
                        <Calendar size={64} className="mx-auto mb-6 opacity-80" />
                        <h2 className="mb-4 text-4xl font-extrabold uppercase tracking-tight">Yeni Dönem Kayıt</h2>
                        <p className="mb-8 text-lg font-medium opacity-90">
                            2026-2027 eğitim yılı için yerinizi hemen ayırtın.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="flex items-center gap-2 rounded-full bg-white px-8 py-3 font-bold text-[#87CEFA] shadow-lg"
                        >
                            Hemen Başvur <ArrowRight size={20} />
                        </motion.button>
                    </div>
                    {/* Arka plan dekoru */}
                    <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
                </motion.div>

            </div>
        </section>
    );
};

export default Banner;