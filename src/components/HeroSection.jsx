import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = ({ title, subtitle, ctaText, ctaLink }) => {
    const marqueeItems = ["Oyunla Öğreniyoruz", "Mutlu Çocuklar", "Geleceğin Kaşifleri", "Eğlenceli Eğitim", "Güvenli Yuva"];

    const maskVariants = {
        hidden: { y: "100%" },
        visible: {
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.33, 1, 0.68, 1]
            }
        }
    };

    return (
        <section className="relative h-[90vh] md:h-screen w-full overflow-hidden flex flex-col justify-center items-center text-white">

            {/* --- KEN BURNS BACKGROUND --- */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1.25, x: ["-1%", "1%"], y: ["-1%", "1%"] }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "linear"
                    }}
                    className="absolute inset-0 w-full h-full"
                >
                    <img
                        src="https://images.unsplash.com/photo-1502086223501-7ea24ec8f4f3?auto=format&fit=crop&q=80&w=2000"
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                </motion.div>
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
            </div>

            {/* --- CONTENT --- */}
            <div className="max-w-7xl mx-auto px-4 relative z-20 text-center">
                {/* Badge */}
                <div className="overflow-hidden mb-6 inline-block">
                    <motion.span
                        initial="hidden"
                        animate="visible"
                        variants={maskVariants}
                        className="inline-block bg-white/20 backdrop-blur-md px-6 py-2 rounded-full font-bold text-sm tracking-widest uppercase border border-white/30"
                    >
                        ✨ 2026 Kayıt Dönemi Başladı
                    </motion.span>
                </div>

                {/* Title */}
                <div className="overflow-hidden mb-6">
                    <motion.h1
                        initial="hidden"
                        animate="visible"
                        variants={maskVariants}
                        className="text-6xl md:text-8xl lg:text-9xl font-black leading-[0.85] tracking-tighter"
                    >
                        {title}
                    </motion.h1>
                </div>

                {/* Subtitle */}
                <div className="overflow-hidden mb-12">
                    <motion.p
                        initial="hidden"
                        animate="visible"
                        variants={{
                            ...maskVariants,
                            visible: { ...maskVariants.visible, transition: { ...maskVariants.visible.transition, delay: 0.2 } }
                        }}
                        className="text-xl md:text-2xl max-w-2xl mx-auto font-medium opacity-95"
                    >
                        {subtitle}
                    </motion.p>
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    <a
                        href={ctaLink}
                        className="group relative inline-flex items-center justify-center px-12 py-6 font-bold text-[#FF69B4] bg-white rounded-full shadow-2xl overflow-hidden transition-transform hover:scale-105"
                    >
                        <span className="relative z-10 text-xl">{ctaText}</span>
                        <div className="absolute inset-0 bg-pink-50 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </a>
                </motion.div>
            </div>

            {/* --- MARQUEE SECTION (Yeni Eklendi) --- */}
            <div className="absolute bottom-10 left-0 w-full z-30 pointer-events-none">
                <div className="relative flex overflow-x-hidden border-y border-white/10 bg-white/5 backdrop-blur-sm py-4">
                    <motion.div
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            ease: "linear",
                            duration: 25,
                            repeat: Infinity,
                        }}
                        className="flex whitespace-nowrap"
                    >
                        {/* İçeriği iki kez yazıyoruz ki boşluk kalmadan dönsün */}
                        {[...marqueeItems, ...marqueeItems].map((item, index) => (
                            <span key={index} className="text-2xl md:text-3xl font-bold mx-8 uppercase tracking-widest opacity-80">
                                {item} <span className="ml-8 text-pink-400">★</span>
                            </span>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Bottom Gradient Overlay */}
            <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#FF69B4]/60 to-transparent pointer-events-none z-10" />
        </section>
    );
};

export default HeroSection;