import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Info } from 'lucide-react'; // ShoppingCart yerine Heart ve Info
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const ProductCard = ({ product }) => {
    const { toast } = useToast();

    const handleInterestClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        // Burada sepete eklemek yerine "İlgi Listesine Ekleme" veya "Bilgi Talebi" simüle edilebilir
        toast({
            title: "Harika Bir Seçim! 🌟",
            description: `${product.name} programımız hakkında sizinle iletişime geçeceğiz.`,
        });
    };

    return (
        <motion.div
            whileHover={{ scale: 1.03, y: -8 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 250, damping: 25 }}
            className="group"
        >
            <Link to={`/program/${product.id}`}>
                <div className="bg-white rounded-[2rem] shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-pink-50">

                    {/* Görsel Alanı */}
                    <div className="relative overflow-hidden h-56 bg-blue-50">
                        <motion.img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.08 }}
                            transition={{ duration: 0.5 }}
                        />
                        {/* Yaş Grubu Rozeti (Badge) */}
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#FF69B4] px-4 py-1 rounded-full text-xs font-bold shadow-sm">
                            {product.ageGroup || "3-6 Yaş"}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* İçerik Alanı */}
                    <div className="p-6">
                        <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-[#FF69B4] transition-colors">
                            {product.name}
                        </h3>
                        <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed">
                            {product.shortDescription}
                        </p>

                        <div className="flex items-center justify-between gap-3">
                            {/* Fiyat yerine Aylık Ücret veya Bilgi Butonu */}
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-400 font-medium">Aylık Başlayan</span>
                                <span className="text-xl font-extrabold text-[#87CEFA]">
                                    ₺{product.price.toLocaleString('tr-TR')}
                                </span>
                            </div>

                            <div className="flex gap-2">
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                    <Button
                                        onClick={handleInterestClick}
                                        className="bg-pink-100 hover:bg-pink-500 text-pink-500 hover:text-white rounded-full w-10 h-10 p-0 transition-colors"
                                        size="icon"
                                    >
                                        <Heart className="h-5 w-5 fill-current" />
                                    </Button>
                                </motion.div>
                            </div>
                        </div>

                        <Button
                            className="w-full mt-6 bg-[#87CEFA] hover:bg-[#60b2e6] text-white rounded-2xl font-bold py-6 shadow-md shadow-blue-100 transition-all"
                        >
                            Programı İncele
                        </Button>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default ProductCard;