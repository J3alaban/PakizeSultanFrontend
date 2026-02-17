import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '', // Mailto'da gönderen kısmında görünmesi için tutuyoruz
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Formu Mailto linkine dönüştüren fonksiyon
    const handleMailRedirect = (e) => {
        e.preventDefault();
        const targetEmail = "demirayhidrolik06@gmail.com";
        const subject = encodeURIComponent(`${formData.subject || 'İletişim'} - ${formData.name}`);
        const body = encodeURIComponent(
            `Veli Adı: ${formData.name}\n` +
            `E-posta: ${formData.email}\n` +
            `Mesaj: ${formData.message}`
        );

        window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
    };

    return (
        <>
            <Helmet>
                <title>{"İletişim - Pakize Sultan Anaokulu"}</title>
                <meta name="description" content="Pakize Sultan Anaokulu - Yaparak ve Yaşatarak Öğreten Okul ! " />
            </Helmet>

            <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-pink-50 py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header - Renkler Korundu */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center mb-16"
                    >
                        <span className="inline-block px-4 py-1 rounded-full bg-pink-100 text-pink-500 font-bold text-sm mb-4">BİZE ULAŞIN</span>
                        <h1 className="text-5xl md:text-6xl font-black text-gray-800 mb-6 tracking-tight">
                            Bir Kahveye <span className="text-blue-400">Bekleriz!</span>
                        </h1>
                        <p className="text-gray-500 text-xl max-w-2xl mx-auto">
                            Okulumuzu gezmek, öğretmenlerimizle tanışmak ve eğitim modelimizi dinlemek için her zaman kapımız açık.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                        {/* Sol Kartlar - Renkler Korundu */}
                        <div className="space-y-6">
                            {[
                                { icon: Phone, title: 'Bizi Arayın', content: '+90 544 594 64 33', color: 'bg-green-100 text-green-600' },
                                { icon: Mail, title: 'E-posta Gönderin', content: 'demirayhidrolik06@gmail.com', color: 'bg-blue-100 text-blue-600' },
                                { icon: MapPin, title: 'Ziyaret Edin', content: 'Saray Fatih Mah. Bozkurt Cad. No:52 Pursaklar / Ankara', color: 'bg-pink-100 text-pink-600' }
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ y: -5 }}
                                    className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-6"
                                >
                                    <div className={`${item.color} p-4 rounded-2xl`}>
                                        <item.icon size={28} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800">{item.title}</h3>
                                        <p className="text-gray-500 text-sm">{item.content}</p>
                                    </div>
                                </motion.div>
                            ))}

                            {/* WhatsApp Alanı - Orijinal Gradyan Korundu */}
                            <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-8 rounded-[2rem] text-white">
                                <MessageCircle size={32} className="mb-4" />
                                <h3 className="text-xl font-bold mb-2">WhatsApp Destek</h3>
                                <p className="text-blue-100 text-sm mb-4">Hızlı bilgi almak için bize WhatsApp'tan yazabilirsiniz.</p>
                                <a
                                    href="https://wa.me/905445946433"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block bg-white text-blue-600 px-6 py-2 rounded-full font-bold text-sm transition-transform hover:scale-105"
                                >
                                    Hemen Yazın
                                </a>
                            </div>
                        </div>

                        {/* Form Alanı - Orijinal Şeffaf/Pembe Stil Korundu */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="lg:col-span-2 bg-white rounded-[3rem] shadow-xl shadow-pink-100/50 p-8 md:p-12 border border-pink-50"
                        >
                            <form onSubmit={handleMailRedirect} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 ml-2">Veli Adı Soyadı</label>
                                        <input
                                            name="name"
                                            required
                                            onChange={handleChange}
                                            className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-blue-200 focus:bg-white transition-all outline-none"
                                            placeholder="Adınız..."
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 ml-2">E-posta Adresi</label>
                                        <input
                                            name="email"
                                            type="email"
                                            required
                                            onChange={handleChange}
                                            className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-blue-200 focus:bg-white transition-all outline-none"
                                            placeholder="ornek@mail.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 ml-2">İlgilendiğiniz Konu</label>
                                    <select
                                        name="subject"
                                        required
                                        onChange={handleChange}
                                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-blue-200 focus:bg-white transition-all outline-none appearance-none"
                                    >
                                        <option value="">Seçiniz...</option>
                                        <option value="Kayit">Yeni Kayıt Hakkında</option>
                                        <option value="Bilgi">Eğitim Programı Hakkında Bilgi</option>
                                        <option value="Ziyaret">Okul Ziyareti Randevusu</option>
                                        <option value="Diger">Diğer</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 ml-2">Mesajınız</label>
                                    <textarea
                                        name="message"
                                        required
                                        onChange={handleChange}
                                        rows="5"
                                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-blue-200 focus:bg-white transition-all outline-none resize-none"
                                        placeholder="Çocuğunuzun yaşını ve merak ettiklerinizi buraya yazabilirsiniz..."
                                    />
                                </div>

                                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                                    <Button
                                        type="submit"
                                        className="w-full bg-[#FF69B4] hover:bg-[#ff4da6] text-white py-8 rounded-[1.5rem] text-xl font-black shadow-lg shadow-pink-200 transition-all flex items-center justify-center gap-3"
                                    >
                                        <Send size={24} />
                                        BİZE GÖNDERİN
                                    </Button>
                                </motion.div>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;