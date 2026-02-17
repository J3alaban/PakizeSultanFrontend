import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import ProductCard from '@/components/ProductCard';
import { Config } from "../helpers/Config";

export default function Classes({ containerVariants, itemVariants }) {
    const [classes, setClasses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // Modal için seçili resim state'i
    const [selectedImage, setSelectedImage] = useState(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${Config.api.baseUrl}/api/v1/products`);
            const data = await res.json();

            const cleanedData = (data.content || []).map(item => ({
                id: item.id,
                title: item.title || "",
                description: item.description || "",
                categorySlug: item.category || "",
                brand: item.brand || "",
                images: item.images || []
            }));

            setClasses(cleanedData);
        } catch (err) {
            console.error("Hizmet verileri yüklenemedi:", err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <section id="classes" className="py-20 px-4 bg-white/60 backdrop-blur-md border-y border-pink-50">
            <div className="max-w-7xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">
                        Eğitim Programlarımız
                    </h2>
                    <p className="text-gray-600 text-lg mb-12">
                        Yaş gruplarına özel gelişimsel programlar
                    </p>
                </motion.div>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF69B4]"></div>
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {classes.slice(0, 6).map((item) => (
                            <motion.div
                                key={item.id}
                                variants={itemVariants}
                                // Tıklandığında eğer bir resim varsa ilk resmi modalda açar
                                onClick={() => item.images?.length > 0 && setSelectedImage(item.images[0])}
                                className="cursor-pointer"
                            >
                                <ProductCard product={item} />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>

            {/* Resim Modal Yapısı */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="relative max-w-5xl w-full flex justify-center"
                        >
                            <img
                                src={selectedImage}
                                alt="Büyütülmüş Görsel"
                                className="max-h-[90vh] max-w-full object-contain rounded-lg shadow-2xl"
                            />
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-[-40px] right-0 text-white text-3xl font-bold hover:text-pink-400 transition-colors"
                            >
                                &times;
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}