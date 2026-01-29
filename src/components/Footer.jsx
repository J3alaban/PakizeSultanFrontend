import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
// Footer.jsx dosyasının en üstü
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Baby } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear(); // Dinamik yıl bilgisi

    return (
        <footer className="bg-gray-800 text-gray-300 py-16 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {/* Bölüm 1: Logo ve Kısa Açıklama */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="col-span-1 lg:col-span-1 flex flex-col items-center md:items-start text-center md:text-left"
                >
                    <Link to="/" className="flex items-center space-x-3 mb-4">
                        <div className="bg-gradient-to-br from-[#FF69B4] to-[#FFB6C1] p-2 rounded-2xl shadow-lg">
                            <Baby className="h-8 w-8 text-white" />
                        </div>
                        <div className="flex flex-col">
              <span className="text-3xl font-black tracking-tight text-white leading-none">
                Küçük <span className="text-[#FF69B4]">Adımlar</span>
              </span>
                            <span className="text-[11px] font-bold text-blue-300 uppercase tracking-[0.2em] mt-1">Anaokulu</span>
                        </div>
                    </Link>
                    <p className="text-sm leading-relaxed mb-4 max-w-xs">
                        Çocuklarımızın hayallerini büyüten, güvenli ve sevgi dolu bir öğrenme yuvası.
                    </p>
                    <div className="flex space-x-4">
                        <motion.a whileHover={{ scale: 1.2, color: '#FF69B4' }} href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                            <Facebook size={24} />
                        </motion.a>
                        <motion.a whileHover={{ scale: 1.2, color: '#FF69B4' }} href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                            <Instagram size={24} />
                        </motion.a>
                        <motion.a whileHover={{ scale: 1.2, color: '#FF69B4' }} href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                            <Twitter size={24} />
                        </motion.a>
                    </div>
                </motion.div>

                {/* Bölüm 2: Hızlı Linkler */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="col-span-1 text-center md:text-left"
                >
                    <h3 className="text-xl font-bold text-white mb-6">Hızlı Linkler</h3>
                    <ul className="space-y-3">
                        <li><Link to="/hakkimizda" className="hover:text-[#FF69B4] transition-colors text-sm">Hakkımızda</Link></li>
                        <li><Link to="/programlar" className="hover:text-[#FF69B4] transition-colors text-sm">Programlarımız</Link></li>
                        <li><Link to="/galeri" className="hover:text-[#FF69B4] transition-colors text-sm">Galeri</Link></li>
                        <li><Link to="/blog" className="hover:text-[#FF69B4] transition-colors text-sm">Blog</Link></li>
                        <li><Link to="/iletisim" className="hover:text-[#FF69B4] transition-colors text-sm">İletişim</Link></li>
                    </ul>
                </motion.div>

                {/* Bölüm 3: İletişim Bilgileri */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="col-span-1 text-center md:text-left"
                >
                    <h3 className="text-xl font-bold text-white mb-6">Bize Ulaşın</h3>
                    <ul className="space-y-3">
                        <li className="flex items-center justify-center md:justify-start space-x-3 text-sm">
                            <Mail size={18} className="text-[#87CEFA]" />
                            <span>pakizesultan@gmail.com</span>
                        </li>
                        <li className="flex items-center justify-center md:justify-start space-x-3 text-sm">
                            <Phone size={18} className="text-[#87CEFA]" />
                            <span>+90 544 594 64 33</span>
                        </li>
                        <li className="flex items-center justify-center md:justify-start space-x-3 text-sm">
                            <MapPin size={18} className="text-[#87CEFA]" />
                            <span>Saray Fatih Mah. Bozkurt Cad. No:52 Pursaklar-Saray / Ankara</span>
                        </li>
                    </ul>
                </motion.div>

                {/* Bölüm 4: Harita Entegrasyonu */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="col-span-1 flex flex-col items-center md:items-start text-center md:text-left"
                >
                    <h3 className="text-xl font-bold text-white mb-6">Konumumuz</h3>
                    <div className="w-full h-48 bg-gray-700 rounded-xl overflow-hidden shadow-lg border border-gray-600">
                        {/* Google Haritalar iframe örneği */}
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.597022137682!2d29.98686611568289!3d40.78505527932675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b3f8f1c8f8b01%3A0x8f7f8f7f8f7f8f7f!2sİnegöl%2FBursa!5e0!3m2!1str!2str!4v1674744000000!5m2!1str!2str"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Okul Konumu"
                        ></iframe>
                    </div>
                </motion.div>
            </div>

            {/* Telif Hakkı (Copyright) Bölümü */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="border-t border-gray-700 mt-16 pt-8 text-center"
            >
                <p className="text-sm text-gray-500">
                    &copy; {currentYear} Küçük Adımlar Anaokulu. Tüm hakları saklıdır.
                </p>
            </motion.div>
        </footer>
    );
};

export default Footer;