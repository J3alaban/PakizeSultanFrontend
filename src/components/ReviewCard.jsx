import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const ReviewCard = ({ review }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.03, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative bg-white rounded-[2rem] shadow-md p-8 hover:shadow-2xl transition-all border-b-4 border-blue-100"
        >
            {/* Dekoratif Tırnak İşareti */}
            <div className="absolute top-4 right-6 text-pink-100">
                <Quote size={40} fill="currentColor" />
            </div>

            {/* Değerlendirme Yıldızları */}
            <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`h-5 w-5 ${
                            i < review.rating
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-200'
                        }`}
                    />
                ))}
            </div>

            {/* Veli Yorumu */}
            <p className="text-gray-600 mb-6 italic leading-relaxed relative z-10">
                "{review.comment}"
            </p>

            {/* Veli Bilgileri */}
            <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                <div className="flex flex-col">
                    <p className="font-bold text-gray-800 leading-tight">
                        {review.name}
                    </p>
                    <p className="text-xs font-medium text-blue-400 mt-1 uppercase tracking-wider">
                        {review.relation || "Veli"} {/* Örn: 'Derin'in Annesi' */}
                    </p>
                </div>

                {/* Çocuk/Eğitim İkonu */}
                <div className="bg-gradient-to-br from-[#FFB6C1] to-[#FFDAB9] rounded-2xl p-2 shadow-inner">
                    <div className="text-2xl filter drop-shadow-sm">
                        {/* Veride emoji varsa onu basar yoksa varsayılan okul emojisi */}
                        {review.emoji || "🎒"}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ReviewCard;