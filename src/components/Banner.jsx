import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Baby, Calendar, ArrowRight, Eye } from 'lucide-react'; // Eye ikonu eklendi
import { Link } from "react-router-dom";

export const Banner = () => {
    const [hoverSide, setHoverSide] = useState(null);

    return (
        <section className="relative min-h-[600px] md:h-[500px] w-full overflow-hidden bg-white">
            <div className="flex h-full w-full flex-col md:flex-row">

                {/* Sol Panel: Okul Turu */}
                <motion.div
                    animate={{
                        width: typeof window !== 'undefined' && window.innerWidth < 768
                            ? '100%'
                            : (hoverSide === 'left' ? '60%' : hoverSide === 'right' ? '40%' : '50%')
                    }}
                    onMouseEnter={() => setHoverSide('left')}
                    onMouseLeave={() => setHoverSide(null)}
                    className="relative flex flex-1 items-center justify-center overflow-hidden bg-[#FFB6C1] py-12 md:py-0 transition-all duration-500 ease-in-out"
                >
                    <div className="relative z-10 px-6 md:px-12 text-center text-white">
                        <Baby size={54} className="mx-auto mb-4 md:mb-6 opacity-80" />
                        <h2 className="mb-3 text-2xl md:text-4xl font-extrabold uppercase tracking-tight">
                            Okulumuzu Gezin
                        </h2>
                        <p className="mb-6 md:mb-8 text-base md:text-lg font-medium opacity-90">
                            Eğitim ortamımızı ve sınıflarımızı yerinde görün.
                        </p>

                        {/* Yönlendirme Eklendi */}
                        <Link to="/sanaltur" className="inline-block">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="mx-auto flex items-center gap-2 rounded-full bg-white px-6 md:px-8 py-3 font-bold text-[#FFB6C1] shadow-lg text-sm md:text-base"
                            >
                                Sanal Tur <Eye size={18} />
                            </motion.button>
                        </Link>
                    </div>
                    {/* Arka plan dekoru */}
                    <div className="absolute -bottom-10 -left-10 h-48 w-48 md:h-64 md:w-64 rounded-full bg-white/20 blur-3xl" />
                </motion.div>

                {/* Sağ Panel: Hemen Kayıt */}
                <motion.div
                    animate={{
                        width: typeof window !== 'undefined' && window.innerWidth < 768
                            ? '100%'
                            : (hoverSide === 'right' ? '60%' : hoverSide === 'left' ? '40%' : '50%')
                    }}
                    onMouseEnter={() => setHoverSide('right')}
                    onMouseLeave={() => setHoverSide(null)}
                    className="relative flex flex-1 items-center justify-center overflow-hidden bg-[#87CEFA] py-12 md:py-0 transition-all duration-500 ease-in-out"
                >
                    <div className="relative z-10 px-6 md:px-12 text-center text-white">
                        <Calendar size={54} className="mx-auto mb-4 md:mb-6 opacity-80" />
                        <h2 className="mb-3 text-2xl md:text-4xl font-extrabold uppercase tracking-tight">
                            Yeni Dönem Kayıt
                        </h2>
                        <p className="mb-6 md:mb-8 text-base md:text-lg font-medium opacity-90">
                            2026-2027 eğitim yılı için yerinizi ayırtın.
                        </p>
                        <Link to="/iletisim" className="inline-block">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 rounded-full bg-white px-6 md:px-8 py-3 font-bold text-[#87CEFA] shadow-lg text-sm md:text-base"
                            >
                                İletişime Geç <ArrowRight size={18} />
                            </motion.button>
                        </Link>
                    </div>
                    {/* Arka plan dekoru */}
                    <div className="absolute -right-10 -top-10 h-48 w-48 md:h-64 md:w-64 rounded-full bg-white/20 blur-3xl" />
                </motion.div>

            </div>
        </section>
    );
};

export default Banner;