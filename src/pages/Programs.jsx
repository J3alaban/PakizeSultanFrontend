import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Config } from '../helpers/Config';

const Programs = () => {
  const [services, setServices] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`${Config.api.baseUrl}/api/v1/products`);
      if (!response.ok) throw new Error('API hatası');
      const data = await response.json();
      setServices(data.content || []);
    } catch (err) {
      console.error("Veri çekme hatası:", err);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="min-h-screen bg-[#F5F3FF] py-20 px-4 md:px-8 relative overflow-hidden">
      {/* Arka Plan Lila Auralar */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#E9D5FF] rounded-full blur-[120px] opacity-40" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#DDD6FE] rounded-full blur-[150px] opacity-40" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Başlık ve Bilgi Özeti */}
        <div className="mb-20 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-slate-800 mb-6"
          >
            Program <span className="text-[#A78BFA]">İçeriklerimiz</span>
          </motion.h1>
          <p className="text-slate-500 font-medium tracking-wide">
            Eğitim süreçlerimize dair detaylı bilgilendirme paneli.
          </p>
        </div>

        {/* Listeleme Alanı */}
        <div className="space-y-12">
          {services.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className={`group relative flex flex-col md:flex-row items-center gap-10 p-8 border border-white/60 rounded-[3.5rem] shadow-xl overflow-hidden transition-all duration-500 ${
                index % 2 === 0
                ? 'bg-white/60 backdrop-blur-md'
                : 'bg-[#FDFCFE]/80 backdrop-blur-xl border-l-[12px] border-l-[#C4B5FD]'
              }`}
            >
              {/* Görsel Alanı - Lila Glow Etkisiyle */}
              <div className="w-full md:w-64 h-64 flex-shrink-0 relative">
                <div className="absolute inset-0 bg-[#A78BFA] rounded-[2.5rem] rotate-3 opacity-10 group-hover:rotate-6 transition-transform" />
                <div className="relative w-full h-full overflow-hidden rounded-[2.5rem] shadow-lg bg-white">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#F3F4F6]">
                       <span className="text-[#C4B5FD] font-bold">Görsel Yok</span>
                    </div>
                  )}
                </div>
              </div>

              {/* İçerik Alanı */}
              <div className="flex-grow space-y-5">
                <div className="flex items-center gap-4">
                  <span className="px-4 py-1.5 bg-[#F5F3FF] text-[#7C3AED] text-[11px] font-black rounded-full uppercase tracking-widest border border-[#DDD6FE]">
                    {product.category || 'Genel Eğitim'}
                  </span>
                  <div className="h-[1px] flex-grow bg-gradient-to-r from-[#DDD6FE] to-transparent" />
                </div>

                <h2 className="text-3xl font-extrabold text-slate-800 leading-tight">
                  {product.title}
                </h2>

                <div className="relative">
                  <p className="text-slate-600 text-base leading-relaxed max-w-2xl relative z-10">
                    {product.description}
                  </p>
                  {/* Dekoratif tırnak işareti (Lila Cam Efekti) */}
                  <span className="absolute -top-4 -left-6 text-8xl text-[#A78BFA]/10 font-serif select-none pointer-events-none">“</span>
                </div>

                {/* Ek Bilgi Satırı (Sadece marka/detay odaklı) */}
                <div className="flex items-center gap-6 pt-4">
                   <div className="flex flex-col">
                      <span className="text-[10px] text-[#A78BFA] font-black uppercase tracking-tighter">Yaş Grubu </span>
                      <span className="text-sm font-semibold text-slate-700 italic">
                        {product.brand || 'Uzmanlık Programı'}
                      </span>
                   </div>
                </div>
              </div>

              {/* Arka plan dekoratif Lila Daire (Sadece banner içinde) */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#C4B5FD]/10 rounded-full blur-2xl group-hover:bg-[#C4B5FD]/30 transition-all duration-700" />
            </motion.div>
          ))}
        </div>

        {/* Veri Yoksa Gösterilecek Alan */}
        {services.length === 0 && (
          <div className="text-center py-32 bg-white/40 backdrop-blur-md rounded-[4rem] border border-dashed border-[#C4B5FD]">
            <p className="text-[#A78BFA] font-medium italic">Program verileri güncelleniyor...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Programs;