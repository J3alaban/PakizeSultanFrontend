import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';

export const FooterTop = () => {
    return (
        <section className="relative px-4 pb-12 pt-16 bg-white">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-6xl mx-auto"
            >
                <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-[#FFB6C1] to-[#FFDAB9] p-1 shadow-2xl">
                    {/* İç Beyaz Kart */}
                    <div className="bg-white/90 backdrop-blur-md rounded-[2.4rem] px-8 py-10 md:px-16 flex flex-col lg:flex-row items-center justify-between gap-10">

                        {/* Sol Taraf: Metin */}
                        <div className="text-center lg:text-left space-y-4 max-w-md">
                            <h2 className="text-3xl font-bold text-gray-800">
                                Aklınıza Takılan Bir Soru mu Var?
                            </h2>
                            <p className="text-gray-600 font-medium">
                                Sizi ve minik yavrunuzu okulumuzda ağırlamaktan mutluluk duyarız. Bize dilediğiniz an ulaşabilirsiniz.
                            </p>
                            <div className="flex justify-center lg:justify-start gap-4 pt-2">
                                <motion.a whileHover={{ y: -3 }} className="p-2 bg-pink-100 rounded-full text-pink-500 hover:bg-pink-500 hover:text-white transition-colors">
                                    <Instagram size={20} />
                                </motion.a>
                                <motion.a whileHover={{ y: -3 }} className="p-2 bg-blue-100 rounded-full text-blue-500 hover:bg-blue-500 hover:text-white transition-colors">
                                    <Facebook size={20} />
                                </motion.a>
                            </div>
                        </div>

                        {/* Sağ Taraf: İletişim Bilgileri Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:w-auto">
                            {[
                                { icon: Phone, label: 'Bizi Arayın', value: '0(212) 555 00 00', color: 'bg-green-50 text-green-600' },
                                { icon: Mail, label: 'E-posta Gönderin', value: 'merhaba@kucukadimlar.com', color: 'bg-blue-50 text-blue-600' },
                                { icon: MapPin, label: 'Bizi Ziyaret Edin', value: 'Anaokulu Sok. No:12, İstanbul', color: 'bg-orange-50 text-orange-600' },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ scale: 1.02 }}
                                    className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm"
                                >
                                    <div className={`p-3 rounded-xl ${item.color}`}>
                                        <item.icon size={22} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{item.label}</p>
                                        <p className="text-sm font-bold text-gray-700">{item.value}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                    </div>

                    {/* Süsleme Amaçlı Hareketli Daireler */}
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity }}
                        className="absolute -top-12 -right-12 w-24 h-24 bg-[#87CEFA] opacity-20 rounded-full blur-xl"
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default FooterTop;