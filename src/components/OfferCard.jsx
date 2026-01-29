import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Percent } from 'lucide-react';

const OfferCard = ({ offer }) => {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const expiry = new Date(offer.expiryDate);
            const diff = expiry - now;

            if (diff <= 0) {
                setTimeLeft('Süresi Doldu');
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

            setTimeLeft(`${days}g ${hours}s ${minutes}dk`);
        };

        calculateTimeLeft();
        const interval = setInterval(calculateTimeLeft, 60000);

        return () => clearInterval(interval);
    }, [offer.expiryDate]);

    const bgColor = offer.color === 'coral' ? 'bg-[#FF7F50]' : 'bg-[#FFDAB9]';
    const textColor = offer.color === 'coral' ? 'text-white' : 'text-gray-800';

    return (
        <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            animate={{
                boxShadow: [
                    '0 10px 30px rgba(255, 127, 80, 0.3)',
                    '0 15px 40px rgba(255, 127, 80, 0.5)',
                    '0 10px 30px rgba(255, 127, 80, 0.3)'
                ]
            }}
            transition={{
                boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            className={`${bgColor} ${textColor} rounded-2xl shadow-xl p-6 relative overflow-hidden`}
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12" />
            </div>

            {/* Content */}
            <div className="relative z-10">
                <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="inline-flex items-center bg-white/20 rounded-full px-4 py-2 mb-3"
                >
                    <Percent className="h-5 w-5 mr-2" />
                    <span className="text-2xl font-bold">%{offer.discount}</span>
                </motion.div>

                <h3 className="text-2xl font-bold mb-2">{offer.title}</h3>
                <p className="mb-4 opacity-90">{offer.description}</p>

                <div className="flex items-center bg-white/20 rounded-xl px-3 py-2 w-fit">
                    <Clock className="h-4 w-4 mr-2" />
                    <span className="text-sm font-semibold">{timeLeft}</span>
                </div>
            </div>
        </motion.div>
    );
};

export default OfferCard;