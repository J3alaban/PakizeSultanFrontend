import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

// Veriler
import { products as classes, offers, reviews } from '@/data/product.js';

// Bileşenler
import HeroSection from '@/components/HeroSection';
import Features from '@/components/Features';
import ProductCard from '@/components/ProductCard';
import Banner from '@/components/Banner';
import OfferCard from '@/components/OfferCard';
import ReviewCard from '@/components/ReviewCard';
import FooterTop from '@/components/FooterTop';
import Footer from '@/components/Footer';
import Classes from '@/components/Classes';


const HomePage = () => {
    // Animasyon varyantları
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <>
            <Helmet>
                <title>Pakize Sultan Anaokulu</title>
                <meta name="description" content="Çocuğunuz için güvenli ve öğretici bir yuva. Geleceğin yıldızlarını beraber yetiştirelim." />
            </Helmet>

            {/* Ana Sayfa İçeriği */}
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-50">

                {/* HERO SECTION */}
                <HeroSection
                    title="Geleceğin Yıldızları Burada Parlıyor"
                    subtitle="Oyunla öğrenen, merak eden ve keşfeden mutlu çocuklar yetiştiriyoruz."
                    ctaText="Eğitimlerimizi Görün"
                    ctaLink="#classes"
                />

                {/* FEATURES (Neden Biz?) */}
                <section className="py-20 px-4">
                    <div className="max-w-7xl mx-auto">
                        <Features />
                    </div>
                </section>


{/* CLASSES (Eğitim Programları) */}
<section className="py-20 px-4 bg-white/60 backdrop-blur-md border-y border-pink-50">
    <div className="max-w-7xl mx-auto text-center">
        <Classes
            // Sadece ilk 6 öğeyi gönderiyoruz
            classes={classes.slice(0, 6)}
            containerVariants={containerVariants}
            itemVariants={itemVariants}
        />
    </div>
</section>







                {/* ARA BANNER (Aksiyon Çağrısı) */}
                <Banner />


                {/* OFFERS (Kayıt Avantajları) */}
                <section className="py-20 px-4 bg-gray-50/50">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-4xl font-black text-center text-gray-800 mb-12 italic">Kayıt Avantajları</h2>
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-6"
                        >
                            {offers.map((offer) => (
                                <motion.div key={offer.id} variants={itemVariants}>
                                    <OfferCard offer={offer} />
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* REVIEWS (Veli Deneyimleri) */}
                <section className="py-20 px-4 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-4xl font-black text-center text-gray-800 mb-12">Velilerimiz Ne Diyor?</h2>
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                        >
                            {reviews.map((review) => (
                                <motion.div key={review.id} variants={itemVariants}>
                                    <ReviewCard review={review} />
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>
            </div>

            {/* FOOTER ENTEGRASYONU - En alt kısım */}
            <FooterTop />
            <Footer />
        </>
    );
};

export default HomePage;