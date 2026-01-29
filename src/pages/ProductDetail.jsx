import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Minus, Plus, ArrowLeft, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/product.js';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { toast } = useToast();
    const [quantity, setQuantity] = useState(1);

    const product = products.find(p => p.id === parseInt(id));
    const relatedProducts = products.filter(p => p.id !== parseInt(id)).slice(0, 3);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Ürün Bulunamadı</h2>
                    <Button onClick={() => navigate('/')}>Ana Sayfaya Dön</Button>
                </div>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart(product, quantity);
        toast({
            title: "Sepete Eklendi! 🎉",
            description: `${quantity} adet ${product.name} sepetinize eklendi.`,
        });
    };

    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    return (
        <>
            <Helmet>
                <title>{product.name ? `${product.name} - Pakize Sultan Anaokulu` : "Hizmet Detayı - Pakize Sultan"}</title>
                <meta name="description" content={product.description} />
            </Helmet>

            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Back Button */}
                    <motion.button
                        whileHover={{ scale: 1.05, x: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/')}
                        className="flex items-center text-gray-600 hover:text-[#FF7F50] mb-8 transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5 mr-2" />
                        Geri Dön
                    </motion.button>

                    {/* Product Details */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                        {/* Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="bg-white rounded-3xl shadow-xl overflow-hidden"
                        >
                            <motion.img
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                                src={product.image}
                                alt={product.name}
                                className="w-full h-[500px] object-cover"
                            />
                        </motion.div>

                        {/* Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex flex-col justify-center"
                        >
                            <h1 className="text-4xl font-bold text-gray-800 mb-4">
                                {product.name}
                            </h1>
                            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                                {product.description}
                            </p>

                            {/* Features */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">Özellikler</h3>
                                <ul className="space-y-3">
                                    {product.features.map((feature, i) => (
                                        <motion.li
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 + i * 0.1 }}
                                            className="flex items-center text-gray-700"
                                        >
                                            <div className="bg-[#FFDAB9] rounded-full p-1 mr-3">
                                                <Check className="h-4 w-4 text-[#FF7F50]" />
                                            </div>
                                            {feature}
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>

                            {/* Price */}
                            <div className="bg-gradient-to-r from-[#FF7F50] to-[#FFDAB9] rounded-2xl p-6 mb-6">
                <span className="text-white text-4xl font-bold">
                  ₺{product.price.toFixed(2)}
                </span>
                            </div>

                            {/* Quantity Selector */}
                            <div className="flex items-center gap-4 mb-6">
                                <span className="text-gray-700 font-semibold">Adet:</span>
                                <div className="flex items-center bg-white rounded-xl shadow-md">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={decreaseQuantity}
                                        className="p-3 text-gray-600 hover:text-[#FF7F50] transition-colors"
                                    >
                                        <Minus className="h-5 w-5" />
                                    </motion.button>
                                    <span className="px-6 text-xl font-bold text-gray-800">{quantity}</span>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={increaseQuantity}
                                        className="p-3 text-gray-600 hover:text-[#FF7F50] transition-colors"
                                    >
                                        <Plus className="h-5 w-5" />
                                    </motion.button>
                                </div>
                            </div>

                            {/* Add to Cart Button */}
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Button
                                    onClick={handleAddToCart}
                                    className="w-full bg-[#FF7F50] hover:bg-[#ff6a3d] text-white py-6 rounded-2xl text-lg font-bold shadow-xl hover:shadow-2xl transition-all"
                                >
                                    <ShoppingCart className="h-6 w-6 mr-2" />
                                    Sepete Ekle
                                </Button>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Related Products */}
                    {relatedProducts.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                                İlgili Ürünler
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {relatedProducts.map((relatedProduct) => (
                                    <ProductCard key={relatedProduct.id} product={relatedProduct} />
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProductDetail;