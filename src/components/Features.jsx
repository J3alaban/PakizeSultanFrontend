import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sun, Palette, ShieldCheck } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, desc, color }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        setPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setOpacity(1)}
            onMouseLeave={() => setOpacity(0)}
            className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-xl"
        >
            {/* Spotlight Efekti */}
            <div
                className="pointer-events-none absolute -inset-px transition duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${color}15, transparent 40%)`,
                }}
            />

            <div className="relative z-10">
                <div className={`mb-4 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gray-50 text-[#FF69B4] transition-colors group-hover:bg-white`}>
                    <Icon size={32} strokeWidth={1.5} style={{ color: color }} />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-800">{title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{desc}</p>
            </div>
        </div>
    );
};

export const Features = () => {
    const features = [
        {
            icon: Heart,
            title: 'Sevgi Dolu Ortam',
            desc: 'Her çocuğun kendi hızında geliştiği, şefkat odaklı bir yaklaşım sunuyoruz.',
            color: '#FF69B4' // Pembe
        },
        {
            icon: Sun,
            title: 'Aktif Öğrenme',
            desc: 'Doğa ile iç içe, merak duygusunu tetikleyen oyun temelli eğitim modelleri.',
            color: '#FFD700' // Altın Sarı
        },
        {
            icon: Palette,
            title: 'Yaratıcı Sanatlar',
            desc: 'Müzik, resim ve drama ile çocukların hayal dünyasını gerçeğe dönüştürüyoruz.',
            color: '#87CEFA' // Gök Mavisi
        },
        {
            icon: ShieldCheck,
            title: 'Maksimum Güvenlik',
            desc: '7/24 kamera sistemi ve uzman kadromuzla çocuklarınız bize emanet.',
            color: '#98FB98' // Açık Yeşil
        }
    ];

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                >
                    <FeatureCard {...feature} />
                </motion.div>
            ))}
        </div>
    );
};

export default Features;