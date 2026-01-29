import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShieldCheck, Star, Users, Coffee, Sparkles } from 'lucide-react';

const About = () => {
    const [expandedIndex, setExpandedIndex] = useState(0);

    // Bento Grid Verileri
    const bentoItems = [
        { title: "Vizyonumuz", desc: "Geleceği inşa eden mutlu nesiller.", icon: Star, color: "bg-pink-400", size: "col-span-2 row-span-1" },
        { title: "2010'dan Beri", desc: "15 yıllık tecrübe.", icon: Sparkles, color: "bg-blue-400", size: "col-span-1 row-span-1" },
        { title: "Beslenme", desc: "Organik ve dengeli öğünler.", icon: Coffee, color: "bg-yellow-400", size: "col-span-1 row-span-2" },
        { title: "Güvenlik", desc: "7/24 İzlenebilir sınıflar ve güvenli bahçe alanı.", icon: ShieldCheck, color: "bg-green-400", size: "col-span-2 row-span-1" },
    ];

    // Expanding Cards Verileri
    const focusAreas = [
        { title: "Sevgi Odaklı Yaklaşım", text: "Çocuğunuzun kendini güvende ve değerli hissetmesi bizim birincil önceliğimizdir.", icon: Heart, img: "https://images.unsplash.com/photo-1502086223501-7ea24ec83b9f?q=80&w=500" },
        { title: "Montessori Eğitimi", text: "Kendi hızında öğrenme, bağımsızlık ve keşif odaklı bir dünya.", icon: Users, img: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=500" },
        { title: "Sosyal Gelişim", text: "Akranlarıyla sağlıklı iletişim kuran, paylaşmayı bilen bireyler.", icon: Sparkles, img: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=500" }
    ];

    return (
        <div className="py-20 px-4 bg-white space-y-32">

            {/* 1. KISIM: BENTO GRID (Kurumsal Kimlik Özeti) */}
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-black text-gray-800 mb-4 tracking-tighter uppercase italic">Okulumuza <span className="text-[#FF69B4]">Bakış</span></h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-4 h-[600px] md:h-[500px]">
                    {bentoItems.map((item, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ scale: 0.98 }}
                            className={`${item.size} ${item.color} rounded-[2.5rem] p-8 text-white flex flex-col justify-end relative overflow-hidden group shadow-2xl shadow-gray-200`}
                        >
                            <item.icon className="absolute top-8 right-8 opacity-20 group-hover:scale-125 transition-transform duration-500" size={80} />
                            <h3 className="text-2xl font-black mb-2">{item.title}</h3>
                            <p className="text-white/90 font-medium leading-tight">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* 2. KISIM: EXPANDING CARDS (Derinlemesine Odak Noktaları) */}
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-black text-gray-800 mb-4 tracking-tighter uppercase italic">Neden <span className="text-blue-400">Biz?</span></h2>
                    <p className="text-gray-500">Detayları görmek için alanlara tıklayın.</p>
                </div>

                <div className="flex flex-col md:flex-row gap-4 h-[600px] md:h-[450px]">
                    {focusAreas.map((area, idx) => (
                        <motion.div
                            key={idx}
                            layout
                            onClick={() => setExpandedIndex(idx)}
                            initial={{ width: "100%" }}
                            animate={{ width: expandedIndex === idx ? "200%" : "80%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="relative cursor-pointer overflow-hidden rounded-[3rem] group"
                        >
                            <img
                                src={area.img}
                                alt={area.title}
                                className="absolute inset-0 w-full h-full object-cover brightness-50 group-hover:brightness-75 transition-all duration-500"
                            />

                            <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl">
                                        <area.icon size={24} />
                                    </div>
                                    <h3 className={`font-black text-2xl whitespace-nowrap ${expandedIndex !== idx && 'md:rotate-90 md:absolute md:bottom-24 md:left-0'}`}>
                                        {area.title}
                                    </h3>
                                </div>

                                <AnimatePresence>
                                    {expandedIndex === idx && (
                                        <motion.p
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="text-white/80 text-lg max-w-md"
                                        >
                                            {area.text}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default About;