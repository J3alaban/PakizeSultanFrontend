import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const ProductCard = ({ product }) => {
    const { toast } = useToast();

    // Güvenli veri eşleme
    const name = product.title || product.name || "Eğitim Programı";
    const description = product.description || product.shortDescription || "Program detayları hazırlanıyor...";
    const ageGroup = product.brand || product.ageGroup || "Genel Katılım";
    const displayImage = (product.images && product.images.length > 0)
        ? product.images[0]
        : "https://images.unsplash.com/photo-1587654711723-4446a8a2712f?q=80&w=800&auto=format&fit=crop";

    const handleInterestClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toast({
            title: "İlginiz İçin Teşekkürler! 🌟",
            description: `${name} programı için talebiniz alınmıştır.`,
        });
    };

    return (
        <motion.div
            whileHover={{ scale: 1.03, y: -5 }}
            whileTap={{ scale: 0.98 }}
            className="group h-full"
        >

                <div className="bg-white rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-pink-100/50 transition-all duration-500 border border-slate-100 h-full flex flex-col overflow-hidden">

                    {/* Görsel Alanı */}
                    <div className="relative h-60 bg-slate-50 overflow-hidden">
                        <motion.img
                            src={displayImage}
                            alt={name}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                        />
                        <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-md text-[#FF69B4] px-4 py-1.5 rounded-2xl text-xs font-black shadow-sm uppercase tracking-wider">
                            {ageGroup}
                        </div>

                    </div>

                    {/* İçerik Alanı */}
                    <div className="p-8 flex flex-col flex-grow text-left">
                        <h3 className="text-2xl font-black text-gray-800 mb-3 group-hover:text-[#FF69B4] transition-colors leading-tight">
                            {name}
                        </h3>

                        <p className="text-gray-500 text-sm mb-8 line-clamp-3 leading-relaxed flex-grow">
                            {description}
                        </p>

                        <div className="pt-6 border-t border-slate-50">
                        <Link to="/programlar">
                                                    <Button
                                                        className="w-full bg-[#87CEFA] hover:bg-[#FF69B4] text-white rounded-[1.5rem] font-black py-7 shadow-lg shadow-blue-100 hover:shadow-pink-100 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                                                    >
                                                        Detayları Keşfet
                                                        <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                                                    </Button>
                                                </Link>
                        </div>
                    </div>
                </div>

        </motion.div>
    );
};

export default ProductCard;