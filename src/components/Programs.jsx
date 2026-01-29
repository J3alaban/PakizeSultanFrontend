import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Music, Brain, Globe } from 'lucide-react';

const Programs = () => {
    const programs = [
        { title: "Sanat & Atölye", desc: "Kil çalışmaları, ebru sanatı ve özgür boyama saatleri.", icon: Palette, color: "text-purple-500" },
        { title: "Müzik & Orff", desc: "Ritim duygusunu geliştiren enstrüman ve koro çalışmaları.", icon: Music, color: "text-blue-500" },
        { title: "Zeka Oyunları", desc: "Satranç, akıl yürütme ve problem çözme becerileri.", icon: Brain, color: "text-pink-500" },
        { title: "Yabancı Dil", desc: "Oyun ve şarkılarla eğlenceli İngilizce başlangıcı.", icon: Globe, color: "text-green-500" }
    ];

    return (
        <div className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-black text-center mb-16 uppercase tracking-tighter">Neler <span className="text-blue-400">Öğreniyoruz?</span></h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {programs.map((p, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="flex items-start gap-6 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm"
                        >
                            <p.icon className={p.color} size={48} />
                            <div>
                                <h4 className="text-2xl font-bold mb-2">{p.title}</h4>
                                <p className="text-gray-500">{p.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Programs;